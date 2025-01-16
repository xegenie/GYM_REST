import React, { useEffect, useState } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PersonIcon from '@mui/icons-material/Person';
import { useDate } from '../../../contexts/DateContextProvider';

const RsvInfoModal = ({onClose}) => {

  const { clickedRsv, formatPlanTime } = useDate();

  const [id, setId] = useState('');
  const [title, setTitle] = useState('')
  const [eventStart, setEventStart] = useState()
  const [eventEnd, setEventEnd] = useState()
  const [description, setDescription] = useState('트레이너 정보 없음')

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    setId(clickedRsv.id)
    setTitle(clickedRsv.title)
    setEventStart(clickedRsv.eventStart)
    setEventEnd(clickedRsv.eventEnd)
    setDescription(clickedRsv.description)
    formatPlanTime(clickedRsv.eventStart, clickedRsv.eventEnd)
    if (clickedRsv.eventStart && clickedRsv.eventEnd) {
      let { startTime, endTime, formattedDate } = formatPlanTime(clickedRsv.eventStart, clickedRsv.eventEnd);
      setStartTime(startTime);
      setEndTime(endTime);
      setFormattedDate(formattedDate);
    }

  }, [clickedRsv])

  return (
    <div className="pop-up exercise-pt">
      <div className="popup-type">
        <p>PT 예약</p>
        <div className="icons">
          <a className="exercise-pt-close" onClick={onClose}><CloseRoundedIcon /></a>
        </div>
      </div>
      <div className="popup-content">
        <div className="popup-title">{title}</div>
        <div className="time-info">
          <p><AccessTimeRoundedIcon /></p>
          <div className="plan-date">
            {formattedDate}
          </div>
          <div className="plan-time">
            <p className="plan-start-time">{startTime}</p>
            <p>-</p>
            <p className="plan-end-time">{endTime}</p>
          </div>
        </div>
        <div className="trainer-info">
          <p><PersonIcon /></p>
          <p className="trainer-name">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default RsvInfoModal