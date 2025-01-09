package com.gym.gym.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.util.UriComponentsBuilder;

import com.gym.gym.domain.Attendance;
import com.gym.gym.domain.CustomUser;
import com.gym.gym.domain.Option;
import com.gym.gym.domain.Page;
import com.gym.gym.domain.QRcode;
import com.gym.gym.service.AttendanceService;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    /**
     * 출석 내역 조회 (페이징 기능 포함)
     * 
     * @param model
     * @param option
     * @param page
     * @return
     */
    @GetMapping("/admin/attendance/list")
    public String list(Model model, Option option, Page page) throws Exception {
        List<Attendance> attendanceList = attendanceService.list(option, page);
        int result = attendanceService.listCount();
        model.addAttribute("attendanceList", attendanceList);
        model.addAttribute("option", option);
        model.addAttribute("rows", page.getRows());
        model.addAttribute("page", page);
        model.addAttribute("result", result);
        String pageUrl = UriComponentsBuilder.fromPath("/admin/attendance/list")
                .queryParam("keyword", option.getKeyword())
                .queryParam("code", option.getCode())
                .queryParam("rows", page.getRows())
                .queryParam("orderCode", option.getOrderCode())
                .build()
                .toUriString();

        model.addAttribute("pageUrl", pageUrl);

        return "admin/attendance/list";
    }

    // 출석 체크 페이지를 이동
    @GetMapping("user/attendance/check")
    public String showAttendancePage(@RequestParam("uuid") String uuid,
            Model model) {
        model.addAttribute("uuid", uuid);
        return "user/attendance/check";
    }

    // 출석 체크 (등록)
    @PostMapping("user/attendance/check")
    public String insertAttendance(@RequestParam("qrId") String qrId, @AuthenticationPrincipal CustomUser user,
            Model model, RedirectAttributes redirectAttributes) throws Exception {
        Long no = user.getNo();

        Attendance attendance = new Attendance();
        attendance.setUserNo(no);
        attendance.setQrId(qrId);
        attendanceService.insertAttendance(attendance);

        QRcode qRcode = attendanceService.selectQRcode(no);

        if (qRcode.getUuid().equals(qrId)) {
            return "redirect:/";
        }

        // 오류 메시지를 리다이렉트 시 전달
        redirectAttributes.addFlashAttribute("errorMessage", "유효하지 않은 QR 코드입니다.");
        return "redirect:/"; // 여기서 errorMessage가 전달됩니다.
    }
}
