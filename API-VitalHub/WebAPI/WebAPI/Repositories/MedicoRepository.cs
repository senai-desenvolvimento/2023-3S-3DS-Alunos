using Microsoft.EntityFrameworkCore;
using System.Linq;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Utils;
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
            //fazer logica para trazer medico e dados de seu usuario
            Medico medicoBuscado = ctx.Medicos.
                Include(m => m.IdNavigation).
                FirstOrDefault(m => m.Id == Id)!;

            return medicoBuscado;

        }

        public List<Medico> ListarTodos()
        {
            return ctx.Medicos.
                Include(m => m.IdNavigation)
                .Select(m => new Medico
                {
                    Id = m.Id,
                    Crm = m.Crm,
                    Especialidade = m.Especialidade,

                    
                    IdNavigation = new Usuario
                    {
                        Nome = m.IdNavigation.Nome,
                        Foto = m.IdNavigation.Foto
                    }
                })
                .ToList();
        }

        public void Cadastrar(Usuario user)
        {
            user.Senha = Criptografia.GerarHash(user.Senha!);
            ctx.Usuarios.Add(user);
            ctx.SaveChanges();
        }

        public List<Medico> ListarPorClinica(Guid id)
        {
            List<Medico> medicos = ctx.MedicosClinicas  
                
                .Where(mc => mc.ClinicaId == id)

                .Select(mc => new Medico
                {
                    Id=mc.Id,
                    Crm = mc.Medico!.Crm,
                    Especialidade = mc.Medico.Especialidade,
                    IdNavigation =new Usuario
                    {
                        Id = mc.Medico.IdNavigation.Id,
                        Nome = mc.Medico.IdNavigation.Nome,
                        Email = mc.Medico.IdNavigation.Email,
                        Foto = mc.Medico.IdNavigation.Foto
                    }
                })
                .ToList();

            return medicos;
        }
    }
}
