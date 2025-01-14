import React from 'react'
import MainCalendar from './MainCalendar'
import SideContainer from './SideContainer'

const PlanContent = () => {
  return (
    <div className='row d-flex flex-nowrap px-3'>
        <SideContainer />
        <MainCalendar />
    </div>
  )
}

export default PlanContent