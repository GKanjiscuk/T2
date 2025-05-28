import React, { Component, ChangeEvent } from "react";
import { Button } from "react-bootstrap";
import ModalGenerico from "./modalBase";

import ClienteFormCadastro from "./cliente/clienteFormCadastro";
import ClienteListagemConteudo from "./cliente/clienteListagemConteudo";
import ClienteFormAtualizacao from "./cliente/clienteFormAtualizacao";
import ClienteFormExclusao from "./cliente/clienteFormExclusao";

const azulPrincipal = "#007BFF";
const azulEscuro = "#003366";
const fundoClaro = "#f0f8ff";

interface Cliente {
  nome: string;
  nomeSocial: string;
  ddd: string;
  telefone: string;
  pets: string;
  rg?: string;
  rgEmissao?: string;
  cpf: string;
  cpfEmissao?: string;
}

interface State {
  mostrarModalCadastro: boolean;
  mostrarModalListagem: boolean;
  mostrarModalAtualizar: boolean;
  mostrarModalExclusao: boolean;
  step: number;
  cpfPesquisa: string;
  cpfExclusao: string;
  clientes: Cliente[];
  cliente: Cliente;
}

export default class Clientes extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      mostrarModalCadastro: false,
      mostrarModalListagem: false,
      mostrarModalAtualizar: false,
      mostrarModalExclusao: false,
      step: 1,
      cpfPesquisa: "",
      cpfExclusao: "",
      clientes: [
        { nome: "Sofia Mendes", nomeSocial: "Sofi", ddd: "21", telefone: "98765-1111", pets: "Bartolomeu", cpf: "101.202.303-40" },
        { nome: "Ricardo Santos", nomeSocial: "Rico", ddd: "19", telefone: "91234-2222", pets: "Panqueca", cpf: "505.606.707-80" },
        { nome: "Giovanna Costa", nomeSocial: "Gio", ddd: "41", telefone: "99876-3333", pets: "Frederico", cpf: "909.808.707-60" },
        { nome: "Pedro Henrique", nomeSocial: "PH", ddd: "31", telefone: "90000-4444", pets: "Amora", cpf: "123.456.789-01" },
        { nome: "Mariana Oliveira", nomeSocial: "Mari", ddd: "61", telefone: "95555-6666", pets: "Tufão", cpf: "234.567.890-12" },
        { nome: "Felipe Rodrigues", nomeSocial: "Lipe", ddd: "85", telefone: "97777-8888", pets: "Estrela", cpf: "345.678.901-23" },
        { nome: "Larissa Almeida", nomeSocial: "Lari", ddd: "71", telefone: "91111-2222", pets: "Pirulito", cpf: "456.789.012-34" },
        { nome: "Guilherme Souza", nomeSocial: "Gui", ddd: "51", telefone: "93333-4444", pets: "Floquinho", cpf: "567.890.123-45" },
        { nome: "Beatriz Nogueira", nomeSocial: "Bia", ddd: "81", telefone: "96666-7777", pets: "Pretinha", cpf: "678.901.234-56" },
        { nome: "João Victor", nomeSocial: "JV", ddd: "27", telefone: "99999-0000", pets: "Rex", cpf: "789.012.345-67" },
      ],
      cliente: {
        nome: "",
        nomeSocial: "",
        ddd: "",
        telefone: "",
        pets: "",
        rg: "",
        rgEmissao: "",
        cpf: "",
        cpfEmissao: ""
      }
    };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ cliente: { ...this.state.cliente, [e.target.name]: e.target.value } });
  };

  handleCpfPesquisaChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ cpfPesquisa: e.target.value });
  };

  salvar = () => {
    this.setState(prevState => ({
      clientes: [...prevState.clientes, prevState.cliente],
      mostrarModalCadastro: false,
      step: 1,
      cliente: { nome: "", nomeSocial: "", ddd: "", telefone: "", pets: "", rg: "", rgEmissao: "", cpf: "", cpfEmissao: "" }
    }));
  };

  atualizarCliente = () => {
    this.setState(prevState => ({
      clientes: prevState.clientes.map(cli =>
        cli.cpf === prevState.cpfPesquisa ? { ...cli, ...prevState.cliente } : cli
      ),
      mostrarModalAtualizar: false,
      cpfPesquisa: "",
      step: 1,
      cliente: { nome: "", nomeSocial: "", ddd: "", telefone: "", pets: "", rg: "", rgEmissao: "", cpf: "", cpfEmissao: "" }
    }));
  };

  excluirCliente = () => {
    this.setState(prevState => ({
      clientes: prevState.clientes.filter(cli => cli.cpf !== prevState.cpfExclusao),
      cpfExclusao: "",
      mostrarModalExclusao: false
    }));
  };

  render() {
    const { mostrarModalCadastro, mostrarModalListagem, mostrarModalAtualizar, mostrarModalExclusao, step, cpfPesquisa, cpfExclusao, clientes, cliente } = this.state;

    const cardData = [
      {
        title: "Cadastrar Cliente",
        text: "Preencha os dados de um novo cliente.",
        image: "cadastro.png",
        buttonText: "📝Cadastrar Cliente",
        buttonColor: azulEscuro,
        onClick: () => this.setState({ mostrarModalCadastro: true, step: 1, cliente: { nome: "", nomeSocial: "", ddd: "", telefone: "", pets: "", rg: "", rgEmissao: "", cpf: "", cpfEmissao: "" } })
      },
      {
        title: "Listar Clientes",
        text: "Visualize todos os clientes cadastrados",
        image: "listagem.png",
        buttonText: "📋Listar Clientes",
        buttonColor: azulEscuro,
        onClick: () => this.setState({ mostrarModalListagem: true })
      },
      {
        title: "Atualizar Cliente",
        text: "Altere os dados de um cliente existente",
        image: "update.png",
        buttonText: "🛠️Atualizar Cliente",
        buttonColor: azulEscuro,
        onClick: () => this.setState({ mostrarModalAtualizar: true, cpfPesquisa: "", cliente: { nome: "", nomeSocial: "", ddd: "", telefone: "", pets: "", rg: "", rgEmissao: "", cpf: "", cpfEmissao: "" } })
      },
      {
        title: "Excluir Cliente",
        text: "Remova o registro do cliente no sistema",
        image: "delete.png",
        buttonText: "🗑️Excluir Cliente",
        buttonColor: "red",
        onClick: () => this.setState({ mostrarModalExclusao: true, cpfExclusao: "" })
      },
    ];

    return (
      <div className="container-fluid" style={{ backgroundColor: fundoClaro, minHeight: '82vh' }}>
        <div className="d-flex align-items-center justify-content-center gap-3 title pt-5">
          <img src="/client.png" style={{ width: "70px" }} />
          <h1 style={{ fontSize: "300%", color: azulEscuro }}>Menu de Clientes</h1>
        </div>

        <hr className="line" style={{ borderColor: azulPrincipal }} />
        <h5 className="subtitle mt-5" style={{ color: azulEscuro }}>
          Nos blocos abaixo, você poderá gerenciar os dados dos seus clientes.
        </h5>

        <div className="container mt-5">
          <div className="row justify-content-center">
            {cardData.map((card, index) => (
              <div className="col-md-3 col-sm-12 mb-4" key={index}>
                <div className="card shadow border-0" style={{ borderColor: azulEscuro, backgroundColor: fundoClaro }}>
                  <div className="card-body">
                    <h5 className="card-title text-center titleCard" style={{ color: azulEscuro }}>{card.title}</h5>
                    <p className="card-text text-center subtitleCard" style={{ color: azulEscuro }}>{card.text}</p>
                    <div className="text-center mb-3">
                      <img src={card.image} style={{ width: "70%" }} className="d-block mx-auto" alt={card.title} />
                    </div>
                    <div className="d-flex justify-content-center">
                      <Button
                        variant="primary"
                        className="mt-3 btn text-white"
                        style={{ backgroundColor: card.buttonColor, borderColor: azulPrincipal }}
                        onClick={card.onClick}
                      >
                        {card.buttonText}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ModalGenerico
          show={mostrarModalCadastro}
          onHide={() => this.setState({ mostrarModalCadastro: false, step: 1 })}
          title="Cadastro de Cliente"
          azulEscuro={azulEscuro}
          fundoClaro={fundoClaro}
          size="lg"
          footerButtons={[
            { text: "⬅ Voltar", onClick: () => this.setState({ step: step - 1 }), style: { backgroundColor: azulEscuro, display: step > 1 ? 'inline-block' : 'none' } },
            { text: "Próximo ➡️", onClick: () => this.setState({ step: step + 1 }), style: { backgroundColor: azulEscuro, display: step < 2 ? 'inline-block' : 'none' } },
            { text: "📝Cadastrar", onClick: this.salvar, style: { backgroundColor: azulEscuro, display: step === 2 ? 'inline-block' : 'none' } },
          ]}
        >
          <ClienteFormCadastro step={step} cliente={cliente} handleChange={this.handleChange} />
        </ModalGenerico>

        <ModalGenerico
          show={mostrarModalListagem}
          onHide={() => this.setState({ mostrarModalListagem: false })}
          title="Listagem de Clientes"
          azulEscuro={azulEscuro}
          fundoClaro={fundoClaro}
          size="lg"
        >
          <ClienteListagemConteudo clientes={clientes} />
        </ModalGenerico>

        <ModalGenerico
          show={mostrarModalAtualizar}
          onHide={() => this.setState({ mostrarModalAtualizar: false })}
          title="Atualizar Cliente"
          azulEscuro={azulEscuro}
          fundoClaro={fundoClaro}
          size="lg"
          footerButtons={[
            { text: "🛠️ Atualizar", onClick: this.atualizarCliente, style: { backgroundColor: azulEscuro, borderColor: azulEscuro } },
          ]}
        >
          <ClienteFormAtualizacao
            cpfPesquisa={cpfPesquisa}
            cliente={cliente}
            handleChange={this.handleChange}
            handleCpfPesquisaChange={this.handleCpfPesquisaChange}
          />
        </ModalGenerico>

        <ModalGenerico
          show={mostrarModalExclusao}
          onHide={() => this.setState({ mostrarModalExclusao: false })}
          title="Excluir Cliente"
          azulEscuro={azulEscuro}
          fundoClaro={fundoClaro}
          footerButtons={[
            { text: "Cancelar", onClick: () => this.setState({ mostrarModalExclusao: false }), variant: "outline-secondary" },
            { text: "🗑️ Confirmar Exclusão", onClick: this.excluirCliente, style: { backgroundColor: azulEscuro, borderColor: azulEscuro } },
          ]}
        >
          <ClienteFormExclusao cpfExclusao={cpfExclusao} setCpfExclusao={(cpf) => this.setState({ cpfExclusao: cpf })} />
        </ModalGenerico>
      </div>
    );
  }
}
