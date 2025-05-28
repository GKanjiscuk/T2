import React, { ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';

interface ServicoFormExclusaoProps {
  idExclusao: string;
  handleIdExclusaoChange: (e: ChangeEvent<HTMLInputElement>) => void;
  azulEscuro: string;
}

class ServicoFormExclusao extends React.Component<ServicoFormExclusaoProps> {
  render() {
    const {
      idExclusao,
      handleIdExclusaoChange,
      azulEscuro
    } = this.props;

    return (
      <Form.Group className="mb-3">
        <Form.Label style={{ color: azulEscuro }}>Digite o ID do serviço que deseja excluir</Form.Label>
        <Form.Control
          value={idExclusao}
          onChange={handleIdExclusaoChange}
          placeholder="ID do serviço"
          type="text"
        />
      </Form.Group>
    );
  }
}

export default ServicoFormExclusao;