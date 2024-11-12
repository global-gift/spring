package ean.globalgiftbe.controller;

import ean.globalgiftbe.dto.GiftDTO;
import ean.globalgiftbe.dto.RecommendationResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
public class RecommendationController {

    @GetMapping("/api/recommend")
    public ResponseEntity<RecommendationResponse> recommend(
            @RequestParam String input
    ) {
        log.info("user input: {}", input);

        GiftDTO dto = new GiftDTO("id", "name", "https://url.com", 10000);
        return new ResponseEntity<>(new RecommendationResponse(List.of(dto, dto)), HttpStatus.OK);
    }
}
