using Microsoft.AspNetCore.Mvc;
using System.Net;

using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using IdanikaSoftware;
using System.Text;
using Org.BouncyCastle.Asn1.Ocsp;
using System;




[ApiController]
    [Route("api")]
    public class FtpController : ControllerBase
{
    private readonly ILogger<FtpController> _logger;
    private readonly IConfiguration _configuration;
    private readonly string _ftpServer;
    private readonly string _ftpUsername;
    private readonly string _ftpPassword;
    private readonly string _ftpRootFolder;

   

    public FtpController(ILogger<FtpController> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;

        _ftpServer = _configuration["FtpSettings:Server"];
        _ftpUsername = _configuration["FtpSettings:Username"];
        _ftpPassword = _configuration["FtpSettings:Password"];
        _ftpRootFolder = _configuration["FtpSettings:RootFolder"] ?? "Hyttetorget"; // Standard verdi
    }

    [HttpGet("getfolders")]
    public IActionResult GetFolders([FromQuery] string firmID)
    {
        /*
        if (!Duppe_SQL.SessionOK())
        {
            return Unauthorized("Session NOT OK");
        }
      */

        if (string.IsNullOrEmpty(firmID))
        {
            return BadRequest("FirmID mangler!");
        }

        try
        {
            string rootPath = $"{_ftpServer}/{firmID}";
            List<string> folders = ListFtpDirectories(rootPath);
            return Ok(folders);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Feil ved henting av mapper for FirmID {firmID}.");
            return StatusCode(500, "Kunne ikke hente mapper.");
        }
    }


    [HttpGet("getfiles")]
    public IActionResult GetFiles(string firmID,string folder)
    {
        try
        {
            string folderPath = $"{_ftpServer}/{firmID}/{folder}";
            List<string> files = DownloadFtpImages(folderPath, Path.Combine(firmID, folder));
            return Ok(files);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Feil ved henting av bilder fra FTP.");
            return StatusCode(500, "Kunne ikke hente bilder.");
        }
    }


    [HttpGet("Zendesk/{firmID}/{folder}/{filename}")]
    public IActionResult GetZendesk(string firmID, string folder, string filename)
    {


        try
        {
            // DuppeCommands.SendError("Henter bilde fra FTP: " + folder + "/" + filename);
            string filePath = Path.Combine("TempImages", firmID, folder, filename);
            if (System.IO.File.Exists(filePath))
            {
                var fileStream = System.IO.File.OpenRead(filePath);
                return File(fileStream, "image/jpeg");
            }
            else
            {
                string ftpfolderPath = $"{_ftpServer}/{firmID}/{folder}";
                string localfolderpath = Path.Combine(firmID, folder);
                DownloadFtpImages(ftpfolderPath, localfolderpath);

                try
                {
                    var fileStream = System.IO.File.OpenRead(filePath);
                    return File(fileStream, "image/jpeg");
                }

                catch (Exception ex)
                {
                    _logger.LogError(ex, "Feil ved henting av bilde. fra FTP");
                    return StatusCode(500, "Kunne ikke hente bilde fra FTP.");
                }
            }
            return NotFound();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Feil ved henting av bilde.");
            return StatusCode(500, "Kunne ikke hente bilde.");
        }
    }



    [HttpGet("images/{firmID}/{folder}/{filename}")]
    public IActionResult GetImage(string firmID, string folder, string filename)
    {
        

        try
        {
           // DuppeCommands.SendError("Henter bilde fra FTP: " + folder + "/" + filename);
            string filePath = Path.Combine("TempImages",firmID , folder, filename);
            if (System.IO.File.Exists(filePath))
            {
                var fileStream = System.IO.File.OpenRead(filePath);
                return File(fileStream, "image/jpeg");
            }
            else
            {
                string ftpfolderPath = $"{_ftpServer}/{firmID}/{folder}";
                string localfolderpath = Path.Combine(firmID, folder);
                DownloadFtpImages(ftpfolderPath, localfolderpath);

                try
                {
                    var fileStream = System.IO.File.OpenRead(filePath);
                    return File(fileStream, "image/jpeg");
                }

                catch (Exception ex)
                {
                    _logger.LogError(ex, "Feil ved henting av bilde. fra FTP");
                    return StatusCode(500, "Kunne ikke hente bilde fra FTP.");
                }
            }
                return NotFound();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Feil ved henting av bilde.");
            return StatusCode(500, "Kunne ikke hente bilde.");
        }
    }



