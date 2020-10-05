import React from 'react';
import usePostFuncionarioService, {
  PostFuncionario
} from '../services/usePostFuncionarioService';
import Loader from './Loader';

const Createfuncionario: React.FC<{}> = () => {
  const initialFuncionarioState: PostFuncionario = {

    nome: '',
    endereco: '',
    nascimento: '',
    salario: 0,
    genero: ''
  };
  const [funcionario, setFuncionario] = React.useState<PostFuncionario>(
    initialFuncionarioState
  );
  const { service, publishFuncionario } = usePostFuncionarioService();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setFuncionario(prevFuncionario => ({
      ...prevFuncionario,
      [event.target.name]: event.target.value
    }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    publishFuncionario(funcionario).then(() => setFuncionario(initialFuncionarioState));
  };



  return (
    <div className="card sell-funcionario">
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            value={funcionario.nome}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Endereço</label>
          <input
            type="text"
            name="endereco"
            value={funcionario.endereco}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nascimento</label>
          <input
            type="date"
            name="nascimento"
            value={funcionario.nascimento}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Salário</label>
          <input
            type="number"
            name="salario"
            value={funcionario.salario}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Genêro</label>
          <input
            type="text"
            name="genero"
            value={funcionario.genero}
            onChange={handleChange}
          />
        </div>
        <div className="button-container">
          <button type="submit">Enviar</button>
        </div>
      </form>

      {service.status === 'loading' && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      {service.status === 'loaded' && (
        <div>Funcionario cadastrado com sucesso</div>
      )}
      {service.status === 'error' && (
        <div>
          Ocorreu um erro ao cadastrar o funcionário. Tente Novamente!
        </div>
      )}
    </div>
  );
};

export default Createfuncionario;
