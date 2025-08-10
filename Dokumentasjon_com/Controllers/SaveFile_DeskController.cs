using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

[ApiController]
[Route("api/[controller]")]
public class SaveFileController : ControllerBase
{
    private readonly ILogger<SaveFileController> _logger;
    private readonly IWebHostEnvironment _env;

    public SaveFileController(ILogger<SaveFileController> logger, IWebHostEnvironment env)
    {
        _logger = logger;
        _env = env;
    }

    [HttpPost("upload-multiple")]
    [RequestSizeLimit(512_000_000)] // f.eks. 512 MB
    [RequestFormLimits(MultipartBodyLengthLimit = 512_000_000)]
    public async Task<IActionResult> UploadMultiple(
        [FromForm] string vareNummer,
        [FromForm] string FirmID,
        [FromForm] string ClientEmail,
        [FromForm] List<IFormFile> files)
    {
        if (files == null || files.Count == 0)
            return BadRequest("Ingen filer mottatt.");

        // Velg en lagringsmappe – juster etter ditt behov
        var basePath = Path.Combine(_env.ContentRootPath, "Uploaded", Sanitize(FirmID), Sanitize(vareNummer));
        Directory.CreateDirectory(basePath);

        var uploaded = new List<string>();
        foreach (var file in files)
        {
            if (file.Length <= 0) continue;

            // Unngå path traversal
            var safeName = Path.GetFileName(file.FileName);
            var targetPath = Path.Combine(basePath, $"{DateTime.UtcNow:yyyyMMdd_HHmmssfff}_{safeName}");

            using (var stream = System.IO.File.Create(targetPath))
                await file.CopyToAsync(stream);

            uploaded.Add(Path.GetFileName(targetPath));
            _logger.LogInformation("Lagret {File} for {FirmID}/{Vare}", targetPath, FirmID, vareNummer);
        }

        return Ok(new { vareNummer, FirmID, ClientEmail, uploaded });
    }

    private static string Sanitize(string input)
    {
        if (string.IsNullOrWhiteSpace(input)) return "NA";
        foreach (var c in Path.GetInvalidFileNameChars())
            input = input.Replace(c, '_');
        return input.Trim();
    }
}
