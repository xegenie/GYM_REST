import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // 쿼리 파라미터를 가져오기 위해 사용
import * as trainerApi from '../../../apis/trainerProfile';
import Sidebar from '../Header/adminSidebar';
import './css/TrainerInsertForm.css';

const TrainerUpdateForm = ({ onUpdate, trainerUsers, onDelete }) => {
  const location = useLocation(); // 현재 URL 정보 가져오기
  const [previewSrc, setPreviewSrc] = useState(''); // 이미지 미리보기 상태
  const [formData, setFormData] = useState({}); // 폼 데이터 상태
  const [trainerUserNo, setTrainerUserNo] = useState(''); // 트레이너 번호 상태
  const trainerNo = new URLSearchParams(location.search).get('no'); // 쿼리 파라미터에서 trainerNo 가져오기

  // trainerNo로 데이터를 로드하는 함수
  const fetchTrainerData = async (no) => {
    try {
      const response = await trainerApi.select(no); // Trainer 데이터 API 호출
      const trainerData = response.data;
      setFormData(trainerData); // 가져온 데이터를 formData에 설정
      setTrainerUserNo(trainerData.trainerNo); // 트레이너 번호 설정

      console.log('트레이너 데이터:', trainerData);

      // 파일 번호가 있는 경우 파일 API로 이미지 경로를 가져옵니다.
      if (trainerData.fileNo) {
        setPreviewSrc(`/api/files/${trainerData.no}/thumbnail`);
      }

    } catch (error) {
      console.error('트레이너 데이터 로드 오류:', error);
    }
  };

  const handleTrainerChange = (event) => {
    const selectedTrainerNo = event.target.value; // 선택된 값 가져오기
    setTrainerUserNo(selectedTrainerNo); // 트레이너 번호 업데이트
  };

  // 컴포넌트 로드 시 데이터 가져오기
  useEffect(() => {
    if (trainerNo) {
      fetchTrainerData(trainerNo);
    }
  }, [trainerNo]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewSrc(e.target.result);
      };
      reader.readAsDataURL(file);
      setFormData({ ...formData, fileList: file });
    } else {
      setPreviewSrc('');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // 폼 입력값 상태 업데이트
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const headers = { 'Content-Type': 'multipart/form-data' };
    const submitData = new FormData();
  
    // formData에 있는 모든 데이터를 submitData에 추가
    submitData.append('no', formData.no);
    submitData.append('trainerNo', trainerUserNo);
    submitData.append('name', formData.name);
    submitData.append('simpleInfo', formData.simpleInfo);
    submitData.append('detailInfo', formData.detailInfo);
    submitData.append('fileNo', formData.fileNo);
    if (formData.fileList) {
      submitData.append('fileList', formData.fileList);
    }

    
    // 제출 데이터 확인 (콘솔에 출력)
    for (let pair of submitData.entries()) {
      console.log(pair[0]+ ', '+ pair[1]);
    }
    
    if (onUpdate) {
      onUpdate(submitData, headers); // 업데이트 처리
    }
  };
  
  const handleDelete = (event) => {
    event.preventDefault();
    if (onDelete) {
      onDelete(trainerNo);
    }
  }

  return (
    <div className="trainerForm">
      <div className="container">
        <Sidebar />
        <div className="main">
          <div className="inner">
            <div className="mainTitle">
              <h2>트레이너 수정</h2>
            </div>

            <div className="form">
              <form className="formInner" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="fileUpload">
                  <div className="fileUploadBox">
                    <span>클릭하여 파일 선택</span>
                    {previewSrc && <img className="insertImg" src={previewSrc} alt="미리보기 이미지" style={{ display: 'block' }} />}
                    <input
                      type="file"
                      name="fileList"
                      className="fileInput"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <table className="table">
                  <tbody>
                    <tr className='tr'>
                      <th>이름(ID)</th>
                      <td className='td' style={{ width: '315px' }}>
                        <select className='select' name="trainerId" id="trainerId" onChange={handleTrainerChange} value={trainerUserNo || ''}>
                          <option value="">선택하세요</option>
                          {trainerUsers?.map((trainerUser) => (
                            <option key={trainerUser.no} value={trainerUser.no}>
                              {`${trainerUser.name} (${trainerUser.id})`}
                            </option>
                          ))}
                        </select>

                      </td>
                    </tr>
                    <tr className="tr">
                      <th>트레이너 번호</th>
                      <td className="td">
                        <input
                          className="input"
                          style={{ backgroundColor: '#eee' }}
                          type="text"
                          id="trainerNo"
                          name="trainerNo"
                          value={trainerUserNo || ''}
                          readOnly
                        />
                      </td>
                    </tr>
                    <tr className="tr">
                      <th>등록명</th>
                      <td className="td">
                        <input
                          className="input"
                          type="text"
                          name="name"
                          placeholder="입력해 주세요."
                          value={formData.name || ''}
                          onChange={handleInputChange}
                          maxLength={5}
                        />
                      </td>
                    </tr>
                    <tr className="tr">
                      <th>간단한 소개</th>
                      <td className="td">
                        <input
                          className="input"
                          type="text"
                          name="simpleInfo"
                          placeholder="입력해 주세요."
                          maxLength={13}  // 글자수 제한
                          value={formData.simpleInfo || ''}
                          onChange={handleInputChange}
                        />
                      </td>
                    </tr>
                    <tr className="tr">
                      <th>상세 소개</th>
                      <td className="td" style={{ paddingTop: '15px' }}>
                        <textarea
                          className="textarea"
                          name="detailInfo"
                          rows="5"
                          cols="40"
                          placeholder="입력해 주세요."
                          value={formData.detailInfo || ''}
                          onChange={handleInputChange}
                        />
                      </td>
                    </tr>
                    <tr className="tr" style={{ display: 'flex', justifyContent: 'end' }}>
                      <td className="td d-flex gap-2" colSpan="2">
                        <button className="button" type="submit" >
                          수정
                        </button>
                        <button className="button" onClick={handleDelete} style={{backgroundColor: "rgb(255, 74, 74)"}} >
                          삭제
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerUpdateForm;
