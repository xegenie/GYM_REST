package com.gym.gym.controller;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Base64;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gym.gym.domain.BuyList;
import com.gym.gym.domain.CustomUser;
import com.gym.gym.domain.QRcode;
import com.gym.gym.service.BuyListService;
import com.gym.gym.service.QRCodeGenerator;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/generate-qr-code")
public class QRCodeController {

    @Autowired
    private QRCodeGenerator qrCodeGenerator;

    @Autowired
    private BuyListService buyListService;

    @PostMapping
    public ResponseEntity<?> generateQRCode(@AuthenticationPrincipal CustomUser user) throws Exception{
        QRcode qrCode = new QRcode();
        Long no = user.getNo();
        log.info(no + " 유저번호");
        qrCode.setUserNo(no); // Users 테이블에서 no 받은 후 Qrcode에 세팅
        qrCode.setUuid(UUID.randomUUID().toString());

        qrCodeGenerator.QRinsert(qrCode);

        // 유저가 티켓 보유 중일 시에만 QR페이지 생성
        BuyList buyList = buyListService.lastBuyList(no);

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

        // 티켓이 있으면서 만료기간 남았다면 QR 코드 생성
        if (buyList.getUserNo() == user.getNo() && endDateTime.isAfter(currentDateTime)) {
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
            String qrCodeUrl = String.format("http://192.168.30.63:8080/user/attendance/check?qrcodeId=%d&uuid=%s",
                    no, qrCode.getUuid());

            QRCodeResponse response = new QRCodeResponse(qrCodeBase64, qrCodeUrl);
            return ResponseEntity.ok(response); // QR 코드와 URL 반환
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body("티켓이 없거나 만료되었습니다.");
    }

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
