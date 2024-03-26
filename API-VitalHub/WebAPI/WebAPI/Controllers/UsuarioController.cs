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
    public class UsuarioController : ControllerBase
    {
        private IUsuarioRepository usuarioRepository { get; set; }

        public UsuarioController()
        {
            usuarioRepository = new UsuarioRepository();
        }

        [Authorize]
        [HttpPut("AlterarSenha")]
        public IActionResult AlterarSenha(AlterarSenhaViewModel senhas)
        {
            Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

            bool correto = usuarioRepository.AlterarSenha(idUsuario, senhas.SenhaAntiga, senhas.SenhaNova);
            if (!correto)
                return Unauthorized("Senha incorreta");

            return Ok();
        }

        

    }
}
