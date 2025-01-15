import React, { createContext, useEffect, useState } from 'react'

export const PayContext = createContext();

const PayContextProvider = ({children}) => {

    const [ticketList, setTicketList] = useState([]);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    // IAMPORT 스크립트를 로드하는 useEffect
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.iamport.kr/v1/iamport.js';
        script.async = true;
        script.onload = () => setIsScriptLoaded(true);
        script.onerror = () => alert("IAMPORT 라이브러리 로드 실패.");
        document.body.appendChild(script);

        // 컴포넌트가 언마운트 될 때 스크립트 제거
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const contextValue = {
        ticketList,
        setTicketList,
        isScriptLoaded,  // 스크립트 로딩 여부
    };

    return (
        <PayContext.Provider value={contextValue}>
            {children}
        </PayContext.Provider>
    );
};

export default PayContextProvider