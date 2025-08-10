using Dokumentasjon_com.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using PdfSharp.Pdf;
using PdfSharp.Pdf.IO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Dokumentasjon_com.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SaveFileController : ControllerBase
    {
        private readonly ILogger<SaveFileController> _logger;
        private readonly PdfService _pdfService;
        private readonly string _ftpBaseUrl;
        private readonly NetworkCredential _ftpCredentials;
        private readonly bool _useFtps;
        private readonly string _storageRoot;

        public SaveFileController(
            ILogger<SaveFileController> logger,
            IConfiguration config,
            PdfService pdfService)
        {
            _logger = logger;
            _pdfService = pdfService;

            var server = config["FtpSettings:Server"]?.TrimEnd('/')
                         ?? throw new ArgumentException("Missing FTP server");
            _useFtps = bool.TryParse(config["FtpSettings:UseFtps"], out var ftps) && ftps;
            _ftpBaseUrl = server.StartsWith("ftp://", StringComparison.OrdinalIgnoreCase) ||
                          server.StartsWith("ftps://", StringComparison.OrdinalIgnoreCase)
                          ? server
                          : (_useFtps ? "ftps://" : "ftp://") + server;

            var user = config["FtpSettings:Username"] ?? throw new ArgumentException("Missing FTP username");
            var pass = config["FtpSettings:Password"] ?? throw new ArgumentException("Missing FTP password");
            _ftpCredentials = new NetworkCredential(user, pass);

            // Viktig: samme temp som enkeltopplasting
            _storageRoot = Path.Combine(Directory.GetCurrentDirectory(), "TempImages");
            Directory.CreateDirectory(_storageRoot);

            // Hvis self-signed FTPS-sertifikat:
            // ServicePointManager.ServerCertificateValidationCallback ??= (s, cert, chain, errors) => true;
        }

        // Samme endpoint – støtter nå både "file" (single) og "files" (multi)
        [HttpPost("upload")]
        [RequestSizeLimit(1_024_000_000)]
        [RequestFormLimits(MultipartBodyLengthLimit = 1_024_000_000)]
        public async Task<IActionResult> UploadAndMerge()
        {
            if (!Request.HasFormContentType)
                return BadRequest("Mangler form-data (multipart/form-data).");

            var form = await Request.ReadFormAsync();

            // Tåler både FirmID/firmID osv.
            string firmID = form.TryGetValue("FirmID", out var v1) ? v1.ToString()
                           : form.TryGetValue("firmID", out var v2) ? v2.ToString()
                           : string.Empty;

            string vareNummer = form.TryGetValue("vareNummer", out var v3) ? v3.ToString()
                               : form.TryGetValue("VareNummer", out var v4) ? v4.ToString()
                               : string.Empty;

            string clientEmail = form.TryGetValue("ClientEmail", out var v5) ? v5.ToString()
                               : form.TryGetValue("clientEmail", out var v6) ? v6.ToString()
                               : string.Empty;

            if (string.IsNullOrWhiteSpace(firmID) || string.IsNullOrWhiteSpace(vareNummer))
                return BadRequest("FirmaID og VareNummer er påkrevd.");

            // Hent filer fra både "file" og "files"
            var incoming = form.Files
                               .Where(f => f != null && f.Length > 0 &&
                                           (f.Name.Equals("file", StringComparison.OrdinalIgnoreCase) ||
                                            f.Name.Equals("files", StringComparison.OrdinalIgnoreCase)))
                               .ToList();

            if (incoming.Count == 0)
                return BadRequest("Ingen fil(er) mottatt. Forventet feltnavn: 'file' (eller 'files').");

            // Samme FTP-stier som før
            var ftpBase = $"{_ftpBaseUrl}/{firmID}";
            var ftpRoot = $"{_ftpBaseUrl}/{firmID}/{vareNummer}";     // råfiler
            var ftpPdfDir = $"{ftpRoot}/PDFS";                          // enkelt-PDF-er
            var ftpDocDir = $"{_ftpBaseUrl}/{firmID}_Document";         // sammenslått PDF

            await EnsureDirectoryAsync(ftpBase);
            await EnsureDirectoryAsync(ftpRoot);
            await EnsureDirectoryAsync(ftpPdfDir);
            await EnsureDirectoryAsync(ftpDocDir);

            // Samme tempmappe som enkeltopplasting
            var tempDir = Path.Combine(_storageRoot, firmID, vareNummer);
            var tempPdfDir = Path.Combine(tempDir, "PDFS");
            Directory.CreateDirectory(tempDir);
            Directory.CreateDirectory(tempPdfDir);

            try
            {
                // 1) Last opp ALLE filer til FTP-råmappe (med hash i navn)
                foreach (var file in incoming)
                {
                    var originalName = Path.GetFileName(file.FileName);
                    var localPath = Path.Combine(tempDir, originalName);

                    await using (var fs = new FileStream(localPath, FileMode.Create, FileAccess.Write, FileShare.None))
                        await file.CopyToAsync(fs);

                    var hashedLocal = RenameWithShortHash(localPath,0);
                    var hashedName = Path.GetFileName(hashedLocal);

                    await UploadFileAsync(hashedLocal, $"{ftpRoot}/{hashedName}");
                    _logger.LogInformation("Uploaded raw file to FTP: {Url}", $"{ftpRoot}/{hashedName}");
                }

                // 2) Lag PDF av alle bilder i FTP-råmappe → FTP/PDFS
                var allNames = await ListDirectoryAsync(ftpRoot);
                var imageExts = new[] { ".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".gif", ".webp", ".heic" };
                var imageFiles = allNames.Where(n => imageExts.Contains(Path.GetExtension(n), StringComparer.OrdinalIgnoreCase))
                                         .ToList();

                foreach (var img in imageFiles)
                {
                    var remoteImg = $"{ftpRoot}/{img}";
                    var localImg = Path.Combine(tempDir, img);
                    await DownloadFileAsync(remoteImg, localImg);

                    var pdfName = Path.ChangeExtension(img, ".pdf");
                    var localPdf = Path.Combine(tempPdfDir, pdfName);

                    var pdfBytes = _pdfService.GeneratePdf(localImg, pdfName);
                    await System.IO.File.WriteAllBytesAsync(localPdf, pdfBytes);
                    await UploadFileAsync(localPdf, $"{ftpPdfDir}/{pdfName}");

                    _logger.LogInformation("Generated and uploaded PDF: {Url}", $"{ftpPdfDir}/{pdfName}");
                }

                // 3) Slå sammen ALLE PDF-er i FTP/PDFS → én PDF i {firmID}_Document
                var pdfNames = (await ListDirectoryAsync(ftpPdfDir))
                               .Where(n => Path.GetExtension(n).Equals(".pdf", StringComparison.OrdinalIgnoreCase))
                               .ToList();

                if (!pdfNames.Any())
                    return BadRequest("Ingen PDF-er i PDFS å sammenslå.");

                var localPdfPaths = new List<string>();
                foreach (var pdf in pdfNames)
                {
                    var remotePdf = $"{ftpPdfDir}/{pdf}";
                    var lp = Path.Combine(tempPdfDir, pdf);
                    await DownloadFileAsync(remotePdf, lp);
                    localPdfPaths.Add(lp);
                }

                var pdfDoc = new PdfDocument();
                foreach (var pdfPath in localPdfPaths)
                {
                    var input = PdfReader.Open(pdfPath, PdfDocumentOpenMode.Import);
                    for (int i = 0; i < input.PageCount; i++)
                        pdfDoc.AddPage(input.Pages[i]);
                }

                await using (var msMerge = new MemoryStream())
                {
                    pdfDoc.Save(msMerge, false);
                    msMerge.Position = 0;

                    var mergedBytes = msMerge.ToArray();
                    var mergedName = $"{vareNummer}.pdf";
                    var mergedLocal = Path.Combine(tempDir, mergedName);
                    await System.IO.File.WriteAllBytesAsync(mergedLocal, mergedBytes);

                    // Hash i filnavn (samme logikk)
                    mergedLocal = RenameWithShortHash(mergedLocal, 0);
                    mergedName = Path.GetFileName(mergedLocal);

                    await UploadFileAsync(mergedLocal, $"{ftpDocDir}/{mergedName}");
                    _logger.LogInformation("Uploaded merged PDF: {Url}", $"{ftpDocDir}/{mergedName}");
                }

                return Ok(new
                {
                    message = "Opplasting og sammenslåing fullført.",
                    filesReceived = incoming.Count,
                    firmID,
                    vareNummer,
                    clientEmail
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "UploadAndMerge (multi) failed");
                return StatusCode(500, ex.Message);
            }
            finally
            {
                try { if (Directory.Exists(tempDir)) Directory.Delete(tempDir, true); } catch { /* best effort */ }
            }
        }

        // ---------------- FTP-hjelpere (med FTPS) ----------------

        private FtpWebRequest CreateFtpRequest(string url, string method)
        {
            var req = (FtpWebRequest)WebRequest.Create(url);
            req.Method = method;
            req.Credentials = _ftpCredentials;
            req.UsePassive = true;        // bytt til false hvis server krever aktiv modus
            req.UseBinary = true;
            req.KeepAlive = false;
            req.EnableSsl = _useFtps;     // FTPS-støtte
            req.Proxy = null;
            return req;
        }

        private async Task EnsureDirectoryAsync(string url)
        {
            try
            {
                var req = CreateFtpRequest(url, WebRequestMethods.Ftp.MakeDirectory);
                using var _ = (FtpWebResponse)await req.GetResponseAsync();
            }
            catch
            {
                // ok hvis finnes
            }
        }

        private async Task<IEnumerable<string>> ListDirectoryAsync(string url)
        {
            var list = new List<string>();
            var req = CreateFtpRequest(url, WebRequestMethods.Ftp.ListDirectory);
            using var res = (FtpWebResponse)await req.GetResponseAsync();
            using var sr = new StreamReader(res.GetResponseStream());
            string? line;
            while ((line = await sr.ReadLineAsync()) != null)
                list.Add(line);
            return list;
        }

        private async Task DownloadFileAsync(string url, string localPath)
        {
            var req = CreateFtpRequest(url, WebRequestMethods.Ftp.DownloadFile);
            using var res = (FtpWebResponse)await req.GetResponseAsync();
            using var rs = res.GetResponseStream();
            using var fs = new FileStream(localPath, FileMode.Create, FileAccess.Write, FileShare.None);
            await rs.CopyToAsync(fs);
        }

        private async Task UploadFileAsync(string localPath, string url)
        {
            var req = CreateFtpRequest(url, WebRequestMethods.Ftp.UploadFile);
            await using (var src = new FileStream(localPath, FileMode.Open, FileAccess.Read, FileShare.Read))
            await using (var st = await req.GetRequestStreamAsync())
                await src.CopyToAsync(st);
            using var _ = (FtpWebResponse)await req.GetResponseAsync();
        }

        // ---------------- Hashing ----------------

        public static string RenameWithShortHash(string filePath, int hashLength = 1)
        {
            if (!System.IO.File.Exists(filePath))
                throw new FileNotFoundException("File not found", filePath);

            string fullHash = CalculateSha256(filePath);
            string shortHash = fullHash.Substring(0, hashLength) ;

            string directory = Path.GetDirectoryName(filePath)!;
            string nameWithoutExt = Path.GetFileNameWithoutExtension(filePath);
            string extension = Path.GetExtension(filePath);

            string newName = $"{nameWithoutExt}_{shortHash}{extension}";
            string newPath = Path.Combine(directory, newName);

            System.IO.File.Move(filePath, newPath, overwrite: true);
            return newPath;
        }

        private static string CalculateSha256(string filePath)
        {
            using var stream = System.IO.File.OpenRead(filePath);
            using var sha256 = SHA256.Create();
            byte[] hashBytes = sha256.ComputeHash(stream);
            var sb = new StringBuilder();
            foreach (byte b in hashBytes) sb.Append(b.ToString("x2"));
            return sb.ToString();
        }
    }
}
