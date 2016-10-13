using Gama.TeamSixInfoPrice.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Gama.TeamSixInfoPrice.Web.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Index(Person person) {
            if (ModelState.IsValid)
            {
                if (person.User.Equals("admin") && person.Password.Equals("admin"))
                {
                    return View("Dashboard");
                }
                else
                {
                    ModelState.AddModelError("Erro" ,"Usuário ou senha inválidos.");
                    return View("Index", person);
                }
                
            }
            return View("Index", person);

        }

        public ActionResult Dashboard() {

            return View();
        }

        public ActionResult Sortimento()
        {

            return View();
        }

        public ActionResult HistoricoPrecos()
        {
            return View();
        }

        public ActionResult CompararProduto()
        {
            return View();
        }

        public ActionResult PrecoProduto()
        {
            return View();
        }

        public ActionResult SugeridoPraticado()
        {
            return View();
        }

        public ActionResult ComparativoGeral()
        {
            return View();
        }

        public ActionResult PromocaoConcorrencia()
        {
            return View();
        }
    }
}