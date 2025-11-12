<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>来場者用サイト</title>
  <style>
    body { font-family: sans-serif; text-align: center; }
    .slot { margin: 10px; padding: 10px; border: 1px solid #ccc; }
    #qr { margin-top: 20px; }
  </style>
</head>
<body>
  <h1>🎢 ジェットコースター整理券取得</h1>

  <!-- 呼び出し番号と待ち時間 -->
  <div>
    <h2>現在の呼び出し番号: <span id="callNumber">--</span></h2>
    <p>予想待ち時間: <span id="waitTime">--</span></p>
  </div>

  <!-- 整理券取得 -->
  <h2>整理券を取得</h2>
  <div id="slots"></div>

  <!-- QRコード表示 -->
  <div id="ticketArea"></div>

  <!-- QRコード生成ライブラリ -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>

  <script>
    async function loadSlots() {
      // サーバ側の slots を直接返すようにしても良い
      const slots = ["10:00–11:00", "11:00–12:00", "12:00–13:00"];
      const container = document.getElementById("slots");
      container.innerHTML = "";
      slots.forEach(slot => {
        const div = document.createElement("div");
        div.className = "slot";
        div.innerHTML = `
          <p>${slot}</p>
          <button onclick="getTicket('${slot}')">取得</button>
        `;
        container.appendChild(div);
      });
    }

    async function getTicket(slot) {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slot })
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
        return;
      }
      document.getElementById("ticketArea").innerHTML = `
        <h3>あなたの整理券</h3>
        <p>時間枠: ${slot}</p>
        <p>番号: ${data.number}</p>
        <div id="qr"></div>
      `;
      new QRCode(document.getElementById("qr"), {
        text: data.token,
        width: 128,
        height: 128
      });
    }

    async function updateStatus() {
      const res = await fetch("/api/status");
      const data = await res.json();
      document.getElementById("callNumber").textContent = data.callNumber;
      document.getElementById("waitTime").textContent = data.waitTime + "分";
    }

    setInterval(updateStatus, 5000);
    loadSlots();
    updateStatus();
  </script>
</body>
</html>
