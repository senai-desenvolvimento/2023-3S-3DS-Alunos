using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Domains;
using WebAPI.Utils.OCR;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OcrController : ControllerBase
    {
        private readonly OcrService _ocrService;
        public OcrController(OcrService ocrService)
        {
            _ocrService = ocrService;
        }

        [HttpPost]
        public async Task<IActionResult> RecognizeText([FromForm] FileUploadModel fileUploadModel)
        {
            try
            {
                //verifica se oa imagem foi recebida
                if (fileUploadModel == null || fileUploadModel.Image == null)
                {
                    return BadRequest("Nenhuma imagem foi fornecida");
                }

                //abre a conexão com o recurso
                using (var stream = fileUploadModel.Image.OpenReadStream())
                {
                    //chama o método para reconhecer a imagem
                    var result = await _ocrService.RecognizeTextAsync(stream);

                    //retorna o resultado
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Erro ao processar a imagem" + ex.Message);
            }
        }
    }
}
