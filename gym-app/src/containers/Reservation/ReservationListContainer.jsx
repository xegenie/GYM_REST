import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import * as reservation from '../../apis/reservation'
import ReservationList from '../../components/Reservation/ReservationList'
import ReservationPtList from '../../components/Reservation/ReservationPtList'
import * as Swal from '../../apis/alert'
import { LoginContext } from '../../contexts/LoginContextProvider'

const ReservationListContainer = () => {

  const {userInfo, isLoading, isLogin} = useContext(LoginContext)
  const [reservationList, setReservationList] = useState([])
  const [keyword, setKeyword] = useState('')
  const [option, setOption] = useState('')
  const [page, setPage] = useState(1)

  const navigate = useNavigate()

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
      const userNo = await userInfo.no
      response = await reservation.userByList(userNo, option, page)
    } else {
      response = await reservation.list(keyword, option, page)
    }

    const data = await response.data
    setReservationList(data)
  }

  useEffect(() => {
      getReservationList(); 
  }, [userInfo, keyword, option, page]);

  useEffect(() => {
    updatePage()
  }, [location.search])

  useEffect(() => {
  
     
     if(!isLogin){
         Swal.alert('로그인을 시도해주세요', '로그인 화면으로 이동합니다', 'warning', () => { navigate('/login')})
         return
       }
     
     if(isLoading) return
   
   }, [isLoading])
 
  const handleComplete = (reservationNo) => {
    openModal(reservationNo, 'complete')
  }

  const handleCancel = (reservationNo) => {
    openModal(reservationNo, 'cancel')
  }
  
  return (
    <>
    {location.pathname.includes('/myPage/ptList') ? (
      <ReservationPtList reservationList={reservationList} />
    ) : (
      <ReservationList reservationList={reservationList} />
    )}
  </>
  )
}

export default ReservationListContainer


