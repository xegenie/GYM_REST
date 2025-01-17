import React from 'react'

const TrainerList = ({ trainerList = [] }) => {
  return (
    <div className="container">
      <div
        className="title d-flex justify-content-center align-items-center mt-5"
        style={{ height: '200px' }}
      >
        <h1>트레이너</h1>
      </div>
      <div className="row justify-content-center align-items-center">
        {trainerList.map((trainer) => (
          <div
            key={trainer.no}
            className="col-12 col-lg-3 col-md-6 d-flex justify-content-center"
          >
            <div className="card mb-5">
              <div className="img">
                <img
                  src={`/img?no=${trainer.no}`}
                  alt="파일 이미지"
                  className="card-img-top"
                />
              </div>
              <div className="card-body">
                <h5>{`${trainer.name} 트레이너`}</h5>
                <div className="simple d-flex justify-content-center">
                  <span>[&nbsp;</span>
                  <p>{trainer.simpleInfo}</p>
                  <span>&nbsp;]</span>
                </div>
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center">
                <div className="userCount">
                  <span>함께하는 회원 수: &ensp;</span>
                  <span>{trainer.userCount ?? 0}</span>
                </div>
                <a
                  className={`rounded-3 ${
                    trainer.userCount >= 20 ? 'disabled' : ''
                  }`}
                  href={`/user/ticket/trainerDetail?trainerNo=${trainer.no}`}
                  disabled={trainer.userCount >= 20}
                >
                  선택
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerList;
