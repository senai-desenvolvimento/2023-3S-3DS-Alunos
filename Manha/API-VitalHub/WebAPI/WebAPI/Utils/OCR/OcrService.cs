using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;

namespace WebAPI.Utils.OCR
{
    public class OcrService
    {
        private readonly string _subscriptionKey = "c5b2f999cdfa4459b8777c6e9e25a045";

        private readonly string _endpoint = "https://cvvitalhub3dm.cognitiveservices.azure.com/";

        //método para reconhecer o caracteres(texto) a partir de uma imagem
        public async Task<string> RecognizeTextAsync(Stream imageStream)
        {
            try
            {
                //cria um client para API de Computer Vision
                var client = new ComputerVisionClient(new ApiKeyServiceClientCredentials(_subscriptionKey))
                {
                    Endpoint = _endpoint
                };

                //faz a chamada para a API 
                var ocrResult = await client.RecognizePrintedTextInStreamAsync(true, imageStream);

                //processa o resultado e retorna o texto reconhecido 
                return ProcessRecognitionResult(ocrResult);
            }
            catch (Exception ex)
            {
                return "Erro ao reconhecer o texo" + ex.Message;
            }
        }

        private static string ProcessRecognitionResult(OcrResult result)
        {

            string recognizedText = "";

            //percorre todas as regiões 
            foreach (var region in result.Regions)
            {
                //para cada região, percorre as linhas
                foreach (var line in region.Lines)
                {
                    //para cada linha, percorre as palavras
                    foreach (var word in line.Words)
                    {
                        //adiciona cada palavra ao texto, separando com espaço
                        recognizedText += word.Text + " ";
                    }

                    //quebra de linha ao final de cada linha
                    recognizedText += "\n";
                }
            }

            //retorna o texto
            return recognizedText;
        }
    }
}