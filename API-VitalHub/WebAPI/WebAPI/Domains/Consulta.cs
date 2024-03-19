using System;
using System.Collections.Generic;

namespace WebAPI.Domains;

public partial class Consulta
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid? SituacaoId { get; set; }

    public Guid? PacienteId { get; set; }

    public Guid? MedicoClinicaId { get; set; }

    public Guid? ReceitaId { get; set; }

    public Guid? PrioridadeId { get; set; }

    public DateTime? DataConsulta { get; set; }

    public string? Descricao { get; set; }

    public string? Diagnostico { get; set; }

    public virtual ICollection<Exame> Exames { get; set; } = new List<Exame>();

    public virtual MedicosClinica? MedicoClinica { get; set; }

    public virtual Paciente? Paciente { get; set; }

    public virtual NiveisPrioridade? Prioridade { get; set; }

    public virtual Receita? Receita { get; set; }

    public virtual Situaco? Situacao { get; set; }
}
