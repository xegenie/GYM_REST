import React from 'react'
import TrainerList from '../../../components/users/Ticket/ChoiceTrainer'
import TrainerContextProvider from '../../../contexts/trainerContextProvider'
import Header from '../../../components/header/header'
import Footer from '../../../components/Footer/footer'

const ChoiceTrainer = () => {
  return (
    <TrainerContextProvider>
      <Header />
      <TrainerList />
      <Footer />
    </TrainerContextProvider>
  )
}

export default ChoiceTrainer