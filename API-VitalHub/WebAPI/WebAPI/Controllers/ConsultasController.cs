using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Repositories;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultasController : ControllerBase
    {

        private IConsultaRepository consultaRepository;
        public ConsultasController()
        {
            consultaRepository = new ConsultaRepository();
        }

        [Authorize]
        [HttpGet]
        public IActionResult BuscarConsultasPaciente()
        {
            Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

            List<Consulta> consultas = consultaRepository.ListarPorPaciente(idUsuario);
            return Ok(consultas);
        }

        [Authorize(Roles ="Medico")]
        [HttpGet("ConsultasMedico")]
        public IActionResult BuscarConsultasMedico()
        {
            Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

            List<Consulta> consultas = consultaRepository.ListarPorMedico(idUsuario);
            return Ok(consultas);
        }

        [HttpPost("Cadastrar")]
        public IActionResult Cadastrar(Consulta consulta)
        {
            consultaRepository.Cadastrar(consulta);
            return StatusCode(201);
        }

        [HttpPut("Status")]
        public IActionResult EditarStatus(Consulta consulta)
        {
            consultaRepository.EditarStatus(consulta);
            return Ok();
        }

        [HttpPut("Prontuario")]
        public IActionResult EditarProntuario(Consulta consulta)
        {
            consultaRepository.EditarProntuario(consulta);
            return Ok();
        }
    }
}
