using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;

namespace WebAPI.Repositories
{
    public class ClinicaRepository : IClinicaRepository
    {
        public VitalContext ctx = new VitalContext();
        public Clinica BuscarPorId(Guid id)
        {
            return ctx.Clinicas
                .Select(c => new Clinica
                {
                    Id = id,
                    NomeFantasia = c.NomeFantasia,
                    Endereco = c.Endereco
                })
                .FirstOrDefault(c => c.Id == id)!;
        }

        public void Cadastrar(Clinica clinica)
        {
            ctx.Clinicas.Add(clinica);
            ctx.SaveChanges();
        }

        public List<Clinica> Listar()
        {
            return ctx.Clinicas
                .Select(c => new Clinica
                {
                    Id = c.Id,
                    NomeFantasia = c.NomeFantasia,
                    Endereco = c.Endereco
                })
                .ToList();
        }

        public List<Clinica> ListarPorCidade(string cidade)
        {
            return ctx.Clinicas
                .Select(c => new Clinica
                {
                    Id = c.Id,
                    NomeFantasia = c.NomeFantasia,
                    Endereco = c.Endereco
                })
                
               .Where(c => c.Endereco!.Cidade == cidade)
                .ToList();
        }
    }
}
