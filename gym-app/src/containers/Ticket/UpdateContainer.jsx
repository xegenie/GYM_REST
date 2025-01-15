import React, { useState } from 'react'
import * as ticket from '../../apis/ticket'
import { useNavigate } from 'react-router-dom'
import TicketUpdatetForm from '../../components/admin/Ticket/TickeUpdateForm'

const UpdateContainer = () => {

  const navigate = useNavigate();

  const onUpdate = async (formData, headers) => {
    try {
      console.log('전달된 formData:', formData, headers);

      const response = await ticket.update(formData, headers);
      console.log('수정 성공:', response);

      alert('이용권이 성공적으로 수정되었습니다!');
      navigate('/admin/ticket/ticketList');

    } catch (error) {
      console.error('수정 실패:', error);
      alert('수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <TicketUpdatetForm onUpdate={onUpdate} ticket={ticket} />
  );
};

export default UpdateContainer;