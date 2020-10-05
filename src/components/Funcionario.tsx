import React from 'react';
import useFuncionarioByUrlService from '../services/useFuncionarioByUrlService';
import Loader from './Loader';

export interface Props {
  url: string;
  onClose(): void;
}

const Funcionario: React.FC<Props> = ({ url, onClose }) => {
  const service = useFuncionarioByUrlService(url);

  return (
    <div className="funcionario-modal-container">
      <div className="funcionario-modal-background" onClick={onClose} />

      {service.status === 'loading' && <Loader />}

      {service.status === 'loaded' && (
        <div className="funcionario">
          <h2>{service.payload.nome}</h2>

          <div className="price">
            {!!service.payload.salario &&
              service.payload.salario ? (
                <>
                  {new Intl.NumberFormat('en-US').format(
                    service.payload.salario
                  )}{' '}
                Credits
              </>
              ) : (
                'Call us for price'
              )}
          </div>

          <div className="funcionario-info">
            <div className="funcionario-info-item">
              <div className="label">Crew</div>
              <div className="data">{service.payload.genero}</div>
            </div>
            <div className="funcionario-info-item">
              <div className="label">Passengers</div>
              <div className="data">{service.payload.endereco}</div>
            </div>
          </div>
        </div>
      )}

      {service.status === 'error' && (
        <div className="funcionario">
          Ops, ocorreu um erro!
        </div>
      )}
    </div>
  );
};

export default Funcionario;
