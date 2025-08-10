using System;
using System.IO;
using PdfSharpCore.Drawing;
using PdfSharpCore.Pdf;
using Microsoft.Extensions.Logging;
using System.Net;
using PdfSharpCore.Pdf.IO;

namespace Dokumentasjon_com.Services
{
    public class PdfService
    {
        private readonly ILogger<PdfService> _logger;

        public PdfService(ILogger<PdfService> logger)
        {
            _logger = logger;
        }

        public byte[] MergeAllPdfsInFolder(string folderPath)
        {
            if (!Directory.Exists(folderPath))
                throw new DirectoryNotFoundException($"Katalogen finnes ikke: {folderPath}");

            var pdfFiles = Directory.GetFiles(folderPath, "*.pdf", SearchOption.TopDirectoryOnly);
            if (pdfFiles.Length == 0)
                throw new FileNotFoundException("Ingen PDF-filer funnet i katalogen.");

            using (var outputDocument = new PdfDocument())
            {
                foreach (var file in pdfFiles)
                {
                    using (var inputDocument = PdfReader.Open(file, PdfDocumentOpenMode.Import))
                    {
                        for (int i = 0; i < inputDocument.PageCount; i++)
                        {
                            outputDocument.AddPage(inputDocument.Pages[i]);
                        }
                    }
                }

                using (var stream = new MemoryStream())
                {
                    outputDocument.Save(stream, false);
                    return stream.ToArray();
                }
            }
        }

        public byte[] GeneratePdfFromMultipleImages(List<string> imagePaths)
        {
            using (var document = new PdfDocument())
            {
                foreach (var imagePath in imagePaths)
                {
                    var page = document.AddPage();
                    using (var xGraphics = XGraphics.FromPdfPage(page))
                    {
                        using (var image = XImage.FromFile(imagePath))
                        {
                            page.Width = image.PointWidth;
                            page.Height = image.PointHeight;
                            xGraphics.DrawImage(image, 0, 0, image.PointWidth, image.PointHeight);
                        }
                    }
                }

                using (var stream = new MemoryStream())
                {
                    document.Save(stream, false);
                    return stream.ToArray();
                }
            }
        }


        public byte[] GeneratePdf(string imagePath, string fileName)
        {
            try
            {
                if (!File.Exists(imagePath))
                {
                    _logger.LogError($"⚠️ Bildet ble ikke funnet: {imagePath}");
                    throw new FileNotFoundException("Bildet ble ikke funnet.", imagePath);
                }

                _logger.LogInformation($"✅ Genererer PDF fra bildet: {imagePath}");

                using (var document = new PdfDocument())
                {
                    var page = document.AddPage();
                    using (var graphics = XGraphics.FromPdfPage(page))
                    {
                        using (var imageStream = File.OpenRead(imagePath))
                        {
                            var image = XImage.FromStream(() => imageStream);

                            // Sjekk at bildet ikke er tomt
                            if (image.PixelWidth == 0 || image.PixelHeight == 0)
                            {
                                throw new Exception($"🚨 Bildet har ugyldige dimensjoner! {imagePath}");
                            }

                            double width = page.Width;
                            double height = (image.PixelHeight * width) / image.PixelWidth;

                            graphics.DrawImage(image, 0, 0, width, height);
                        }
                    }

                    using (var memoryStream = new MemoryStream())
                    {
                        document.Save(memoryStream);
                        _logger.LogInformation("✅ PDF generert og lagret i minne!");
                        return memoryStream.ToArray();
                    }
                }

               
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"🚨 Feil ved generering av PDF: {ex.Message}");
                throw;
            }
        }
         


    }
}
