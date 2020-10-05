import React from 'react';
import useFuncionariosService from '../services/useFuncionarioService';
import Funcionario from './Funcionario';
import Loader from './Loader';

const Funcionarios: React.FC<{}> = () => {
  const service = useFuncionariosService();
  const [url, setUrl] = React.useState('');
  debugger

  return (
    <>
      <div className="card">
        {service.status === 'loading' && (
          <div className="loader-container">
            <Loader />
          </div>
        )}
        {service.status === 'loaded' &&
          //service.payload.results &&
          service.payload.funcionario.map(funcionario => (
            <div
              className="funcionario-item"
              onClick={() => setUrl(funcionario.url)}
              key={funcionario.url}
            >
              {funcionario.nome}
            </div>
          ))}
        {!!url && <Funcionario url={url} onClose={() => setUrl('')} />}
      </div>
      {service.status === 'error' && (
        <div>Erro ao conectar com a api!</div>
      )}
    </>
  );
};

export default Funcionarios;
