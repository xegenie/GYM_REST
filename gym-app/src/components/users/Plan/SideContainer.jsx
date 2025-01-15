import React from 'react'
import MiniCalendar from './MiniCalendar'
import Comment from './Comment'
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const SideContainer = ({comment}) => {
  return (
    <div className='card first-con px-3 py-4'>
        <p className="text-center fw-semibold m-0" style={{fontSize: "32px"}}>운동 계획표</p>
        <hr />
        <div className="d-flex justify-content-end">
            <button 
              type="button" 
              className="p-3 border rounded-4 bg-white upd-schedule" 
              // style={{display: "none"}}
              >
                일정추가
                <AddRoundedIcon /> 
            </button>
        </div>
        <MiniCalendar />
        <Comment comment={comment} />
    </div>
  )
}

export default SideContainer