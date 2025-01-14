import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Home from './pages/Home'
import ProfileList from './pages/admin/Profile/ProfileList'
import ProfileInsert from './pages/admin/Profile/ProfileInsert'
import ProfileUpdate from './pages/admin/Profile/ProfileUpdate'
import Calendar from './pages/admin/Reservation/Calendar'
import List from './pages/admin/Reservation/List'
import BuyList from './pages/admin/Sales/BuyList'
import SaleList from './pages/admin/Sales/SaleList'
import TicketInsert from './pages/admin/Ticket/TicketInsert'
import TicketListAdmin from './pages/admin/Ticket/TicketList'
import TicketUpdate from './pages/admin/Ticket/TicketUpdate'
import AttendanceList from './pages/admin/attendanceList'
import PtList from './pages/user/MyPage/PtList'
import PayResult from './pages/user/Pay/PayResult'
import Plan from './pages/user/plan/Plan'
import ReservationInsert from './pages/user/Reservation/ReservationInsert'
import NormalTicket from './pages/user/Ticket/NormalTicket'
import PtTicket from './pages/user/Ticket/PtTicket'
import TicketList from './pages/user/Ticket/TicketList'
import TrainerList from './pages/user/Ticket/TrainerList'
import Check from './pages/user/check'
import QRCode from './pages/user/qrCode'
import Ranking from './pages/user/ranking'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home /> }></Route>

        <Route path='/admin/profile' element={ <ProfileList /> }></Route>
        <Route path='/admin/profile/insert' element={ <ProfileInsert /> }></Route>
        <Route path='/admin/profile/update' element={ <ProfileUpdate /> }></Route>
        <Route path='/admin/reservation/calendar' element={ <Calendar /> }></Route>
        <Route path='/admin/reservation/list' element={ <List /> }></Route>
        <Route path='/admin/sales/buylist' element={ <BuyList /> }></Route>
        <Route path='/admin/sales/salelist' element={ <SaleList /> }></Route>
        <Route path='/admin/ticket/ticketInsert' element={ <TicketInsert /> }></Route>
        <Route path='/admin/ticket/ticketList' element={ <TicketListAdmin /> }></Route>
        <Route path='/admin/ticket/ticketUpdate' element={ <TicketUpdate /> }></Route>
        <Route path='/admin/attendanceList' element={ <AttendanceList /> }></Route>

        <Route path='/myPage/ptList' element={ <PtList /> }></Route>
        <Route path='/pay/payResult' element={ <PayResult /> }></Route>
        <Route path='/plan/plan' element={ <Plan /> }></Route>
        <Route path='/reservation/reservationInsert' element={ <ReservationInsert /> }></Route>
        <Route path='/ticket/normalTicket' element={ <NormalTicket /> }></Route>
        <Route path='/ticket/ptTicket' element={ <PtTicket /> }></Route>
        <Route path='/ticket/ticketList' element={ <TicketList /> }></Route>
        <Route path='/ticket/trainerList' element={ <TrainerList /> }></Route>
        <Route path='/user/attendance/check' element={ <Check /> }></Route>
        <Route path='/generate-qr-code' element={ <QRCode /> }></Route>
        <Route path='/ranking' element={ <Ranking /> }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
