using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Utils.OCR;
using WebAPI.ViewModels;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExameController : ControllerBase
    {
        private readonly IExameRepository _exameRepository;
        private readonly OcrService _ocrService;

        public ExameController(IExameRepository exameRepository, OcrService ocrService)
        {
            _exameRepository = exameRepository;
            _ocrService = ocrService;
        }

        [HttpPost("Cadastrar")]
        public async Task<IActionResult> Post([FromForm] ExameViewModel exameViewModel)
        {
            try
            {
                if (exameViewModel.Imagem == null || exameViewModel == null)
                {
                    return BadRequest("Nenhuma imagem fornecida");
                }

                using (var stream = exameViewModel.Imagem.OpenReadStream())
                {
                    var result = await _ocrService.RecognizeTextAsync(stream);

                    exameViewModel.Descricao = result;

                    Exame exame = new Exame();
                    exame.Descricao = exameViewModel.Descricao;
                    exame.ConsultaId = exameViewModel.ConsultaId;

                    _exameRepository.Cadastrar(exame);

                    return Ok(exame);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("BuscarPorIdConsulta")]
        public IActionResult GetByIdConsult(Guid idConsulta)
        {
            try
            {
                List<Exame> lista = _exameRepository.BuscarPorIdConsulta(idConsulta);

                return Ok(lista);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }
    }
}