using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ApiSpeechToText.Models
{
    public class FileUpload
    {
        [NotMapped]
        [JsonIgnore]
        public IFormFile Arquivo { get; set; }
    }
}
