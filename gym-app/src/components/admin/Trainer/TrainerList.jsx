import React from 'react'
import './css/TrainerList.css'
import Sidebar from '../Header/adminSidebar'

const TrainerList = ({ trainerList = [] }) => {
  return (
    <div className="adminTrainerList">
      <div className="container">
        <Sidebar />
        <div className="main">
          <div className="inner">
            <div
              className="mainTitle d-flex justify-content-center align-items-center"
            >
              <h1>트레이너</h1>
            </div>
            <div className="trainerForm row justify-content-center align-items-start">
              {trainerList.map((trainer) => (
                <div
                  key={trainer.no}
                  className="col-12 col-lg-3 col-md-6 d-flex justify-content-center"
                >
                  <div className="card mb-5">
                    <div className="img">
                      <img
                        src={`/api/files/${trainer.no}/thumbnail`}
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
                      <button className="updateBtn">수정</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerList;
