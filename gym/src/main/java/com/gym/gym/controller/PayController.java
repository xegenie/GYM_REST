package com.gym.gym.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gym.gym.domain.BuyList;
import com.gym.gym.domain.CustomUser;
import com.gym.gym.domain.Page;
import com.gym.gym.domain.Ticket;
import com.gym.gym.domain.TrainerProfile;
import com.gym.gym.domain.Users;
import com.gym.gym.service.BuyListService;
import com.gym.gym.service.TicketService;
import com.gym.gym.service.TrainerProfileService;
import com.gym.gym.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("/user")
public class PayController {

    @Autowired
    private BuyListService buyListService;
    @Autowired
    private TrainerProfileService trainerProfileService;
    @Autowired
    private TicketService ticketService;
    @Autowired
    private UserService userService;

    // 이용권 선택
    @GetMapping("/ticket/choice")
    public String choice(@AuthenticationPrincipal CustomUser userDetails, Model model) throws Exception {

        Long no = 0L;
        List<BuyList> buyList = new ArrayList<>();
        if (userDetails != null) {
            no = userDetails.getNo();
            buyList = buyListService.ticketByUser(no);
        }
        
        // 정상이면서 제일 오래된 이용권
        List<BuyList> filteredList = buyList.stream()
                                    .sorted(Comparator.comparing(BuyList::getStartDate)) // 날짜 순으로 정렬
                                    .collect(Collectors.toList());
        BuyList oldestBuyList = filteredList.isEmpty() ? null : filteredList.get(0);
        
        model.addAttribute("buyList", buyList);
        model.addAttribute("oldestBuyList", oldestBuyList);


        return "/user/ticket/choice";
    }

    
    // 트레이너 목록
    @GetMapping("/ticket/trainerList")
    public String trainerList(Model model)
    throws Exception {

        List<TrainerProfile> trainerList = trainerProfileService.list();

        model.addAttribute("trainerList", trainerList);

        return "/user/ticket/trainerList";
    }

    // 일반 이용권
   
    @GetMapping("/ticket/normal")
    public String normal(@AuthenticationPrincipal CustomUser userDetails, Model model) throws Exception {
        // 티켓 조회
        List<Ticket> ticketList = ticketService.normalList();
        model.addAttribute("ticketList", ticketList);

        // 유저 조회
        if (userDetails != null) {
            Users user = userService.select(userDetails.getNo());
            model.addAttribute("user", user);

            // 최근 구매내역 전달
            BuyList lastBuy = buyListService.lastBuyList(userDetails.getNo());
            Date startDate = new Date();
            if (lastBuy != null && !"만료".equals(lastBuy.getStatus())) {
                startDate = lastBuy.getEndDate(); // 마지막 구매 날짜
                startDate = addDays(startDate, 1); // 1일 추가
            }

            model.addAttribute("startDate", startDate); // 처리된 날짜를 모델에 담기
        }

        // 보유중인 이용권
        Long no = 0L;
        List<BuyList> buyList = new ArrayList<>();
        if (userDetails != null) {
            no = userDetails.getNo();
            buyList = buyListService.ticketByUser(no);
        }
        model.addAttribute("buyList", buyList);

        // 정상이면서 제일 오래된 이용권
        List<BuyList> filteredList = buyList.stream()
                .sorted(Comparator.comparing(BuyList::getStartDate)) // 날짜 순으로 정렬
                .collect(Collectors.toList());
        BuyList oldestBuyList = filteredList.isEmpty() ? null : filteredList.get(0);
        
        model.addAttribute("oldestBuyList", oldestBuyList);

        return "/user/ticket/normal";
    }

