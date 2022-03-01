import React, { useState } from "react";

function Crud() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState(0);
  const [qtd, setQtd] = useState(0);
  const [produtoId, setProdutoId] = useState(0);
  const [produtos, setProdutos] = useState([]);
  const [produtoIdUpdate, setProdutoIdUpdate] = useState(0);
  const [qtdUpdate, setQtdUpdate] = useState(0);

  const handleCadastro = () => {
    setProdutos([...produtos, { nome, preco, qtd, produtoId }]);
    setProdutoId(produtoId + 1);
  };

  const handleChangeQtd = () => {
    for (let i = 0; i < produtos.length; i++) {
      if (parseInt(produtos[i].produtoId) === parseInt(produtoIdUpdate)) {
        let copyProdutos = [...produtos];
        copyProdutos[i].qtd = qtdUpdate;
        setProdutos(copyProdutos);
        alert("Quantidade alterada!");
      }
    }
  };

  const handleSumQtdBtn = (idParam) => {
    for (let i = 0; i < produtos.length; i++) {
      if (parseInt(produtos[i].produtoId) === parseInt(idParam)) {
        let copyProdutos = [...produtos];
        copyProdutos[i].qtd = parseInt(copyProdutos[i].qtd) + 1;
        setProdutos(copyProdutos);
      }
    }
  };

  const handleSubQtdBtn = (idParam) => {
    for (let i = 0; i < produtos.length; i++) {
      if (parseInt(produtos[i].produtoId) === parseInt(idParam)) {
        let copyProdutos = [...produtos];
        copyProdutos[i].qtd = parseInt(copyProdutos[i].qtd) - 1;
        setProdutos(copyProdutos);
      }
    }
  };

  const handleList = () => {
    return produtos.filter((produto) => {
      return produto.qtd > 0;
    });
  };

  const changeName = (e) => {
    setNome(e.target.value);
  };

  const changePreco = (e) => {
    setPreco(e.target.value);
  };

  const changeQtd = (e) => {
    setQtd(e.target.value);
  };

  const changeProdutoIdUpdate = (e) => {
    setProdutoIdUpdate(e.target.value);
  };

  const changeQtdUpdate = (e) => {
    setQtdUpdate(e.target.value);
  };

  return (
    <div>
      <label>Nome do Produto: </label>
      <input value={nome} onChange={changeName}></input>
      <br></br>
      <label>Preço: </label>
      <input value={preco} onChange={changePreco}></input>
      <br></br>
      <label>Quantidade: </label>
      <input value={qtd} onChange={changeQtd}></input>
      <br></br>
      <button onClick={handleCadastro}>Cadastrar</button>
      <hr />
      <div style={{ margin: "20px" }}>
        <label>Id: </label>
        <input value={produtoIdUpdate} onChange={changeProdutoIdUpdate}></input>
      </div>
      <div style={{ margin: "20px" }}>
        <label>Quantidade: </label>
        <input value={qtdUpdate} onChange={changeQtdUpdate}></input>
      </div>
      <button onClick={handleChangeQtd}>Alterar Quantidade</button>
      <hr />
      <h3>Listagem:</h3>
      <div>
        {handleList().map((produto) => {
          return (
            <>
              <span>{produto.produtoId} - </span>
              <span>Nome: {produto.nome} |</span>
              <span> Preço: {produto.preco} |</span>
              <span> Quantidade: {produto.qtd} </span>
              <button onClick={() => handleSumQtdBtn(produto.produtoId)}>
                +
              </button>
              <button onClick={() => handleSubQtdBtn(produto.produtoId)}>
                -
              </button>

              <br />
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Crud;
