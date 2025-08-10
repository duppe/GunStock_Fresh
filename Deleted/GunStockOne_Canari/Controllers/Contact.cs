using Microsoft.AspNetCore.Mvc;

namespace GunStockOne_Canari.Controllers
{
    public class Contact : Controller
    {
       /*
        public IActionResult Index()
        {
            return View();
        }
       */ 

        public string[] Get()
        {
            return new string[]
            {
        "Hello",
        "World"
            };
        }
    }

}
