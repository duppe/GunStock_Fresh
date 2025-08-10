using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GunStock_One.Data
{
    [Table("GunStock_LogOn")]
    public class LogOn
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        public int? FirmID { get; set; }

        [Column(TypeName = "VARCHAR(255)")]
        public string? ClientIP { get; set; }

        public int? ClientLevel { get; set; }

        [Column(TypeName = "VARCHAR(255)")]
        public string? ClientOnline { get; set; }

        [Column(TypeName = "VARCHAR(255)")]
        public string? ClientTimeIdle { get; set; }

        // 🎯 Endret fra `string` til `DateTime?`
        public DateTime? ClientPing { get; set; }
        public DateTime? ClientStart { get; set; }
        public DateTime? ClientLastSeen { get; set; }
        public DateTime? ClientUpdated { get; set; }
        public DateTime? ClinetEnd { get; set; }

        public int? ClientChangePassword { get; set; }

        [Column(TypeName = "VARCHAR(255)")]
        public string? ClientLevelText { get; set; }

        [Column(TypeName = "VARCHAR(255)")]
        public string? ClientPassword { get; set; }

        [Column(TypeName = "VARCHAR(255)")]
        public string? ClientSessionPassword { get; set; }

        [Column(TypeName = "VARCHAR(255)")]
        public string? ClientName { get; set; }

        [Column(TypeName = "VARCHAR(255)")]
        public string? ClientEmail { get; set; }

        [Column(TypeName = "VARCHAR(255)")]
        public string? ClientSessionID { get; set; }

        public int? ClientTimeOutValue { get; set; }

        [Column(TypeName = "VARCHAR(255)")]
        public string? ClientUrl { get; set; }

        [Column(TypeName = "VARCHAR(255)")]
        public string? ClinetEnable { get; set; }

        [Column(TypeName = "VARCHAR(255)")]
        public string? ByUser { get; set; }

        public bool? OverLord { get; set; } // 🎯 `bit(1)` konverteres til `bool`
    }
}
