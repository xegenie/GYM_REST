import React, { useEffect, useState } from 'react'
import * as reservation from '../../apis/reservation'
import ReservationInsert from '../../components/Reservation/ReservationInsert'
import { useParams } from 'react-router-dom'

const ReservationInsertContainer = () => {

  const [trainerProfile, setTrainerProfile] = useState([])
  const [reservationByTrainer, setReservationByTrainer] = useState([])
  const [ptCount, setPtCount] = useState(0)

  const {no} = useParams()

  

  const getData = async () => {

    const response = await reservation.sortByTrainer(no)
    const data = await response.data

    setTrainerProfile(data.trainerProfile)
    setReservationByTrainer(data.reservationByTrainer)
    setPtCount(data.ptCount)

    console.dir(data);
    
  }
  
  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <ReservationInsert trainerProfile={trainerProfile} reservationByTrainer={reservationByTrainer} no={no} ptCount={ptCount}/>
    </>
  )
}

export default ReservationInsertContainer
