import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as trainerApi from '../../apis/trainerProfile';
import TrainerUpdateForm from '../../components/admin/Trainer/TrainerUpdateForm';

const UpdateContainer = () => {

  const navigate = useNavigate();
  const [trainerUsers, setTrainerUsers] = useState([])

  const onUpdate = async (formData, headers) => {
    console.log(formData, headers);
    
    try {
      console.log('전달된 formData:', formData, headers);
      for (let pair of formData.entries()) {
        console.log(pair[0]+ ', '+ pair[1]);
      }

      const response = await trainerApi.update(formData, headers);
      console.log('수정 성공:', response);

      alert('트레이너가 성공적으로 수정되었습니다!');
      navigate('/admin/trainer/list');

    } catch (error) {
      console.error('수정 실패:', error);
      alert('수정에 실패했습니다. 다시 시도해주세요.');
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

   // 삭제
   const onDelete = async (trainerNo) => {
    console.log('삭제할 트레이너 번호:', trainerNo);
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }
    // ticket.remove 호출시 올바르게 URL을 넘김
    const response = await trainerApi.remove(trainerNo);
    console.log(response.status);
    if (response.status === 204) {
      alert("삭제되었습니다.");
      navigate('/admin/trainer/list');
      getList(keyword); // 삭제 후 목록을 갱신
    } else {
      alert("삭제에 실패했습니다.");
    }
  };

  useEffect(() => {
    getTrainerUser(); // keyword가 변경될 때마다 getList 호출
  }, []);

  return (
    <TrainerUpdateForm onUpdate={onUpdate} trainerUsers={trainerUsers} onDelete={onDelete}/>
  );
};

export default UpdateContainer;
