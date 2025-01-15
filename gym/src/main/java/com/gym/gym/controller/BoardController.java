package com.gym.gym.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.gym.gym.domain.Answer;
import com.gym.gym.domain.Board;
import com.gym.gym.domain.CustomUser;
import com.gym.gym.domain.Option;
import com.gym.gym.domain.Page;
import com.gym.gym.domain.Users;
import com.gym.gym.service.AnswerService;
import com.gym.gym.service.BoardService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin("*")
@RequestMapping("/user/board")
public class BoardController {

    @Autowired
   private BoardService boardService;

    @Autowired
   private AnswerService answerService;

    // 목록

    @GetMapping()
    public ResponseEntity<?> list(
    @ModelAttribute Option option, 
    @ModelAttribute Page page) throws Exception {
        List<Board> boardList = boardService.boardlist(option, page);

        String pageUrl = UriComponentsBuilder.fromPath("user/board/boardList")
                .queryParam("keyword", option.getKeyword())
                .queryParam("code", option.getCode())
                .queryParam("rows", page.getRows())
                .queryParam("orderCode", option.getOrderCode())
                .build()
                .toUriString();
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("pageUrl", pageUrl);
        response.put("list",boardList);

        return new ResponseEntity<>(HttpStatus.OK);

    }

    @GetMapping("/{no}")
    public String select(@AuthenticationPrincipal CustomUser authuser, @PathVariable("no") Long no)
            throws Exception {
        // 게시글 조회
        Board board = boardService.select(no);
        List<Answer> answerList = answerService.listByParent(no);

        return "user/board/read";
    }

    // 등록처리
    // @PreAuthorize(" hasRole('ADMIN') or hasRole('USER') or hasRole('TRAINER')")
    @PostMapping()
    public String insertPost(@AuthenticationPrincipal CustomUser authuser,
            Board board) throws Exception {

        board.setUserNo(authuser.getUser().getNo());
        int result = boardService.insert(board);

        if (result > 0) {

            return "redirect:boardList";
        }
        return "redirect:insert?error";
    }

    // 수정
    /**
     * #p0, #p1로 파라미터 인덱스를 지정하여, 가져올 수 있다.
     * 여기서는 요청 파라미터로 넘어온 id => #p0
     * "@빈이름" 형태로 특정 변의 메소드를 호출할 수 있다.
     * @Service("BoardService")
     */
    // @PreAuthorize("hasRole('ADMIN') or hasRole('TRAINER') or (#p0 != null and
    // @BoardService.isOwner(#p0, authentication.principal.user.no))")
    // @PreAuthorize(" hasRole('ADMIN') or hasRole('TRAINER')")
    @GetMapping("/answerUpdate")
    public String answerUpdate(@RequestParam("no") Long no, Model model) throws Exception {
        Answer answer = answerService.select(no);
        model.addAttribute("answer", answer);
        return "user/board/answerUpdate";
    }
    

    // 수정 처리
    // @PreAuthorize("hasRole('ADMIN') or (#p0 != null and
    // @BoardService.isOwner(#p0, authentication.principal.user.no))")
    @PutMapping()
    public String updatePost(@RequestParam("no") Long no, Board board) throws Exception {
        int result = boardService.update(board);
        if (result > 0) {

            return "redirect:read?no=" + board.getNo();
        }
        return "redirect:update?error&no=" + board.getNo();
    }

    // 삭제 처리
    // @PreAuthorize("hasRole('ADMIN') or (#p0 != null and
    // @BoardService.isOwner(#p0, authentication.principal.user.no))")
    @DeleteMapping()
    public String delete(@RequestParam("no") Long no) throws Exception {
        int result1 = answerService.deleteByParent(no);
            if (result1 > 0) {
                int result = boardService.delete(no);
            
            if (result > 0) {
                return "redirect:boardList";
            }
        }
            return "redirect:/board/update?error&id=" + no;
    }

   

   @PutMapping("/answerUpdate")
    public String updateAnswer( Answer answer) throws Exception {
        int result = answerService.update(answer);
        if(result > 0){
            return  "redirect:user/board/read";

        }
        return "redirect:user/board/read";

    }


}