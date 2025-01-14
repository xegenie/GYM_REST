import React, { createContext, useContext, useState } from 'react'

const DateContext = createContext();

export const useDate = () => useContext(DateContext);

const DateContextProvider = ({children}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
  return (
    <DateContext.Provider value={{ currentDate, setCurrentDate }}>
      {children}
    </DateContext.Provider>
  )
}

export default DateContextProvider