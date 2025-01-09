package com.gym.gym.controller;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.gym.gym.domain.CustomUser;
import com.gym.gym.domain.Option;
import com.gym.gym.domain.Page;
import com.gym.gym.domain.Ranking;
import com.gym.gym.domain.Users;
import com.gym.gym.service.RankingService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("")
// @EnableMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class RankingController {

    @Autowired
    private RankingService rankingService;

    @GetMapping("/ranking")
    // @PreAuthorize("hasRole('ADMIN') or hasRole('USER') or hasRole('TRAINER')")
    public String attendanceRanking(
            @AuthenticationPrincipal CustomUser authuser,
            Model model,
            @ModelAttribute Option option,
            @RequestParam(value = "searchKeyword", required = false) String searchKeyword,
            @RequestParam(value = "page", defaultValue = "1") int currentPage) {

                // 로그인 사용자 정보 추가
                if (authuser != null) {
                    Users user = authuser.getUser();
                    model.addAttribute("user", user);
                }
                try {
                    if (searchKeyword != null && !searchKeyword.trim().isEmpty()) {
                        option.setKeyword(searchKeyword); // 검색어 설정
                    }


            // 페이지 처리
            Page page = new Page();
            page.setPage(currentPage);
            page.setRows(100);
            page.setIndex((currentPage - 1) * page.getRows());

            // 전체 랭킹 리스트를 조회
            List<Ranking> rankingListAll = rankingService.getAttendanceRanking(option, page);

            // 총 데이터 수
            int total = rankingService.count(option);

            // 페이지 처리
            page.setTotal(total);

            // 검색어가 없으면 상위 20명만 추출하여 표시
            List<Ranking> rankingList = rankingListAll.stream()
                    .limit(100) // 상위 20명만
                    .collect(Collectors.toList());
            model.addAttribute("rankingList", rankingList);

            // 전체 랭킹 리스트와 검색어 등 추가
            model.addAttribute("rankingListAll", rankingListAll); // 전체 랭킹 리스트도 전달
            model.addAttribute("option", option);
            model.addAttribute("page", page);
            model.addAttribute("total", total);

        } catch (Exception e) {
            log.error("출석 랭킹 조회 중 오류 발생", e);
            model.addAttribute("errorMessage", "출석 랭킹 조회 중 오류가 발생했습니다.");
            model.addAttribute("rankingList", Collections.emptyList());
        }

        return "ranking"; // ranking.html로 전달
    }
}
