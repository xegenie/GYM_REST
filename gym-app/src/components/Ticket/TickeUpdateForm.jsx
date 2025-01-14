import React, { useState } from 'react';
import Sidebar from '../Header/adminSidebar';
import styles from './TicketInsertForm.module.css';

const TicketUpdateForm = ({ onUpdate, ticket }) => {
  const [formData, setFormData] = useState({
    name: ticket.name,
    price: ticket.price,
    info: ticket.info,
    months: ticket.months,
    type: ticket.type,
    ptCount: ticket?.ptCount || '0',
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

    onUpdate(form, headers);
  };

  return (
    <div className='container'>
      <Sidebar />
      <div className={styles.main}>
        <div className='inner'>
          <div className={styles.mainTitle}>
            <h2>이용권 수정</h2>
          </div>
          <div className={styles.form}>
            <form className={styles.formInner} onSubmit={onSubmit}>
              <div className={styles.preview}>
                <h3>미리보기</h3>
                <div className={styles.ticketItem}>
                  <div className={styles.checkbox}>
                    <input type="checkbox" disabled />
                  </div>
                  <div className={styles.ticketContent}>
                    <span className={styles.ticketName}>{formData.name || '상품명'}</span>
                    <span className={styles.ticketInfo}>{formData.info || '상세 소개'}</span>
                    <span className={styles.ticketPrice}>
                      {formData.price ? `${Number(formData.price).toLocaleString()} 원` : '가격'}
                    </span>
                  </div>
                </div>
              </div>

              <table className={styles.table}>
                <tbody>
                  <tr className={styles.tr}>
                    <th>상품명</th>
                    <td>
                      <input
                        type="text"
                        name="name"
                        placeholder="입력해 주세요."
                        value={formData.name}
                        onChange={handleChange}
                        className={styles.input}
                      />
                    </td>
                  </tr>
                  <tr className={styles.tr}>
                    <th>가격</th>
                    <td>
                      <input
                        type="number"
                        name="price"
                        placeholder="입력해 주세요."
                        value={formData.price}
                        onChange={handleChange}
                        className={styles.input}
                      />
                    </td>
                  </tr>
                  <tr className={styles.tr}>
                    <th>상세 소개</th>
                    <td>
                      <textarea
                        name="info"
                        rows="5"
                        cols="40"
                        placeholder="입력해 주세요."
                        value={formData.info}
                        onChange={handleChange}
                        className={styles.textarea}
                      />
                    </td>
                  </tr>
                  <tr className={styles.tr}>
                    <th>개월 수</th>
                    <td className={styles.td}>
                      <select
                        name="months"
                        value={formData.months}
                        onChange={handleChange}
                        className={styles.select}
                      >
                        {[...Array(12).keys()].map((i) => (
                          <option key={i + 1} value={i + 1}>
                            {`${i + 1}개월`}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr className={styles.tr}>
                    <th>타입</th>
                    <td className={styles.td}>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className={styles.select}
                      >
                        <option value="일반">일반</option>
                        <option value="PT">PT</option>
                      </select>
                      {formData.type === 'PT' && (
                        <select
                          name="ptCount"
                          value={formData.ptCount}
                          onChange={handleChange}
                          className={styles.select}
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
                  <tr className={styles.tr}>
                    <td colSpan="2" className={styles.buttonTd}>
                      <button type="submit" className={styles.button}>등록</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketUpdateForm;
