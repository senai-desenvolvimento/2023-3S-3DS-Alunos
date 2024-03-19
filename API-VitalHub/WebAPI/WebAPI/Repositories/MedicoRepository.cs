using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.ViewModels;

namespace WebAPI.Repositories
{
    
    public class MedicoRepository : IMedicoRepository
    {
        VitalContext ctx = new VitalContext();

        public Medico AtualizarPerfil(Guid Id, MedicoViewModel medico)
        {
            Medico medicoBuscado = ctx.Medicos.FirstOrDefault(x => x.Id == Id);

            if (medicoBuscado == null) return null;

            if (medico.Crm != null)
                medicoBuscado.Crm = medico.Crm;

            if (medico.EspecialidadeId != null)
                medicoBuscado.EspecialidadeId = medico.EspecialidadeId;

            if (medico.Senha != null)
                medicoBuscado.IdNavigation.Senha = medico.Senha;

            if (medico.Foto != null)
                medicoBuscado.IdNavigation.Foto = medico.Foto;

            ctx.Medicos.Update(medicoBuscado);
            ctx.SaveChanges();

            return medicoBuscado;   

        }

        public Medico BuscarPorId(Guid Id)
        {
            return ctx.Medicos.FirstOrDefault(x => x.Id == Id);
        }

        public List<Medico> ListarTodos()
        {
            return ctx.Medicos.ToList();
        }
    }
}
