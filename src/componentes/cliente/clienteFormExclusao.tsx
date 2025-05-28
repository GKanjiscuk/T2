import React, { ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';

interface ClienteFormExclusaoProps {
  cpfExclusao: string;
  setCpfExclusao: (value: string) => void;
}

class ClienteFormExclusao extends React.Component<ClienteFormExclusaoProps> {
  render() {
    const { cpfExclusao, setCpfExclusao } = this.props;

    return (
      <Form.Group className="mb-3">
        <Form.Label>CPF do Cliente</Form.Label>
        <Form.Control
          value={cpfExclusao}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCpfExclusao(e.target.value)}
          placeholder="Digite o CPF do cliente"
        />
      </Form.Group>
    );
  }
}

export default ClienteFormExclusao;