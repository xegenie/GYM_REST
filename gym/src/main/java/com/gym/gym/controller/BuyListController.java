package com.gym.gym.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gym.gym.domain.BuyList;
import com.gym.gym.domain.Page;
import com.gym.gym.domain.Users;
import com.gym.gym.service.BuyListService;
import com.gym.gym.service.TrainerProfileService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/buy-list")
@Slf4j
public class BuyListController {

    @Autowired
    private BuyListService buyListService;

    @Autowired
    private TrainerProfileService trainerProfileService;

    // 등록
    @PostMapping
    public String insert(@RequestBody BuyList buyList) throws Exception {
        int result = buyListService.insert(buyList);
        return result > 0 ? "Success" : "Error: Insert Failed";
    }

    // 취소
    @DeleteMapping("/{id}")
    public String cancel(@PathVariable("id") int no) throws Exception {
        int result = buyListService.cancel(no);
        return result > 0 ? "Success" : "Error: Cancel Failed";
    }

    // 전체 리스트
    @GetMapping
    public ResponseWrapper<BuyList> list(@RequestParam(name = "keyword", defaultValue = "") String keyword, Page page) throws Exception {
        List<BuyList> buyList = buyListService.list(keyword, page);
        return new ResponseWrapper<>(buyList, page);
    }

    // 매출 조회
    @GetMapping("/sales")
    public SalesResponse salesList(
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
        List<Users> trainerUsers = trainerProfileService.trainerUsers();

        return new SalesResponse(salesList, trainerUsers, trainerNo, startYear, startMonth, startDay, endYear, endMonth, endDay);
    }

    // 사용자별 리스트
    @GetMapping("/user")
    public MyListResponse listByUser(@RequestParam("userNo") Long userNo, Page page) throws Exception {
        page.setRows(5);
        List<BuyList> buyList = (userNo > 0) ? buyListService.listByUser(userNo, page) : new ArrayList<>();
        List<BuyList> ticketBuyList = buyListService.ticketByUser(userNo);

        List<BuyList> filteredList = ticketBuyList.stream()
                .filter(b -> "정상".equals(b.getStatus()))
                .sorted(Comparator.comparing(BuyList::getStartDate))
                .collect(Collectors.toList());

        return new MyListResponse(buyList, ticketBuyList, filteredList.isEmpty() ? null : filteredList.get(0), page);
    }

    // Response Wrappers
    public static class ResponseWrapper<T> {
        private List<T> data;
        private Page page;

        public ResponseWrapper(List<T> data, Page page) {
            this.data = data;
            this.page = page;
        }

        // Getters and setters omitted for brevity
    }

    public static class SalesResponse {
        private List<BuyList> salesList;
        private List<Users> trainerUsers;
        private Integer selectedTrainer;
        private Integer selectedStartYear, selectedStartMonth, selectedStartDay;
        private Integer selectedEndYear, selectedEndMonth, selectedEndDay;

        public SalesResponse(List<BuyList> salesList, List<Users> trainerUsers, Integer selectedTrainer,
                             Integer selectedStartYear, Integer selectedStartMonth, Integer selectedStartDay,
                             Integer selectedEndYear, Integer selectedEndMonth, Integer selectedEndDay) {
            this.salesList = salesList;
            this.trainerUsers = trainerUsers;
            this.selectedTrainer = selectedTrainer;
            this.selectedStartYear = selectedStartYear;
            this.selectedStartMonth = selectedStartMonth;
            this.selectedStartDay = selectedStartDay;
            this.selectedEndYear = selectedEndYear;
            this.selectedEndMonth = selectedEndMonth;
            this.selectedEndDay = selectedEndDay;
        }

        // Getters and setters omitted for brevity
    }

    public static class MyListResponse {
        private List<BuyList> buyList;
        private List<BuyList> ticketBuyList;
        private BuyList oldestBuyList;
        private Page page;

        public MyListResponse(List<BuyList> buyList, List<BuyList> ticketBuyList, BuyList oldestBuyList, Page page) {
            this.buyList = buyList;
            this.ticketBuyList = ticketBuyList;
            this.oldestBuyList = oldestBuyList;
            this.page = page;
        }

        // Getters and setters omitted for brevity
    }
}
