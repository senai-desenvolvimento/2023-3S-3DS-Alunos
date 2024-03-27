using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Repositories;
using WebAPI.ViewModels;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PacientesController : ControllerBase
    {
        private IPacienteRepository pacienteRepository { get; set; }

        public PacientesController()
        {
            pacienteRepository = new PacienteRepository();
        }

        [Authorize]
        [HttpGet("ConsultasAgendadas")]
        public IActionResult BuscarAgendadas()
        {
            Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

            return Ok(pacienteRepository.BuscarAgendadas(idUsuario));
        }

        [Authorize]
        [HttpGet("ConsultasRealizadas")]
        public IActionResult BuscarRealizadas()
        {
            Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

            return Ok(pacienteRepository.BuscarRealizadas(idUsuario));
        }

        [Authorize]
        [HttpGet("ConsultasCanceladas")]
        public IActionResult BuscarCanceladas()
        {
            Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

            return Ok(pacienteRepository.BuscarRealizadas(idUsuario));
        }

        [HttpGet("PerfilLogado")]
        public IActionResult BuscarLogado()
        {
            Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

            return Ok(pacienteRepository.BuscarPorId(idUsuario));
        }

        //[Authorize]
        [HttpGet("BuscarPorId")]
        public IActionResult BuscarPorId(Guid id)
        {
            return Ok(pacienteRepository.BuscarPorId(id));
        }

        [HttpPost]
        public IActionResult Post(PacienteViewModel pacienteModel)
        {
            Usuario user = new Usuario();

            user.Nome = pacienteModel.Nome;
            user.Email = pacienteModel.Email;
            user.TipoUsuarioId = pacienteModel.IdTipoUsuario;
            user.Foto = pacienteModel.Foto;
            user.Senha = pacienteModel.Senha;

            user.Paciente = new Paciente();

            user.Paciente.DataNascimento = pacienteModel.DataNascimento;
            user.Paciente.Rg = pacienteModel.Rg;
            user.Paciente.Cpf = pacienteModel.Cpf;

            user.Paciente.Endereco = new Endereco();

            user.Paciente.Endereco.Logradouro = pacienteModel.Logradouro;
            user.Paciente.Endereco.Numero = pacienteModel.Numero;
            user.Paciente.Endereco.Cep = pacienteModel.Cep;
            user.Paciente.Endereco.Cidade = pacienteModel.Cidade;

            pacienteRepository.Cadastrar(user);

            return Ok();
        }

        [HttpGet("BuscarPorData")]
        public IActionResult BuscarPorData(DateTime data, Guid id)
        {
            return Ok(pacienteRepository.BuscarPorData(data,id));
        }
    }
}
