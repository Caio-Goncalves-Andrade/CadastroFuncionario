import { useEffect, useState } from 'react';
import { Funcionario } from '../types/Funcionario';
import { Service } from '../types/Service';

const useFuncionarioByUrlService = (url: string) => {
  const [result, setResult] = useState<Service<Funcionario>>({
    status: 'loading'
  });

  useEffect(() => {
    if (url) {
      setResult({ status: 'loading' });
      fetch(url)
        .then(response => response.json())
        .then(response => setResult({ status: 'loaded', payload: response }))
        .catch(error => setResult({ status: 'error', error }));
    }
  }, [url]);

  return result;
};

export default useFuncionarioByUrlService;
