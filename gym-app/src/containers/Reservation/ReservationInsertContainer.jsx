import React, { useEffect, useState } from 'react'
import * as reservation from '../../apis/reservation'
import ReservationInsert from '../../components/Reservation/ReservationInsert'
import { useParams } from 'react-router-dom'

const ReservationInsertContainer = () => {

  const [trainerProfile, setTrainerProfile] = useState([])
  const [reservationByTrainer, setReservationByTrainer] = useState([])
  // const [keyword, setKeyword] = useState('')
  // const [code, setCode] = useState(1)

  const {no} = useParams()

  

  const getData = async () => {

    const response = await reservation.sortByTrainer(no)
    const data = await response.data

    setTrainerProfile(data.trainerProfile)
    setReservationByTrainer(data.reservationByTrainer)

    console.dir(data);
    
  }
  
  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <ReservationInsert trainerProfile={trainerProfile} reservationByTrainer={reservationByTrainer} />
    </>
  )
}

export default ReservationInsertContainer
