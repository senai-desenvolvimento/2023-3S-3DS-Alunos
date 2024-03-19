using System;
using System.Collections.Generic;

namespace WebAPI.Domains;

public partial class Especialidade
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public string? Especialidade1 { get; set; }

    public virtual ICollection<Medico> Medicos { get; set; } = new List<Medico>();
}
