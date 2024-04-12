using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata.Ecma335;
using System.Text.Json.Serialization;
using WebAPI.Domains;

namespace WebAPI.ViewModels
{
    public class PacienteViewModel
    {
        public string? Rg { get; set; }

        public string? Cpf { get; set; }

        public DateTime? DataNascimento { get; set; }

        public string? Cep { get; set; }

        public string? Logradouro { get; set; }

        public int? Numero { get; set; }

        public string? Cidade { get; set; }

        public string? Nome { get; set; }

        public string? Email { get; set; }

        public string? Senha { get; set; }

        public Guid IdTipoUsuario { get; set; }

        [NotMapped]
        [JsonIgnore]
        public IFormFile? Arquivo { get; set; }

        public string? Foto { get; set; }
    }
}