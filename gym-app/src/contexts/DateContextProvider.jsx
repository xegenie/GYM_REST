import React, { createContext, useContext, useEffect, useState } from 'react'
import * as plan from '../apis/plan'

const DateContext = createContext();

export const useDate = () => useContext(DateContext);

const DateContextProvider = ({children}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [comment, setComment] = useState();
  const [planList, setPlanList] = useState([]);
  const [rsvList, setRsvList] = useState([]);
  
  const [clickedPlan, setClickedPlan] = useState({id: null, title: '', eventStart: null, eventEnd: null, description: ''});
  const [clickedRsv, setClickedRsv] = useState({id: null, title: '', eventStart: null, eventEnd: null, description: ''});
  const [isPlanInsertVisible, setIsPlanInsertVisible] = useState(false);
  const [isPlanInfoVisible, setIsPlanInfoVisible] = useState(false);
  const [isRsvInfoVisible, setIsRsvInfoVisible] = useState(false);

  const getDataListByDate = async (date) => {
    console.log("getDataListByDate")
    const formDate = new Date(date)
    const year = formDate.getFullYear();
    const month = (formDate.getMonth() + 1);
    const day = formDate.getDate();
    // console.log(`year/month/day : ${year}/${month}/${day}`)
    const response = await plan.getPlansbyDate(year, month, day)
    const data = await response.data

    console.dir(data)
    console.dir(data.comment)
    console.dir(data.planEvents)
    console.dir(data.reservationEvents)

    setComment(data.comment)
    setPlanList(data.planEvents)
    setRsvList(data.reservationEvents)

  };

  const getDataList = async () => {
      const response = await plan.getPlans()
      const data = await response.data
      console.dir(response)
      console.dir(data)
      console.dir(data.comment)
      console.dir(data.planEvents)
      console.dir(data.reservationEvents)
  
      setComment(data.comment)
      setPlanList(data.planEvents)
      setRsvList(data.reservationEvents)
  
  };

  const formatPlanTime = (start, end) => {
    const startDate = new Date(start) 
    const endDate = new Date(end)
    const startHours = startDate.getHours();
    const endHours = endDate.getHours();

    const startTime = `${startHours >= 12? '오후':'오전'} ${startHours}:${startDate.getMinutes().toString().padStart(2, '0')}`
    const endTime = `${endHours >= 12? '오후':'오전'} ${endHours}:${endDate.getMinutes().toString().padStart(2, '0')}`
    const formattedDate = `${startDate.getMonth() + 1}/${startDate.getDate()} (${startDate.toLocaleDateString('ko-KR', { weekday: 'short' })})`;

    return { startTime: startTime, endTime: endTime, formattedDate: formattedDate }
  }

  useEffect(() => {
    console.log("DateContext currentDate : " + currentDate);
    getDataListByDate(currentDate);
  }, [currentDate])
    

  return (
    <DateContext.Provider value={{ 
      currentDate, setCurrentDate, comment, planList, rsvList, getDataList, formatPlanTime, 
      clickedPlan, setClickedPlan, clickedRsv, setClickedRsv,
      isPlanInsertVisible, setIsPlanInsertVisible, isPlanInfoVisible, setIsPlanInfoVisible,
      isRsvInfoVisible, setIsRsvInfoVisible,
      getDataListByDate
      }}>
      {children}
    </DateContext.Provider>
  )
}

export default DateContextProvider