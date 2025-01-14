import React from 'react'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

const MiniCalendar = () => {
  return (
    <div className='cal-container'>
      <div className="calendar">
        <div className="month">
          <a className="nav prev"><ChevronLeftRoundedIcon /></a>
          <div><span className="current-month"></span> <span className="year"></span></div>
          <a className="nav next"><ChevronRightRoundedIcon /></a>
        </div>
        <div className="days">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
        <div className="dates"></div>
      </div>
    </div>
  )
}

export default MiniCalendar