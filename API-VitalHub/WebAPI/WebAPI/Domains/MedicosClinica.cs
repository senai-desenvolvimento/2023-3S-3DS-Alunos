using System;
using System.Collections.Generic;

namespace WebAPI.Domains;

public partial class MedicosClinica
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid? ClinicaId { get; set; }

    public Guid? MedicoId { get; set; }

    public virtual Clinica? Clinica { get; set; }

    public virtual ICollection<Consulta> Consulta { get; set; } = new List<Consulta>();

    public virtual Medico? Medico { get; set; }
}
