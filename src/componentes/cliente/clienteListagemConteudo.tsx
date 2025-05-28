import React from 'react';

interface ClienteListagemConteudoProps {
  clientes: {
    nome: string;
    nomeSocial?: string; // nomeSocial can be optional
    ddd: string;
    telefone: string;
    pets?: string; // pets can be optional or an array of pets
    cpf?: string;
  }[];
}

class ClienteListagemConteudo extends React.Component<ClienteListagemConteudoProps> {
  render() {
    const { clientes } = this.props;

    return (
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {clientes.map((cli, index) => (
          <div key={index}>
            <p><strong>Nome:</strong> {cli.nome}</p>
            <p><strong>Nome Social:</strong> {cli.nomeSocial ?? "Não informado"}</p>
            <p><strong>Telefone:</strong> ({cli.ddd}) {cli.telefone}</p>
            <p><strong>Pet:</strong> {cli.pets ?? "Nenhum pet cadastrado"}</p>
            <p><strong>CPF:</strong> {cli.cpf ?? "Não informado"}</p>
            {index < clientes.length - 1 && <hr />}
          </div>
        ))}
      </div>
    );
  }
}

export default ClienteListagemConteudo;