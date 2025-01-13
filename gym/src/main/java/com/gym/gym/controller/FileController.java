package com.gym.gym.controller;

import java.io.File;
import java.net.URLEncoder;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gym.gym.domain.Files;
import com.gym.gym.service.FileService;
import com.gym.gym.util.MediaUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/files")
public class FileController {

    @Autowired
    private FileService fileService;

    /**
     * 이미지 썸네일 제공
     * @param no (파일 ID)
     * @return 이미지 데이터
     * @throws Exception
     */
    @GetMapping("/{no}/thumbnail")
    public ResponseEntity<byte[]> getThumbnail(@PathVariable("no") int no) throws Exception {
        Files file = fileService.select(no);
        if (file == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        File f = new File(file.getPath());
        byte[] fileData = FileCopyUtils.copyToByteArray(f);
        String ext = file.getPath().substring(file.getPath().lastIndexOf(".") + 1);
        MediaType mediaType = MediaUtil.getMediaType(ext);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(mediaType);
        return ResponseEntity.ok().headers(headers).body(fileData);
    }

    /**
     * 파일 다운로드
     * @param no (파일 ID)
     * @return 다운로드 파일 데이터
     * @throws Exception
     */
    @GetMapping("/{no}/download")
    public ResponseEntity<byte[]> downloadFile(@PathVariable("no") int no) throws Exception {
        Files file = fileService.select(no);
        if (file == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        String fileName = URLEncoder.encode(file.getName(), "UTF-8");
        File f = new File(file.getPath());
        byte[] fileData = FileCopyUtils.copyToByteArray(f);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", fileName);
        return ResponseEntity.ok().headers(headers).body(fileData);
    }

    /**
     * 파일 삭제
     * @param no (파일 ID)
     * @return 처리 결과
     * @throws Exception
     */
    @DeleteMapping("/{no}")
    public ResponseEntity<String> deleteFile(@PathVariable("no") int no) throws Exception {
        int result = fileService.delete(no);
        if (result > 0) {
            return ResponseEntity.ok("SUCCESS");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FAIL");
    }

    /**
     * 파일 목록 조회
     * @param parentTable (상위 테이블)
     * @param parentNo (상위 번호)
     * @return 파일 목록
     * @throws Exception
     */
    @GetMapping
    public ResponseEntity<List<Files>> getFileList(@RequestParam("profileNo") int profileNo) throws Exception {
        Files file = new Files();
        file.setProfileNo(profileNo);
        List<Files> fileList = fileService.listByParent(file);
        return ResponseEntity.ok(fileList);
    }
}
