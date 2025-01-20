import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './planStyle.css'
import PlanContainer from '../../../containers/Plan/PlanContainer'
import DateContextProvider from "../../../contexts/DateContextProvider";
import Header from '../../../components/header/header';
import Footer from '../../../components/Footer/footer';

const Plan = () => {
  return (
    <DateContextProvider>
        <Header />
        <PlanContainer />
        <Footer />
    </DateContextProvider>
  )
}

export default Plan