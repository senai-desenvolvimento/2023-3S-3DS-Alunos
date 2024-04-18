using ApiSpeechToText.Models;
using ApiSpeechToText.services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;

namespace ApiSpeechToText.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SpeechController : Controller
    {
        // Chamando a interface de identificação do host da aplicação
        private readonly IWebHostEnvironment _webHostEnvironment;

        // Construtor para gerar a instância da interface
        public SpeechController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }


        [HttpPost("/TextToSpeech")]
        public async Task<IActionResult> PostText(TextModel texto)
        {
            try
            {
                // Capturando todo o caminho da aplicação para capturar os aúdios salvos
                var filePath = Path.Combine(_webHostEnvironment.WebRootPath, "audios");

                // Obtém a data e hora atuais
                DateTime now = DateTime.Now;

                // Gera um nome de arquivo único
                var fileName = now.ToString("yyyyMMdd_HHmmss") + ".wav";

                // Caminho completo do arquivo
                var fullPath = Path.Combine(filePath, fileName);

                // Chama o serviço para gerar o arquivo de áudio
                await AzureService.TextToSpeech(texto.Texto, fullPath);

                // Retorna a URL do arquivo
                var fileUrl = $"{Request.Scheme}://{Request.Host}/audios/{fileName}";

                return Ok(new { audioUrl = fileUrl });
            }
            catch (Exception ex)
            {
                // Captura outras exceções
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("/SpeechToText")]
        public async Task<IActionResult> PostAudio([FromForm] FileUpload file)
        {
            try
            {
                // Verifique se o arquivo foi enviado
                if (file != null)
                {
                    // Processar o arquivo de áudio, e salvar no diretório informado
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/audios");

                    // Verifica se o diretório de destino especificado existe.
                    if (!Directory.Exists(filePath))
                    {
                        // Cria o diretório se não existir
                        Directory.CreateDirectory(filePath);
                    }

                    // Gera um nome de arquivo único
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.Arquivo.FileName);

                    // Caminho completo do arquivo
                    var fullPath = Path.Combine(filePath, fileName);

                    // Salva o arquivo
                    using (var fileStream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.Arquivo.CopyTo(fileStream);
                    }

                    // Validar o tipo do arquivo para confirmar o uso do áudio
                    if (Path.GetExtension(file.Arquivo.FileName) != ".wav")
                    {
                        fullPath = await AzureService.Conversor(fullPath, fullPath.Replace( Path.GetExtension(file.Arquivo.FileName), ".wav") );
                    }

                    // Enviando para o serviço de tradução da fala
                    var teste = AzureService.SpeechToText(fullPath);

                    return Ok(new { Texto = teste.Result });
                }
                else
                {
                    return BadRequest("Nenhum arquivo de áudio foi enviado.");
                }
            }
            catch (Exception ex)
            {
                // Captura outras exceções
                return BadRequest(ex.Message);
            }
        }
    }
}