    private List<string> ListFtpDirectories(string ftpPath)
    {
        FtpWebRequest request = (FtpWebRequest)WebRequest.Create(ftpPath);
        request.Method = WebRequestMethods.Ftp.ListDirectory;
        request.Credentials = new NetworkCredential(_ftpUsername, _ftpPassword);

        List<string> folders = new List<string>();

        using (FtpWebResponse response = (FtpWebResponse)request.GetResponse())
        using (StreamReader reader = new StreamReader(response.GetResponseStream()))
        {
            string line;
            while ((line = reader.ReadLine()) != null)
            {
                if (!line.Contains(".")) // Filtrer ut filer
                {
                    folders.Add(line);
                }
            }
        }
        return folders;
    }

    private List<string> DownloadFtpImages(string ftpFolderPath, string localFolder)
    {
        List<string> fileNames = new List<string>();
        string localFolderPath = Path.Combine("TempImages", localFolder);
        string thumbFolderPath = Path.Combine(localFolderPath, "thumbs");

        // Opprett mapper hvis de ikke finnes
        if (!Directory.Exists(localFolderPath))
        {
            Directory.CreateDirectory(localFolderPath);
        }
        if (!Directory.Exists(thumbFolderPath))
        {
            Directory.CreateDirectory(thumbFolderPath);
        }

        // Hent filnavn fra FTP
        FtpWebRequest request = (FtpWebRequest)WebRequest.Create(ftpFolderPath);
        request.Method = WebRequestMethods.Ftp.ListDirectory;
        request.Credentials = new NetworkCredential(_ftpUsername, _ftpPassword);

        using (FtpWebResponse response = (FtpWebResponse)request.GetResponse())
        using (StreamReader reader = new StreamReader(response.GetResponseStream()))
        {
            string line;
            while ((line = reader.ReadLine()) != null)
            {
                // Bare behandle filer som slutter med ".jpg" (case-insensitive)
                if (line.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase))
                {
                    string ftpFilePath = $"{ftpFolderPath}/{line}";
                    string localFilePath = Path.Combine(localFolderPath, line);
                    string thumbFilePath = Path.Combine(thumbFolderPath, line);

                    // Last kun ned hvis filen ikke finnes lokalt
                    if (!System.IO.File.Exists(localFilePath))
                    {
                        using (WebClient client = new WebClient())
                        {
                            client.Credentials = new NetworkCredential(_ftpUsername, _ftpPassword);
                            client.DownloadFile(ftpFilePath, localFilePath);
                        }
                    }

                    // Generer thumbnail hvis den ikke finnes
                    if (!System.IO.File.Exists(thumbFilePath))
                    {
                        using (var image = Image.Load(localFilePath))
                        {
                            image.Mutate(x => x.Resize(150, 150));
                            image.Save(thumbFilePath);
                        }
                    }

                    fileNames.Add(line); // Legg til kun filnavn
                }
            }
        }
        return fileNames;
    }


    [HttpGet("thumbnails/{firmID}/{folder}/{filename}")]
    public IActionResult GetThumbnail(string firmID, string folder, string filename)
    {
        try
        {
            string filePath = Path.Combine("TempImages", firmID, folder, "thumbs", filename);
            if (System.IO.File.Exists(filePath))
            {
                var fileStream = System.IO.File.OpenRead(filePath);
                return File(fileStream, "image/jpeg");
            }
            return NotFound();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Feil ved henting av thumbnail.");
            return StatusCode(500, "Kunne ikke hente thumbnail.");
        }
    }

    // ********************* upload text
    public class UploadTextRequest
    {
        public string Filename { get; set; }
        public string Content { get; set; }
        // Ny egenskap for å motta imageUrl fra frontend
        public string ImageUrl { get; set; }
    }

    // Hjelpemetode for å sjekke om filen finnes på FTP
    private async Task<bool> FileExistsAsync(string ftpPath)
    {
        try
        {
            FtpWebRequest request = (FtpWebRequest)WebRequest.Create(ftpPath);
            request.Method = WebRequestMethods.Ftp.GetFileSize;
            request.Credentials = new NetworkCredential(_ftpUsername, _ftpPassword);
            using FtpWebResponse response = (FtpWebResponse)await request.GetResponseAsync();
            return true;
        }
        catch (WebException ex)
        {
            var response = ex.Response as FtpWebResponse;
            if (response != null && response.StatusCode == FtpStatusCode.ActionNotTakenFileUnavailable)
            {
                return false;
            }
            throw;
        }
    }

    // Hjelpemetode for å slette en fil på FTP
    private async Task DeleteFileAsync(string ftpPath)
    {
        FtpWebRequest request = (FtpWebRequest)WebRequest.Create(ftpPath);
        request.Method = WebRequestMethods.Ftp.DeleteFile;
        request.Credentials = new NetworkCredential(_ftpUsername, _ftpPassword);
        using FtpWebResponse response = (FtpWebResponse)await request.GetResponseAsync();
    }




    public class RenameFileRequest
    {
        public string FilenameR { get; set; }
        public string Filename { get; set; }
        public string Content { get; set; }
        public string ImageUrl { get; set; }
        public string FolderPath { get; set; }
        public string OldFileName { get; set; }
        public string NewFileName { get; set; }
    }



    [HttpPost("renameFile")]
    public async Task<IActionResult> RenameFile([FromBody] RenameFileRequest request)
    {
        if (string.IsNullOrEmpty(request.FolderPath) ||
            string.IsNullOrEmpty(request.OldFileName) ||
            string.IsNullOrEmpty(request.NewFileName))
        {
            return BadRequest("Mappenavn, gammelt filnavn og nytt filnavn må være oppgitt.");
        }

        try
        {
            var ftpFilePath = $"{_ftpServer}/{request.ImageUrl}";
            var ftpNewFilePath = $"{request.Filename.Split('_')[0]}_{request.Filename.Split('_')[1]}_{request.Filename.Split('_')[2]}_{request.NewFileName}"; // Absolutt bane
            var FTPcomplete = $"{ftpFilePath.Substring(0, ftpFilePath.LastIndexOf('/') + 1)}{ftpNewFilePath}";
            _logger.LogInformation($"Forsøker å omdøpe filen fra: {ftpFilePath} til {ftpNewFilePath}");
            FtpWebRequest FTPrequest = (FtpWebRequest)WebRequest.Create(ftpFilePath);
            FTPrequest.Method = WebRequestMethods.Ftp.Rename;
            FTPrequest.Credentials = new NetworkCredential(_ftpUsername, _ftpPassword);
            FTPrequest.UsePassive = false; // Prøv aktiv modus
            FTPrequest.RenameTo = ftpNewFilePath;

            using (var response = (FtpWebResponse)await FTPrequest.GetResponseAsync())
            {
                _logger.LogInformation($"FTP-fil omdøpt: {request.OldFileName} -> {request.NewFileName}, Status: {response.StatusDescription}");
                Duppe_SQL.RunSQLNonQuery($"update dokumentasjon_eu_db.FilesOwner set FilesOwner_FileName = '{FTPcomplete}' where FilesOwner_FileName = '{ftpFilePath}'");
                //return Ok($"FTP-fil omdøpt: {request.OldFileName} -> {request.NewFileName}, Status: {response.StatusDescription}");
            }



            ftpFilePath = $"{_ftpServer}/{request.ImageUrl.Split('.')[0]}.txt";
            ftpNewFilePath = $"{request.Filename.Split('_')[0]}_{request.Filename.Split('_')[1]}_{request.Filename.Split('_')[2]}_{request.NewFileName.Split('.')[0]}.txt"; // Absolutt bane
            _logger.LogInformation($"Forsøker å omdøpe filen fra: {ftpFilePath} til {ftpNewFilePath}");
            FtpWebRequest FTPrequest_txt = (FtpWebRequest)WebRequest.Create(ftpFilePath);
            FTPrequest_txt.Method = WebRequestMethods.Ftp.Rename;
            FTPrequest_txt.Credentials = new NetworkCredential(_ftpUsername, _ftpPassword);
            FTPrequest_txt.UsePassive = false; // Prøv aktiv modus
            FTPrequest_txt.RenameTo = ftpNewFilePath;
            using (var response = (FtpWebResponse)await FTPrequest_txt.GetResponseAsync())
            {
                _logger.LogInformation($"FTP-fil omdøpt: {request.OldFileName} -> {request.NewFileName}, Status: {response.StatusDescription}");
              
                return Ok($"FTP-fil omdøpt: {request.OldFileName} -> {request.NewFileName}, Status: {response.StatusDescription}");

                 

            }

           

        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Feil ved omdøping av tekstfil på FTP.");
            return StatusCode(500, "Kunne ikke omdøpe tekstfil.");
        }
    }




    [HttpPost("upload-text")]
    public async Task<IActionResult> UploadTextFile([FromBody] UploadTextRequest request)
    {
        if (string.IsNullOrEmpty(request.Filename) || string.IsNullOrEmpty(request.Content))
        {
            return BadRequest("Filnavn og innhold kan ikke være tomt.");
        }

        // Konstruer ftpPath slik at filen lastes opp i samme mappe som bildet.
        string ftpPath = "";
        if (!string.IsNullOrEmpty(request.ImageUrl))
        {
            // Hent mappenavnet fra imageUrl ved å fjerne selve filnavnet
            int lastSlashIndex = request.ImageUrl.LastIndexOf('/');
            string directory = lastSlashIndex > -1 ? request.ImageUrl.Substring(0, lastSlashIndex) : "";
            ftpPath = $"{_ftpServer}/{(string.IsNullOrEmpty(directory) ? "" : directory + "/")}{request.Filename}";
        }
        else
        {
            ftpPath = $"{_ftpServer}/{request.Filename}";
        }

        byte[] fileContents = Encoding.UTF8.GetBytes(request.Content);

        try
        {
            // Slett eksisterende fil hvis den finnes
            if (await FileExistsAsync(ftpPath))
            {
                await DeleteFileAsync(ftpPath);
            }

            FtpWebRequest ftpRequest = (FtpWebRequest)WebRequest.Create(ftpPath);
            ftpRequest.Method = WebRequestMethods.Ftp.UploadFile;
            ftpRequest.Credentials = new NetworkCredential(_ftpUsername, _ftpPassword);
            ftpRequest.UseBinary = true;
            ftpRequest.ContentLength = fileContents.Length;

            using (Stream requestStream = await ftpRequest.GetRequestStreamAsync())
            {
                await requestStream.WriteAsync(fileContents, 0, fileContents.Length);
                await requestStream.FlushAsync();
            }

            using (FtpWebResponse response = (FtpWebResponse)await ftpRequest.GetResponseAsync())
            {
                return Ok(new { message = $"Fil {request.Filename} lastet opp til FTP ({response.StatusDescription})" });
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Feil under opplasting: {ex.Message}");
        }
    }


    [HttpGet("get-text")]
    public async Task<IActionResult> GetTextFile([FromQuery] string imageUrl, [FromQuery] string filename)
    {
        if (string.IsNullOrEmpty(filename))
        {
            return BadRequest("Filnavn mangler.");
        }

        // Konstruer FTP-stien slik at filen ligger i samme mappe som bildet.
        string ftpPath = "";
        if (!string.IsNullOrEmpty(imageUrl))
        {
            ftpPath = $"{_ftpServer}/{imageUrl.Split(".")[0].TrimEnd('/')}.txt";
        }
        else
        {
            ftpPath = $"{_ftpServer}/{filename}";
        }

        try
        {
            FtpWebRequest request = (FtpWebRequest)WebRequest.Create(ftpPath);
            request.Method = WebRequestMethods.Ftp.DownloadFile;
            request.Credentials = new NetworkCredential(_ftpUsername, _ftpPassword);

            using (FtpWebResponse response = (FtpWebResponse)await request.GetResponseAsync())
            using (Stream responseStream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(responseStream, Encoding.UTF8))
            {
                string fileContent = await reader.ReadToEndAsync();
                Response.ContentType = "text/plain"; // Sikrer at klienten forstår at dette er ren tekst
                return Ok(fileContent);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Feil ved henting av tekstfil fra FTP.");
            return StatusCode(500, "Kunne ikke hente tekstfil.");
        }
    }




}
