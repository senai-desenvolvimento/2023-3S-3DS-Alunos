// Funcao para formatar qualquer tipo de dados
export const UseMask = (mascara, valor, secure = false) => {
  if (valor) {
    let indexValor = 0;

    if (secure) {
      valor = Array.from(SecureValue(valor.toString()));
    } else {
      // Convertendo o valor para sempre ser um texto
      valor = Array.from(valor.toString());
    }

    // Canvertendo o valor da mascara para uma lista
    mascara = Array.from(mascara);

    // String para receber os dados formatados
    let textoFormatado = "";

    // Percorrendo todos os caracteres da mascara
    for (let index = 0; index < mascara.length; index++) {
      if (mascara[index] === "#") {
        if (valor[indexValor] !== undefined) {
          textoFormatado += valor[indexValor];
          indexValor++;
        } else {
          break;
        }
      } else {
        textoFormatado += mascara[index];
      }
    }

    // Devolvendo o texto formatado
    return textoFormatado;

  } else {
    return valor;
  }
};

export const SecureValue = (valor) => {
  // Calculando a quantidade de texto a ser omitido
  const textoEscondido = valor.substring(3, valor.length - 2);

  // Criando a cadeia de texto a ser colocada
  const cript = "*".repeat(textoEscondido.length);

  // Concatenando as informacoes para devolver o texto convertido
  const textoFormatado =
    valor.substring(0, 3) +
    cript +
    valor.substring(valor.length - 2, valor.length);

  return textoFormatado;
};
