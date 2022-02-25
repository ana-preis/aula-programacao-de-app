import React, {useState} from 'react';
import './App.css';


function Card() {  

  const [nome, setNome] = useState("")
  const [preco, setPreco] = useState("")
  const [produtos, setProdutos] = useState([])
  const [produtosMaisBaratos, setProdutoMaisBarato] = useState({})

  const handleSubmit = (e) => {
    let produtos = JSON.parse(localStorage.getItem("produtos"));   

    if (produtos == null){
      produtos = []
    }

    produtos.push({nome,preco})

    localStorage.setItem(
      "produtos", 
      JSON.stringify(produtos));
    
    setProdutos(produtos)
  }

  const handleFilter = () => {
    
    let produtos = JSON.parse(localStorage.getItem("produtos"));
    //produtos.sort  
    //produtos.map gera array só de preços e oda com Math.min
    //produtos.fore Não sei
    
    produtos.sort((a, b) => {
      return parseInt(a.preco) - parseInt(b.preco)
    })
    
    const produtoBarato = produtos[0];

    //verifica se tem mais algum elemento com o mesmo preço do primeiro produto da lista
    const produtosMaisBaratos = produtos.filter(ele => {
      return parseInt(ele.preco) === parseInt(produtoBarato.preco)
    })

    //se a lista tiver mais de um elemento
    if (produtosMaisBaratos.length > 1){

      let produtoMaisBaratoFinal = mesmoPreco(produtos)
      setProdutoMaisBarato(produtoMaisBaratoFinal)

    } else {
      setProdutoMaisBarato(produtoBarato);
      return;
    }
      
  }

  function mesmoPreco(listaProdutos) {

    for(let i = 0; i < listaProdutos.length; i++) {
      
      let prodAtual = parseInt(listaProdutos[i].preco)
      let ultimo = parseInt(listaProdutos[listaProdutos.length -1].preco)

      //verifica se é o último
      if (prodAtual === ultimo) {
        return listaProdutos[i];
      }

      let prodBaixo = parseInt(listaProdutos[i+1].preco)

      //verifica se é o primeiro e se o de baixo é diferente
      if(i === 0 && prodAtual !== prodBaixo){
        return listaProdutos[i];
      } else if (i !== 0 && prodAtual !== prodBaixo)  { 
        
        //não é igual ao de baixo, então é igual ao de cima? se colocar esse if aí de baixo num && em cima, 
        //pode dar erro pq pode n existir o de cima (se i == 0)
        let prodCima = parseInt(listaProdutos[i-1].preco)
        if (prodAtual !== prodCima) {
          return listaProdutos[i]
        }
      }
      
      // ultima ocasião: else (i === 0 && prodAtual === prodBaixo) ----> não faz nada      
    }
  }
      
  const changeName = (e) => {
    setNome(e.target.value)
  }

  const changePreco = (e) => {
    setPreco(e.target.value)
  }

  return (
    <div className='card'>
      <div>
        <label>Nome do produto: </label><br></br>
        <input
          type="text"
          id = "idnome"
          value = {nome}
          onChange = {changeName}
        ></input><br></br>
        <label>Preço: </label><br></br>
        <input
          type="text"
          id = "idpreco"
          value = {preco}
          onChange = {changePreco}
        ></input><br></br>
        <button
          className='btn btn-enviar'
          onClick = {handleSubmit}>
          Enviar
        </button>
      </div>
      <hr></hr>
      <div>
        <div
          className='label-filtro'
        >Qual é o produto mais barato e cujo preço não se repete?</div><br></br>
        <button
          className='btn'
          onClick = {handleFilter}>
          Filtrar
        
        </button>
        <br></br>
          <div
            className='lista'>
          <label>Nome: </label>
          {
            produtosMaisBaratos.nome
          }
          <br></br>
          <label>Preço: </label>
          {
            produtosMaisBaratos.preco
          }
        </div>
        
        
      </div>
    </div>
  );
}

export default Card;


