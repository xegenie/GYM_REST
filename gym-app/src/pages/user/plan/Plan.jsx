import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './planStyle.css'
import PlanContainer from '../../../containers/Plan/PlanContainer'
import DateContextProvider from "../../../contexts/DateContextProvider";

const Plan = () => {
  return (
    <DateContextProvider>
        <PlanContainer />
    </DateContextProvider>
  )
}

export default Plan