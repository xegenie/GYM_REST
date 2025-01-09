package com.gym.gym.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.gym.gym.domain.BuyList;
import com.gym.gym.domain.CustomUser;
import com.gym.gym.domain.Page;
import com.gym.gym.domain.Users;
import com.gym.gym.service.BuyListService;
import com.gym.gym.service.TrainerProfileService;
import com.gym.gym.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class BuyListController {

    @Autowired
    BuyListService buyListService;
    @Autowired
    UserService userService;
    @Autowired
    TrainerProfileService trainerProfileService;

    // 등록
    @PostMapping("/admin/sales/buyList/insert")
    public String insert(BuyList buyList) throws Exception {
        int result = buyListService.insert(buyList);
        return result > 0 ? "redirect:/admin/sales/buyList" : "admin/sales/buyList/insert/?error";
    }

    // 캔슬
    @PostMapping("/admin/sales/buyList/cancel")
    public String cancel(@RequestParam("no") int no) throws Exception {
        int result = buyListService.cancel(no);
        return result > 0 ? "redirect:/admin/sales/buyList" : "admin/sales/buyList/cancel/?error";
    }

    // 전체 리스트
    @GetMapping("/admin/sales/buyList")
    public String list(Model model, @RequestParam(name = "keyword", defaultValue = "") String keyword, Page page) throws Exception {
        List<BuyList> buyList = buyListService.list(keyword, page);
        model.addAttribute("rows", page.getRows());
        model.addAttribute("page", page);
        model.addAttribute("buyList", buyList);
        return "/admin/sales/buyList";
    }

    // 매출 조회
    @GetMapping("/admin/sales/salesList")
    public String salesList(@RequestParam(value = "trainerNo", required = false) Integer trainerNo,
                            @RequestParam(value = "startYear", required = false) Integer startYear,
                            @RequestParam(value = "startMonth", required = false) Integer startMonth,
                            @RequestParam(value = "startDay", required = false) Integer startDay,
                            @RequestParam(value = "endYear", required = false) Integer endYear,
                            @RequestParam(value = "endMonth", required = false) Integer endMonth,
                            @RequestParam(value = "endDay", required = false) Integer endDay,
                            Model model) throws Exception {

        LocalDate today = LocalDate.now();
        startYear = (startYear != null) ? startYear : today.getYear();
        startMonth = (startMonth != null) ? startMonth : today.getMonthValue();
        startDay = (startDay != null) ? startDay : today.getDayOfMonth();
        endYear = (endYear != null) ? endYear : today.getYear();
        endMonth = (endMonth != null) ? endMonth : today.getMonthValue();
        endDay = (endDay != null) ? endDay : today.getDayOfMonth();

        String startDate = String.format("%d-%02d-%02d", startYear, startMonth, startDay);
        String endDate = String.format("%d-%02d-%02d", endYear, endMonth, endDay);

        model.addAttribute("selectedStartYear", startYear);
        model.addAttribute("selectedStartMonth", startMonth);
        model.addAttribute("selectedStartDay", startDay);
        model.addAttribute("selectedEndYear", endYear);
        model.addAttribute("selectedEndMonth", endMonth);
        model.addAttribute("selectedEndDay", endDay);

        List<BuyList> salesList = buyListService.salesList(trainerNo, startDate, endDate);
        List<Users> trainerUsers = trainerProfileService.trainerUsers();

        model.addAttribute("salesList", salesList);
        model.addAttribute("trainerUsers", trainerUsers);
        model.addAttribute("selectedTrainer", trainerNo);

        return "/admin/sales/salesList";
    }


    // 마이 리스트
    @GetMapping("/user/myPage/buyList")
    public String listByUser(@AuthenticationPrincipal CustomUser userDetails, Model model, Page page) throws Exception {
         page.setRows(5);
        Long no = (userDetails != null) ? userDetails.getNo() : 0L;
        List<BuyList> buyList = (no > 0) ? buyListService.listByUser(no, page) : new ArrayList<>();

        List<BuyList> ticketBuyList = buyListService.ticketByUser(no);
        
        List<BuyList> filteredList = ticketBuyList.stream()
        .filter(b -> "정상".equals(b.getStatus()))
        .sorted(Comparator.comparing(BuyList::getStartDate))
        .collect(Collectors.toList());
        
        model.addAttribute("buyList", buyList);
        model.addAttribute("rows", page.getRows());
        model.addAttribute("page", page);
        
        model.addAttribute("ticketBuyList", ticketBuyList);

        model.addAttribute("oldestBuyList", filteredList.isEmpty() ? null : filteredList.get(0));

        return "/user/myPage/buyList";
    }
}
