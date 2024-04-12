using System;
using System.Collections.Generic;

namespace WebAPI.Domains;

public partial class SituacaoConsulta
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public string? Situacao { get; set; }

    public virtual ICollection<Consulta> Consulta { get; set; } = new List<Consulta>();
}
