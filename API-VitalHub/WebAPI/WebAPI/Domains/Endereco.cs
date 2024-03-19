using System;
using System.Collections.Generic;

namespace WebAPI.Domains;

public partial class Endereco
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public string? Cep { get; set; }

    public string? Logradouro { get; set; }

    public int? Numero { get; set; }

    public virtual ICollection<Paciente> Pacientes { get; set; } = new List<Paciente>();
}
