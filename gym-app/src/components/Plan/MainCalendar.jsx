import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const MainCalendar = () => {

  const events = [
    { title: 'Meeting', start: new Date() }
  ]

  return (
    <div className="card flex-grow-1 flex-shrink-1">
      <div className="container flex-grow-1 flex-shrink-1 border-0">
        <FullCalendar
          plugins={[ dayGridPlugin ]}
          initialView="dayGridMonth"
          locale={'ko'}
          events={events}
          customButtons={{
            myCustomPrevButton: {
              icon: 'chevron-left',
              // click: handlePrevButtonClick,
            },
            myCustomNextButton: {
              icon: 'chevron-right',
              // click: handleNextButtonClick,
            },
          }}
          headerToolbar={{
            left: 'title',
            right: 'myCustomPrevButton,myCustomNextButton',
          }}
        />
      </div>
    </div>
  )
}

export default MainCalendar