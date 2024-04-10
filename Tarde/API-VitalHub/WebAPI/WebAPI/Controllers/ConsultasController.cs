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
    public class ConsultasController : ControllerBase
    {

        private IConsultaRepository consultaRepository;

        public ConsultasController()
        {
            consultaRepository = new ConsultaRepository();
        }

        [Authorize]
        [HttpGet("ConsultasPaciente")]
        public IActionResult GetByIdPatient()
        {
            try
            {
                Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                List<Consulta> consultas = consultaRepository.ListarPorPaciente(idUsuario);
                return Ok(consultas);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Medico")]
        [HttpGet("ConsultasMedico")]
        public IActionResult GetByIdDoctor()
        {
            try
            {
                Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                List<Consulta> consultas = consultaRepository.ListarPorMedico(idUsuario);
                return Ok(consultas);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("Cadastrar")]
        public IActionResult Post(ConsultaViewModel consultaViewModel)
        {
            try
            {
                Consulta consulta = new Consulta();

                consulta.SituacaoId = consultaViewModel.SituacaoId;
                consulta.PacienteId = consultaViewModel.PacienteId;
                consulta.MedicoClinicaId = consultaViewModel.MedicoClinicaId;

                consulta.Receita = new Receita();

                consulta.PrioridadeId = consultaViewModel.PrioridadeId;
                consulta.DataConsulta = consultaViewModel.DataConsulta;
                consulta.Descricao = consultaViewModel.Descricao;
                consulta.Diagnostico = consultaViewModel.Diagnostico;

                consultaRepository.Cadastrar(consulta);

                return StatusCode(201, consulta);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Status")]
        public IActionResult UpdateStatus(Guid idConsulta, string status)
        {
            try
            {
                consultaRepository.EditarStatus(idConsulta, status);

                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Prontuario")]
        public IActionResult UpdateMedicalRecord(ProntuarioViewModel prontuarioviewModel)
        {
            try
            {
                Consulta consulta = consultaRepository.BuscarPorId(prontuarioviewModel.ConsultaId);

                consulta.Descricao = prontuarioviewModel.Descricao;

                consulta.Diagnostico = prontuarioviewModel.Diagnostico;

                if (consulta.ReceitaId != null && prontuarioviewModel.Medicamento != null)
                {
                    consulta.Receita!.Medicamento = prontuarioviewModel.Medicamento;
                }
                if (consulta.ReceitaId == null && prontuarioviewModel.Medicamento != null)
                {

                    Receita receita = new Receita
                    {
                        Medicamento = prontuarioviewModel.Medicamento
                    };

                    consulta.Receita = receita;
                }

                consultaRepository.EditarProntuario(consulta);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("BuscarPorId")]
        public IActionResult GetById(Guid id)
        {
            try
            {
                Consulta consultaBuscada = consultaRepository.BuscarPorId(id);

                return Ok(consultaBuscada);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}