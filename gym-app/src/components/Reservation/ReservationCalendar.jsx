import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Reservation.css'

const ReservationCalendar = ({ reservationList, trainerUserList, keyword, code, setKeyword, setCode }) => {


  const navigate = useNavigate()

  const formattedEvents = reservationList.map((event) => ({
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
    <div className="Reservation-calendar">
      <div className="select-trainer">
        <select id="trainerList" name='keyword' value={keyword} onChange={(e) => setKeyword(e.target.value)}>
          <option value="">전체</option>
          {trainerUserList.map((trainer) => (
            <option key={trainer.no} value={trainer.no}>{trainer.name}</option>
          ))}
        </select>
      {/* </div> */}
      {/* <div className="select-status"> */}
        <select id="code" name="code" value={code} onChange={(e) => setCode(e.target.value)}>
          <option value="0">전체</option>
          <option value="1">예약중</option>
          <option value="2">완료건</option>
        </select>
      </div>

      <div className="calendar-wrap">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="700px"
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

    </div>
  )
}

export default ReservationCalendar
