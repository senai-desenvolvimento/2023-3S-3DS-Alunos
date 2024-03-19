using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using WebAPI.Domains;

namespace WebAPI.Contexts;

public partial class VitalContext : DbContext
{
    public VitalContext()
    {
    }

    public VitalContext(DbContextOptions<VitalContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Clinica> Clinicas { get; set; }

    public virtual DbSet<Consulta> Consultas { get; set; }

    public virtual DbSet<Endereco> Enderecos { get; set; }

    public virtual DbSet<Especialidade> Especialidades { get; set; }

    public virtual DbSet<Exame> Exames { get; set; }

    public virtual DbSet<Medico> Medicos { get; set; }

    public virtual DbSet<MedicosClinica> MedicosClinicas { get; set; }

    public virtual DbSet<NiveisPrioridade> NiveisPrioridades { get; set; }

    public virtual DbSet<Paciente> Pacientes { get; set; }

    public virtual DbSet<Receita> Receitas { get; set; }

    public virtual DbSet<Situaco> Situacoes { get; set; }

    public virtual DbSet<TiposUsuario> TiposUsuarios { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=DESKTOP-B541VSR; initial catalog=VitalHub; Trusted_Connection=True; Integrated Security=true; TrustServerCertificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Clinica>(entity =>
        {
            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
            entity.Property(e => e.Cnpj)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("CNPJ");
            entity.Property(e => e.Email)
                .HasMaxLength(225)
                .IsUnicode(false);
            entity.Property(e => e.Latitude).HasColumnType("decimal(8, 6)");
            entity.Property(e => e.Longitude).HasColumnType("decimal(9, 6)");
            entity.Property(e => e.NomeFantasia)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.RazaoSocial)
                .HasMaxLength(150)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Consulta>(entity =>
        {
            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
            entity.Property(e => e.DataConsulta).HasColumnType("datetime");
            entity.Property(e => e.Descricao).HasColumnType("text");
            entity.Property(e => e.Diagnostico).HasColumnType("text");
            entity.Property(e => e.MedicoClinicaId).HasColumnName("MedicoClinicaID");
            entity.Property(e => e.PacienteId).HasColumnName("PacienteID");
            entity.Property(e => e.PrioridadeId).HasColumnName("PrioridadeID");
            entity.Property(e => e.ReceitaId).HasColumnName("ReceitaID");
            entity.Property(e => e.SituacaoId).HasColumnName("SituacaoID");

            entity.HasOne(d => d.MedicoClinica).WithMany(p => p.Consulta)
                .HasForeignKey(d => d.MedicoClinicaId)
                .HasConstraintName("FK_Consultas_MedicosClinicas");

            entity.HasOne(d => d.Paciente).WithMany(p => p.Consulta)
                .HasForeignKey(d => d.PacienteId)
                .HasConstraintName("FK_Consultas_Pacientes");

            entity.HasOne(d => d.Prioridade).WithMany(p => p.Consulta)
                .HasForeignKey(d => d.PrioridadeId)
                .HasConstraintName("FK_Consultas_NiveisPrioridade");

            entity.HasOne(d => d.Receita).WithMany(p => p.Consulta)
                .HasForeignKey(d => d.ReceitaId)
                .HasConstraintName("FK_Consultas_Receitas");

            entity.HasOne(d => d.Situacao).WithMany(p => p.Consulta)
                .HasForeignKey(d => d.SituacaoId)
                .HasConstraintName("FK_Consultas_Situacoes");
        });

        modelBuilder.Entity<Endereco>(entity =>
        {
            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
            entity.Property(e => e.Cep)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("CEP");
            entity.Property(e => e.Logradouro)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Especialidade>(entity =>
        {
            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
            entity.Property(e => e.Especialidade1)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Especialidade");
        });

        modelBuilder.Entity<Exame>(entity =>
        {
            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
            entity.Property(e => e.ConsultaId).HasColumnName("ConsultaID");
            entity.Property(e => e.Descricao).HasColumnType("text");
            entity.Property(e => e.Titulo)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.Consulta).WithMany(p => p.Exames)
                .HasForeignKey(d => d.ConsultaId)
                .HasConstraintName("FK_Exames_Consultas");
        });

        modelBuilder.Entity<Medico>(entity =>
        {
            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
            entity.Property(e => e.Crm)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("CRM");
            entity.Property(e => e.EspecialidadeId).HasColumnName("EspecialidadeID");

            entity.HasOne(d => d.Especialidade).WithMany(p => p.Medicos)
                .HasForeignKey(d => d.EspecialidadeId)
                .HasConstraintName("FK_Medicos_Especialidades");

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.Medico)
                .HasForeignKey<Medico>(d => d.Id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Medicos_Usuarios");
        });

        modelBuilder.Entity<MedicosClinica>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_MedicoClinica");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
            entity.Property(e => e.ClinicaId).HasColumnName("ClinicaID");
            entity.Property(e => e.MedicoId).HasColumnName("MedicoID");

            entity.HasOne(d => d.Clinica).WithMany(p => p.MedicosClinicas)
                .HasForeignKey(d => d.ClinicaId)
                .HasConstraintName("FK_MedicosClinicas_Clinicas");

            entity.HasOne(d => d.Medico).WithMany(p => p.MedicosClinicas)
                .HasForeignKey(d => d.MedicoId)
                .HasConstraintName("FK_MedicosClinicas_Medicos");
        });

        modelBuilder.Entity<NiveisPrioridade>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_NiveisPrioridade_1");

            entity.ToTable("NiveisPrioridade");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
        });

        modelBuilder.Entity<Paciente>(entity =>
        {
            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
            entity.Property(e => e.Cpf)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("CPF");
            entity.Property(e => e.DataNascimento).HasColumnType("date");
            entity.Property(e => e.EnderecoId).HasColumnName("EnderecoID");
            entity.Property(e => e.Rg)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("RG");

            entity.HasOne(d => d.Endereco).WithMany(p => p.Pacientes)
                .HasForeignKey(d => d.EnderecoId)
                .HasConstraintName("FK_Pacientes_Enderecos");

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.Paciente)
                .HasForeignKey<Paciente>(d => d.Id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Pacientes_Usuarios");
        });

        modelBuilder.Entity<Receita>(entity =>
        {
            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
            entity.Property(e => e.Medicamento)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Observacoes).HasColumnType("text");
        });

        modelBuilder.Entity<Situaco>(entity =>
        {
            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
            entity.Property(e => e.Situacao)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TiposUsuario>(entity =>
        {
            entity.ToTable("TiposUsuario");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
            entity.Property(e => e.TipoUsuario)
                .HasMaxLength(10)
                .IsFixedLength();
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Foto)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Nome)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Senha)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.TipoUsuarioId).HasColumnName("TipoUsuarioID");

            entity.HasOne(d => d.TipoUsuario).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.TipoUsuarioId)
                .HasConstraintName("FK_Usuarios_TiposUsuario");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
