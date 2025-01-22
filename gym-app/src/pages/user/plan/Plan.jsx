import React, { useContext, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './planStyle.css'
import PlanContainer from '../../../containers/Plan/PlanContainer'
import DateContextProvider from "../../../contexts/DateContextProvider";
import Header from '../../../components/header/header';
import Footer from '../../../components/Footer/footer';
import { LoginContext } from '../../../contexts/LoginContextProvider';
import * as Swal from '../../../apis/alert';
import { useNavigate } from 'react-router-dom';

const Plan = () => {
  
  const {isLogin, userInfo, isLoading} = useContext(LoginContext)
  const navigate = useNavigate();

   useEffect(() => {
      if (isLoading) {
        // 로딩 중일 때는 아무 동작도 하지 않음
        return;
      }
    
      // 로딩 완료 후 로그인 여부 확인
      if (!isLogin) {
        Swal.alert('로그인을 시도해주세요', '로그인 화면으로 이동합니다', 'warning', () => {
          navigate('/login');
        });
        return;
      }
    
      // 로그인되어 있다면 userInfo를 확인
    }, [isLoading, isLogin, userInfo, navigate]);
  

  return (
    <DateContextProvider>
        <Header />
        <PlanContainer />
        <Footer />
    </DateContextProvider>
  )
}

export default Plan