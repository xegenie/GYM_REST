import React from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';

const PlanInsertModal = () => {
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
              <span>1/13(월)</span>
            </div>
            <div className="set-time-drops">
              <div className="dropdown">
                <button type="button" id="dropdown-button-start">시작 시간</button>
                <div className="options" id="options-start">
                  {/* <div th:each="time, iterStat : ${times24Hour}"
                    th:text="${times12Hour[iterStat.index]}"
                    th:value="${time}" 
                    onClick="setTime('start', this)">
                  </div> */}
                </div>
              </div>
              <span>-</span>
              <div className="dropdown">
                <button type="button" id="dropdown-button-end">종료 시간</button>
                <div className="options" id="options-end">
                  {/* <div th:each="time, iterStat : ${times24Hour}"
                    th:text="${times12Hour[iterStat.index]}"
                    th:value="${time}" 
                    onClick="setTime('end', this)">
                  </div> */}
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