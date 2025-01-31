
# 🏋️ **FIT NEXUS (REACT + REST API 전환 프로젝트)**

## [FIT NEXUS(Spring Boot + MyBatis 기반 프로젝트 바로가기](https://github.com/LimeYun/MSA9_GYM)
<h6>자세한 설계 및 담당기능은 해당 링크에 작성해 두었습니다.</h6>


--- 

<p>기존 MVC 패턴의 스프링부트 프로젝트에 REACT + REST API 설계 전환 작업한 프로젝트입니다.</p>

![image](https://github.com/user-attachments/assets/96702d24-8757-4c48-81d3-583a5e83b7cc)


---

# 📚 **프로젝트 목차**

### 1. 프로젝트 개요
### 2. API 문서
### 3. 학습포인트와 보완점



---


# :gear: 1. **프로젝트 개요**

### :bulb: 프로젝트 인원                 
- 5명                             

### :bulb: 프로젝트 기간
- 2025-01-13 ~ 2024-01-22

### :bulb: 추가된 기술  
<p>프론트엔드</p>  
<p>   
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black">  
</p>  

<p>백엔드</p>  
<p>   
  <img src="https://img.shields.io/badge/REST%20API-0052CC?style=flat-square&logo=apachesolr&logoColor=white">  
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white">  
</p>


# :gear: 2. **API 문서**


<details>
<summary>User 컨트롤러</summary>

### PUT
- **엔드포인트:** `/user`
- **설명:** 사용자 정보를 업데이트합니다.

### POST
- **엔드포인트:** `/user`
- **설명:** 새로운 사용자를 생성합니다.

### PUT
- **엔드포인트:** `/admin/update`
- **설명:** 관리자 정보를 업데이트합니다.

### POST
- **엔드포인트:** `/newPw`
- **설명:** 새로운 비밀번호를 요청합니다.

### POST
- **엔드포인트:** `/findPw`
- **설명:** 사용자의 비밀번호를 찾습니다.

### POST
- **엔드포인트:** `/findId`
- **설명:** 사용자의 ID를 찾습니다.

### POST
- **엔드포인트:** `/changePw`
- **설명:** 사용자의 비밀번호를 변경합니다.

### POST
- **엔드포인트:** `/admin/user/delete`
- **설명:** 사용자를 삭제합니다 (관리자 권한).

### GET
- **엔드포인트:** `/user/myBoardList/{no}`
- **설명:** 특정 ID로 사용자의 게시판 목록을 조회합니다.

### GET
- **엔드포인트:** `/user/list`
- **설명:** 모든 사용자 목록을 조회합니다.

### GET
- **엔드포인트:** `/user/info`
- **설명:** 로그인된 사용자 정보를 조회합니다.

### GET
- **엔드포인트:** `/admin/update/{no}`
- **설명:** 특정 ID로 관리자 업데이트 정보를 조회합니다.

### DELETE
- **엔드포인트:** `/user/{no}`
- **설명:** 특정 ID의 사용자를 삭제합니다.

</details>

<details>
<summary>Plan 컨트롤러</summary>

### GET
- **엔드포인트:** `/user/schedule`
- **설명:** 사용자의 일정을 조회합니다.

### PUT
- **엔드포인트:** `/user/schedule`
- **설명:** 사용자의 일정을 업데이트합니다.

### POST
- **엔드포인트:** `/user/schedule`
- **설명:** 사용자의 새로운 일정을 생성합니다.

### DELETE
- **엔드포인트:** `/user/schedule`
- **설명:** 사용자의 일정을 삭제합니다.

### PUT
- **엔드포인트:** `/user/schedule/comment`
- **설명:** 사용자의 일정에 댓글을 업데이트합니다.

### POST
- **엔드포인트:** `/user/schedule/comment`
- **설명:** 사용자의 일정에 댓글을 추가합니다.

### GET
- **엔드포인트:** `/user/schedule/{year}/{month}/{day}`
- **설명:** 특정 날짜의 사용자의 일정을 조회합니다.

</details>

<details>
<summary>Reservation 컨트롤러</summary>

### GET
- **엔드포인트:** `/user/myPage/ptList/{no}`
- **설명:** 특정 ID로 사용자의 PT 목록을 조회합니다.

### PUT
- **엔드포인트:** `/user/myPage/ptList/{no}`
- **설명:** 특정 ID로 사용자의 PT 목록을 업데이트합니다.

### GET
- **엔드포인트:** `/admin/reservation/list`
- **설명:** 모든 예약 목록을 조회합니다 (관리자 권한).

### PUT
- **엔드포인트:** `/admin/reservation/list`
- **설명:** 예약 목록을 업데이트합니다 (관리자 권한).

### POST
- **엔드포인트:** `/user/reservation/reservationInsert`
- **설명:** 사용자의 새로운 예약을 추가합니다.

### GET
- **엔드포인트:** `/user/reservation/reservationInsert/{no}`
- **설명:** 특정 ID로 예약 세부 정보를 조회합니다.

### GET
- **엔드포인트:** `/admin/reservation/calendar`
- **설명:** 예약 캘린더를 조회합니다 (관리자 권한).

</details>

<details>
<summary>BuyList 컨트롤러</summary>

### PUT
- **엔드포인트:** `/buyList/admin/{no}/cancel`
- **설명:** 특정 ID의 구매를 취소합니다 (관리자 권한).

### GET
- **엔드포인트:** `/buyList/admin`
- **설명:** 모든 구매 목록을 조회합니다 (관리자 권한).

### POST
- **엔드포인트:** `/buyList/admin`
- **설명:** 새로운 구매를 추가합니다 (관리자 권한).

### GET
- **엔드포인트:** `/buyList/users/{userNo}`
- **설명:** 특정 사용자 ID로 구매 목록을 조회합니다.

### GET
- **엔드포인트:** `/buyList/admin/sales`
- **설명:** 판매 데이터를 조회합니다 (관리자 권한).

</details>

<details>
<summary>Board 컨트롤러</summary>

### GET
- **엔드포인트:** `/board`
- **설명:** 모든 게시판을 조회합니다.

### PUT
- **엔드포인트:** `/board`
- **설명:** 게시판 정보를 업데이트합니다.

### POST
- **엔드포인트:** `/board`
- **설명:** 새로운 게시판을 생성합니다.

### GET
- **엔드포인트:** `/board/answerUpdate`
- **설명:** 게시판 답변 업데이트 정보를 조회합니다.

### PUT
- **엔드포인트:** `/board/answerUpdate`
- **설명:** 게시판 답변을 업데이트합니다.

### GET
- **엔드포인트:** `/board/{no}`
- **설명:** 특정 ID로 게시판 세부 정보를 조회합니다.

### DELETE
- **엔드포인트:** `/board/{no}`
- **설명:** 특정 ID의 게시판을 삭제합니다.

</details>

<details>
<summary>Answer 컨트롤러</summary>

### GET
- **엔드포인트:** `/answer`
- **설명:** 모든 답변을 조회합니다.

### PUT
- **엔드포인트:** `/answer`
- **설명:** 답변을 업데이트합니다.

### POST
- **엔드포인트:** `/answer`
- **설명:** 새로운 답변을 추가합니다.

### GET
- **엔드포인트:** `/answer/{no}`
- **설명:** 특정 ID로 답변 세부 정보를 조회합니다.

### DELETE
- **엔드포인트:** `/answer/{no}`
- **설명:** 특정 ID의 답변을 삭제합니다.

</details>

<details>
<summary>TrainerProfile 컨트롤러</summary>

### PUT
- **엔드포인트:** `/admin/trainer/update`
- **설명:** 트레이너 프로필 정보를 업데이트합니다 (관리자 권한).

### POST
- **엔드포인트:** `/admin/trainer/insert`
- **설명:** 새로운 트레이너 프로필을 추가합니다 (관리자 권한).

### GET
- **엔드포인트:** `/admin/trainer/trainerUsers`
- **설명:** 트레이너의 사용자 목록을 조회합니다.

### GET
- **엔드포인트:** `/admin/trainer/select`
- **설명:** 특정 트레이너 프로필 정보를 조회합니다.

### GET
- **엔드포인트:** `/admin/trainer/list`
- **설명:** 모든 트레이너 목록을 조회합니다.

### GET
- **엔드포인트:** `/admin/trainer/getTrainerNo`
- **설명:** 트레이너 ID를 조회합니다.

### DELETE
- **엔드포인트:** `/admin/trainer/delete`
- **설명:** 트레이너 프로필을 삭제합니다.

</details>

<details>
  <summary>Ticket 컨트롤러</summary>

### PUT
- **엔드포인트:** `/admin/ticket/update`
- **설명:** 티켓 정보를 업데이트합니다 (관리자 권한).

### POST
- **엔드포인트:** `/admin/ticket/insert`
- **설명:** 새로운 티켓을 추가합니다 (관리자 권한).

### GET
- **엔드포인트:** `/admin/ticket/select`
- **설명:** 티켓 정보를 조회합니다.

### GET
- **엔드포인트:** `/admin/ticket/list`
- **설명:** 모든 티켓 목록을 조회합니다.

### DELETE
- **엔드포인트:** `/admin/ticket/delete`
- **설명:** 티켓을 삭제합니다.

</details>

<details>
<summary>Home 컨트롤러</summary>

### POST
- **엔드포인트:** `/login`
- **설명:** 시스템에 로그인합니다.

### GET
- **엔드포인트:** `/join`
- **설명:** 회원가입 페이지로 이동합니다.

### POST
- **엔드포인트:** `/join`
- **설명:** 새로운 사용자를 등록합니다.

### GET
- **엔드포인트:** `/check/{id}`
- **설명:** ID의 사용 가능 여부를 확인합니다.

### GET
- **엔드포인트:** `/`
- **설명:** 홈페이지로 이동합니다.

</details>

<details>
<summary>QR 컨트롤러</summary>

### POST
- **엔드포인트:** `/generate-qr-code`
- **설명:** QR 코드를 생성합니다.

### POST
- **엔드포인트:** `/generate-qr-code/delete`
- **설명:** 생성된 QR 코드를 삭제합니다.

</details>

<details>
<summary>Attendance 컨트롤러</summary>

### GET
- **엔드포인트:** `/user/attendance/check/{uuid}`
- **설명:** UUID를 기반으로 사용자의 출석을 확인합니다.

### GET
- **엔드포인트:** `/admin/attendance/userCount`
- **설명:** 출석 중인 사용자 수를 조회합니다 (관리자 권한).

### GET
- **엔드포인트:** `/admin/attendance/list`
- **설명:** 출석 목록을 조회합니다 (관리자 권한).

</details>

<details>
<summary>Ranking 컨트롤러</summary>

### GET
- **엔드포인트:** `/ranking`
- **설명:** 랭킹 정보를 조회합니다.

</details>

<details>
<summary>File 컨트롤러</summary>

### GET
- **엔드포인트:** `/files/{profileNo}`
- **설명:** 프로필 번호를 기준으로 파일을 조회합니다.

### GET
- **엔드포인트:** `/files/{no}/thumbnail`
- **설명:** 파일 ID를 기준으로 썸네일을 조회합니다.

### GET
- **엔드포인트:** `/files/{no}/download`
- **설명:** 파일 ID를 기준으로 파일을 다운로드합니다.

### DELETE
- **엔드포인트:** `/files/{no}`
- **설명:** 파일 ID를 기준으로 파일을 삭제합니다.

</details>


# :gear: 3. **학습포인트와 보완점**


1. 왜 리액트를 사용하는가?
   


![image](https://github.com/user-attachments/assets/17a3cd02-571f-4991-9b17-d261b44f3eac)



![image](https://github.com/user-attachments/assets/07c08431-5e3c-4c70-9808-5c33f86c6bb9)

![image](https://github.com/user-attachments/assets/8106c7b5-7473-4382-94c7-55cdc7cddc87)

![image](https://github.com/user-attachments/assets/257b7f0c-b76a-4aa1-8c87-3c93937c10bd)