    // 트레이너 상세
    @GetMapping("/ticket/trainerDetail")
    public String trainerDetail(@RequestParam("trainerNo") int trainerNo, Model model
    , @AuthenticationPrincipal CustomUser userDetails) throws Exception {
        // 트레이너 프로필 정보
        TrainerProfile trainerProfile = trainerProfileService.select(trainerNo);
        model.addAttribute("trainer", trainerProfile);

        // 티켓 조회
        List<Ticket> ticketList = ticketService.ptList();
        model.addAttribute("ticketList", ticketList);
        
        // 유저 조회
        if (userDetails != null) {
            Users user = userService.select(userDetails.getNo());
            model.addAttribute("user", user);
            
            // 최근 구매내역 전달
            BuyList lastBuy = buyListService.lastBuyList(userDetails.getNo());
            Date startDate = new Date();
            if (lastBuy != null && !"만료".equals(lastBuy.getStatus())) {
                startDate = lastBuy.getEndDate(); // 마지막 구매 날짜
                startDate = addDays(startDate, 1); // 1일 추가
            }

            model.addAttribute("startDate", startDate); // 처리된 날짜를 모델에 담기
        }
        // 보유중인 이용권
        Long no = 0L;
        List<BuyList> buyList = new ArrayList<>();
        if (userDetails != null) {
            no = userDetails.getNo();
            buyList = buyListService.ticketByUser(no);
        }
        
        // 정상이면서 제일 오래된 이용권
        List<BuyList> filteredList = buyList.stream()
        .sorted(Comparator.comparing(BuyList::getStartDate)) // 날짜 순으로 정렬
        .collect(Collectors.toList());
        BuyList oldestBuyList = filteredList.isEmpty() ? null : filteredList.get(0);
        
        model.addAttribute("buyList", filteredList);
        model.addAttribute("oldestBuyList", oldestBuyList);

        return "/user/ticket/trainerDetail";
    }
    
    // 날짜에 일수를 더하는 메서드
    private Date addDays(Date date, int days) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, days); // 날짜에 일수를 더함
        return calendar.getTime(); // 수정된 날짜 반환
    }
    
    // 구매목록에 추가
    @PreAuthorize(" hasRole('ADMIN') or hasRole('USER') or hasRole('TRAINER')")
    @PostMapping("/pay/paying")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> paying(@AuthenticationPrincipal CustomUser userDetails, @RequestBody BuyList buyList) throws Exception {
        // 구매 목록 추가
        buyListService.insert(buyList);
        log.info("buyList : " + buyList);
        
        // 응답에 success=true를 포함한 JSON 객체 반환
        Map<String, Object> response = new HashMap<>();
        response.put("success", true); // success 필드 설정
        
        if(userDetails != null){
            // 로그인된 유저에 트레이너 넘버 저장
            userDetails.getUser().setTrainerNo(buyList.getTrainerNo());
            log.info("트레이너넘버 확인 " + userDetails.getUser().getTrainerNo());

            
            // jakarta.servlet.http.HttpSession session = request.getSession();
            // log.info(":::::::::: 결제 화면 ::::::::::");
            //     TrainerProfile trainerProfile = trainerProfileService.selectTrainer(buyList.getTrainerNo());
            //     session.setAttribute("trainerProfile", trainerProfile);
        }
        return ResponseEntity.ok(response);
    }

    // 결제 페이지
    @GetMapping("/pay/payResult")
    public String payResult(@AuthenticationPrincipal CustomUser userDetails, Model model) throws Exception {

        Long no = 0L;
        List<BuyList> buyList = new ArrayList<>();
        if (userDetails != null) {
            no = userDetails.getNo();
            buyList = buyListService.ticketByUser(no);
        }
        
        // 정상이면서 제일 오래된 이용권
        List<BuyList> filteredList = buyList.stream()
        .sorted(Comparator.comparing(BuyList::getStartDate)) // 날짜 순으로 정렬
        .collect(Collectors.toList());
        BuyList oldestBuyList = filteredList.isEmpty() ? null : filteredList.get(0);
        
        model.addAttribute("buyList", filteredList);
        model.addAttribute("oldestBuyList", oldestBuyList);

        return "/user/pay/payResult";
    }

}
