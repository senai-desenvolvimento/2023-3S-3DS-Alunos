using Microsoft.CognitiveServices.Speech;
using Microsoft.CognitiveServices.Speech.Audio;
using NAudio.Wave;

namespace ApiSpeechToText.services
{
    public static class AzureService
    {
        private static SpeechConfig Connection() {
            var config = SpeechConfig.FromSubscription("1d27ca97a7764cecafc9c26d3a5010ca", "eastus");

            return config;
        }

        public static async Task<string> TextToSpeech(string text, string caminho)
        {
            try
            {
                // Chamando a conexão com o serviço da azure
                var config = Connection();

                // Configuração para salvar o áudio em um arquivo local
                var audioConfig = AudioConfig.FromWavFileOutput(caminho);

                using ( var sintetizador = new SpeechSynthesizer(config, audioConfig) )
                {
                    // Sintetiza o áudio e salva no arquivo especificado
                    await sintetizador.SpeakTextAsync(text);

                    return ($"Arquivo de áudio salvo em: {caminho}");
                }

            }catch (Exception ex){
                return $"Erro ao converter texto para áudio: {ex.Message}";
            }
            
        }

        public static async Task<string> SpeechToText(string audio)
        {
            try
            {
                // Chamando a comunicação com o serviço da azure
                var connection = Connection();

                // Cria um objeto AudioConfig com base no fluxo de entrada de áudio
                var audioConfig = AudioConfig.FromWavFileInput(audio);

                // Cria um reconhecedor de fala usando a configuração de fala
                using (var recognizer = new SpeechRecognizer(connection, "pt-BR", audioConfig))
                {
                    // Substitua "audio.wav" pelo caminho do seu arquivo de áudio
                    var result = await recognizer.RecognizeOnceAsync();

                    // Processa o resultado do reconhecimento
                    switch (result.Reason)
                    {
                        case ResultReason.RecognizedSpeech:
                            return $"Texto identificado: \n\n '{result.Text}'";

                        case ResultReason.NoMatch:
                            return ("Não foi possível reconhecer o discurso.");

                        default:
                            return ("Ocorreu um erro durante o reconhecimento de fala.");

                    }

                }
            }catch (Exception ex){
                return $"Erro ao converter áudio para texto: {ex.Message}";
            }
        }

        // Naudio
        public static async Task<string> Conversor(string caminhoOriginal, string caminhoConversao)
        {
            //Abre o arquivo de áudio de entrada
            using (var reader = new MediaFoundationReader(caminhoOriginal))
            {
                // Cria um novo arquivo WAV para escrita
                using (var writer = new WaveFileWriter(caminhoConversao, reader.WaveFormat))
                {
                    // Copia os dados de áudio do arquivo de entrada para o arquivo WAV
                    reader.CopyTo(writer);

                    return caminhoConversao;
                }
            }
        }
    }
}
