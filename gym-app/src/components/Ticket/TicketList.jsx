import React from "react";
import Sidebar from "../Header/adminSidebar";
import styles from "./TicketList.module.css";

const TicketList = ({ ticketList, onDelete, onSearch, keyword, selectTicket }) => {

    const handleDelete = (e, type) => { 
        e.preventDefault(); 
        if (!window.confirm("정말 삭제하시겠습니까?")) 
            return; 
        const selectedTickets = [
            ...document.querySelectorAll(`input[name="ticketNos"]:checked`)].map(input => input.value); 
            if (selectedTickets.length === 0) { 
                alert("삭제할 이용권을 선택하세요."); 
                return; 
            } 
            onDelete(selectedTickets); 
        };


    const renderTickets = (type) => {
        // ticketList가 정의되지 않았거나 빈 배열일 경우에는 처리하지 않도록 하기
        if (!ticketList || ticketList.length === 0) {
            return (
                <div style={{ textAlign: "center", lineHeight: "500px", color: "#777" }}>
                    조회된 이용권이 없습니다.
                </div>
            );
        }

        const filteredTickets = ticketList.filter((ticket) => ticket.type === type);

        if (filteredTickets.length === 0) {
            return (
                <div style={{ textAlign: "center", lineHeight: "500px", color: "#777" }}>
                    조회된 이용권이 없습니다.
                </div>
            );
        }

        return filteredTickets.map((ticket) => (
            <div className={styles.ticketItem} key={ticket.no}>
                <div className={styles.checkbox}>
                    <input
                        type="checkbox"
                        className={styles.ticketCheckbox}
                        name="ticketNos"
                        value={ticket.no}
                    />
                </div>
                <div className={styles.ticketContent}>
                    <span className={styles.ticketName}>{ticket.name}</span>
                    <span className={styles.ticketInfo}>{ticket.info}</span>
                    <span className={styles.ticketPrice}>
                        {ticket.price.toLocaleString()}원
                    </span>
                </div>
                <div style={{ width: "69px" }}>
                    <buuton type="button" onClick={() => selectTicket(ticket.no)}
                        className={styles.updateBtn}> 수정 </buuton>
                </div>
            </div>
        ));
    };

    return (
        <div className='container'>
            <Sidebar />
            <div className={styles.main}>
                <div className={styles.inner}>
                    <div className={styles.mainTitle}>
                        <h2>이용권 목록</h2>
                    </div>

                    <div className={styles.searchContainer}>
                        <form
                            className={styles.search}
                            onSubmit={(e) => {
                                e.preventDefault();
                                const newkeyword = e.target.keyword.value;
                                onSearch(newkeyword); // handleSearch 호출
                            }}
                        >
                            <input
                                type="text"
                                name="keyword"
                                placeholder="검색어를 입력해주세요"
                                className={styles.searchInput}
                                defaultValue={keyword}
                            />
                            <button type="submit" className={styles.searchButton}>검색</button>
                        </form>
                    </div>

                    <div className={styles.list}>
                        <div className={styles.ticket}>
                            <div style={{ width: "100%", borderBottom: "1px solid #bbb" }}>
                                <label className={styles.normal}>일반 이용권</label>
                            </div>
                            <form onSubmit={(e) => handleDelete(e, "일반")}>
                                <div className={styles.items}>{renderTickets("일반")}</div>
                                <div className={styles.delete}>
                                    <button type="submit" className={styles.deleteBtn}>삭제</button>
                                </div>
                            </form>
                        </div>

                        <div className={styles.ticket}>
                            <div style={{ width: "100%", borderBottom: "1px solid #bbb" }}>
                                <label className={styles.pt}>PT 이용권</label>
                            </div>
                            <form onSubmit={(e) => handleDelete(e, "PT")}>
                                <div className={styles.items}>{renderTickets("PT")}</div>
                                <div className={styles.delete}>
                                    <button type="submit" className={styles.deleteBtn}>삭제</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketList;
