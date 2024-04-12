using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;

namespace WebAPI.Repositories
{
    public class ConsultaRepository : IConsultaRepository
    {

        public VitalContext ctx = new VitalContext();

        public Consulta BuscarPorId(Guid id)
        {
            try
            {
                return ctx.Consultas
                    .Include(x => x.Exames)
                    .Include(x => x.MedicoClinica!.Medico!.Especialidade)
                    .Include(x => x.MedicoClinica!.Medico!.IdNavigation)
                    .Include(x => x.Paciente!.IdNavigation)
                    .Include(x => x.Prioridade)
                    .Include(x => x.Situacao)
                    .Include(x => x.Receita)
                    .FirstOrDefault(x => x.Id == id)!;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(Consulta clinica)
        {
            ctx.Consultas.Add(clinica);
            ctx.SaveChanges();
        }

        public void EditarProntuario(Consulta consulta)
        {
            try
            {
                Consulta buscada = ctx.Consultas.Find(consulta.Id)!;

                buscada.Descricao = consulta.Descricao;
                buscada.Diagnostico = consulta.Diagnostico;

                if (buscada.ReceitaId != null)
                {
                    buscada.Receita = consulta.Receita;

                }
                else
                {
                    ctx.Add(consulta.Receita);
                }

                ctx.Update(buscada);
                ctx.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
        }

        public void EditarStatus(Guid idConsulta, string status)
        {
            try
            {
                SituacaoConsulta situacao = ctx.Situacoes.FirstOrDefault(x => x.Situacao == status)!;

                Consulta buscada = ctx.Consultas.Find(idConsulta)!;

                buscada.SituacaoId = situacao.Id;
                ctx.Update(buscada);
                ctx.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
        }


        public List<Consulta> ListarPorMedico(Guid IdMedico)
        {
            try
            {
                List<Consulta> listaConsultas = ctx.Consultas
                    .Include(x => x.Paciente!.IdNavigation)
                    .Include(x => x.Situacao)
                    .Include(x => x.Prioridade)
                    .Where(x => x.MedicoClinica != null && x.MedicoClinica.MedicoId == IdMedico)
                    .ToList();

                return listaConsultas;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Consulta> ListarPorPaciente(Guid IdPaciente)
        {
            try
            {
                List<Consulta> listaConsultas = ctx.Consultas
                    .Include(x => x.MedicoClinica!.Medico!.IdNavigation)
                    .Include(x => x.Situacao)
                    .Include(x => x.Prioridade)
                    .Where(x => x.PacienteId != null && x.PacienteId == IdPaciente)
                    .ToList();

                return listaConsultas;

            }
            catch (Exception)
            {
                throw;
            }
        } 

        public List<Consulta> ListarTodos()
        {
            return ctx.Consultas.ToList();
        }
    }
}
