using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GunStock_One.Models
{
   
    public class Item
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }

        public int? Status { get; set; } = 1;

        public long? Kunde_ID { get; set; } = 0;

        [Column(TypeName = "VARCHAR(255)")]
        public string? Eier { get; set; } = "Butikk";

        [Column(TypeName = "VARCHAR(50)")]
        public string? StatusText { get; set; }

        public DateTime? Dato { get; set; }

        public DateTime? DatoOprettet { get; set; } = DateTime.UtcNow;

        public DateTime? DateOppdatert { get; set; } = DateTime.UtcNow;

        [Column(TypeName = "TEXT")]
        public string? Leverandor { get; set; }

        [Required]
        [Column(TypeName = "TEXT")]
        public string Serienummer { get; set; } = string.Empty;

        [Column(TypeName = "TEXT")]
        public string? Mekanisme { get; set; }

        [Column(TypeName = "TEXT")]
        public string? Merke { get; set; }

        [Column(TypeName = "TEXT")]
        public string? Modell { get; set; }

        [Column(TypeName = "TEXT")]
        public string? Caliber { get; set; }

        [Column(TypeName = "TEXT")]
        public string? LopLengde { get; set; }

        [Column(TypeName = "TEXT")]
        public string? ByUser { get; set; }

        public DateTime? Bestilt { get; set; }

        [Column(TypeName = "TEXT")]
        public string? ItemText { get; set; }

        [Column(TypeName = "VARCHAR(255)")]
        public string? Varenummer { get; set; } = "0";

        [Column(TypeName = "VARCHAR(255)")]
        public string? LagerLokasjon { get; set; } = "0";
    }
}
