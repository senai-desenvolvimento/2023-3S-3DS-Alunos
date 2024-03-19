using Microsoft.Identity.Client;
using WebAPI.Domains;

namespace WebAPI.Interfaces
{
    public interface IConsultaRepository
    {
        public void Cadastrar(Consulta consulta);

        public Consulta BuscarPorId(Guid id);

        public void EditarStatus(Consulta consulta);
        public void EditarProntuario(Consulta consulta);

        public List<Consulta> ListarTodos();
        public List<Consulta> ListarPorMedico(Guid IdMedico);
        public List<Consulta> ListarPorPaciente(Guid IdPaciente);
        
    }
}
