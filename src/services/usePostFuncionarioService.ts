import { useState } from 'react';
import { Funcionario } from '../types/Funcionario';
import { Service } from '../types/Service';



export type PostFuncionario = Pick<Funcionario,
  'id' | 'nome' | 'endereco' | 'nascimento' | 'salario' | 'genero'>;

const usePostFuncionarioService = () => {
  const [service, setService] = useState<Service<Funcionario>>({
    status: 'init'
  });

  const publishFuncionario = (funcionario: Funcionario) => {
    setService({ status: 'loading' });

    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');


    const myObjStr = JSON.stringify(funcionario.salario);
    console.log(funcionario);
    console.log(myObjStr);

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
