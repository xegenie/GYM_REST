import React, { useEffect, useState } from 'react'
import ReservationCalendar from '../../components/Reservation/ReservationCalendar'
import * as reservation from '../../apis/reservation'
import { useLocation } from 'react-router-dom'

const ReservationCalendarContainer = () => {

  const [reservationList, setReservationList] = useState([])
  const [keyword, setKeyword] = useState('')
  const [code, setCode] = useState('')
  const location = useLocation()

  const updateByOption = () => {
    const query = new URLSearchParams(location.search);
    const newKeyword = query.get('keyword') || '';
    const newCode = query.get('code') || '';
    setKeyword(newKeyword);
    setCode(newCode);
  };

  const getReservationList = async () => {
    const response = await reservation.calendarList(keyword, code)
    const data = await response.data

    setReservationList(data)

  }

  const handleFilterChange = (type, value) => {
    const query = new URLSearchParams(location.search);
    query.set(type, value);
    const newUrl = `${location.pathname}?${query.toString()}`;
    window.history.pushState({}, '', newUrl);
    if (type === 'keyword') setKeyword(value);
    if (type === 'code') setCode(value);
  };

  useEffect(() => {
    getReservationList()
  }, [keyword, code])

  useEffect(() => {
    updateByOption()
  }, [location.search])

  return (
    <>
      <ReservationCalendar reservationList={reservationList} handleFilterChange={handleFilterChange} keyword={keyword} code={code}/>
    </>
  )
}

export default ReservationCalendarContainer
