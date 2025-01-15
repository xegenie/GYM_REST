package com.gym.gym.controller;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Base64;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gym.gym.domain.BuyList;
import com.gym.gym.domain.QRcode;
import com.gym.gym.service.BuyListService;
import com.gym.gym.service.QRCodeGenerator;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/generate-qr-code")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "Authorization")
public class QRCodeController {

    @Autowired
    private QRCodeGenerator qrCodeGenerator;

    @Autowired
    private BuyListService buyListService;

    // QR 코드 생성 API
    @PostMapping
    public ResponseEntity<?> generateQRCode(@RequestParam Long userNo, @RequestParam String uuid) throws Exception {

        if (userNo == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("사용자 정보를 불러오지 못했습니다.");
        }

        log.info(userNo + " 유저번호");

        // 유저의 마지막 구매 정보 조회
        BuyList buyList = buyListService.lastBuyList(userNo);

        // 날짜 가져오기
        if (buyList == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("티켓이 없거나 만료되었습니다");
        }

        // 티켓이 만료되었으면
        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDateTime endDateTime = buyList.getEndDate().toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();

        if (endDateTime.isBefore(currentDateTime)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("티켓이 만료되었습니다. 새로운 티켓을 구입해주세요.");
        }

        // QR 코드 생성
        QRcode qrCode = new QRcode();
        qrCode.setUserNo(userNo);
        qrCode.setUuid(uuid);

        qrCodeGenerator.QRinsert(qrCode); // QR 코드 DB에 저장

        ByteArrayOutputStream qrCodeOutputStream = new ByteArrayOutputStream();
        try {
            qrCodeGenerator.generateQRCodeImage(qrCode, qrCodeOutputStream);
        } catch (Exception e) {
            log.error("QR 코드 생성 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("QR 코드 생성 중 오류가 발생했습니다.");
        }

        byte[] imageBytes = qrCodeOutputStream.toByteArray();
        String qrCodeBase64 = Base64.getEncoder().encodeToString(imageBytes);

        // QR 코드 URL 생성
        String qrCodeUrl = String.format("http://localhost:8080/user/attendance/check?qrcodeId=%d&uuid=%s",
                userNo, qrCode.getUuid());

        QRCodeResponse response = new QRCodeResponse(qrCodeBase64, qrCodeUrl);
        return ResponseEntity.ok(response); // QR 코드와 URL 반환
    }

    // QR 코드 삭제 API
    @PostMapping("/delete")
    public ResponseEntity<String> deleteQRCode(@RequestBody Map<String, String> request) {
        String uuid = request.get("uuid");
        if (uuid == null || uuid.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid UUID");
        }

        try {
            qrCodeGenerator.deleteQRcode(uuid); // QR 코드 삭제
            log.info("QR 코드 삭제 성공: UUID = {}", uuid);
            return ResponseEntity.ok("QR 코드가 성공적으로 삭제되었습니다.");
        } catch (Exception e) {
            log.error("QR 코드 삭제 실패: UUID = {}", uuid, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("QR 코드 삭제 실패");
        }
    }

    // QR 코드 응답을 위한 DTO 클래스
    public static class QRCodeResponse {
        private String qrCodeBase64;
        private String qrCodeUrl;

        public QRCodeResponse(String qrCodeBase64, String qrCodeUrl) {
            this.qrCodeBase64 = qrCodeBase64;
            this.qrCodeUrl = qrCodeUrl;
        }

        public String getQrCodeBase64() {
            return qrCodeBase64;
        }

        public String getQrCodeUrl() {
            return qrCodeUrl;
        }
    }
}
