import React, { useEffect, useState } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import { useDate } from "../../../contexts/DateContextProvider";

const PlanInsertModal = ({times24Hour, times12Hour, setupDropdown}) => {

  const { currentDate, setCurrentDate, formatDate } = useDate();

  // ⚪❗ 초기값 세팅하기
  const [start, setStart] = useState(currentDate)
  const [end, setEnd] = useState(currentDate)
  const [formattedDate, setFormattedDate] = useState('');

  const setTime = (type, time) => {
    const isStart = type === "start"; 
    const baseDate = new Date(isStart ? start : end);
  
    const [hours, minutes] = time.split(':').map(Number); 
    baseDate.setHours(hours, minutes, 0);
    
    console.log(`${type}(setTime):`, baseDate);
    
    isStart ? setStart(baseDate) : setEnd(baseDate);
  };

  useEffect(() => {
    // 드롭다운 세팅
    const cleanupStart = setupDropdown("dropdown-button-start", "options-start");
    const cleanupEnd = setupDropdown("dropdown-button-end", "options-end");

    const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()} (${currentDate.toLocaleDateString('ko-KR', { weekday: 'short' })})`;
    setFormattedDate(formattedDate);

    return () => {
      cleanupStart();
      cleanupEnd();
    }
  }, [currentDate]);
  
  return (
    <div className='pop-up input-schedule'>
      <div className="popup-type">
        <div className="icons">
          <a className="input-schedule-close"><CloseRoundedIcon /></a>          
        </div>
      </div>
      <div className="popup-content">
        <form>
          <div className="popup-title-input">
            <input type="text" name="planName" placeholder="일정 제목 추가" />
          </div>
          <div className="set-time">
            <p><AccessTimeRoundedIcon /></p>
            <div className="set-time-date">
              <span>{formattedDate}</span>
            </div>
            <div className="set-time-drops">
              <div className="dropdown">
                <button type="button" id="dropdown-button-start">시작 시간</button>
                <div className="options" id="options-start">
                  {times24Hour.map((time, index) => (
                      <div 
                        key={time}
                        onClick={() => setTime('start', time)}
                      >
                       {times12Hour[index]} 
                      </div>
                  ))}
                </div>
              </div>
              <span>-</span>
              <div className="dropdown">
                <button type="button" id="dropdown-button-end">종료 시간</button>
                <div className="options" id="options-end">
                  {times24Hour.map((time, index) => (
                      <div 
                        key={time}
                        onClick={() => setTime('end', time)}
                      >
                       {times12Hour[index]} 
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <textarea name="planContent" placeholder="내용 입력"></textarea>
          <input type="hidden" name="planTime" id="planTime" />
          <input type="hidden" name="planEnd" id="planEnd" />
          <div className="button-container">
            <button type="submit" id="updPlanButton">저장</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PlanInsertModal