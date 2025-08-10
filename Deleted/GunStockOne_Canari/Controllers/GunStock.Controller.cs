using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GunStockOne_Canari.Controllers
{
    public class GunStock : Controller
    {
        // GET: GunStock
        public ActionResult Index()
        {
            return View();
        }

        // GET: GunStock/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: GunStock/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: GunStock/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: GunStock/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: GunStock/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: GunStock/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: GunStock/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
