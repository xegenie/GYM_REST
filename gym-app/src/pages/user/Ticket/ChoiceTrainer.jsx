import React from 'react'
import TrainerList from '../../../components/users/Ticket/ChoiceTrainer'
import TrainerContextProvider from '../../../contexts/trainerContextProvider'

const ChoiceTrainer = () => {
  return (
    <TrainerContextProvider>
      <TrainerList />
    </TrainerContextProvider>
  )
}

export default ChoiceTrainer