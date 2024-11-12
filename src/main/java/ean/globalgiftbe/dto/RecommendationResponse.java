package ean.globalgiftbe.dto;

import java.util.List;

public record RecommendationResponse(
        List<GiftDTO> gifts
) {
}
