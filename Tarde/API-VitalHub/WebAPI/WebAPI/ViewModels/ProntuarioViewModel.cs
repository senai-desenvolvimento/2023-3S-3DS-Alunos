namespace WebAPI.ViewModels
{
    public class ProntuarioViewModel
    {
        public Guid ConsultaId { get; set; }

        public string? Medicamento { get; set; }

        public string? Descricao { get; set; }

        public string? Diagnostico { get; set; }
    }
}
