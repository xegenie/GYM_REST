import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ProfileList from './pages/admin/Profile/ProfileList'
import ProfileInsert from './pages/admin/Profile/ProfileInsert'
import ProfileUpdate from './pages/admin/Profile/ProfileUpdate'
import ReservationCalendarPage from './pages/admin/Reservation/ReservationCalendarPage'
import ReservationListPage from './pages/admin/Reservation/ReservationListPage'
import BuyList from './pages/admin/Sales/BuyList'
import SaleList from './pages/admin/Sales/SaleList'
import TicketInsert from './pages/admin/Ticket/TicketInsert'
import TicketListAdmin from './pages/admin/Ticket/TicketList'
import TicketUpdate from './pages/admin/Ticket/TicketUpdate'
import AttendanceList from './pages/admin/attendanceList'
import ReservationPtListPage from './pages/user/MyPage/ReservationPtListPage'
import PayResult from './pages/user/Pay/PayResult'
import Plan from './pages/user/Plan/Plan'
import ReservationInsertPage from './pages/user/Reservation/ReservationInsertPage'
import NormalTicket from './pages/user/Ticket/NormalTicket'
import PtTicket from './pages/user/Ticket/PtTicket'
import TicketList from './pages/user/Ticket/TicketList'
import TrainerList from './pages/user/Ticket/TrainerList'
import Check from './pages/user/check'
import QRCode from './pages/user/qrCode'
import Ranking from './pages/user/ranking'
import Login from './pages/user/User/Login'
import Join from './pages/user/User/Join'
import ResultId from './pages/user/User/ResultId'
import ChangePw from './pages/user/User/ChangePw'
import FindId from './pages/user/User/FindId'
import FindPw from './pages/user/User/FindPw'
import User from './pages/user/MyPage/User'
import UserList from './pages/admin/User/UserList'
import UserUpdate from './pages/admin/User/UserUpdate'
import LoginContextProvider from './contexts/LoginContextProvider';


function App() {

  return (
    <BrowserRouter>
     <LoginContextProvider>  
      <Routes>
        <Route path='/' element={ <Home /> }></Route>

        <Route path='/admin/profile' element={ <ProfileList /> }></Route>
        <Route path='/admin/profile/insert' element={ <ProfileInsert /> }></Route>
        <Route path='/admin/profile/update' element={ <ProfileUpdate /> }></Route>
        <Route path='/admin/reservation/calendar' element={ <ReservationCalendarPage /> }></Route>
        <Route path='/admin/reservation/list' element={ <ReservationListPage /> }></Route>
        <Route path='/admin/sales/buylist' element={ <BuyList /> }></Route>
        <Route path='/admin/sales/salelist' element={ <SaleList /> }></Route>
        <Route path='/admin/ticket/ticketInsert' element={ <TicketInsert /> }></Route>
        <Route path='/admin/ticket/ticketList' element={ <TicketListAdmin /> }></Route>
        <Route path='/admin/ticket/ticketUpdate' element={ <TicketUpdate /> }></Route>
        <Route path='/admin/attendanceList' element={ <AttendanceList /> }></Route>

        <Route path='/myPage/ptList' element={ <ReservationPtListPage /> }></Route>
        <Route path='/pay/payResult' element={ <PayResult /> }></Route>
        <Route path='/plan/plan' element={ <Plan /> }></Route>
        <Route path='/reservation/reservationInsert' element={ <ReservationInsertPage /> }></Route>
        <Route path='/ticket/normalTicket' element={ <NormalTicket /> }></Route>
        <Route path='/ticket/ptTicket' element={ <PtTicket /> }></Route>
        <Route path='/ticket/ticketList' element={ <TicketList /> }></Route>
        <Route path='/ticket/trainerList' element={ <TrainerList /> }></Route>
        <Route path='/user/attendance/check' element={ <Check /> }></Route>
        <Route path='/generate-qr-code' element={ <QRCode /> }></Route>
        <Route path='/ranking' element={ <Ranking /> }></Route>

        {/* 회원 정보 */}
        <Route path='/login' element={ <Login /> }></Route>
        <Route path='/join' element={ <Join /> }></Route>
        <Route path='/ResultId' element={ <ResultId /> }></Route>
        <Route path='/ChangePw' element={ <ChangePw /> }></Route>
        <Route path='/FindId' element={ <FindId /> }></Route>
        <Route path='/FindPw' element={ <FindPw /> }></Route>
        <Route path='/FindId' element={ <FindId /> }></Route>
        <Route path='/User' element={ <User /> }></Route>

        {/* 어드민 */}
        <Route path='/UserUpdate' element=
        { <UserUpdate /> }></Route>
        <Route path='/UserList' element={ <UserList /> }></Route>
      </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  )
}

export default App
