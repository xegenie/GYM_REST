package com.gym.gym.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gym.gym.domain.Attendance;
import com.gym.gym.domain.CustomUser;
import com.gym.gym.domain.Option;
import com.gym.gym.domain.Page;
import com.gym.gym.domain.QRcode;
import com.gym.gym.service.AttendanceService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    /**
     * 출석 내역 조회 (페이징 기능 포함)
     * 
     * @param option
     * @param page
     * @return
     */
    @GetMapping("/admin/attendance/list")
    public ResponseEntity<?> list(Option option, Page page) throws Exception {
        List<Attendance> attendanceList = attendanceService.list(option, page);
        int result = attendanceService.listCount();

        // 페이지 URL 생성
        String pageUrl = String.format("/api/admin/attendance/list?keyword=%s&code=%s&rows=%d&orderCode=%s",
                option.getKeyword(), option.getCode(), page.getRows(), option.getOrderCode());

        // 응답 객체에 데이터를 담아서 반환
        return ResponseEntity.ok(new AttendanceListResponse(attendanceList, option, page, result, pageUrl));
    }

    // 출석 체크 페이지를 이동
    @GetMapping("user/attendance/check")
    public ResponseEntity<?> showAttendancePage(@RequestParam("uuid") String uuid) {
        return ResponseEntity.ok(new AttendanceCheckPageResponse(uuid));
    }

    // 출석 체크 (등록)
    @PostMapping("user/attendance/check")
    public ResponseEntity<?> insertAttendance(@RequestParam("qrId") String qrId, @AuthenticationPrincipal CustomUser user) throws Exception {
        Long no = user.getNo();

        Attendance attendance = new Attendance();
        attendance.setUserNo(no);
        attendance.setQrId(qrId);
        attendanceService.insertAttendance(attendance);

        QRcode qRcode = attendanceService.selectQRcode(no);

        if (qRcode.getUuid().equals(qrId)) {
            return ResponseEntity.ok(new AttendanceResponse("출석 체크가 완료되었습니다."));
        }

        return ResponseEntity.badRequest().body(new AttendanceResponse("유효하지 않은 QR 코드입니다."));
    }

    // 출석 내역 조회 응답 클래스
    public static class AttendanceListResponse {
        private List<Attendance> attendanceList;
        private Option option;
        private Page page;
        private int result;
        private String pageUrl;

        public AttendanceListResponse(List<Attendance> attendanceList, Option option, Page page, int result, String pageUrl) {
            this.attendanceList = attendanceList;
            this.option = option;
            this.page = page;
            this.result = result;
            this.pageUrl = pageUrl;
        }

        public List<Attendance> getAttendanceList() {
            return attendanceList;
        }

        public Option getOption() {
            return option;
        }

        public Page getPage() {
            return page;
        }

        public int getResult() {
            return result;
        }

        public String getPageUrl() {
            return pageUrl;
        }
    }

    // 출석 체크 페이지 응답 클래스
    public static class AttendanceCheckPageResponse {
        private String uuid;

        public AttendanceCheckPageResponse(String uuid) {
            this.uuid = uuid;
        }

        public String getUuid() {
            return uuid;
        }
    }

    // 출석 체크 응답 클래스
    public static class AttendanceResponse {
        private String message;

        public AttendanceResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }
}
