package com.gym.gym.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gym.gym.domain.CustomUser;
import com.gym.gym.domain.Option;
import com.gym.gym.domain.Page;
import com.gym.gym.domain.Ranking;
import com.gym.gym.service.RankingService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/")
public class RankingController {

    @Autowired
    private RankingService rankingService;

    @GetMapping("/ranking")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER') or hasRole('TRAINER')")
    public ResponseEntity<?> attendanceRanking(
            @AuthenticationPrincipal CustomUser authUser,
            @RequestParam(value = "searchKeyword", required = false) String searchKeyword,
            @RequestParam(value = "page", defaultValue = "1") int currentPage) {

        // 로그인 사용자 정보 추가
        if (authUser != null) {
            log.info("Authenticated User: " + authUser.getUser().getName());
        }

        try {
            // 검색어 처리
            Option option = new Option();
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
            page.setTotal(total);

            // 검색어가 없으면 상위 100명만 추출하여 표시
            List<Ranking> rankingList = rankingListAll.stream()
                    .limit(100) // 상위 100명만
                    .collect(Collectors.toList());

            // Response 데이터 구성
            return new ResponseEntity<>(new RankingResponse(rankingList, rankingListAll, option, page, total), HttpStatus.OK);

        } catch (Exception e) {
            log.error("출석 랭킹 조회 중 오류 발생", e);
            return new ResponseEntity<>("출석 랭킹 조회 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 응답 데이터를 위한 DTO
    public static class RankingResponse {
        private List<Ranking> rankingList;
        private List<Ranking> rankingListAll;
        private Option option;
        private Page page;
        private int total;

        public RankingResponse(List<Ranking> rankingList, List<Ranking> rankingListAll, Option option, Page page, int total) {
            this.rankingList = rankingList;
            this.rankingListAll = rankingListAll;
            this.option = option;
            this.page = page;
            this.total = total;
        }

        // getters and setters...
    }
}
