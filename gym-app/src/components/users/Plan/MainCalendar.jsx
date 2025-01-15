import React, { useEffect, useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useDate } from '../../../contexts/DateContextProvider';

const MainCalendar = () => {

  const { currentDate, setCurrentDate, planList, rsvList, setClickedPlan, setClickedRsv } = useDate();
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  useEffect(() => {
    var formattedevents = [planList, rsvList].flatMap(events =>
      events.map(event => ({
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        description: event.description,
        color: event.color,
        type: event.type
      }))
    );

    setEvents(formattedevents);
  }, [planList, rsvList])

  useEffect(() =>{
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(currentDate);
    }
  },[currentDate])
  
  const handlePrevButtonClick = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(newDate);
    }
    setCurrentDate(newDate);
  };

  const handleNextButtonClick = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(newDate);
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(newDate);
    }
  };

  const handleEvnetClick = (info) => {

    console.log('Event clicked:', info.event);
    console.log('Event title:', info.event.title);
    console.log('Event start:', info.event.start);
    console.log('Event end:', info.event.end);
    console.log('Event extendedProps:', info.event.extendedProps);
    const clickedEvent = {
      id: info.event.id, 
      title: info.event.title, 
      eventStart: info.event.start, 
      eventEnd: info.event.end, 
      description: info.event.extendedProps.description
    }
    switch (info.event.extendedProps.type) {
      case 'plan':
        setClickedPlan(clickedEvent)
        break;
      case 'reservation':
        setClickedRsv(clickedEvent)
        break;
      default:
        break;
    }
  }

  return (
    <div className="card flex-grow-1 flex-shrink-1">
      <div className="container flex-grow-1 flex-shrink-1 border-0">
        <FullCalendar
          ref={calendarRef}
          plugins={[ dayGridPlugin ]}
          initialView="dayGridMonth"
          locale={'ko'}
          events={events}
          customButtons={{
            myCustomPrevButton: {
              icon: 'chevron-left',
              click: handlePrevButtonClick,
            },
            myCustomNextButton: {
              icon: 'chevron-right',
              click: handleNextButtonClick,
            },
          }}
          headerToolbar={{
            left: 'title',
            right: 'myCustomPrevButton,myCustomNextButton',
          }}
          eventClick={handleEvnetClick}
        />
      </div>
    </div>
  )
}

export default MainCalendar