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
            try
            {
                Medico medicoBuscado = ctx.Medicos
                    .Include(x => x.Endereco)
                    .FirstOrDefault(x => x.Id == Id)!;


                if (medicoBuscado == null) return null!;

                //if (medico.Foto != null)
                //    medicoBuscado.IdNavigation.Foto = medico.Foto;

                if (medico.EspecialidadeId != null)
                    medicoBuscado.EspecialidadeId = medico.EspecialidadeId;

                if (medico.Crm != null)
                    medicoBuscado.Crm = medico.Crm;

                if (medico.Logradouro != null)
                    medicoBuscado.Endereco!.Logradouro = medico.Logradouro;

                if (medico.Numero != null)
                    medicoBuscado.Endereco!.Numero = medico.Numero;

                if (medico.Cep != null)
                    medicoBuscado.Endereco!.Cep = medico.Cep;

                if (medico.Cidade != null)
                    medicoBuscado.Endereco!.Cidade = medico.Cidade;

                ctx.Medicos.Update(medicoBuscado);
                ctx.SaveChanges();

                return medicoBuscado;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Consulta> BuscarPorData(DateTime dataConsulta, Guid idMedico)
        {
            try
            {
                return ctx.Consultas
                     .Include(x => x.Situacao)
                     .Include(x => x.Prioridade)
                     .Include(x => x.MedicoClinica)
                     .Include(x => x.Paciente!.IdNavigation)

                     // diferença em dias entre a Data da Consulta e a dataConsulta é igual a 0.
                     .Where(x => x.MedicoClinica!.MedicoId == idMedico && EF.Functions.DateDiffDay(x.DataConsulta, dataConsulta) == 0)
                     .ToList();

            }
            catch (Exception)
            {
                throw;
            }
        }

        public Medico BuscarPorId(Guid Id)
        {
            try
            {
                Medico medicoBuscado = ctx.Medicos
                    .Include(m => m.IdNavigation)
                    .Include(m => m.Endereco)
                    .FirstOrDefault(m => m.Id == Id)!;

                return medicoBuscado;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Medico> ListarTodos()
        {
            try
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
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(Usuario user)
        {
            try
            {
                user.Senha = Criptografia.GerarHash(user.Senha!);
                ctx.Usuarios.Add(user);
                ctx.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Medico> ListarPorClinica(Guid id)
        {
            try
            {

                List<Medico> medicos = ctx.MedicosClinicas

                    .Where(mc => mc.ClinicaId == id)

                    .Select(mc => new Medico
                    {
                        Id = mc.Id,
                        Crm = mc.Medico!.Crm,
                        Especialidade = mc.Medico.Especialidade,

                        IdNavigation = new Usuario
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
            catch (Exception)
            {
                throw;
            }
        }
    }
}
