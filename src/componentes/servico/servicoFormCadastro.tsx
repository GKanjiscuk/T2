import React, { ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';
import { Servico } from '../types';

interface ServicoFormCadastroProps {
  servico: Servico;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

class ServicoFormCadastro extends React.Component<ServicoFormCadastroProps> {
  render() {
    const { servico, handleChange } = this.props;

    return (
      <>
        <Form.Group className="mb-3">
          <Form.Label>Nome do Serviço</Form.Label>
          <Form.Control
            name="nome"
            value={servico.nome}
            onChange={handleChange}
            placeholder="Nome do Serviço"
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Preço</Form.Label>
          <Form.Control
            name="preco"
            value={servico.preco}
            onChange={handleChange}
            type="number"
            step="0.01"
            placeholder="0.00"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Consumo (Opcional)</Form.Label>
          <Form.Control
            name="consumo"
            value={servico.consumo.toString()}
            onChange={handleChange}
            type="number"
            placeholder="0"
          />
        </Form.Group>
      </>
    );
  }
}

export default ServicoFormCadastro;