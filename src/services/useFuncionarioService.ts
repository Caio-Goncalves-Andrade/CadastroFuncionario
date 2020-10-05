import { useEffect, useState } from 'react';
import { Funcionario } from '../types/Funcionario';
import { Service } from '../types/Service';

export interface Funcionarios {
  funcionario: Funcionario[];
}

const useFuncionariosService = () => {
  const [result, setResult] = useState<Service<Funcionarios>>({
    status: 'loading'
  });

  useEffect(() => {
    fetch('https://localhost:5001/api/funcionarios')
      .then(response => response.json())
      .then(response => setResult({ status: 'loaded', payload: response }))
      .catch(error => setResult({ status: 'error', error }));
  }, []);

  console.log(result);

  return result;
};

export default useFuncionariosService;
