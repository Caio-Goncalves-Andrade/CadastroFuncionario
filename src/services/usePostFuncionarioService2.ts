import { useEffect, useState } from 'react';
import { Funcionario } from '../types/Funcionario';
import { Service } from '../types/Service';

export type PostFuncionario = Pick<
  Funcionario,
  'id' | 'nome' | 'endereco' | 'nascimento' | 'salario' | 'genero'

>;


const usePostfuncionarioService = (funcionario: PostFuncionario) => {
  const [result, setResult] = useState<Service<PostFuncionario>>({
    status: 'init'
  });

  useEffect(() => {
    setResult({ status: 'loading' });
    fetch('https://localhost:5001/api/funcionarios', {
      method: 'POST',
      body: JSON.stringify(funcionario)
    })
      .then(response => response.json())
      .then(response => {
        setResult({ status: 'loaded', payload: response });
      })
      .catch(error => {
        setResult({ status: 'error', error });
      });
  }, [funcionario]);

  return result;
};

export default usePostfuncionarioService;
