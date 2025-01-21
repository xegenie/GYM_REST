import React, { useEffect, useState } from 'react'
import * as trainerApi from '../../apis/trainerProfile'
import { useNavigate } from 'react-router-dom'
import TrainerInsertForm from '../../components/admin/Trainer/TrainerInsertForm';

const InsertContainer = () => {
  const navigate = useNavigate();
  const [trainerUsers, setTrainerUsers] = useState([])


  const onInsert = async (formData, headers) => {
    try {
      console.log('전달된 formData:', formData, headers);

      const response = await trainerApi.insert(formData, headers);
      console.log('등록 성공:', response);

      alert('트레이너가 성공적으로 등록되었습니다!');
      navigate('/admin/trainer/list');

    } catch (error) {
      console.error('등록 실패:', error);
      alert('등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const getTrainerUser = async () => {
    try {
      const response = await trainerApi.trainerUser();
      setTrainerUsers(response.data);
    } catch (error) {
      console.error('트레이너 목록 조회 실패:', error);
    }
  }

  useEffect(() => {
    getTrainerUser(); // keyword가 변경될 때마다 getList 호출
    }, []);

  return (
    <TrainerInsertForm onInsert={onInsert} trainerUsers={trainerUsers} />
  );
};

export default InsertContainer;