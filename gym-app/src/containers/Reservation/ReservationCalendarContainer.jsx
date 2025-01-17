import React, { useEffect, useState } from 'react'
import ReservationCalendar from '../../components/Reservation/ReservationCalendar'
import * as reservation from '../../apis/reservation'
import { useLocation } from 'react-router-dom'
import { use } from 'react'

const ReservationCalendarContainer = () => {

  const [reservationList, setReservationList] = useState([])
  const [trainerUserList, setTrainerUserList] = useState([])
  const [keyword, setKeyword] = useState('')
  const [code, setCode] = useState(0)


  const getReservationList = async () => {
    const response = await reservation.calendarList(keyword, code)
    const data = await response.data
    
    setReservationList(data.reservationList)
    setTrainerUserList(data.trainerUserList)
  }

  useEffect(() => {
    getReservationList()
  }, [keyword, code])

  useEffect(() => {
    getReservationList()
  }, [])


  return (
    <>
      <ReservationCalendar 
      reservationList={reservationList} 
      trainerUserList={trainerUserList} 
      keyword={keyword} 
      code={code} 
      setKeyword={setKeyword}
      setCode={setCode} />
    </>
  )
}

export default ReservationCalendarContainer
