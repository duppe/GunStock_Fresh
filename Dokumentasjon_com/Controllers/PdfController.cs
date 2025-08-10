using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Dokumentasjon_com.Services;

namespace Dokumentasjon_com.Controllers
{
    [ApiController]
    [Route("api")]
    public class PdfController : ControllerBase
    {
        private readonly PdfService _pdfService;
        private readonly ILogger<PdfController> _logger;

        public PdfController(PdfService pdfService, ILogger<PdfController> logger)
        {
            _pdfService = pdfService;
            _logger = logger;
        }

        [HttpGet("image-to-pdf/{firmID}/{folder}/{filename}")]
        public async Task<IActionResult> GetImageAsPdf(string firmID, string folder, string filename)
        {
            try
            {
                string localImagePath = Path.Combine("TempImages", firmID, folder, filename);
                string imageUrl = $"https://localhost:5001/api/images/{firmID}/{folder}/{filename}";

                _logger.LogInformation($"🖼️ Sjekker om bildet finnes lokalt: {localImagePath}");

                if (!System.IO.File.Exists(localImagePath))
                {
                    _logger.LogWarning($"⚠️ Bildet finnes ikke lokalt. Laster ned fra {imageUrl}");

                    using (var httpClient = new HttpClient())
                    {
                        try
                        {
                            var imageBytes = await httpClient.GetByteArrayAsync(imageUrl);
                            await System.IO.File.WriteAllBytesAsync(localImagePath, imageBytes);
                            _logger.LogInformation("✅ Bilde lastet ned og lagret lokalt.");
                        }
                        catch (Exception downloadError)
                        {
                            _logger.LogError(downloadError, $"🚨 Feil ved nedlasting av bildet: {imageUrl}");
                            return StatusCode(500, "Kunne ikke laste ned bildet.");
                        }
                    }
                }

                if (!System.IO.File.Exists(localImagePath))
                {
                    _logger.LogError($"🚨 Etter nedlasting: Bildet finnes fortsatt ikke på {localImagePath}");
                    return NotFound($"Bildet finnes ikke: {localImagePath}");
                }

                var pdfBytes = _pdfService.GeneratePdf(localImagePath, filename);
                _logger.LogInformation("✅ PDF generert og sendt til klient.");
                return File(pdfBytes, "application/pdf", $"{Path.GetFileNameWithoutExtension(filename)}.pdf");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "🚨 Uventet feil i `GetImageAsPdf`.");
                return StatusCode(500, "Uventet serverfeil.");
            }
        }

        [HttpGet("merge-folder-pdfs/{firmID}/{folder}")]
        public IActionResult MergeFolderPdfs(string firmID, string folder)
        {
            try
            {
                string folderPath = Path.Combine("TempImages", firmID, folder);
                var mergedPdf = _pdfService.MergeAllPdfsInFolder(folderPath);

                string outputName = $"{folder}_samlet.pdf";
                return File(mergedPdf, "application/pdf", outputName);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "🚨 Klarte ikke å merge PDF-er.");
                return StatusCode(500, "Uventet feil ved PDF-sammenslåing.");
            }
        }

        [HttpPost("upload-pdf/{firmID}/{folderName}")]
        public async Task<IActionResult> UploadPdf(string firmID, string folderName)
        {
            try
            {
                var file = Request.Form.Files.GetFile("pdf");

                if (file == null || file.Length == 0)
                    return BadRequest("Ingen fil mottatt.");

                string saveFolder = Path.Combine("TempImages", firmID, folderName);
                Directory.CreateDirectory(saveFolder);

                string filePath = Path.Combine(saveFolder, file.FileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                _logger.LogInformation($"✅ PDF lagret på: {filePath}");
                return Ok("PDF lagret.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "🚨 Klarte ikke å lagre PDF.");
                return StatusCode(500, "Serverfeil ved opplasting.");
            }
        }



        [HttpGet("folder-to-pdf/{firmID}/{folder}")]
        public IActionResult GetFolderAsPdf(string firmID, string folder)
        {
            try
            {
                string folderPath = Path.Combine("TempImages", firmID, folder);

                if (!Directory.Exists(folderPath))
                {
                    _logger.LogWarning($"❌ Katalogen finnes ikke: {folderPath}");
                    return NotFound("Katalogen finnes ikke.");
                }

                var imageFiles = Directory.GetFiles(folderPath, "*.*")
                                          .Where(f => f.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase) ||
                                                      f.EndsWith(".jpeg", StringComparison.OrdinalIgnoreCase) ||
                                                      f.EndsWith(".png", StringComparison.OrdinalIgnoreCase) ||
                                                      f.EndsWith(".bmp", StringComparison.OrdinalIgnoreCase) ||
                                                      f.EndsWith(".gif", StringComparison.OrdinalIgnoreCase))
                                          .ToList();

                if (imageFiles.Count == 0)
                {
                    return NotFound("Ingen bilder funnet i katalogen.");
                }

                var pdfBytes = _pdfService.GeneratePdfFromMultipleImages(imageFiles);
                string pdfFileName = $"{folder}_samlet.pdf";

                return File(pdfBytes, "application/pdf", pdfFileName);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "🚨 Feil ved generering av PDF for mappe.");
                return StatusCode(500, "Uventet serverfeil.");
            }
        }



    }
}
