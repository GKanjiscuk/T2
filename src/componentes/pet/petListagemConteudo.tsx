import React from 'react';
import { Cliente, Pet } from '../types'; // Assuming Pet interface has 'id'

interface PetListagemConteudoProps {
  pets: Pet[]; // Use the Pet interface for better type safety
  clientes: Cliente[];
}

class PetListagemConteudo extends React.Component<PetListagemConteudoProps> {
  getNomeCliente = (cpf: string): string => {
    const { clientes } = this.props;
    const cliente = clientes.find(c => c.cpf === cpf);
    return cliente ? cliente.nome : 'Dono Desconhecido';
  };

  render() {
    const { pets } = this.props;

    return (
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {pets.length === 0 ? (
          <p>Nenhum pet cadastrado.</p>
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th> {/* Added ID column */}
                <th>Nome</th>
                <th>Raça</th>
                <th>Espécie</th>
                <th>Gênero</th>
                <th>Dono</th>
              </tr>
            </thead>
            <tbody>
              {pets.map((pet) => (
                <tr key={pet.id}> {/* Use pet.id as key if available and unique */}
                  <td>{pet.id}</td> {/* Display pet ID */}
                  <td>{pet.nome}</td>
                  <td>{pet.raca}</td>
                  <td>{pet.especie}</td>
                  <td>{pet.genero}</td>
                  <td>{this.getNomeCliente(pet.cpfDono)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default PetListagemConteudo;