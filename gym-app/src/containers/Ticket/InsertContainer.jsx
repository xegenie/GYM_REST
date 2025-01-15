import React from 'react'
import {insert} from '../../apis/ticket'
import { useNavigate } from 'react-router-dom'
import TicketInsertForm from '../../components/admin/Ticket/TicketInsertForm'

const InsertContainer = () => {
  const navigate = useNavigate();

  const onInsert = async (formData, headers) => {
    try {
      console.log('전달된 formData:', formData, headers);

      const response = await insert(formData, headers);
      console.log('등록 성공:', response);

      alert('이용권이 성공적으로 등록되었습니다!');
      navigate('/admin/ticket/ticketList');

    } catch (error) {
      console.error('등록 실패:', error);
      alert('등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <TicketInsertForm onInsert={onInsert} />
  );
};

export default InsertContainer;