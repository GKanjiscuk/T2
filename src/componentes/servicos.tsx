import React, { ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Servico } from "./types"; // Assuming you have a types.ts with Servico interface

interface ServicosState {
  mostrarModalCadastro: boolean;
  mostrarModalListagem: boolean;
  mostrarModalAtualizar: boolean;
  mostrarModalExclusao: boolean;
  step: number;
  servicos: Servico[];
  servico: {
    id: string; // Changed to string for easier management with input fields
    nome: string;
    preco: string;
    consumo: string; // Kept as string for input, will parse to number when saving/updating
  };
  idPesquisa: string;
  idExclusao: string;
}

export default class Servicos extends React.Component<{}, ServicosState> {
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
      servicos: [
        { id: "1", nome: "Hospedagem Noturna", preco: "80.00", consumo: 5 },
        { id: "2", nome: "Acupuntura Animal", preco: "120.00", consumo: 3 },
        { id: "3", nome: "Sessão de Ozonioterapia", preco: "95.00", consumo: 7 },
        { id: "4", nome: "Terapia Comportamental", preco: "160.00", consumo: 2 },
        { id: "5", nome: "Hidroterapia", preco: "110.00", consumo: 4 },
        { id: "6", nome: "Odontologia Veterinária", preco: "250.00", consumo: 1 },
      ],
      servico: {
        id: "",
        nome: "",
        preco: "",
        consumo: "",
      },
      idPesquisa: "",
      idExclusao: "",
    };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      servico: {
        ...prevState.servico,
        [name]: value
      }
    }));
  };

  handleIdPesquisaChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ idPesquisa: e.target.value });
  };

  atualizarServico = () => {
    const { servicos, idPesquisa, servico } = this.state;
    const servicoAtualizado = servicos.map((serv) =>
      serv.id === idPesquisa ? { // Compare string IDs directly
        ...serv,
        nome: servico.nome || serv.nome, // Use existing if new is empty
        preco: servico.preco || serv.preco, // Use existing if new is empty
        consumo: parseInt(servico.consumo) || serv.consumo // Use existing if new is empty or invalid
      } : serv
    );
    this.setState({
      servicos: servicoAtualizado,
      mostrarModalAtualizar: false,
      idPesquisa: "",
      step: 1,
      servico: { id: "", nome: "", preco: "", consumo: "" }, // Reset form
    });
  };

  next = () => {
    const { step, servico, mostrarModalCadastro, mostrarModalAtualizar, idPesquisa, servicos } = this.state;

    if (mostrarModalCadastro && step === 1) {
        if (!servico.nome || !servico.preco || !servico.consumo) {
            alert("Por favor, preencha todos os campos do serviço.");
            return;
        }
        if (isNaN(parseFloat(servico.preco)) || isNaN(parseInt(servico.consumo))) {
            alert("Por favor, insira valores numéricos válidos para preço e consumo.");
            return;
        }
    }

    if (mostrarModalAtualizar && step === 1) {
        if (!idPesquisa) {
            alert("Por favor, insira o ID do serviço para atualizar.");
            return;
        }
        const foundServico = servicos.find(serv => serv.id === idPesquisa);
        if (!foundServico) {
            alert("Serviço não encontrado com o ID fornecido.");
            return;
        }
        // If a service is found, populate the update form
        this.setState({
            servico: {
                id: foundServico.id,
                nome: foundServico.nome,
                preco: foundServico.preco,
                consumo: foundServico.consumo.toString(), // Convert number back to string for input
            }
        });
    }

    this.setState(prevState => ({ step: prevState.step + 1 }));
  };

  back = () => this.setState(prevState => ({ step: prevState.step - 1 }));

  salvar = () => {
    const { servico, servicos } = this.state;

    if (!servico.nome || !servico.preco || !servico.consumo) {
        alert("Por favor, preencha todos os campos do serviço antes de salvar.");
        return;
    }
    if (isNaN(parseFloat(servico.preco)) || isNaN(parseInt(servico.consumo))) {
        alert("Por favor, insira valores numéricos válidos para preço e consumo.");
        return;
    }

    const novoServico: Servico = {
      id: crypto.randomUUID(), // Use crypto.randomUUID for unique string IDs
      nome: servico.nome,
      preco: parseFloat(servico.preco).toFixed(2), // Ensure price is formatted
      consumo: parseInt(servico.consumo),
    };
    this.setState(prevState => ({
      servicos: [...prevState.servicos, novoServico],
      mostrarModalCadastro: false,
      step: 1,
      servico: { id: "", nome: "", preco: "", consumo: "" }, // Reset form
    }));
  };

  excluirServico = () => {
    const { idExclusao, servicos } = this.state;
    if (!idExclusao) {
        alert("Por favor, digite o ID do serviço para excluir.");
        return;
    }
    const servicoExiste = servicos.some(serv => serv.id === idExclusao);
    if (!servicoExiste) {
        alert("Serviço não encontrado com o ID fornecido.");
        return;
    }

    this.setState(prevState => ({
      servicos: prevState.servicos.filter(serv => serv.id !== idExclusao),
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
      servico,
      servicos,
      idPesquisa,
      idExclusao,
    } = this.state;

    const servicoParaAtualizar = servicos.find(serv => serv.id === idPesquisa);

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
          <img src="/service.png" style={{ width: "70px" }} alt="Ícone de Serviço" />
          <h1 style={{ fontSize: "300%", color: this.azulEscuro, fontWeight: "700" }}>
            Menu de Serviços
          </h1>
        </div>

        <hr className="line" style={{ borderColor: this.azulPrincipal }} />
        <h5 className="subtitle mt-5" style={{ color: this.azulEscuro }}>
          Nos blocos abaixo, você poderá gerenciar os dados dos seus serviços.
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
                    Cadastrar Serviço
                  </h5>
                  <p
                    className="card-text text-center subtitleCard"
                    style={{ color: this.azulEscuro }}
                  >
                    Cadastrar novo serviço.
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
                      📝Cadastrar Serviço
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Modal
              show={mostrarModalCadastro}
              onHide={() => {
                this.setState({
                  mostrarModalCadastro: false,
                  step: 1,
                  servico: { id: "", nome: "", preco: "", consumo: "" }
                });
              }}
              centered
              size="lg"
            >
              <Modal.Header closeButton style={{ backgroundColor: this.azulPrincipal, color: this.fundoClaro }}>
                <Modal.Title>Cadastro de Serviço</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ backgroundColor: this.fundoClaro, color: this.azulEscuro }}>
                {step === 1 && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Nome do Serviço</Form.Label>
                      <Form.Control name="nome" value={servico.nome} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Preço</Form.Label>
                      <Form.Control name="preco" value={servico.preco} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Consumo</Form.Label>
                      <Form.Control name="consumo" value={servico.consumo} onChange={this.handleChange} />
                    </Form.Group>
                  </>
                )}
                {step === 2 && (
                  <>
                    <p style={{ color: this.azulEscuro, fontWeight: "600" }}>Confirme os dados:</p>
                    <ul style={{ color: this.azulEscuro, fontWeight: "600" }}>
                      <li><strong>Nome do Serviço:</strong> {servico.nome}</li>
                      <li><strong>Preço:</strong> R$ {parseFloat(servico.preco).toFixed(2)}</li>
                      <li><strong>Consumo:</strong> {servico.consumo}</li>
                    </ul>
                  </>
                )}
              </Modal.Body>
              <Modal.Footer style={{ backgroundColor: this.azulPrincipal }}>
                {step > 1 && <Button style={{ backgroundColor: this.azulEscuro, borderColor: this.azulEscuro }} onClick={this.back}>⬅Voltar</Button>}
                {step < 2 && <Button style={{ backgroundColor: this.azulEscuro, borderColor: this.azulEscuro }} onClick={this.next}>Próximo➡️</Button>}
                {step === 2 && <Button style={{ backgroundColor: this.azulEscuro, borderColor: this.azulEscuro }} onClick={this.salvar}>📝Cadastrar</Button>}
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
                    Listar Serviços
                  </h5>
                  <p
                    className="card-text text-center subtitleCard"
                    style={{ color: this.azulEscuro }}
                  >
                    Listar todos os serviços cadastrados
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
                      📋Listar Serviços
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
                <Modal.Title>Listagem de Serviços</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ backgroundColor: this.fundoClaro, color: this.azulEscuro }}>
                {servicos.length === 0 ? (
                  <p>Nenhum serviço cadastrado.</p>
                ) : (
                  servicos.map((serv, index) => (
                    <div key={serv.id}> {/* Use serv.id as key for better performance */}
                      <p><strong>ID do Serviço:</strong> {serv.id}</p>
                      <p><strong>Nome do Serviço:</strong> {serv.nome}</p>
                      <p><strong>Preço:</strong> R$ {serv.preco}</p>
                      <p><strong>Consumo:</strong> {serv.consumo} serviços</p>
                      {index < servicos.length - 1 && <hr />}
                    </div>
                  ))
                )}
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
                    Atualizar Serviço
                  </h5>
                  <p
                    className="card-text text-center subtitleCard"
                    style={{ color: this.azulEscuro }}
                  >
                    Alterar os dados de um serviço
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
                          servico: { id: "", nome: "", preco: "", consumo: "" }
                        });
                      }}
                    >
                      ✏️Atualizar Serviço
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Modal
              show={mostrarModalAtualizar}
              onHide={() => {
                this.setState({
                  mostrarModalAtualizar: false,
                  step: 1,
                  idPesquisa: "",
                  servico: { id: "", nome: "", preco: "", consumo: "" }
                });
              }}
              centered
              size="lg"
            >
              <Modal.Header closeButton style={{ backgroundColor: this.azulPrincipal, color: this.fundoClaro }}>
                <Modal.Title>Atualização de Serviço</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ backgroundColor: this.fundoClaro, color: this.azulEscuro }}>
                {step === 1 && (
                  <Form.Group className="mb-3">
                    <Form.Label>ID do Serviço</Form.Label>
                    <Form.Control type="text" value={idPesquisa} onChange={this.handleIdPesquisaChange} />
                  </Form.Group>
                )}
                {step === 2 && servicoParaAtualizar ? (
                    <div>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome do Serviço</Form.Label>
                            {/* Use local state 'servico' for form inputs, initialized from 'servicoParaAtualizar' */}
                            <Form.Control name="nome" value={servico.nome} onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Preço</Form.Label>
                            <Form.Control name="preco" value={servico.preco} onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Consumo</Form.Label>
                            <Form.Control name="consumo" value={servico.consumo} onChange={this.handleChange} />
                        </Form.Group>
                    </div>
                ) : (
                    step === 2 && <p>Serviço não encontrado.</p>
                )}
              </Modal.Body>
              <Modal.Footer style={{ backgroundColor: this.azulPrincipal }}>
                {step > 1 && <Button style={{ backgroundColor: this.azulEscuro, borderColor: this.azulEscuro }} onClick={this.back}>⬅Voltar</Button>}
                {step === 1 && <Button style={{ backgroundColor: this.azulEscuro, borderColor: this.azulEscuro }} onClick={this.next} disabled={!idPesquisa}>Próximo➡️</Button>}
                {step === 2 && <Button style={{ backgroundColor: this.azulEscuro, borderColor: this.azulEscuro }} onClick={this.atualizarServico} disabled={!servicoParaAtualizar}>Atualizar Serviço</Button>}
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
                    Excluir Serviço
                  </h5>
                  <p
                    className="card-text text-center subtitleCard"
                    style={{ color: this.azulEscuro }}
                  >
                    Remova um serviço cadastrado
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
                      🗑️Excluir Serviço
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
                <Modal.Title>Excluir Serviço</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ backgroundColor: this.fundoClaro, color: this.azulEscuro }}>
                <Form.Group className="mb-3">
                  <Form.Label>Digite o ID do serviço que deseja excluir</Form.Label>
                  <Form.Control value={idExclusao} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ idExclusao: e.target.value })} />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer style={{ backgroundColor: this.azulPrincipal }}>
                <Button
                  style={{ backgroundColor: this.azulEscuro, borderColor: this.azulEscuro }}
                  onClick={() => this.setState({ mostrarModalExclusao: false })}
                >
                  Cancelar
                </Button>
                <Button variant="danger" onClick={this.excluirServico} disabled={!idExclusao}>
                  Excluir Serviço
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}