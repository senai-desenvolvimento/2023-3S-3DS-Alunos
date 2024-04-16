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
        // Declaração de uma interface de repositório para manipulação de dados de exame
        private readonly IExameRepository _exameRepository;

        // Declaração de uma instância do serviço OCR
        private readonly OcrService _ocrService;

        // Construtor que recebe uma instância de IExameRepository e uma instância de OcrService como parâmetros e as armazena nas variáveis correspondentes
        public ExameController(IExameRepository exameRepository, OcrService ocrService)
        {
            _exameRepository = exameRepository;
            _ocrService = ocrService;
        }

        // Método de ação do controlador que lida com solicitações POST na rota "Cadastrar"
        [HttpPost("Cadastrar")]
        public async Task<IActionResult> Post([FromForm] ExameViewModel exameViewModel)
        {
            try
            {
                // Verifica se o modelo recebido é nulo ou se a imagem no modelo é nula
                if (exameViewModel.Imagem == null || exameViewModel.Imagem == null)
                {
                    // Retorna um erro 400 (BadRequest) se não houver imagem fornecida
                    return BadRequest("Nenhuma imagem fornecida.");
                }

                // Abre um fluxo de leitura para a imagem fornecida
                using (var stream = exameViewModel.Imagem.OpenReadStream())
                {
                    // Chama o método RecognizeTextAsync do serviço OCR para reconhecer o texto na imagem
                    var result = await _ocrService.RecognizeTextAsync(stream);

                    // Atualiza a descrição do exame no modelo com o texto reconhecido
                    exameViewModel.Descricao = result;

                    // Cria um novo objeto Exame com a descrição e o ID da consulta
                    Exame novoExame = new Exame();

                    novoExame.Descricao = exameViewModel.Descricao;
                    novoExame.ConsultaId = exameViewModel.ConsultaId;

                    // Chama o método Cadastrar do repositório de exame para salvar o novo exame
                    _exameRepository.Cadastrar(novoExame);

                    // Retorna uma resposta de sucesso (código 200 OK) com o novo exame cadastrado
                    return Ok(novoExame);
                }


            }
            catch (Exception ex)
            {
                // Retorna um erro 500 (InternalServerError) se ocorrer uma exceção durante o processamento da imagem
                return StatusCode(500, $"Erro ao processar a imagem: {ex.Message}");
            }
        }

        // Método de ação do controlador que lida com solicitações GET na rota "BuscarPorIdConsulta"
        [HttpGet("BuscarPorIdConsulta")]
        public IActionResult GetByIdConsult(Guid idConsulta)
        {
            try
            {
                // Chama o método BuscarPorIdConsulta do repositório de exame para obter a lista de exames para uma consulta específica
                List<Exame> lista = _exameRepository.BuscarPorIdConsulta(idConsulta);

                // Retorna uma resposta com a lista de exames encontrados
                return Ok(lista);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}