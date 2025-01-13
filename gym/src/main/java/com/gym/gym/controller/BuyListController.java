package com.gym.gym.controller;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gym.gym.domain.BuyList;
import com.gym.gym.domain.Page;
import com.gym.gym.service.BuyListService;
import com.gym.gym.service.TrainerProfileService;
import com.gym.gym.service.UserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/buyList")
@Slf4j
public class BuyListController {

    @Autowired
    BuyListService buyListService;
    @Autowired
    UserService userService;
    @Autowired
    TrainerProfileService trainerProfileService;

    // 구매 등록
    @PostMapping("/admin")
    public ResponseEntity<?> insert(@RequestBody BuyList buyList) throws Exception {
        int result = buyListService.insert(buyList);
        if (result > 0) {
            return ResponseEntity.ok("Purchase successfully created.");
        } else {
            return ResponseEntity.badRequest().body("Failed to create purchase.");
        }
    }

    // 구매 취소
    @PutMapping("/admin/{no}/cancel")
    public ResponseEntity<?> cancel(@PathVariable int no) throws Exception {
        int result = buyListService.cancel(no);
        if (result > 0) {
            return ResponseEntity.ok("Purchase successfully canceled.");
        } else {
            return ResponseEntity.badRequest().body("Failed to cancel purchase.");
        }
    }

    // 전체 구매 리스트 조회
    @GetMapping("/admin")
    public ResponseEntity<?> list(@RequestParam(name = "keyword", defaultValue = "") String keyword, Page page) throws Exception {
        List<BuyList> buyList = buyListService.list(keyword, page);
        return ResponseEntity.ok(buyList);
    }

    // 매출 조회
    @GetMapping("/admin/sales")
    public ResponseEntity<?> salesList(
            @RequestParam(value = "trainerNo", required = false) Integer trainerNo,
            @RequestParam(value = "startYear", required = false) Integer startYear,
            @RequestParam(value = "startMonth", required = false) Integer startMonth,
            @RequestParam(value = "startDay", required = false) Integer startDay,
            @RequestParam(value = "endYear", required = false) Integer endYear,
            @RequestParam(value = "endMonth", required = false) Integer endMonth,
            @RequestParam(value = "endDay", required = false) Integer endDay) throws Exception {

        LocalDate today = LocalDate.now();
        startYear = (startYear != null) ? startYear : today.getYear();
        startMonth = (startMonth != null) ? startMonth : today.getMonthValue();
        startDay = (startDay != null) ? startDay : today.getDayOfMonth();
        endYear = (endYear != null) ? endYear : today.getYear();
        endMonth = (endMonth != null) ? endMonth : today.getMonthValue();
        endDay = (endDay != null) ? endDay : today.getDayOfMonth();

        String startDate = String.format("%d-%02d-%02d", startYear, startMonth, startDay);
        String endDate = String.format("%d-%02d-%02d", endYear, endMonth, endDay);

        List<BuyList> salesList = buyListService.salesList(trainerNo, startDate, endDate);
        return ResponseEntity.ok(salesList);
    }

    // 마이페이지 구매 리스트 조회
    @GetMapping("/users/{userNo}/buyList")
    public ResponseEntity<?> listByUser(@PathVariable("userNo") Long userNo, Page page) throws Exception {
    page.setRows(5); // 페이지당 행 개수 설정
    List<BuyList> buyList = buyListService.listByUser(userNo, page); // 구매 리스트 조회
    List<BuyList> ticketBuyList = buyListService.ticketByUser(userNo); // 티켓 구매 리스트 조회

    // "정상" 상태의 티켓 중 가장 오래된 티켓 필터링
    BuyList startedTicket = ticketBuyList.stream()
        .filter(b -> "정상".equals(b.getStatus()))
        .min(Comparator.comparing(BuyList::getStartDate)) // 가장 오래된 티켓 찾기
        .orElse(null); // 없으면 null 반환

    // 필요한 데이터 Map으로 조합
    return ResponseEntity.ok(Map.of(
        "buyList", buyList,
        "page", page,
        "ticketBuyList", ticketBuyList,
        "startedTicket", startedTicket
    ));
}

}
