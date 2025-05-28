import React, { ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ModalGenerico from "./modalBase";

import { Pet, Cliente } from './types';

import PetFormCadastro from "./pet/petFormCadastro";
import PetListagemConteudo from "./pet/petListagemConteudo";
import PetFormAtualizacao from "./pet/petFormAtualizacao";
import PetFormExclusao from "./pet/petFormExclusao";

const AZUL_PRINCIPAL = "#003366";
const AZUL_ESCURO = "#003366";
const FUNDO_CLARO = "#f0f8ff";

interface PetsState {
  mostrarModalCadastro: boolean;
  mostrarModalAtualizar: boolean;
  mostrarModalExclusao: boolean;
  mostrarModalListagem: boolean;
  step: number;
  idPet: string;
  petEmEdicao: Pet;
  cpfPesquisa: string;
  pets: Pet[];
  clientes: Cliente[];
}

export default class Pets extends React.Component<{}, PetsState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      mostrarModalCadastro: false,
      mostrarModalAtualizar: false,
      mostrarModalExclusao: false,
      mostrarModalListagem: false,
      step: 1,
      idPet: "",
      petEmEdicao: {
        id: "",
        nome: "",
        genero: "",
        raca: "",
        especie: "",
        cpfDono: "",
      },
      cpfPesquisa: "",
      pets: [
        {
          id: "101",
          nome: "Belinha",
          genero: "Fêmea",
          raca: "Poodle",
          especie: "Cachorro",
          cpfDono: "00112233445",
        },
        {
          id: "102",
          nome: "Felix",
          genero: "Macho",
          raca: "Siamês",
          especie: "Gato",
          cpfDono: "55667788990",
        },
        {
          id: "103",
          nome: "Lola",
          genero: "Fêmea",
          raca: "Golden Retriever",
          especie: "Cachorro",
          cpfDono: "00112233445",
        },
        {
          id: "104",
          nome: "Pingo",
          genero: "Macho",
          raca: "Hamster Sírio",
          especie: "Roedor",
          cpfDono: "11223344556",
        },
        {
          id: "105",
          nome: "Kiwi",
          genero: "Indefinido",
          raca: "Calopsita",
          especie: "Pássaro",
          cpfDono: "99887766554",
        },
      ],
      clientes: [
        { nome: "João Silva", cpf: "00112233445", ddd: "11", telefone: "987654321" },
        { nome: "Maria Oliveira", cpf: "55667788990", ddd: "21", telefone: "998877665" },
        { nome: "Carlos Souza", cpf: "11223344556", ddd: "31", telefone: "976543210" },
        { nome: "Ana Santos", cpf: "99887766554", ddd: "41", telefone: "965432109" },
      ],
    };
  }

  nextStep = () => {
    this.setState((prevState) => {
      let updatedPetEmEdicao = prevState.petEmEdicao;
      if (prevState.mostrarModalCadastro && prevState.step === 1) {
        updatedPetEmEdicao = { ...updatedPetEmEdicao, cpfDono: prevState.cpfPesquisa };
      }
      return {
        step: prevState.step + 1,
        petEmEdicao: updatedPetEmEdicao,
      };
    });
  };

  backStep = () => {
    this.setState((prevState) => ({ step: prevState.step - 1 }));
  };

  handlePetChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    this.setState((prevState) => ({
      petEmEdicao: { ...prevState.petEmEdicao, [e.target.name]: e.target.value },
    }));
  };

  handleCpfPesquisaChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ cpfPesquisa: e.target.value });
  };

  handleIdPetChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ idPet: e.target.value });
  };

  fecharModal = (modalName: 'mostrarModalCadastro' | 'mostrarModalAtualizar' | 'mostrarModalExclusao' | 'mostrarModalListagem') => {
    this.setState({ [modalName]: false } as Pick<PetsState, typeof modalName>); // This is the corrected line
    this.resetarEstadoModal();
  };

  resetarEstadoModal = () => {
    this.setState({
      step: 1,
      idPet: "",
      cpfPesquisa: "",
      petEmEdicao: { id: "", nome: "", genero: "", raca: "", especie: "", cpfDono: "" },
    });
  };

  salvarPet = () => {
    const { petEmEdicao, pets, mostrarModalCadastro, cpfPesquisa } = this.state;
    if (!petEmEdicao.nome || !petEmEdicao.genero || !petEmEdicao.raca || !petEmEdicao.especie || !petEmEdicao.cpfDono) {
        alert("Por favor, preencha todos os campos do pet e selecione o CPF do dono.");
        return;
    }

    const novoPet: Pet = {
      ...petEmEdicao,
      id: crypto.randomUUID(),
    };

    this.setState({ pets: [...pets, novoPet] });
    console.log("Pet Cadastrado:", novoPet);
    this.fecharModal("mostrarModalCadastro");
  };

  atualizarPet = () => {
    const { idPet, petEmEdicao, pets } = this.state;
    const petExistente = pets.find((p) => p.id === idPet);

    if (!petExistente) {
      alert("Pet não encontrado com o ID fornecido.");
      return;
    }

    const petsAtualizados = pets.map((p) =>
      p.id === idPet ? { ...p, ...petEmEdicao } : p
    );
    this.setState({ pets: petsAtualizados });
    console.log("Pet Atualizado:", petEmEdicao);
    this.fecharModal("mostrarModalAtualizar");
  };

  excluirPet = () => {
    const { idPet, pets } = this.state;
    const petParaExcluir = pets.find((p) => p.id === idPet);
    if (!petParaExcluir) {
      alert("Pet não encontrado com o ID fornecido para exclusão.");
      return;
    }

    this.setState({ pets: pets.filter((pet) => pet.id !== idPet) });
    console.log(`Pet com ID ${idPet} excluído.`);
    this.fecharModal("mostrarModalExclusao");
  };

  render() {
    const {
      mostrarModalCadastro,
      mostrarModalAtualizar,
      mostrarModalExclusao,
      mostrarModalListagem,
      step,
      idPet,
      petEmEdicao,
      cpfPesquisa,
      pets,
      clientes,
    } = this.state;

    const cardData = [
      {
        title: "Cadastrar Pet",
        text: "Preencha os dados do novo pet",
        image: "cadastro.png",
        buttonText: "📝 Cadastrar Pet",
        buttonColor: AZUL_ESCURO,
        onClick: () => { this.setState({ mostrarModalCadastro: true }); this.resetarEstadoModal(); },
      },
      {
        title: "Listar Pets",
        text: "Veja todos os pets cadastrados",
        image: "listagem.png",
        buttonText: "🔍 Listar Pets",
        buttonColor: AZUL_ESCURO,
        onClick: () => { this.setState({ mostrarModalListagem: true }); this.resetarEstadoModal(); },
      },
      {
        title: "Atualizar Pet",
        text: "Atualize os dados de um pet existente",
        image: "update.png",
        buttonText: "✏ Atualizar Pet",
        buttonColor: AZUL_ESCURO,
        onClick: () => { this.setState({ mostrarModalAtualizar: true }); this.resetarEstadoModal(); },
      },
      {
        title: "Excluir Pet",
        text: "Remova um pet cadastrado",
        image: "delete.png",
        buttonText: "🗑 Excluir Pet",
        buttonColor: "red",
        onClick: () => { this.setState({ mostrarModalExclusao: true }); this.resetarEstadoModal(); },
      },
    ];

    return (
      <div
        className="container-fluid"
        style={{
          backgroundColor: FUNDO_CLARO,
          minHeight: "82vh",
          paddingBottom: "3rem",
        }}
      >
        <div className="d-flex align-items-center justify-content-center gap-3 title pt-5">
          <img src="/pets.png" style={{ width: "70px" }} alt="Ícone de Pets" />
          <h1 style={{ fontSize: "300%", color: AZUL_ESCURO, fontWeight: "700" }}>
            Menu - Pets
          </h1>
        </div>
        <hr className="line" style={{ borderColor: AZUL_PRINCIPAL }} />
        <h5 className="subtitle mt-5" style={{ color: AZUL_ESCURO }}>
          Abaixo estão todas as ferramentas de gerenciamento de dados dos pets.
        </h5>

        <div className="container mt-5">
          <div className="row justify-content-center">
            {cardData.map((card, index) => (
              <div className="col-md-3 col-sm-12 mb-4" key={index}>
                <div
                  className="card shadow border-0"
                  style={{ borderColor: AZUL_ESCURO, backgroundColor: FUNDO_CLARO }}
                >
                  <div className="card-body d-flex flex-column justify-content-between align-items-center">
                    <h5
                      className="card-title text-center titleCard"
                      style={{ color: AZUL_ESCURO }}
                    >
                      {card.title}
                    </h5>
                    <p
                      className="card-text text-center subtitleCard flex-grow-1"
                      style={{ color: AZUL_ESCURO }}
                    >
                      {card.text}
                    </p>
                    <div className="text-center mb-3">
                      <img
                        src={card.image}
                        style={{ width: "70%" }}
                        className="d-block mx-auto"
                        alt={card.title}
                      />
                    </div>
                    <Button
                      variant="primary"
                      className="mt-3 btn text-white"
                      style={{
                        backgroundColor: card.buttonColor,
                        borderColor: AZUL_PRINCIPAL,
                      }}
                      onClick={card.onClick}
                    >
                      {card.buttonText}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ModalGenerico
          show={mostrarModalCadastro}
          onHide={() => this.fecharModal("mostrarModalCadastro")}
          title="Cadastrar Pet"
          azulEscuro={AZUL_PRINCIPAL}
          fundoClaro={FUNDO_CLARO}
          size="lg"
          footerButtons={[
            {
              text: "⬅ Voltar",
              onClick: this.backStep,
              style: { backgroundColor: AZUL_ESCURO, borderColor: AZUL_ESCURO, display: step > 1 ? 'inline-block' : 'none' }
            },
            {
              text: "Próximo ➡️",
              onClick: this.nextStep,
              style: { backgroundColor: AZUL_ESCURO, borderColor: AZUL_ESCURO, display: step < 3 ? 'inline-block' : 'none' },
              disabled: (step === 1 && !cpfPesquisa) || (step === 2 && (!petEmEdicao.nome || !petEmEdicao.genero || !petEmEdicao.raca || !petEmEdicao.especie || !petEmEdicao.cpfDono))
            },
            {
              text: "Salvar Pet",
              onClick: this.salvarPet,
              style: { backgroundColor: AZUL_ESCURO, borderColor: AZUL_ESCURO, display: step === 3 ? 'inline-block' : 'none' }
            }
          ]}
        >
          <PetFormCadastro
            step={step}
            petEmEdicao={petEmEdicao}
            handleChange={this.handlePetChange}
            cpfPesquisa={cpfPesquisa}
            handleCpfPesquisaChange={this.handleCpfPesquisaChange}
            clientes={clientes}
          />
        </ModalGenerico>

        <ModalGenerico
          show={mostrarModalListagem}
          onHide={() => this.fecharModal("mostrarModalListagem")}
          title="Todos os Pets"
          azulEscuro={AZUL_PRINCIPAL}
          fundoClaro={FUNDO_CLARO}
          size="lg"
        >
          <PetListagemConteudo pets={pets} clientes={clientes} />
        </ModalGenerico>

        <ModalGenerico
          show={mostrarModalAtualizar}
          onHide={() => this.fecharModal("mostrarModalAtualizar")}
          title="Atualizar Pet"
          azulEscuro={AZUL_PRINCIPAL}
          fundoClaro={FUNDO_CLARO}
          size="lg"
          footerButtons={[
            {
              text: "⬅ Voltar",
              onClick: this.backStep,
              style: { backgroundColor: AZUL_ESCURO, borderColor: AZUL_ESCURO, display: step > 1 ? 'inline-block' : 'none' }
            },
            {
              text: "Próximo ➡️",
              onClick: this.nextStep,
              style: { backgroundColor: AZUL_ESCURO, borderColor: AZUL_ESCURO, display: step < 3 ? 'inline-block' : 'none' },
              disabled: (step === 1 && !cpfPesquisa) || (step === 2 && !idPet)
            },
            {
              text: "Atualizar Pet",
              onClick: this.atualizarPet,
              style: { backgroundColor: AZUL_ESCURO, borderColor: AZUL_ESCURO, display: step === 3 ? 'inline-block' : 'none' }
            }
          ]}
        >
          <PetFormAtualizacao
            step={step}
            idPet={idPet}
            setIdPet={(newIdPet: string) => this.setState({ idPet: newIdPet })}
            petEmEdicao={petEmEdicao}
            setPetEmEdicao={(newPet: Pet) => this.setState({ petEmEdicao: newPet })}
            handleChange={this.handlePetChange}
            pets={pets}
            cpfPesquisa={cpfPesquisa}
            handleCpfPesquisaChange={this.handleCpfPesquisaChange}
          />
        </ModalGenerico>

        <ModalGenerico
          show={mostrarModalExclusao}
          onHide={() => this.fecharModal("mostrarModalExclusao")}
          title="Excluir Pet"
          azulEscuro={AZUL_PRINCIPAL}
          fundoClaro={FUNDO_CLARO}
          footerButtons={[
            {
              text: "Cancelar",
              onClick: () => this.fecharModal("mostrarModalExclusao"),
              variant: "outline-secondary",
              style: { backgroundColor: FUNDO_CLARO, borderColor: AZUL_ESCURO, color: AZUL_ESCURO }
            },
            {
              text: "🗑️ Confirmar Exclusão",
              onClick: this.excluirPet,
              style: { backgroundColor: "red", borderColor: "red" },
              disabled: !idPet
            }
          ]}
        >
          <PetFormExclusao
            idPet={idPet}
            handleIdPetChange={this.handleIdPetChange}
          />
        </ModalGenerico>
      </div>
    );
  }
}