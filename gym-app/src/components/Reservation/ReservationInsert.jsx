import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Reservation.css';


const ReservationInsert = ({ trainerProfile, reservationByTrainer }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [timeButtons, setTimeButtons] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      generateTimeButtons(selectedDate);
    }
  }, [selectedDate]);

  const generateTimeButtons = (date) => {
    const buttons = [];
    for (let hour = 10; hour <= 21; hour++) {
      const selectedDateTime = new Date(`${date}T${hour}:00`);
      const isReserved = reservationByTrainer.some((reservation) => {
        const reservationDate = new Date(reservation.rvDate);
        return reservationDate.getTime() === selectedDateTime.getTime();
      });
      const isPast = selectedDateTime.getTime() <= new Date().getTime();

      buttons.push({
        time: `${hour}:00`,
        disabled: isReserved || isPast,
        isReserved,
      });
    }
    setTimeButtons(buttons);
  };

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setModalVisible(true);
  };

  const handleTimeClick = (time) => {
    if (confirm(`${selectedDate} ${time} 예약하시겠습니까?`)) {
      submitReservation(selectedDate, time);
    }
  };

  const submitReservation = (date, time) => {
    console.log(`예약한 시간: ${date} ${time}`);
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className='ReservationInsert'>
      <div className="ReservationInsert-container">
        <div className="hr">
          <span>PT 예약</span>
        </div>
        <div className="trainer-info">
          <div className="info-container">
            <img
              src="/images/sample.jpg"
              alt="트레이너이미지"
              className='card-img-top'
              style={{
                width: '500px',
                height: '450px',
              }}
            />
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
            dateClick={handleDateClick}
          />
        </div>
        {modalVisible && (
          <div
            id="timeSelectionModal"
            className={modalVisible ? 'show' : ''}
          >
            <div className="modal-container">
              <div className="modal-info">
                <p className='modal-info-timeSelect'>예약 시간 선택</p>
                <p id="selectedDate"> {selectedDate}</p>
              </div>
              <div id="timeButtons">
                {timeButtons.map((button, index) => (
                  <button
                    key={index}
                    disabled={button.disabled}
                    onClick={() => handleTimeClick(button.time)}
                    style={{
                      cursor: button.disabled ? 'not-allowed' : 'pointer',
                      backgroundColor: button.disabled ? 'gray' : 'royalblue',
                    }}
                  >
                    {button.time}
                  </button>
                ))}
              </div>
              <button className='modalCloseButton' onClick={closeModal}
              style={{
                width: "50px",
                border: "none",
                backgroundColor: "transparent",
                color: "#333",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "color 0.3s ease"
              }}
              >Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationInsert;
