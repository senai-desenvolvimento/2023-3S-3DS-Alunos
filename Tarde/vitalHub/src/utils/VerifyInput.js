// Funcao para verificar os campos globais
export const VerifyInput = async ( input, value ) => {
  let erro = '';
  let statusValidado = true;

  // Verificar se o campo é vazio
  if( value === null || value === undefined )
  {
    erro = "Campo vázio"
    statusValidado = false;
    
  }else if( value.trim('') === "" ){
    erro = "Campo vázio"
    statusValidado = false;
    
  }else if( value.length < 3 ){
    erro = "Tamanho de texto muito pequeno"
    statusValidado = false;
  }
  
  if( !statusValidado ){
    input.current.focus()
    input.current.setNativeProps({ style: { 
      borderColor: 'red',
      color : 'red'
    } })
    
  }else{
    input.current.setNativeProps({ style: { 
      borderColor: '#49b3ba',
      color : '#34898f'
    }})
  }
  
  return { status : statusValidado, mensagem : erro };
}

export const ShowError = async ( listaCampos, mostrarErro) => {
  
  await listaCampos.map( (campo, _) => {
    
    if( mostrarErro ){
      campo.current.setNativeProps({ style: { 
        borderColor: 'red',
        color : 'red'
      }});
      
    }else{
      campo.current.setNativeProps({ style: { 
        borderColor: '#49b3ba',
        color : '#34898f'
      }});
    }
  });
}