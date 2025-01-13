package com.gym.gym.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.util.UriComponentsBuilder;

import com.gym.gym.domain.Board;
import com.gym.gym.domain.CustomUser;
import com.gym.gym.domain.Option;
import com.gym.gym.domain.Page;
import com.gym.gym.domain.UserAuth;
import com.gym.gym.domain.Users;
import com.gym.gym.service.BoardService;
import com.gym.gym.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@EnableMethodSecurity(securedEnabled = true, prePostEnabled = true)
@RequestMapping()
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BoardService boardService;

    // 사용자 정보
        @GetMapping("/user/info")
    public ResponseEntity<?> userInfo(@AuthenticationPrincipal CustomUser customUser) {
        log.info(":::::::사용자 정보::::::::::"+ customUser);

    
        if(customUser == null){
            return new ResponseEntity<>("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
        }
        
        log.info("customUser" + customUser);
        
        Users user = customUser.getUser();
        log.info("user : " + user);
        
        if(user != null){
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
    
        // 인증 되지 않은 경우


        return new ResponseEntity<>("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    }
 

    @PostMapping("/user")
    public ResponseEntity<?> join(@RequestBody Users user) throws Exception {
            log.info("회원 가입 요청");
            int result = userService.join(user);
            if(result > 0 ){
                log.info("회원가입 성공");
                return new ResponseEntity<>("SUCCESS", HttpStatus.OK);

            }
            else{
                log.info("회원가입 실패!");
                return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
            }
        
    }


    // 회원 정보 수정 처리
    // @PreAuthorize("hasRole('ROLE_ADMIN') or #p0.id == authentication.name") // 관리자 + 작성자 본인 
    @PutMapping("/user")
    public ResponseEntity<?> update(@RequestBody Users user) throws Exception {
        log.info("회원 정보 수정" + user + "뭐임?");
        boolean result = userService.update(user);
        
        if(result ){
            log.info("회원 수정 성공");
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        }
        else{
            log.info("회원 수정 실패");
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        }
        
    }
    

     @PreAuthorize("hasRole('ROLE_ADMIN') or #p0 == authentication.no") // 관리자 + 작성자 본인 
    @DeleteMapping("/user/{no}")
    public ResponseEntity<?> delete(@PathVariable("no") Long no) throws Exception{
     log.info("여기옴?" + no);
        int result = userService.deleteAuth(no);

        if(result > 0){
            log.info("여기안옴?");
            result = userService.delete(no);
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        }
        else{
            log.info("회원 삭제 실패");
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        }
    }



    // 유저리스트
    @PreAuthorize(" hasRole('ADMIN') or hasRole('USER') or hasRole('TRAINER')")
    @GetMapping("/admin/user/list")
    public String userlist(Model model
                        ,@ModelAttribute Option option, @ModelAttribute Page page) throws Exception {
        List<Users> userList = userService.list(option,page);


        model.addAttribute("userList", userList);
        model.addAttribute("option", option);
        model.addAttribute("rows", page.getRows());
        model.addAttribute("page", page);
        String pageUrl = UriComponentsBuilder.fromPath("")
                .queryParam("keyword", option.getKeyword())
                .queryParam("code", option.getCode())
                .queryParam("rows", page.getRows())
                .queryParam("orderCode", option.getOrderCode())
                .build()
                .toUriString();

        model.addAttribute("pageUrl", pageUrl);

        return "admin/user/list";
                        }

    // 관리자 : 회원 정보 수정 이동
    @PreAuthorize(" hasRole('ADMIN') or hasRole('USER') or hasRole('TRAINER')")
    @GetMapping("/admin/user/update")
    public String adminUpdate(Model model, @RequestParam("no") Long no) throws Exception {
        Users user = userService.select(no);
        UserAuth userAuth = userService.selectAuth(no);
        model.addAttribute("userAuth", userAuth);
        model.addAttribute("user", user);
        return "/admin/user/update";
    }

    // 관리자 : 회원 정보 수정 처리
    @PreAuthorize(" hasRole('ADMIN') or hasRole('USER') or hasRole('TRAINER')")
    @PostMapping("admin/user/update")
    public String adminupdate(Users user, @RequestParam("no") Long no, @RequestParam("auth") String auth, RedirectAttributes redirectAttributes)
            throws Exception {
        boolean result = userService.update(user);
        UserAuth userAuth = userService.selectAuth(no);
        userAuth.setAuth(auth);
        int result2 = userService.updateAuth(userAuth);

        if (result) {
            redirectAttributes.addFlashAttribute("message", "회원 수정 완료..");
            return "redirect:list";
        }
        redirectAttributes.addFlashAttribute("message", "회원 수정 실패..");
        return "/";
    }

    // 관리자 : 회원 탈퇴
    @PreAuthorize(" hasRole('ADMIN') or hasRole('USER') or hasRole('TRAINER')")
    @PostMapping("/admin/user/delete")
    public String postMethodName(@RequestParam("no") Long no, HttpServletRequest request, HttpServletResponse response, RedirectAttributes redirectAttributes)
            throws Exception {
        int result = userService.deleteAuth(no);
        result = userService.delete(no);

        if (result > 0) {
            redirectAttributes.addFlashAttribute("message", "회원 탈퇴 했습니다..");
            return "redirect:list";
        }
        redirectAttributes.addFlashAttribute("message", "회원 탈퇴 실패..");
        // 실패한 경우
        return "redirect:/admin/user/update";
    }

    @GetMapping("user/findId")
    public String findId() {
        return "/user/findId";
    }

    @PostMapping("/user/findId")
    public String findId(Model model, @RequestParam("name") String name,
            @RequestParam("phone") String phone, @RequestParam("question") String question,
            @RequestParam("answer") String answer) throws Exception {


        // 이름, 전화번호, 질문, 답변을 기준으로 사용자 찾기
        Users foundUser = userService.findUserByDetails(name, phone, question, answer);

        if (foundUser != null && foundUser.getId() != null) {
            model.addAttribute("user", foundUser);
            model.addAttribute("no", 1);
            return "/user/find";
        } else {
            model.addAttribute("users", null);
            model.addAttribute("message", "사용자를 찾을 수 없습니다.");
            return "/user/find";
        }
    }

    @GetMapping("/user/find")
    public String getMethodName() {
        return "/user/find";
    }
    

    // 비밀번호 찾기페이지 이동
    @GetMapping("/user/findPassword")
    public String findPassword() {
        return "/user/findPassword";
    }

    // 비밀번호 찾기페이지 처리
    @PostMapping("/user/findPassword")
    public String findPassword(Model model, @RequestParam("name") String name,
            @RequestParam("phone") String phone, @RequestParam("question") String question,
            @RequestParam("answer") String answer, @RequestParam("id") String id) throws Exception {

        // 이름, 전화번호, 질문, 답변을 기준으로 사용자 찾기
        Users foundUser = userService.findUserByPassword(name, phone, question, answer, id);

        if (foundUser != null && foundUser.getId() != null) {
            String code = UUID.randomUUID().toString().substring(0, 6);
            model.addAttribute("code", code);
            model.addAttribute("no", foundUser.getNo());
            foundUser.setCode(code);
            userService.codeInsert(foundUser);
            return "/user/changePassword";
        } else {
            model.addAttribute("users", null);
            model.addAttribute("message", "입력하신 사용자를 찾을 수 없습니다.");
            return "/user/find";
        }

    }

    // 비밀번호 변경 페이지 이동
    @GetMapping("/user/changePassword")
    public String changePassword() {
        return "/user/changePassword";
    }

    // 비밀번호 변경 페이지 처리
    @PostMapping("/user/changePassword")
    public String changePassword(@RequestParam("code") String code,
            @RequestParam("password") String password, @RequestParam("no") Long no,
            RedirectAttributes redirectAttributes) throws Exception {
        Users user = userService.select(no);

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String encodedNewPassword = encoder.encode(password);
        user.setPassword(encodedNewPassword);
        int result = userService.passwordUpdate(user);
        if (result > 0) {
            user.setCode(null);
            userService.codeInsert(user);
            redirectAttributes.addFlashAttribute("message", "비밀번호 변경이 완료됐습니다.");
            return "redirect:/login";
        }
        redirectAttributes.addFlashAttribute("message", "비밀번호 찾기 실패 다시 시도해주세요.");
        user.setCode(null);
        userService.codeInsert(user);
        return "redirect:/login";
    }

    // 회원정보 수정 비밀번호 변경 페이지 이동
    @GetMapping("/user/myPage/changePw")
    public String changePw() {
        return "/user/myPage/changePw";
    }

   // 회원정보 수정 비밀번호 변경 처리
@PostMapping("/user/myPage/changePw")
public String changePw(@RequestParam("password") String password, 
                        @RequestParam("newPassword") String newPassword,  
                        @AuthenticationPrincipal CustomUser authuser,
                        RedirectAttributes redirectAttributes, Model model) throws Exception {
    String code = UUID.randomUUID().toString().substring(0, 6);

    Users user = userService.select(authuser.getNo());
    user.setCode(code);
    userService.codeInsert(user);
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    if (encoder.matches(password, user.getPassword())) {
        String encodedNewPassword = encoder.encode(newPassword);
        user.setPassword(encodedNewPassword);
        
        int result = userService.passwordUpdate(user);
        if (result > 0) {
            user.setCode(null);
            userService.codeInsert(user);
            redirectAttributes.addFlashAttribute("message", "비밀번호 변경이 완료됐습니다.");
            return "redirect:info";
        }
    }

    user.setCode(null);
    userService.codeInsert(user);
    redirectAttributes.addFlashAttribute("message", "비밀번호 변경 실패!");
    return "redirect:info";
}

@GetMapping("/user/myPage/myBoardList")
public String boardList(Model model,
    @ModelAttribute Option option, 
    @ModelAttribute Page page, @AuthenticationPrincipal CustomUser user) throws Exception {
        Long no = user.getNo();
        List<Board> boardList = boardService.myBoardlist(option, page, no);
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

        return "user/myPage/myBoardList";


}
}




