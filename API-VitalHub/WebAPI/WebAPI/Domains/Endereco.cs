using System;
using System.Collections.Generic;

namespace WebAPI.Domains;

public partial class Endereco
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public string? Cep { get; set; }

    public string? Logradouro { get; set; }

    public int? Numero { get; set; }

    public decimal? Longitude { get; set; }

    public decimal? Latitude { get; set; }

    public string? Cidade { get; set; }

    public virtual ICollection<Clinica> Clinicas { get; set; } = new List<Clinica>();

    public virtual ICollection<Medico> Medicos { get; set; } = new List<Medico>();

    public virtual ICollection<Paciente> Pacientes { get; set; } = new List<Paciente>();
}
