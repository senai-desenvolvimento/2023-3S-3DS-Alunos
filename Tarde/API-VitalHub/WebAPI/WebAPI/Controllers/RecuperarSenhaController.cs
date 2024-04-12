using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Utils.Mail;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecuperarSenhaController : ControllerBase
    {
        private readonly VitalContext _context;
        private readonly EmailSendingService _emailSendingService;

        public RecuperarSenhaController(VitalContext context, EmailSendingService emailSendingService)
        {
            _context = context;
            _emailSendingService = emailSendingService;
        }

        [HttpPost]
        public async Task<IActionResult> SendRecoveryCodePassword(string email)
        {
            try
            {
                var user = await _context.Usuarios.FirstOrDefaultAsync(x => x.Email == email);

                if (user == null)
                {
                    return NotFound("Usuário não encontrado");
                }

                //gerar um código com 4 algarismos
                Random random = new Random();
                int recoveryCode = random.Next(1000, 9999);

                user.CodRecupSenha = recoveryCode;

                await _context.SaveChangesAsync();

                await _emailSendingService.SendRecovery(user.Email!, recoveryCode);

                return Ok("Código enviado com sucesso!");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> ValidatePasswordRecoveryCode(string email, int codigo)
        {
            try
            {
                var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == email);

                if(user == null)
                {
                    return NotFound("Usuário não encontrado!");
                }

                if (user.CodRecupSenha != codigo)
                {
                    return BadRequest("Código de recuperação inválido!");
                }

                user.CodRecupSenha = null;

                await _context.SaveChangesAsync();

                return Ok("Código de recuperação válido!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}