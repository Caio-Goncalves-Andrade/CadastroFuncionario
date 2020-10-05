import React, { Component } from 'react';
import CreateFuncionario from './components/CreateFuncionario';
import Funcionarios from './components/Funcionarios';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="header">
          <div className="container">
            <h1>Cadastro de Funcionários</h1>
          </div>
        </header>
        <div className="container">
          <Funcionarios />
          <CreateFuncionario />
        </div>
      </div>
    );
  }
}

export default App;
