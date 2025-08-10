using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;

namespace BCF.TimeEntryApp.Web.Controllers
{
	public class HomeController : Controller
	{
		private readonly IHostingEnvironment hostingEnvironment;
		private string folderName = "Upload";

		public HomeController(IHostingEnvironment hostingEnvironment)
		{
			this.hostingEnvironment = hostingEnvironment;
		}

		public IActionResult Index()
		{
			return View();
		}

		[HttpPost("/Home/SubmitFile")]
		public async Task<ActionResult> SubmitFile(IFormFile file, string Dokumentasjon)
		{
			try
			{
				//// Todo: Validation
				//// Todo: check file-content
				string webRootPath = hostingEnvironment.WebRootPath;
				string fileLandingPath = Path.Combine(webRootPath, folderName + @"\" + Dokumentasjon);

				StreamReader stream = new StreamReader(file.OpenReadStream());

				if (!Directory.Exists(fileLandingPath))
				{
					Directory.CreateDirectory(fileLandingPath);
				}

				string filePath = string.Format("{0}\\{1}{2}", fileLandingPath, 
					Path.GetFileNameWithoutExtension(file.FileName), Path.GetExtension(file.FileName));

				using (var fileStream = new FileStream(filePath, FileMode.Create))
				{
					await file.CopyToAsync(fileStream);
				}

				var jsonResult = Json(new { status = "OK"});
				return jsonResult;
			}
			catch (Exception ex)
			{
				return Json(new { status = "Error", message = ex.Message });
			}
		}
	}
}
