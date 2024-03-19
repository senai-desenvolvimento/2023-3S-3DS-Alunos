using System.ComponentModel.DataAnnotations;

namespace WebAPI.ViewModels
{
    public class AlterarSenhaViewModel
    {
        [Required(ErrorMessage = "Informe a antiga senha do usuário")]
        public string? SenhaAntiga { get; set; }


        [Required(ErrorMessage = "Informe a nova senha do usuário")]
        public string? SenhaNova { get; set; }
    }
}
