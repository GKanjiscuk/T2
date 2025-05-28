import React, { Component, ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';

interface ClienteFormCadastroProps {
  step: number;
  cliente: any;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default class ClienteFormCadastro extends Component<ClienteFormCadastroProps> {
  render() {
    const { step, cliente, handleChange } = this.props;

    return (
      <>
        {step === 1 && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control
                name="nome"
                value={cliente.nome}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nome Social</Form.Label>
              <Form.Control
                name="nomeSocial"
                value={cliente.nomeSocial}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Telefone</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control
                  placeholder="DDD"
                  style={{ maxWidth: "80px" }}
                  name="ddd"
                  value={cliente.ddd}
                  onChange={handleChange}
                />
                <Form.Control
                  placeholder="Número"
                  name="telefone"
                  value={cliente.telefone}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>RG</Form.Label>
              <Form.Control
                name="rg"
                value={cliente.rg}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data de Emissão do RG</Form.Label>
              <Form.Control
                type="date"
                name="rgEmissao"
                value={cliente.rgEmissao}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                name="cpf"
                value={cliente.cpf}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data de Emissão do CPF</Form.Label>
              <Form.Control
                type="date"
                name="cpfEmissao"
                value={cliente.cpfEmissao}
                onChange={handleChange}
              />
            </Form.Group>
          </>
        )}
        {step === 2 && (
          <>
            <p>Confirme os dados:</p>
            <ul>
              <li><strong>Nome:</strong> {cliente.nome}</li>
              <li><strong>Nome Social:</strong> {cliente.nomeSocial}</li>
              <li><strong>Telefone:</strong> ({cliente.ddd}) {cliente.telefone}</li>
              <li><strong>RG:</strong> {cliente.rg}</li>
              <li><strong>Data Emissão RG:</strong> {cliente.rgEmissao}</li>
              <li><strong>CPF:</strong> {cliente.cpf}</li>
              <li><strong>Data Emissão CPF:</strong> {cliente.cpfEmissao}</li>
            </ul>
          </>
        )}
      </>
    );
  }
}
