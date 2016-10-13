using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Gama.TeamSixInfoPrice.Web.Models
{
    public class Person
    {
        [Required(ErrorMessage = "Usuário Inválido")]
        public string User { get; set; }
        [Required(ErrorMessage = "Senha Inválida")]
        public string Password { get; set; }
    }
}