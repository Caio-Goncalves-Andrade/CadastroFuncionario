import { useState } from 'react';
import { Funcionario } from '../types/Funcionario';
import { Service } from '../types/Service';

export type PostFuncionario = Pick<
  Funcionario,
  'id' | 'nome' | 'endereco' | 'nascimento' | 'salario' | 'genero'

>;

const usePostFuncionarioService = () => {
  const [service, setService] = useState<Service<PostFuncionario>>({
    status: 'init'
  });

  const publishFuncionario = (funcionario: PostFuncionario) => {
    setService({ status: 'loading' });

    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    console.log(JSON.stringify(funcionario));

    return new Promise((resolve, reject) => {
      fetch('https://localhost:5001/api/funcionarios', {
        method: 'POST',
        body: JSON.stringify(funcionario),
        headers
      })
        .then(response => response.json())
        .then(response => {
          setService({ status: 'loaded', payload: response });
          resolve(response);
        })
        .catch(error => {
          setService({ status: 'error', error });
          reject(error);
        });
    });
  };

  return {
    service,
    publishFuncionario
  };
};

export default usePostFuncionarioService;
