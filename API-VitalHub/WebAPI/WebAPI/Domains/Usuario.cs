using System;
using System.Collections.Generic;

namespace WebAPI.Domains;

public partial class Usuario
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid? TipoUsuarioId { get; set; }

    public string? Nome { get; set; }

    public string? Email { get; set; }

    public string? Senha { get; set; }

    public string? Foto { get; set; }

    public virtual Medico? Medico { get; set; }

    public virtual Paciente? Paciente { get; set; }

    public virtual TiposUsuario? TipoUsuario { get; set; }
}
