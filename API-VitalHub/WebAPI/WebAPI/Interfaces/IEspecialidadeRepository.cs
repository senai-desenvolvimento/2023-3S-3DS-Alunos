using WebAPI.Domains;

namespace WebAPI.Interfaces
{
    public interface IEspecialidadeRepository
    {
        public void Cadastrar(Especialidade especialdiade);

        public List<Especialidade> Listar();

        public Especialidade BuscarPorId(Guid id);
    }
}
