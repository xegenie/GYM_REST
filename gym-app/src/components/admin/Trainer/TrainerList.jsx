import React from 'react';
import Sidebar from '../Header/adminSidebar';
import './css/TrainerList.css';

const TrainerList = ({ trainerList = [], selectTrainer, keyword, onSearch }) => {
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

            <div className="searchContainer pb-3">
              <form
                className="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  const newkeyword = e.target.keyword.value;
                  onSearch(newkeyword); // handleSearch 호출
                }}
              >
                <input
                  type="text"
                  name="keyword"
                  placeholder="검색어를 입력해주세요"
                  className="searchInput"
                  defaultValue={keyword}
                />
                <button type="submit" className="button">검색</button>
              </form>
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
                        src={trainer.imagePath ?? `/api/files/${trainer.no}/thumbnail`}
                        alt="파일 이미지"
                        className="card-img-top"
                      />
                    </div>
                    <div className="cardBody">
                      <h5 className="pt-2" style={{ textAlign: 'center' }}>
                        {`${trainer.name} 트레이너`}
                      </h5>
                      <div className="simple d-flex justify-content-center">
                        <span>[&nbsp;</span>
                        <p>{trainer.simpleInfo}</p>
                        <span>&nbsp;]</span>
                      </div>
                    </div>
                    <div className="cardFooter p-2 d-flex justify-content-between align-items-center">
                      <div className="userCount">
                        <span>함께하는 회원 수: &ensp;</span>
                        <span>{trainer.userCount ?? 0}</span>
                      </div>
                      <button className="updateBtn" onClick={() => selectTrainer(trainer.trainerNo)}>
                        수정
                      </button>
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
