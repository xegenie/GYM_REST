import React, { useState } from 'react'
import './css/TicketInsertForm.css'
import Sidebar from '../../admin/Header/adminSidebar';

const TicketInsertForm = ({ onInsert }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    info: '',
    months: '1',
    type: '일반',
    ptCount: '0', // PT 타입인 경우만 사용
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', formData.name);
    form.append('price', formData.price);
    form.append('info', formData.info);
    form.append('months', formData.months);
    form.append('type', formData.type);

    if (formData.type === 'PT') {
      form.append('ptCount', formData.ptCount);
    }

    const headers = {
      'Content-Type': 'application/json',
    };

    onInsert(form, headers);
  };

  return (
    <div className="ticketForm">
      <div className='container'>
        <Sidebar />
        <div className="main">
          <div className='inner'>
            <div className="mainTitle">
              <h2>이용권 등록</h2>
            </div>
            <div className="form">
              <form className="formInner" onSubmit={onSubmit}>
                <div className="preview">
                  <h3>미리보기</h3>
                  <div className="ticketItem">
                    <div className="checkbox">
                      <input type="checkbox" className="input" disabled />
                    </div>
                    <div className="ticketContent">
                      <span className="ticketName">{formData.name || '상품명'}</span>
                      <span className="ticketInfo">{formData.info || '상세 소개'}</span>
                      <span className="ticketPrice">
                        {formData.price ? `${Number(formData.price).toLocaleString()} 원` : '가격'}
                      </span>
                    </div>
                  </div>
                </div>

                <table className="table">
                  <tbody>
                    <tr className="tr">
                      <th>상품명</th>
                      <td className='td'>
                        <input
                          type="text"
                          name="name"
                          placeholder="입력해 주세요."
                          value={formData.name}
                          onChange={handleChange}
                          className="input"
                        />
                      </td>
                    </tr>
                    <tr className="tr">
                      <th>가격</th>
                      <td className='td'>
                        <input
                          type="number"
                          name="price"
                          placeholder="입력해 주세요."
                          value={formData.price}
                          onChange={handleChange}
                          className="input"
                        />
                      </td>
                    </tr>
                    <tr className="tr">
                      <th>상세 소개</th>
                      <td className='td'>
                        <textarea
                          name="info"
                          rows="5"
                          cols="40"
                          placeholder="입력해 주세요."
                          value={formData.info}
                          onChange={handleChange}
                          className="textarea"
                        />
                      </td>
                    </tr>
                    <tr className="tr">
                      <th>개월 수</th>
                      <td className="td">
                        <select
                          name="months"
                          value={formData.months}
                          onChange={handleChange}
                          className="select"
                        >
                          {[...Array(12).keys()].map((i) => (
                            <option key={i + 1} value={i + 1}>
                              {`${i + 1}개월`}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr className="tr">
                      <th>타입</th>
                      <td className="td">
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          className="select"
                        >
                          <option value="일반">일반</option>
                          <option value="PT">PT</option>
                        </select>
                        {formData.type === 'PT' && (
                          <select
                            name="ptCount"
                            value={formData.ptCount}
                            onChange={handleChange}
                            className="select"
                          >
                            {[1, 3, 5, 10, 20, 30, 40, 50].map((count) => (
                              <option key={count} value={count}>
                                {`${count}회`}
                              </option>
                            ))}
                          </select>
                        )}
                      </td>
                    </tr>
                    <tr className="tr">
                      <td colSpan="2" className="buttonTd">
                        <button type="submit" className="button">등록</button>
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

export default TicketInsertForm;
