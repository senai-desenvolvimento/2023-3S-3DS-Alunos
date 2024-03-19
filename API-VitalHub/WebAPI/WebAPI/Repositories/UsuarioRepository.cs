using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Utils;

namespace WebAPI.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        VitalContext ctx = new VitalContext();

        public bool AlterarSenha(Guid Id, string senhaAntiga, string senhaNova)
        {
            var user = ctx.Usuarios.FirstOrDefault(x => x.Id == Id);

            if (user == null) return false;

            if (!Criptografia.CompararHash(user.Senha, senhaAntiga)) return false;
            user.Senha = Criptografia.GerarHash(senhaNova);
            ctx.Update(user);
            ctx.SaveChanges();


            return true;

        }

        

        public Usuario BuscarPorEmailESenha(string email, string senha)
        {
           // var user = ctx.Usuarios.FirstOrDefault
               // (x => x.Email== email);

            var user = ctx.Usuarios.Select(u => new Usuario
            {
                Id = u.Id,
                Email = u.Email,
                Senha = u.Senha,
                Nome =  u.Nome,
                TipoUsuario = new TiposUsuario
                {
                    Id = u.TipoUsuario.Id,
                    TipoUsuario = u.TipoUsuario.TipoUsuario
                }
            }).FirstOrDefault
                (x => x.Email == email);

            if (user == null) return null;

            // var senhaInformada = Criptografia.GerarHash(senha);

             if (!Criptografia.CompararHash(senha, user.Senha)) return null;

            // if (!Criptografia.CompararHash(user.Senha, senhaInformada)) return null;

            return user;
            
        }

        public Usuario BuscarPorId(Guid id)
        {
            return ctx.Usuarios.FirstOrDefault(x => x.Id == id);
        }

        public void Cadastrar(Usuario usuario)
        {
            usuario.Senha = Criptografia.GerarHash(usuario.Senha);
            ctx.Add(usuario);
            ctx.SaveChanges();

        }
    }
}
