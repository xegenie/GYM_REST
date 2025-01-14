import React from 'react'
import MiniCalendar from './MiniCalendar'
import Comment from './Comment'

const SideContainer = () => {
  return (
    <div className='card first-con px-3 py-4'>
        <p className="text-center fw-semibold m-0" style={{fontSize: "32px"}}>운동 계획표</p>
        <MiniCalendar />
        <Comment />
    </div>
  )
}

export default SideContainer