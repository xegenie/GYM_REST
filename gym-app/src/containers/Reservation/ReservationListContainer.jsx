import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import * as reservation from '../../apis/reservation'
import ReservationList from '../../components/Reservation/ReservationList'

const ReservationListContainer = () => {

  const [reservationList, setReservationList] = useState([])
  const [pagination, setPagination] = useState({})
  const [keyword, setKeyword] = useState('')
  const [option, setOption] = useState('')
  const [page, setPage] = useState(1)

  const location = useLocation()

  const updatePage = () => {
    const query = new URLSearchParams(location.search)
    const newKeyword = query.get('keyword') || ''
    const newOption = query.get('option') || ''
    const newPage = query.get('page') || 1
    setKeyword(newKeyword)
    setOption(newOption)
    setPage(newPage)
  }

  const getReservationList = async () => {
    let response 

    if (location.pathname.includes('/myPage/ptList')) {
      const userNo = 
      response = await reservation.userByList(userNo, option, page)
    } else {
      response = await reservation.list(keyword, option, page)
    }

    const data = await response.data
    setReservationList(data)
    setPagination(pagination)
  }

  useEffect(() => {
    getReservationList()
  }, [keyword, option, page])

  useEffect(() => {
    updatePage()
  }, [location.search])

  return (
    <>
      <ReservationList reservationList={reservationList} pagination={pagination}/>
    </>
  )
}

export default ReservationListContainer


