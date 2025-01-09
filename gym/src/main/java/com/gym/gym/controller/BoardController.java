package com.gym.gym.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
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
@Controller
@RequestMapping("/user/board")
public class BoardController {

    @Autowired
   private BoardService boardService;

    @Autowired
   private AnswerService answerService;

    // 목록

    @GetMapping("/boardList")
    public String list(Model model,
    @ModelAttribute Option option, 
    @ModelAttribute Page page) throws Exception {
        List<Board> boardList = boardService.boardlist(option, page);
        model.addAttribute("boardList", boardList);
        model.addAttribute("option", option);
        model.addAttribute("rows", page.getRows());
        model.addAttribute("page", page);
        String pageUrl = UriComponentsBuilder.fromPath("user/board/boardList")
                .queryParam("keyword", option.getKeyword())
                .queryParam("code", option.getCode())
                .queryParam("rows", page.getRows())
                .queryParam("orderCode", option.getOrderCode())
                .build()
                .toUriString();

        model.addAttribute("pageUrl", pageUrl);

        return "user/board/boardList";

    }

    @GetMapping("/read")
    public String select(@AuthenticationPrincipal CustomUser authuser, Model model, @RequestParam("no") Long no)
            throws Exception {
        // 게시글 조회
        Board board = boardService.select(no);
        List<Answer> answerList = answerService.listByParent(no);
        model.addAttribute("answerList", answerList);
        model.addAttribute("board", board);

        return "user/board/read";
    }

    // 등록
    @PreAuthorize(" hasRole('ADMIN') or hasRole('USER') or hasRole('TRAINER')")
    @GetMapping("/insert")
    // @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public String insert() {
        return "user/board/insert";
    }

    // 등록처리
    @PreAuthorize(" hasRole('ADMIN') or hasRole('USER') or hasRole('TRAINER')")
    @PostMapping("/insert")
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
    @GetMapping("/update")
    public String update(@RequestParam(name = "no") Long no, @AuthenticationPrincipal CustomUser authuser, Model model)
            throws Exception {
        Users user = authuser.getUser();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Object principal = auth.getPrincipal();
        System.out.println("Principal:asdfasdf " + principal);

        Board board = boardService.select(no);
        model.addAttribute("board", board);

        return "user/board/update";
    }
    @PreAuthorize(" hasRole('ADMIN') or hasRole('TRAINER')")
    @GetMapping("/answerUpdate")
    public String answerUpdate(@RequestParam("no") Long no, Model model) throws Exception {
        Answer answer = answerService.select(no);
        model.addAttribute("answer", answer);
        return "user/board/answerUpdate";
    }
    

    // 수정 처리
    // @PreAuthorize("hasRole('ADMIN') or (#p0 != null and
    // @BoardService.isOwner(#p0, authentication.principal.user.no))")
    @PostMapping("/update")
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
    @PostMapping("/delete")
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

   

   @PostMapping("/answerUpdate")
    public String updateAnswer( Answer answer) throws Exception {
        int result = answerService.update(answer);
        if(result > 0){
            return  "redirect:user/board/read";

        }
        return "redirect:user/board/read";

    }


}