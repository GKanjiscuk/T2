import React from 'react';
import { Servico } from '../types';

interface ServicoListagemConteudoProps {
  servicos: Servico[];
  azulEscuro: string;
}

class ServicoListagemConteudo extends React.Component<ServicoListagemConteudoProps> {
  render() {
    const { servicos, azulEscuro } = this.props;

    return (
      <>
        {servicos.length === 0 ? (
          <p style={{ color: azulEscuro }}>Nenhum serviço cadastrado.</p>
        ) : (
          servicos.map((serv, index) => (
            <div key={serv.id} className="mb-3" style={{ color: azulEscuro }}>
              <p><strong>ID:</strong> {serv.id}</p>
              <p><strong>Nome do Serviço:</strong> {serv.nome}</p>
              <p><strong>Preço:</strong> R$ {parseFloat(serv.preco).toFixed(2)}</p>
              <p><strong>Consumo:</strong> {serv.consumo} vezes</p>
              {index < servicos.length - 1 && <hr style={{ borderColor: azulEscuro }} />}
            </div>
          ))
        )}
      </>
    );
  }
}

export default ServicoListagemConteudo;