import React from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PersonIcon from '@mui/icons-material/Person';

const RsvInfoModal = () => {
  return (
    <div className="pop-up exercise-pt">
      <div className="popup-type">
        <p>PT 예약</p>
        <div className="icons">
          <a className="exercise-pt-close"><CloseRoundedIcon /></a>
        </div>
      </div>
      <div className="popup-content">
        <div className="popup-title">유산소 운동</div>
        <div className="time-info">
          <p><AccessTimeRoundedIcon /></p>
          <div className="plan-date">
            12/4 (수)
          </div>
          <div className="plan-time">
            <p className="plan-start-time"></p>
            <p>-</p>
            <p className="plan-end-time"></p>
          </div>
        </div>
        <div className="trainer-info">
          <p><PersonIcon /></p>
          <p className="trainer-name"></p>
        </div>
      </div>
    </div>
  )
}

export default RsvInfoModal