import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';

const PlanInfoModal = ({times24Hour, times12Hour, setupDropdown}) => {

  // ⚪❗ 초기값 세팅하기
  const [startEdit, setStartEdit] = useState(new Date())
  const [endEdit, setEndEdit] = useState(new Date())

  const setTime = (type, time) => {
    const isStartEdit = type === "startEdit"; 
    const baseDate = new Date(isStartEdit ? startEdit : endEdit);
  
    const [hours, minutes] = time.split(':').map(Number); 
    baseDate.setHours(hours, minutes, 0);
    
    console.log(`${type}(setTime):`, baseDate);
    
    isStartEdit ? setStartEdit(baseDate) : setEndEdit(baseDate);
  };

  useEffect(() => {
    const cleanupStart = setupDropdown("dropdown-edit-start", "options-edit-start");
    const cleanupEnd = setupDropdown("dropdown-edit-end", "options-edit-end");

    return () => {
      cleanupStart();
      cleanupEnd();
    }
  }, []);

  return (
    <div className="pop-up exercise-bymyself">
      <form id="deleteForm" >
        <input type="hidden" name="no" id="eventIdInput" className="hiddenNo" />
        <div className="popup-type">
          <p>자율 운동</p>
          <div className="icons">
            <a id="editIcon"><EditIcon /></a>
            <a data-event-id="" id="deleteIcon"><DeleteIcon /></a>
            <a className="exercise-bymyself-close"><CloseRoundedIcon /></a>
          </div>
        </div>
      </form>
      <div className="popup-content edit-before" >
        <div className="popup-title">유산소 운동</div>
        <div className="time-info">
          <p><AccessTimeRoundedIcon /></p>
          <div className="plan-date">
            
          </div>
          <div className="plan-time">
            <p className="plan-start-time"></p>
            <p>-</p>
            <p className="plan-end-time"></p>
          </div>
        </div>
        <hr />
        <div className="plan-detail"><br />
        </div>
      </div>
      <div className="popup-edit" style={{display:"none"}}>
        <form id="updateForm">
          <input type="hidden" name="no" className="hiddenNo" />
          <div className="popup-title-input">
            <input type="text" name="planName" />
          </div>
          <div className="set-time">
            <p><AccessTimeRoundedIcon /></p>
            <div className="plan-date">
              
            </div>
            <div className="set-time-drops">
              <div className="dropdown">
                <button type="button" id="dropdown-edit-start">시작 시간</button>
                <div className="options" id="options-edit-start">
                  {times24Hour.map((time, index) => (
                      <div 
                        key={time}
                        onClick={() => setTime('startEdit', time)}
                      >
                       {times12Hour[index]} 
                      </div>
                  ))}
                </div>
              </div>
              <span>-</span>
              <div className="dropdown">
                <button type="button" id="dropdown-edit-end">종료 시간</button>
                <div className="options" id="options-edit-end">
                  {times24Hour.map((time, index) => (
                      <div 
                        key={time}
                        onClick={() => setTime('endEdit', time)}
                      >
                       {times12Hour[index]} 
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <textarea name="planContent" placeholder="내용 입력"></textarea>
          <div className="button-container">
            <button type="button" id="cancelButton">취소</button>
            <button type="submit" id="updateButton">수정</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PlanInfoModal