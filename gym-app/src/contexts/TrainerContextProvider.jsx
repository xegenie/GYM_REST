import React, { createContext, useContext, useState } from 'react';
import * as trainerApi from '../apis/tarinerPorfile';

// Context 생성
const TrainerContext = createContext();

// Custom hook for TrainerContext
export const useTrainerContext = () => {
  const context = useContext(TrainerContext);
  if (!context) {
    throw new Error('useTrainerContext must be used within a TrainerContextProvider');
  }
  return context;
};

// Provider 컴포넌트
const TrainerContextProvider = ({ children }) => {
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 트레이너 목록 조회
  const fetchTrainers = async (keyword) => {
    setLoading(true);
    try {
      const response = await trainerApi.list(keyword);
      setTrainers(response.data); // response.data로 처리
      console.log('Trainers:', response.data);
      
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // 트레이너 상세 조회
  const fetchTrainerDetails = async (no) => {
    setLoading(true);
    try {
      const response = await trainerApi.select(no);
      setSelectedTrainer(response.data);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // 트레이너 등록
  const registerTrainer = async (formData, headers) => {
    setLoading(true);
    try {
      const response = await trainerApi.insert(formData, headers);
      setTrainers((prev) => [...prev, response.data]);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // 트레이너 수정
  const updateTrainer = async (formData, headers) => {
    setLoading(true);
    try {
      await trainerApi.update(formData, headers);
      fetchTrainers(); // 수정 후 목록 갱신
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // 트레이너 삭제
  const deleteTrainer = async (no) => {
    setLoading(true);
    try {
      await trainerApi.remove(no);
      setTrainers((prev) => prev.filter((trainer) => trainer.no !== no));
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TrainerContext.Provider
      value={{
        trainers,
        selectedTrainer,
        loading,
        error,
        fetchTrainers,
        fetchTrainerDetails,
        registerTrainer,
        updateTrainer,
        deleteTrainer,
      }}
    >
      {children}
    </TrainerContext.Provider>
  );
};

export default TrainerContextProvider;
