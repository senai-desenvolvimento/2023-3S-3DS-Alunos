using System.ComponentModel.DataAnnotations;

namespace WebAPI.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Informe o e-mail do usuário!")]
        public string? Email { get; set; }


        [Required(ErrorMessage = "Informe a senha do usuário!")]
        public string? Senha { get; set; }
    }
}
