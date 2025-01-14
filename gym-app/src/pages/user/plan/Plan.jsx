import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './planStyle.css'
import PlanContainer from '../../../containers/Plan/PlanContainer'
import DateContextProvider from "../../../contexts/DateContextProvider";
import Header from '../../../components/Header/adminHeader';
import Footer from '../../../components/Header/adminFooter';

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