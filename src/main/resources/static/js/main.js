document.querySelector(".send-button").addEventListener("click", async () => {
    // 입력 값 가져오기
    const input = document.querySelector(".chat-input").value;
    if (!input) return; // 입력값이 없으면 요청을 보내지 않음

    // 입력된 메시지를 보내는 부분에 추가
    const chatContainer = document.getElementById("chatContainer");
    const sentMessage = document.createElement("div");
    sentMessage.className = "message message-sent";
    sentMessage.textContent = input;
    chatContainer.appendChild(sentMessage);

    // 서버에 요청 보내기
    try {
        const response = await fetch(`http://localhost:8080/api/recommend?input=${encodeURIComponent(input)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            // body: JSON.stringify({ key: input })
        });

        if (!response.ok) throw new Error("서버 응답에 문제가 있습니다.");

        // 응답 데이터 처리
        const data = await response.json();

        // 받은 메시지를 표시할 div 생성
        const receivedMessage = document.createElement("div");
        receivedMessage.className = "message message-received";
        receivedMessage.innerHTML = ""; // 기존 내용을 지움

        // 선물 컨테이너 생성
        const giftContainer = document.createElement("div");
        giftContainer.className = "gift-container";

        data.gifts.forEach(gift => {
            const giftItem = document.createElement("div");
            giftItem.className = "gift-item";

            const img = document.createElement("img");
            img.src = gift.imgUrl;
            img.alt = gift.name + " image";

            const name = document.createElement("span");
            name.textContent = gift.name;

            const price = document.createElement("span");
            price.textContent = `${gift.price}원`;

            giftItem.appendChild(img);
            giftItem.appendChild(name);
            giftItem.appendChild(price);
            giftContainer.appendChild(giftItem);
        });
        receivedMessage.appendChild(giftContainer);

        chatContainer.appendChild(receivedMessage);

        // 입력 필드 초기화
        document.querySelector(".chat-input").value = "";
    } catch (error) {
        console.error("에러 발생:", error);
    }
});