namespace WebAPI.ViewModels
{
    public class MedicoViewModel
    {
        public string? Nome { get; set; }

        public string? Email { get; set; }

        public DateTime DataNascimento { get; set; }

        public string? Senha { get; set; }

        public string? Foto { get; set; }

        public string? Cep { get; set; }

        public string? Logradouro { get; set; }

        public int? Numero { get; set; }

        public string? Cidade { get; set; }

        public Guid? EspecialidadeId { get; set; }

        public string? Crm { get; set; }

        public Guid? IdTipoUsuario { get; set; }
    }
}