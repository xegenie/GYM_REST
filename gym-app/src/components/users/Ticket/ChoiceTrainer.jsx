import React, { useEffect } from 'react';
import { useTrainerContext } from '../../../contexts/trainerContextProvider';
import './css/ChoiceTrainer.css';

const ChoiceTrainer = () => {
  const { trainers, fetchTrainers } = useTrainerContext();

  useEffect(() => {
    fetchTrainers('');
  }, []);

  return (
    <div className="ChoiceTrainer">
      <div className="container">
        <div className="title d-flex justify-content-center align-items-center mt-5" style={{ height: '200px' }}>
          <h1>트레이너</h1>
        </div>
        <div className="row justify-content-center align-items-center">
          {trainers.length > 0 ? (
            trainers.map((trainer) => (
              <div key={trainer.no} className="col-12 col-lg-3 col-md-6 d-flex justify-content-center">
                <div className="card mb-5">
                  <div className="img">
                      {
                      trainer.fileNo == null
                      ?
                      <img src={noImage} className='card-img-top'/>
                      :
                      <img src={`/api/files/${trainer.no}/thumbnail`} className='card-img-top' alt='트레이너 이미지'/>
                    }  
                  </div>
                  <div className="card-body">
                    <h5>{trainer.name} 트레이너</h5>
                    <div className="simple d-flex justify-content-center">
                      <span>[&nbsp;</span>
                      <p>{trainer.simpleInfo}</p>
                      <span>&nbsp;]</span>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between align-items-center">
                    <div className="userCount">
                      <span>함께하는 회원 수 : &ensp;</span>
                      <span>{trainer.userCount || 0}</span>
                    </div>
                    <a
                      className={`rounded-3 ${trainer.userCount >= 20 ? 'disabled' : ''}`}
                      href={`/user/ticket/trainerDetail?trainerNo=${trainer.no}`}
                      disabled={trainer.userCount >= 20}
                    >
                      선택
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>현재 트레이너 목록이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChoiceTrainer;
