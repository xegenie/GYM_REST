import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import './Reservation.css'

const ReservationInsert = () => {
  return (
    <div className='ReservationInsert'>
      <div className="ReservationInsert-container">
        <div className="hr">
          <span>PT 예약</span>
        </div>
        <div className="trainer-info">
          <div className="info-container">
            <img src="/images/sample.jpg" alt="트레이너이미지" className='card-img-top' style={{
              width: '500px',
              height: '450px'
            }} />
            <div className="info">
              <h1>트레이너명</h1>
            </div>
          </div>
        </div>
        <div className="hr2"></div>
        <div id="calendar">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
          />
        </div>
        <div id="timeSelectionModal">
          <div className="modal-container">
            <div className="modal-info">
              <h3>예약 시간 선택</h3>
              <p id="selecteddate">선택한 날짜</p>
            </div>
            <div id="timeButtons"></div>
            <button>Close</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ReservationInsert
