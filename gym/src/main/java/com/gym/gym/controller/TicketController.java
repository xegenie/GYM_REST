package com.gym.gym.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gym.gym.domain.Ticket;
import com.gym.gym.service.TicketService;

import groovy.util.logging.Slf4j;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@Slf4j
@RequestMapping("/admin/ticket")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @GetMapping("/list")
    public String list(Model model, @RequestParam(name = "keyword", defaultValue = "") String keyword)
            throws Exception {

        List<Ticket> ticketList = ticketService.allList(keyword);

        model.addAttribute("ticketList", ticketList);

        return "/admin/ticket/list";
    }

    @GetMapping("/insert")
    public String insert() {
        return "/admin/ticket/insert";
    }

    @PostMapping("/insert")
    public String insert(Ticket ticket) throws Exception {

        String ptCount = ticket.getPtCount() + ""; // int를 String으로 변환

        if (ptCount.startsWith("custom,")) {
            // "custom,"이 포함된 경우, "custom,"을 제거하고 나머지 부분을 int로 변환
            String countStr = ptCount.split(",")[1]; // "custom," 이후의 값 (2)
            int count = Integer.parseInt(countStr); // 2를 int로 변환
            ticket.setPtCount(count); // ticket 객체에 새 값 설정
        }
        int result = ticketService.insert(ticket);

        if (result == 0) {
            return "/admin/ticket/insert/?error";
        }

        return "redirect:/admin/ticket/list";
    }

    @GetMapping("/update")
    public String update(Model model, @RequestParam("no") int no) throws Exception {

        model.addAttribute("ticket", ticketService.select(no));

        return "/admin/ticket/update";
    }

    @PostMapping("/update")
    public String update(Ticket ticket) throws Exception {

        int result = ticketService.update(ticket);

        if (result == 0) {
            return "redirect:/admin/ticket/update?error";
        }

        return "redirect:/admin/ticket/list";
    }

    @PostMapping("/delete")
    public String delete(@RequestParam("ticketNos") List<Integer> ticketNos) throws Exception {

        int result = 0;

        for (int ticketNo : ticketNos) {
            result = ticketService.delete(ticketNo);
        }

        if (result == 0) {
            return "/admin/ticket/delete/?error";
        }

        return "redirect:/admin/ticket/list";
    }

}
