import React, { ChangeEvent } from "react";
import { Modal, Button } from "react-bootstrap";
import { Produto } from "./types";

import ProdutoFormCadastro from "../componentes/produto/produtoFormCadastro";
import ProdutoListagemConteudo from "../componentes/produto/produtoListagemConteudo";
import ProdutoFormAtualizacao from "../componentes/produto/produtoFormAtualizacao";
import ProdutoFormExclusao from "../componentes/produto/produtoFormExclusao";

interface ProdutosState {
  mostrarModalCadastro: boolean;
  mostrarModalListagem: boolean;
  mostrarModalAtualizar: boolean;
  mostrarModalExclusao: boolean;
  step: number; // Required
  produtos: Produto[]; // Required
  produto: Produto; // Required
  idPesquisa: string; // Required
  idExclusao: string; // Required
  produtoParaAtualizar: Produto | null; // Required (can be null)
}

export default class Produtos extends React.Component<{}, ProdutosState> {
  private azulPrincipal: string = "#003366";
  private azulEscuro: string = "#003366";
  private fundoClaro: string = "#f0f8ff";

  constructor(props: {}) {
    super(props);
    this.state = {
      mostrarModalCadastro: false,
      mostrarModalListagem: false,
      mostrarModalAtualizar: false,
      mostrarModalExclusao: false,
      step: 1,
      produtos: [
        { id: "prod-001", nome: "Shampoo", preco: "10.00", estoque: 100, consumo: 20 },
        { id: "prod-002", nome: "Ração", preco: "20.00", estoque: 150, consumo: 20 },
        { id: "prod-003", nome: "Coleira", preco: "30.00", estoque: 200, consumo: 20 },
        { id: "prod-004", nome: "Roupinha", preco: "40.00", estoque: 250, consumo: 20 },
      ],
      produto: {
        id: "",
        nome: "",
        preco: "",
        estoque: 0,
        consumo: 0,
      },
      idPesquisa: "",
      idExclusao: "",
      produtoParaAtualizar: null,
    };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    this.setState(prevState => {
      if (name === "estoque" || name === "consumo") {
        return {
          produto: {
            ...prevState.produto,
            [name]: value === "" ? 0 : parseInt(value) || 0
          }
        };
      } else {
        return {
          produto: { ...prevState.produto, [name]: value }
        };
      }
    });
  };

  handleIdPesquisaChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ idPesquisa: e.target.value });
  };

  handleIdExclusaoChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ idExclusao: e.target.value });
  };

  nextStep = () => {
    this.setState(prevState => {
      const { mostrarModalCadastro, mostrarModalAtualizar, step, produto, idPesquisa, produtos } = prevState;

      if (mostrarModalCadastro) {
        if (step === 1) {
          if (!produto.nome || !produto.preco || produto.estoque === 0) {
            alert("Por favor, preencha nome, preço e estoque para o produto.");
            return null;
          }
          if (isNaN(parseFloat(produto.preco))) {
            alert("Por favor, insira um preço válido.");
            return null;
          }
        }
      }

      if (mostrarModalAtualizar) {
        if (step === 1) {
          const foundProduct = produtos.find(prod => prod.id === idPesquisa); // Typo here, should be 'produtos'
          if (foundProduct) {
            return {
              produtoParaAtualizar: foundProduct,
              produto: {
                id: foundProduct.id,
                nome: foundProduct.nome,
                preco: foundProduct.preco,
                estoque: foundProduct.estoque,
                consumo: foundProduct.consumo
              },
              step: prevState.step + 1
            };
          } else {
            alert("Produto não encontrado com o ID fornecido.");
            return null;
          }
        }
      }

      return {
        ...prevState,
        step: prevState.step + 1
      };
    });
  };


  backStep = () => this.setState(prevState => ({ step: prevState.step - 1 }));

  resetProdutoForm = () => {
    this.setState({ produto: { id: "", nome: "", preco: "", estoque: 0, consumo: 0 } });
  };

  salvarProduto = () => {
    const { produto, produtos } = this.state;
    if (!produto.nome || !produto.preco || produto.estoque === 0 || isNaN(parseFloat(produto.preco))) {
      alert("Por favor, preencha todos os campos obrigatórios corretamente.");
      return;
    }

    // Logic to generate sequential ID (prod-001, prod-002, etc.)
    const getLastProductIdNumber = () => {
      const lastProduct = produtos.reduce((prev, current) => {
        const prevNum = parseInt(prev.id.replace('prod-', '')) || 0;
        const currentNum = parseInt(current.id.replace('prod-', '')) || 0;
        return prevNum > currentNum ? prev : current;
      }, { id: 'prod-000' } as Produto); // Initial value for comparison

      return parseInt(lastProduct.id.replace('prod-', ''));
    };

    const nextIdNumber = getLastProductIdNumber() + 1;
    const newProductId = `prod-${nextIdNumber.toString().padStart(3, '0')}`; // Formats to prod-00X

    const novoProduto: Produto = {
      id: newProductId, // Use the generated sequential ID
      nome: produto.nome,
      preco: parseFloat(produto.preco).toFixed(2),
      estoque: produto.estoque,
      consumo: produto.consumo,
    };
    this.setState(prevState => ({
      produtos: [...prevState.produtos, novoProduto],
      mostrarModalCadastro: false,
      step: 1,
    }));
    this.resetProdutoForm();
  };

  atualizarProduto = () => {
    const { produtoParaAtualizar, produto, produtos } = this.state;
    if (!produtoParaAtualizar) {
      alert("Nenhum produto selecionado para atualização.");
      return;
    }

    const produtosAtualizados = produtos.map(prod => {
      if (prod.id === produtoParaAtualizar.id) {
        return {
          ...prod,
          nome: produto.nome || prod.nome,
          preco: produto.preco ? parseFloat(produto.preco).toFixed(2) : prod.preco,
          estoque: produto.estoque !== 0 ? produto.estoque : prod.estoque,
          consumo: produto.consumo !== 0 ? produto.consumo : prod.consumo,
        };
      }
      return prod;
    });

    this.setState({
      produtos: produtosAtualizados,
      mostrarModalAtualizar: false,
      step: 1,
      idPesquisa: "",
      produtoParaAtualizar: null,
    });
    this.resetProdutoForm();
  };

  excluirProduto = () => {
    const { idExclusao, produtos } = this.state;
    const produtoExiste = produtos.some(prod => prod.id === idExclusao);
    if (!produtoExiste) {
      alert("Produto não encontrado com o ID fornecido.");
      return;
    }
    this.setState(prevState => ({
      produtos: prevState.produtos.filter(prod => prod.id !== idExclusao),
      idExclusao: "",
      mostrarModalExclusao: false,
    }));
  };

  render() {
    const {
      mostrarModalCadastro,
      mostrarModalListagem,
      mostrarModalAtualizar,
      mostrarModalExclusao,
      step,
      produto,
      produtos,
      idPesquisa,
      idExclusao,
      produtoParaAtualizar,
    } = this.state;

    return (
      <div
        className="container-fluid"
        style={{
          backgroundColor: this.fundoClaro,
          minHeight: "82vh",
          paddingBottom: "3rem",
        }}
      >
        <div className="d-flex align-items-center justify-content-center gap-3 title pt-5">
          <img src="/product.png" style={{ width: "70px" }} alt="Ícone de Produto" />
          <h1 style={{ fontSize: "300%", color: this.azulEscuro, fontWeight: "700" }}>
            Menu de Produtos
          </h1>
        </div>

        <hr className="line" style={{ borderColor: this.azulPrincipal }} />
        <h5 className="subtitle mt-5" style={{ color: this.azulEscuro }}>
          Nos blocos abaixo, você poderá gerenciar os dados dos seus produtos.
        </h5>

        <div className="container mt-5">
          <div className="row justify-content-center">

            <div className="col-md-3 col-sm-12 mb-4">
              <div
                className="card shadow border-0"
                style={{ borderColor: this.azulEscuro, backgroundColor: this.fundoClaro }}
              >
                <div className="card-body">
                  <h5
                    className="card-title text-center titleCard"
                    style={{ color: this.azulEscuro }}
                  >
                    Cadastrar Produto
                  </h5>
                  <p
                    className="card-text text-center subtitleCard"
                    style={{ color: this.azulEscuro }}
                  >
                    Cadastrar novo produto.
                  </p>
                  <div className="text-center mb-3">
                    <img src="cadastro.png" style={{ width: "70%" }} className="d-block mx-auto" alt="Cadastro" />
                  </div>
                  <div className="d-flex justify-content-center">
                    <Button
                      variant="primary"
                      className="mt-3 btn text-white"
                      style={{ backgroundColor: this.azulPrincipal, borderColor: this.azulPrincipal }}
                      onClick={() => this.setState({ mostrarModalCadastro: true, step: 1 })}
                    >
                      📝Cadastrar Produto
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Modal
              show={mostrarModalCadastro}
              onHide={() => { this.setState({ mostrarModalCadastro: false, step: 1 }); this.resetProdutoForm(); }}
              centered
              size="lg"
            >
              <Modal.Header closeButton style={{ backgroundColor: this.azulPrincipal, color: this.fundoClaro }}>
                <Modal.Title>Cadastro de Produto</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ backgroundColor: this.fundoClaro, color: this.azulEscuro }}>
                {step === 1 && (
                  <ProdutoFormCadastro
                    produto={produto}
                    handleChange={this.handleChange}
                  />
                )}
                {step === 2 && (
                  <>
                    <p style={{ color: this.azulEscuro, fontWeight: "600" }}>Confirme os dados:</p>
                    <ul style={{ color: this.azulEscuro, fontWeight: "600" }}>
                      <li><strong>Nome do Produto:</strong> {produto.nome}</li>
                      <li><strong>Preço:</strong> R$ {parseFloat(produto.preco).toFixed(2)}</li>
                      <li><strong>Estoque:</strong> {produto.estoque} unidades</li>
                      <li><strong>Consumo:</strong> {produto.consumo} unidades</li>
                    </ul>
                  </>
                )}
              </Modal.Body>
              <Modal.Footer style={{ backgroundColor: this.azulPrincipal }}>
                {step > 1 && <Button style={{ backgroundColor: this.azulEscuro, borderColor: this.azulEscuro }} onClick={this.backStep}>⬅Voltar</Button>}
                {step < 2 && <Button style={{ backgroundColor: this.azulEscuro, borderColor: this.azulEscuro }} onClick={this.nextStep}>Próximo➡️</Button>}
                {step === 2 && <Button style={{ backgroundColor: this.azulEscuro, borderColor: this.azulEscuro }} onClick={this.salvarProduto}>📝Cadastrar</Button>}
              </Modal.Footer>
            </Modal>

            <div className="col-md-3 col-sm-12 mb-4">
              <div
                className="card shadow border-0"
                style={{ borderColor: this.azulEscuro, backgroundColor: this.fundoClaro }}
              >
                <div className="card-body">
                  <h5
                    className="card-title text-center titleCard"
                    style={{ color: this.azulEscuro }}
                  >
                    Listar Produtos
                  </h5>
                  <p
                    className="card-text text-center subtitleCard"
                    style={{ color: this.azulEscuro }}
                  >
                    Listar todos os produtos cadastrados
                  </p>
                  <div className="text-center mb-3">
                    <img src="listagem.png" style={{ width: "70%" }} className="d-block mx-auto" alt="Listagem" />
                  </div>
                  <div className="d-flex justify-content-center">
                    <Button
                      variant="primary"
                      className="mt-3 btn text-white"
                      style={{ backgroundColor: this.azulPrincipal, borderColor: this.azulPrincipal }}
                      onClick={() => this.setState({ mostrarModalListagem: true })}
                    >
                      📋Listar Produtos
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Modal
              show={mostrarModalListagem}
              onHide={() => this.setState({ mostrarModalListagem: false })}
              centered
              size="lg"
            >
              <Modal.Header closeButton style={{ backgroundColor: this.azulPrincipal, color: this.fundoClaro }}>
                <Modal.Title>Listagem de Produtos</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ backgroundColor: this.fundoClaro, color: this.azulEscuro }}>
                <ProdutoListagemConteudo
                  produtos={produtos}
                  azulEscuro={this.azulEscuro}
                />
              </Modal.Body>
              <Modal.Footer style={{ backgroundColor: this.azulPrincipal }} />
            </Modal>

            <div className="col-md-3 col-sm-12 mb-4">
              <div
                className="card shadow border-0"
                style={{ borderColor: this.azulEscuro, backgroundColor: this.fundoClaro }}
              >
                <div className="card-body">
                  <h5
                    className="card-title text-center titleCard"
                    style={{ color: this.azulEscuro }}
                  >
                    Atualizar Produto
                  </h5>
                  <p
                    className="card-text text-center subtitleCard"
                    style={{ color: this.azulEscuro }}
                  >
                    Alterar os dados de um produto
                  </p>
                  <div className="text-center mb-3">
                    <img src="update.png" style={{ width: "70%" }} className="d-block mx-auto" alt="Atualização" />
                  </div>
                  <div className="d-flex justify-content-center">
                    <Button
                      variant="primary"
                      className="mt-3 btn text-white"
                      style={{ backgroundColor: this.azulPrincipal, borderColor: this.azulPrincipal }}
                      onClick={() => {
                        this.setState({
                          mostrarModalAtualizar: true,
                          step: 1,
                          idPesquisa: "",
                          produtoParaAtualizar: null,
                        });
                        this.resetProdutoForm();
                      }}
                    >
                      ✏️Atualizar Produto
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <Modal
              show={mostrarModalAtualizar}
              onHide={() => { this.setState({ mostrarModalAtualizar: false, step: 1, idPesquisa: "", produtoParaAtualizar: null }); this.resetProdutoForm(); }}
              centered
              size="lg"
            >
              <Modal.Header closeButton style={{ backgroundColor: this.azulPrincipal, color: this.fundoClaro }}>
                <Modal.Title>Atualização de Produto</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ backgroundColor: this.fundoClaro, color: this.azulEscuro }}>
                <ProdutoFormAtualizacao
                  step={step}
                  idPesquisa={idPesquisa}
                  handleIdPesquisaChange={this.handleIdPesquisaChange}
                  produto={produto}
                  handleChange={this.handleChange}
                  produtoParaAtualizar={produtoParaAtualizar}
                  azulEscuro={this.azulEscuro}
                />
              </Modal.Body>
              <Modal.Footer style={{ backgroundColor: this.azulPrincipal }}>
                {step > 1 && <Button style={{ backgroundColor: this.azulEscuro, borderColor: this.azulEscuro }} onClick={this.backStep}>⬅Voltar</Button>}
                {step === 1 && <Button style={{ backgroundColor: this.azulEscuro, borderColor: this.azulEscuro }} onClick={this.nextStep} disabled={!idPesquisa}>Próximo➡️</Button>}
                {step === 2 && <Button style={{ backgroundColor: this.azulEscuro, borderColor: this.azulEscuro }} onClick={this.atualizarProduto}>Atualizar Produto</Button>}
              </Modal.Footer>
            </Modal>

            <div className="col-md-3 col-sm-12 mb-4">
              <div
                className="card shadow border-0"
                style={{ borderColor: this.azulEscuro, backgroundColor: this.fundoClaro }}
              >
                <div className="card-body">
                  <h5
                    className="card-title text-center titleCard"
                    style={{ color: this.azulEscuro }}
                  >
                    Excluir Produto
                  </h5>
                  <p
                    className="card-text text-center subtitleCard"
                    style={{ color: this.azulEscuro }}
                  >
                    Remova um produto cadastrado
                  </p>
                  <div className="text-center mb-3">
                    <img src="delete.png" style={{ width: "70%" }} className="d-block mx-auto" alt="Exclusão" />
                  </div>
                  <div className="d-flex justify-content-center">
                    <Button
                      variant="danger"
                      className="mt-3 btn"
                      onClick={() => this.setState({ mostrarModalExclusao: true })}
                    >
                      🗑️Excluir Produto
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Modal
              show={mostrarModalExclusao}
              onHide={() => this.setState({ mostrarModalExclusao: false })}
              centered
            >
              <Modal.Header closeButton style={{ backgroundColor: this.azulPrincipal, color: this.fundoClaro }}>
                <Modal.Title>Excluir Produto</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ backgroundColor: this.fundoClaro, color: this.azulEscuro }}>
                <ProdutoFormExclusao
                  idExclusao={idExclusao}
                  handleIdExclusaoChange={this.handleIdExclusaoChange}
                  azulEscuro={this.azulEscuro}
                />
              </Modal.Body>
              <Modal.Footer style={{ backgroundColor: this.azulPrincipal }}>
                <Button
                  style={{ backgroundColor: this.azulEscuro, borderColor: this.azulEscuro }}
                  onClick={() => this.setState({ mostrarModalExclusao: false })}
                >
                  Cancelar
                </Button>
                <Button variant="danger" onClick={this.excluirProduto} disabled={!idExclusao}>
                  Excluir Produto
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}