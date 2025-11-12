<script>
  import { onMount } from "svelte";
  let slots = ["10:00–11:00", "11:00–12:00", "12:00–13:00"];
  let callNumber = "--";
  let waitTime = "--";
  let ticket = null;

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
    ticket = data;
  }

  async function updateStatus() {
    const res = await fetch("/api/status");
    const data = await res.json();
    callNumber = data.callNumber;
    waitTime = data.waitTime + "分";
  }

  onMount(() => {
    updateStatus();
    const interval = setInterval(updateStatus, 5000);
    return () => clearInterval(interval);
  });
</script>

<h1>🎢 来場者用サイト</h1>

<div>
  <h2>現在の呼び出し番号: {callNumber}</h2>
  <p>予想待ち時間: {waitTime}</p>
</div>

<h2>整理券を取得</h2>
{#each slots as slot}
  <div class="slot">
    <p>{slot}</p>
    <button on:click={() => getTicket(slot)}>取得</button>
  </div>
{/each}

{#if ticket}
  <div>
    <h3>あなたの整理券</h3>
    <p>番号: {ticket.number}</p>
    <p>QRコードトークン: {ticket.token}</p>
    <!-- 実際には qrcode ライブラリを組み込んで表示 -->
  </div>
{/if}
