package com.gym.gym.controller;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gym.gym.domain.Comment;
import com.gym.gym.domain.CustomUser;
import com.gym.gym.domain.Plan;
import com.gym.gym.domain.Reservation;
import com.gym.gym.domain.UserAuth;
import com.gym.gym.domain.Users;
import com.gym.gym.service.CommentService;
import com.gym.gym.service.PlanService;
import com.gym.gym.service.ReservationService;
import com.gym.gym.service.UserService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;



@Slf4j
@Controller
@EnableMethodSecurity(securedEnabled = true, prePostEnabled = true)
@RequestMapping("/user/schedule")
public class PlanController {
    
    @Autowired
    PlanService planService;

    @Autowired
    CommentService commentService;

    @Autowired
    ReservationService reservationService;

    @Autowired
    UserService userService;

    @GetMapping("/plan")
    @PreAuthorize(" hasRole('ADMIN') or hasRole('USER') or hasRole('TRAINER')")
    public String list(@AuthenticationPrincipal CustomUser userDetails, 
                       @RequestParam(value = "userNo", required = false) Long userNo,
                        Model model) throws Exception {
        Date currentDate = new Date();

        Date commentDate = DayFirst(currentDate);
        List<Date> dates = MonthFirstLast(currentDate);

        Date startDate = dates.get(0);
        Date endDate = dates.get(1);

        List<String> times24Hour = new ArrayList<>();
        List<String> times12Hour = new ArrayList<>();

        Users user = userDetails.getUser();
        UserAuth userAuth = userService.selectAuth(user.getNo());
        System.out.println("userAuth: " + userAuth);
        String userAuthAuth = userAuth.getAuth();
        System.out.println("userAuthAuth: " + userAuthAuth);
        System.out.println("userNo: " + userNo);
        // System.out.println("user: " + user);
        // String userAuth = user.getUserAuth();
        // List<UserAuth> authList = user.getAuthList();
        int iNo;
        
        if (userNo != null && (userAuthAuth.equals("ROLE_ADMIN") || userAuthAuth.equals("ROLE_TRAINER"))) {
            iNo = userNo.intValue();
        } 
        // ADMIN 또는 USER 역할인 경우 userNo 파라미터가 없을 때만 접근
        else if (userNo == null && (userAuthAuth.equals("ROLE_ADMIN") || userAuthAuth.equals("ROLE_USER"))) {
            iNo = userDetails.getNo().intValue();
        } 
        // 위의 조건에 맞지 않으면 403 오류 처리
        else {
            throw new AccessDeniedException("You are not authorized to access this resource.");
        }
        
        System.out.println("iNo : " + iNo);
        System.out.println("startDate : " + startDate);
        System.out.println("endDate : " + endDate);
        List<Plan> planList = planService.selectByStartEnd(iNo, startDate, endDate);
        Comment comment = commentService.selectByDate(commentDate, iNo);
        List<Reservation> reservationList = reservationService.selectByStartEnd(iNo, startDate, endDate);

        List<Map<String, Object>> planEvents = new ArrayList<>();
        for (Plan plan : planList) {
            Map<String, Object> event = new HashMap<>();
            event.put("id", plan.getNo());
            event.put("title", plan.getPlanName());
            event.put("start", plan.getPlanTime());
            event.put("end", plan.getPlanEnd());
            event.put("description", plan.getPlanContent());
            event.put("color","#FEBC6E");
            event.put("type", "plan");
            
            planEvents.add(event);
        }

        List<Map<String, Object>> reservationEvents = new ArrayList<>();
        for (Reservation rv : reservationList) {
            Map<String, Object> event = new HashMap<>();
            event.put("id", rv.getNo());
            event.put("title", rv.getTrainerName() + "PT");
            event.put("start", rv.getRvDate());
            event.put("end", CalcOneHourLater(rv.getRvDate()));
            event.put("description", rv.getTrainerName());
            event.put("type", "reservation");
            if (rv.getEnabled() == 2){
                event.put("color","#64FF98");
            } else {
                event.put("color","#64CBFF");
            }

            reservationEvents.add(event);
        }

        for (int i = 6; i <= 22; i++) {
            for (int j = 0; j < 60; j += 15) {
                String time24 = String.format("%02d:%02d", i, j);
                times24Hour.add(time24);
                
                // 12시간제 형식으로 변환
                try {
                    SimpleDateFormat sdf24 = new SimpleDateFormat("HH:mm", Locale.KOREA);
                    SimpleDateFormat sdf12 = new SimpleDateFormat("a h:mm", Locale.KOREA);
                    times12Hour.add(sdf12.format(sdf24.parse(time24)));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

        if(comment == null){
            comment = new Comment();
            comment.setCommentDate(commentDate);
            comment.setUserNo(iNo);
        }

        model.addAttribute("comment", comment);
        model.addAttribute("planEvents", planEvents);
        model.addAttribute("reservationEvents", reservationEvents);

        model.addAttribute("times24Hour", times24Hour);
        model.addAttribute("times12Hour", times12Hour);

        model.addAttribute("userAuthAuth", userAuthAuth);

        return "/user/plan/plan";
    }

    @ResponseBody
    @GetMapping("/plan/{year}/{month}/{day}")
    @PreAuthorize(" hasRole('ADMIN') or hasRole('USER') or hasRole('TRAINER')")
    public ResponseEntity<Map<String, Object>> listByDate(
                            @PathVariable("year") int year, 
                            @PathVariable("month") int month, 
                            @PathVariable("day") int day,
                            @RequestParam(value = "userNo", required = false) Long userNo,
                            @AuthenticationPrincipal CustomUser userDetails, Model model) throws Exception {
        
        Calendar calendar = Calendar.getInstance();
        calendar.set(year, month - 1, day); // 월은 0부터 시작하므로 -1 필요
        Date date = calendar.getTime();
        System.out.println("선택날짜(date): "+date);

        Date commentDate = DayFirst(date);
        System.out.println("선택날짜 0시0분(commentDate): " + commentDate);

        List<Date> dates = MonthFirstLast(date);
        System.out.println("선택날짜의 달 첫, 마지막 날: "+ dates);

        Date startDate = dates.get(0);
        Date endDate = dates.get(1);

        Users user = userDetails.getUser();
        UserAuth userAuth = userService.selectAuth(user.getNo());
        System.out.println("userAuth: " + userAuth);
        String userAuthAuth = userAuth.getAuth();
        System.out.println("userAuthAuth: " + userAuthAuth);
        System.out.println("userNo: " + userNo);

        int iNo;
        
        if (userNo != null && (userAuthAuth.equals("ROLE_ADMIN") || userAuthAuth.equals("ROLE_TRAINER"))) {
            iNo = userNo.intValue();
        } 
        // ADMIN 또는 USER 역할인 경우 userNo 파라미터가 없을 때만 접근
        else if (userNo == null && (userAuthAuth.equals("ROLE_ADMIN") || userAuthAuth.equals("ROLE_USER"))) {
            iNo = userDetails.getNo().intValue();
        } 
        // 위의 조건에 맞지 않으면 403 오류 처리
        else {
            throw new AccessDeniedException("You are not authorized to access this resource.");
        }
        
        System.out.println("iNo : " + iNo);
        List<Plan> planList = planService.selectByStartEnd(iNo, startDate, endDate);
        Comment comment = commentService.selectByDate(commentDate, iNo);
        List<Reservation> reservationList = reservationService.selectByStartEnd(iNo, startDate, endDate);
        
        System.out.println("planList: " + planList);
        System.out.println("comment: " + comment);
        System.out.println("reservationList: "+ reservationList);

        List<Map<String, Object>> planEvents = new ArrayList<>();
        for (Plan plan : planList) {
            Map<String, Object> event = new HashMap<>();
            event.put("id", plan.getNo());
            event.put("title", plan.getPlanName());
            event.put("start", plan.getPlanTime());
            event.put("end", plan.getPlanEnd());
            event.put("description", plan.getPlanContent());
            event.put("color","#FEBC6E");
            event.put("type", "plan");
            
            planEvents.add(event);
        }

        List<Map<String, Object>> reservationEvents = new ArrayList<>();
        for (Reservation rv : reservationList) {
            Map<String, Object> event = new HashMap<>();
            event.put("id", rv.getNo());
            event.put("title", rv.getTrainerName() + "PT");
            event.put("start", rv.getRvDate());
            event.put("end", CalcOneHourLater(rv.getRvDate()));
            event.put("description", rv.getTrainerName());
            event.put("color","#64CBFF");
            event.put("type", "reservation");

            reservationEvents.add(event);
        }

        Map<String,Object> response = new HashMap<>();

        if(comment == null){
            comment = new Comment();
            comment.setCommentDate(commentDate);
            comment.setUserNo(iNo);
        }

        response.put("comment", comment);
        response.put("planEvents", planEvents);
        response.put("reservationEvents", reservationEvents);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/insert")
    @PreAuthorize(" hasRole('ADMIN') or hasRole('USER')")
    public String insert(Plan plan, @AuthenticationPrincipal CustomUser userDetails) throws Exception {
        plan.setUserNo(userDetails.getNo().intValue());
        int result = planService.insert(plan);
        if (result > 0) {
            return "redirect:/user/schedule/plan";
        } 
        return "redirect:/user/schedule/insert?error";
    }

    @PostMapping("/delete")
    @PreAuthorize(" hasRole('ADMIN') or hasRole('USER')")
    public String delete(@RequestParam("no") String no) throws Exception {
        int iNo = Integer.parseInt(no); // String을 int로 변환
        int result = planService.delete(iNo);
        if (result > 0) {
            return "redirect:/user/schedule/plan";
        }
        return "redirect:/user/schedule/delete?error";
    }

    @PostMapping("/update")
    @PreAuthorize(" hasRole('ADMIN') or hasRole('USER')")
    public String update(Plan plan) throws Exception {
        System.out.println(plan);
        int result = planService.update(plan);
        if (result > 0) {
            return "redirect:/user/schedule/plan";
        } 
        return "redirect:/user/schedule/insert?error";
    }

    @PostMapping("/comment/update")
    @PreAuthorize(" hasRole('TRAINER')")
    public String updateComment(Comment comment, @AuthenticationPrincipal CustomUser userDetails) throws Exception {
        comment.setTrainerNo(userDetails.getNo().intValue());
        System.out.println("comment: " + comment);

        int result = commentService.updateByNo(comment);
        if (result > 0) {
            return "redirect:/user/schedule/plan?userNo="+comment.getUserNo();
        } 
        return "redirect:/user/schedule/comment/update?error";
    }
    
    @PostMapping("/comment/insert")
    @PreAuthorize(" hasRole('TRAINER')")
    public String insertComment(Comment comment, @AuthenticationPrincipal CustomUser userDetails) throws Exception {
        
        comment.setTrainerNo(userDetails.getNo().intValue());
        System.out.println("comment: " + comment);

        // Date commentDate = comment.getCommentDate();
        // LocalDate localDate = commentDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

        // int year = localDate.getYear();
        // int month = localDate.getMonthValue(); // 1~12
        // int day = localDate.getDayOfMonth();

        int result = commentService.insert(comment);
        if (result > 0) {
            return "redirect:/user/schedule/plan?userNo="+comment.getUserNo();
            // return "redirect:/user/schedule/plan/"+year+"/"+month+"/"+day+"?userNo="+comment.getUserNo();
        } 
        return "redirect:/user/schedule/comment/insert?error";
    }
    
    public List<Date> MonthFirstLast(Date date) {
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    
        int year = localDate.getYear();
        int month = localDate.getMonthValue();
    
        // YearMonth yearMonth = YearMonth.of(year, month);
        LocalDate firstDayOfMonth = LocalDate.of(year, month, 1);
        // LocalDate lastDayOfMonth = yearMonth.atEndOfMonth();
    
        // 이번 달의 첫째 날의 요일 (일요일 = 0, 월요일 = 1, ...)
        int firstDayOfWeek = firstDayOfMonth.getDayOfWeek().getValue() % 7;
    
        // 캘린더 시작 날짜: 이번 달 첫째 주의 일요일
        LocalDate calendarStartDate = firstDayOfMonth.minusDays(firstDayOfWeek);
    
        // 캘린더 종료 날짜: 마지막 주의 토요일
        LocalDate calendarEndDate = calendarStartDate.plusDays(41);
    
        Date startDate = Date.from(calendarStartDate.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()); // 00:00:00
        Date endDate = Date.from(calendarEndDate.atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant()); 
    
        List<Date> dates = new ArrayList<>();
        dates.add(startDate);
        dates.add(endDate);
    
        return dates;
    }

    public Date DayFirst(Date currentDate){
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate); // 현재 날짜 설정
        
        // 시간을 0시 0분으로 설정
        calendar.set(Calendar.HOUR_OF_DAY, 0); // 0시
        calendar.set(Calendar.MINUTE, 0);       // 0분
        calendar.set(Calendar.SECOND, 0);       // 0초
        calendar.set(Calendar.MILLISECOND, 0);  // 0밀리초
        
        // 0시 0분으로 설정된 Date 객체 가져오기
        Date resetDate = calendar.getTime();

        return resetDate;
    }

    public Date CalcOneHourLater(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);

        calendar.add(Calendar.HOUR, 1);

        Date oneHourLater = calendar.getTime();

        return oneHourLater;
    }
}