using System;
using System.Collections.Generic;

namespace WebAPI.Domains;

public partial class Paciente
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public DateTime? DataNascimento { get; set; }

    public string? Rg { get; set; }

    public string? Cpf { get; set; }

    public Guid? EnderecoId { get; set; }

    public virtual ICollection<Consulta> Consulta { get; set; } = new List<Consulta>();

    public virtual Endereco? Endereco { get; set; }

    public virtual Usuario IdNavigation { get; set; } = null!;
}
