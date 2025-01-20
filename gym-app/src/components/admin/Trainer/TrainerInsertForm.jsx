import React, { useState } from 'react';
import './css/TrainerInsertForm.css';
import Sidebar from '../Header/adminSidebar';

const TrainerInsertForm = ({ onInsert, trainerUsers }) => {
  const [previewSrc, setPreviewSrc] = useState('');
  const [trainerNo, setTrainerNo] = useState('');
  const [formData, setFormData] = useState({});

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

  const handleTrainerChange = (event) => {
    const trainerId = event.target.value;
    if (trainerId) {
      fetch(`/admin/trainer/getTrainerNo?trainerId=${trainerId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('트레이너 정보를 가져올 수 없습니다.');
          }
          return response.text();
        })
        .then((data) => {
          setTrainerNo(data || '');
          setFormData({ ...formData, trainerId });
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('트레이너 번호를 가져오는 중 문제가 발생했습니다.');
        });
    } else {
      setTrainerNo('');
      setFormData({ ...formData, trainerId: '' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const headers = { 'Content-Type': 'multipart/form-data' };
    const submitData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });

    if (onInsert) {
      onInsert(submitData, headers);
    }
  };

  return (
    <div className="trainerForm">
      <div className="container">
        <Sidebar />
        <div className="main">
          <div className="inner">
            <div className="mainTitle">
              <h2>트레이너 등록</h2>
            </div>

            <div className="form">
              <form className="formInner" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="fileUpload">
                  <div className="fileUploadBox">
                    <span>클릭하여 파일 선택</span>
                    {previewSrc && <img className="insertImg" src={previewSrc} alt="" style={{ display: 'block' }} />}
                    <input
                      type="file"
                      name="fileList"
                      className="fileInput"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <table className='table'>
                  <tbody>
                    <tr className='tr'>
                      <th>이름(ID)</th>
                      <td className='td' style={{ width: '300px' }}>
                        <select className='select' name="trainerId" id="trainerId" onChange={handleTrainerChange}>
                          <option value="">선택하세요</option>
                          {/* 트레이너 목록을 동적으로 출력 */}
                          {trainerUsers?.map((trainerUser) => (
                            <option key={trainerUser.no} value={trainerUser.no}>
                              {`${trainerUser.name} (${trainerUser.id})`}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr className='tr'>
                      <th>트레이너 번호</th>
                      <td className='td'>
                        <input
                          className='input'
                          style={{ backgroundColor: '#eee' }}
                          type="text"
                          id="trainerNo"
                          name="trainerNo"
                          value={trainerNo}
                          readOnly
                        />
                      </td>
                    </tr>

                    <tr className='tr'>
                      <td className='td' style={{ width: '100%' }}>
                        <hr />
                      </td>
                    </tr>

                    <tr className='tr'>
                      <th>등록명</th>
                      <td className='td'>
                        <input className='input' type="text" name="name" placeholder="입력해 주세요." onChange={handleInputChange} />
                      </td>
                    </tr>
                    <tr className='tr'>
                      <th>간단한 소개</th>
                      <td className='td'>
                        <input className='input' type="text" name="simpleInfo" placeholder="입력해 주세요." onChange={handleInputChange} />
                      </td>
                    </tr>
                    <tr className='tr'>
                      <th>상세 소개</th>
                      <td className='td' style={{ paddingTop: '15px' }}>
                        <textarea className='textarea' name="detailInfo" rows="5" cols="40" placeholder="입력해 주세요." onChange={handleInputChange} />
                      </td>
                    </tr>

                    <tr className='tr' style={{ display: 'flex', justifyContent: 'end' }}>
                      <td className='td' colSpan="2">
                        <button className='button' type="submit">등록</button>
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

export default TrainerInsertForm;
