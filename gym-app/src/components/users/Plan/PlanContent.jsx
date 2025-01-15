import React from 'react'
import MainCalendar from './MainCalendar'
import SideContainer from './SideContainer'

const PlanContent = ({comment, planList, rsvList}) => {
  return (
    <div className='row d-flex flex-nowrap px-3'>
        <SideContainer comment={comment} />
        <MainCalendar planList={planList} rsvList={rsvList} />
    </div>
  )
}

export default PlanContent