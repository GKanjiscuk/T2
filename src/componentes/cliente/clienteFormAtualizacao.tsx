import React, { Component, ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';

interface ClienteFormAtualizacaoProps {
  cpfPesquisa: string;
  cliente: any;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCpfPesquisaChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default class ClienteFormAtualizacao extends Component<ClienteFormAtualizacaoProps> {
  render() {
    const { cpfPesquisa, cliente, handleChange, handleCpfPesquisaChange } = this.props;

    return (
      <>
        <Form.Group className="mb-3">
          <Form.Label>CPF do Cliente</Form.Label>
          <Form.Control
            value={cpfPesquisa}
            onChange={handleCpfPesquisaChange}
            placeholder="Digite o CPF do cliente"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control name="nome" value={cliente.nome} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nome Social</Form.Label>
          <Form.Control name="nomeSocial" value={cliente.nomeSocial} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>DDD</Form.Label>
          <Form.Control name="ddd" value={cliente.ddd} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Telefone</Form.Label>
          <Form.Control name="telefone" value={cliente.telefone} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Pets</Form.Label>
          <Form.Control name="pets" value={cliente.pets} onChange={handleChange} />
        </Form.Group>
      </>
    );
  }
}
