export async function sendTelegramNotification(
  name: string,
  message: string
) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log("[Yilzi] Telegram not configured, skipping notification");
    return;
  }

  const text = `<b>PERTANYAAN ANONIM BARU!</b>

<b>Untuk:</b> ${name}
<b>Pesan:</b>
${message}

${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}

~ Kazzah NGL? by KazzahOFC ~`.trim();

  try {
    console.log("[Yilzi] Sending Telegram notification to:", chatId);
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "HTML",
        }),
      }
    );

    const result = await response.json();
    console.log("[Yilzi] Telegram response:", JSON.stringify(result));
    
    if (!response.ok) {
      console.error("[Yilzi] Telegram API error:", result);
      throw new Error(`Telegram API error: ${JSON.stringify(result)}`);
    }
    
    return result;
  } catch (err) {
    console.error("[Yilzi] Telegram error:", err);
    throw err;
  }
}
