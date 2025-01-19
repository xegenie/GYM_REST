import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import './Reservation.css'
import { useNavigate } from 'react-router-dom'

const ReservationInsert = ({ trainerProfile, reservationByTrainer }) => {

  const navigate = useNavigate()

  const formattedEvents = reservationByTrainer.map((event) => ({
    title: event.title,
    start: event.start,
    end: event.end,
    description: event.description,
    color: event.color,
    textColor: event.textColor,
    type: event.type,
    user_no: event.user_no,
    display: "block"
  }))


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
              <h1>{trainerProfile.name}</h1>
            </div>
          </div>
        </div>
        <div className="hr2"></div>
        <div id="calendar">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={formattedEvents}
            displayEventTime={false}
            dayMaxEventRows={3}
            eventDidMount={(info) => {
              const eventEl = info.el;
              eventEl.style.cursor = 'pointer';
  
              const originalColor = info.event.backgroundColor;
              const hoverColor =
                info.event.extendedProps.type === 'completed'
                  ? 'green'
                  : 'royalblue';
  
              eventEl.addEventListener('mouseover', () => {
                eventEl.style.backgroundColor = hoverColor;
              });
  
              eventEl.addEventListener('mouseout', () => {
                eventEl.style.backgroundColor = originalColor;
              });
  
              const date = info.event.startStr.slice(0, 10);
            }}
            eventClick={(info) => {
              const userNo = info.event.extendedProps.user_no;
              navigate(`/plan/plan?userNo=${userNo}`);
            }}
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
