<script>
  import { onMount } from "svelte";
  let callNumber = "--";
  let result = "";

  async function checkin(token) {
    const res = await fetch("/api/checkin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    });
    const data = await res.json();
    if (data.valid) {
      result = `✔ 入場処理完了: 番号 ${data.number}`;
      callNumber = data.callNumber;
    } else {
      result = "✖ 無効な整理券";
    }
  }

  async function updateStatus() {
    const res = await fetch("/api/status");
    const data = await res.json();
    callNumber = data.callNumber;
  }

  onMount(() => {
    updateStatus();
    const interval = setInterval(updateStatus, 5000);
    return () => clearInterval(interval);
  });
</script>

<h1>🎢 スタッフ用受付</h1>

<!-- 簡易的に入力欄でQRコードトークンを入力 -->
<input placeholder="QRコードトークンを入力" on:change={(e) => checkin(e.target.value)} />

<div id="result">{result}</div>

<h2>呼び出し番号</h2>
<p>現在: {callNumber}</p>
