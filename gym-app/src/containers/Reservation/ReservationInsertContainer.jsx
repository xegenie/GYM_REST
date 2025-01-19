import React, { useEffect, useState } from 'react'
import * as reservation from '../../apis/reservation'
import ReservationInsert from '../../components/Reservation/ReservationInsert'

const ReservationInsertContainer = () => {

  const [trainerProfile, setTrainerProfile] = useState([])
  const [reservationByTrainer, setReservationByTrainer] = useState([])
  const [keyword, setKeyword] = useState('')
  const [code, setCode] = useState(1)


  const getData = async () => {

    const response = await reservation.sortByTrainer(keyword, code)
    const data = await response.data

    setTrainerProfile(data.trainerProfile)
    setReservationByTrainer(data.reservationByTrainer)
  }

  useEffect(() => {
    getData();
  }, [keyword, code])

  return (
    <>
      <ReservationInsert trainerProfile={trainerProfile} reservationByTrainer={reservationByTrainer} />
    </>
  )
}

export default ReservationInsertContainer
