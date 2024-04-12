using Azure.Storage.Blobs;

namespace WebAPI.Utils.BlobStorage
{
    public static class AzureBlobStorageHelper
    {
        public static async Task<string> UploadImageBlobAsync(IFormFile arquivo, string stringConexao, string nomeContainer)
        {
			try
			{
				//verifica se existe o arquivo
				if (arquivo != null)
				{
					//gera um nome único para a imagem
					var blobName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(arquivo.FileName);

					//cria uma instância do BlobServiceClient passando a string de conexão com o blob da Azure
					var blobServiceClient = new BlobServiceClient(stringConexao);

					//obtem dados do container client
					var blobContainerClient = blobServiceClient.GetBlobContainerClient(nomeContainer);

					//obtem um blobClient usando o blob name
					var blobClient = blobContainerClient.GetBlobClient(blobName);

					//abre o fluxo de entrada do arquivo (foto)
					using (var stream = arquivo.OpenReadStream())
					{
						//carrega o arquivo(foto) para o blob de forma assíncrona
						await blobClient.UploadAsync(stream, true);
					}

					//retorna a uri do blob como uma string
					return blobClient.Uri.ToString();
                }
				else
				{
					//retorna a uri de uma imagem padrão caso nenhuma imagem seja enviada na requisição
					return "https://blobvitalhubmanha.blob.core.windows.net/blobvitalcontainermanha/profilepattern.png";
                }
			}
			catch (Exception)
			{
				throw;
			}
        }
    }
}
