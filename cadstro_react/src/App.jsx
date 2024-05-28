import { useState } from 'react';
import './index.css';

function App() {
  const [clientes, setClientes] = useState([]);
  const [nomeClienteInput, setNomeClienteInput] = useState('');
  const [anoClienteInput, setAnoClienteInput] = useState('');
  const [idade, setIdade] = useState(false);

  const handleNomeInputChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setNomeClienteInput(value);
    }
  };

  const handleAnoInputChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      setAnoClienteInput(value);
    }
  };

  const adicionarCliente = () => {
    const ano = parseInt(anoClienteInput);

    if (nomeClienteInput.trim() !== '' && !isNaN(ano)) {
      setClientes([...clientes, { nome: nomeClienteInput, ano: ano }]);
      setNomeClienteInput('');
      setAnoClienteInput('');
      setIdade(true);
    } 
  };

  const deletarCliente = (index) => {
    const updatedClientes = clientes.filter((_, i) => i !== index);
    setClientes(updatedClientes);
  };

  const calcularSomaAnos = () => {
    const anoAtual = 2024;
    return clientes.reduce((soma, cliente) => soma + (anoAtual - cliente.ano), 0);
  };

  return (
    <div className="container">
      <h2>Gerenciador de Clientes</h2>
      <div id="form">
        <input
          type="text"
          value={anoClienteInput}
          onChange={handleAnoInputChange}
          placeholder="Ano"
          className="input-ano"
        />
        <input
          type="text"
          value={nomeClienteInput}
          onChange={handleNomeInputChange}
          placeholder="Digite o nome do cliente"
          className="input-nome"
        />
        <button onClick={adicionarCliente} className="btn-adicionar">Incluir Cliente</button>
      </div>
      <ul>
        {clientes.map((cliente, index) => (
          <li key={index}>
            {cliente.nome}
            <button className="delete" onClick={() => deletarCliente(index)}>Excluir</button>
          </li>
        ))}
      </ul>

      {idade && (
        <div>
          <h3>Idade Atual: {calcularSomaAnos()} anos</h3>
        </div>
      )}
    </div>
  );
}

export default App;
