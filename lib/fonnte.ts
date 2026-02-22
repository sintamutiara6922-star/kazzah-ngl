export async function sendWhatsAppNotification(
  name: string,
  message: string
) {
  const token = process.env.FONNTE_TOKEN;
  const target = process.env.FONNTE_TARGET_NUMBER;

  if (!token || !target) {
    console.log("[Yilzi] Fonnte not configured, skipping WhatsApp notification");
    return;
  }

  const pesan = `*PERTANYAAN ANONIM BARU!*

*Untuk:* ${name}
*Pesan:*
${message}

${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}

~ Takok OPO? by YIlziteam ~`.trim();

  try {
    console.log("[Yilzi] Sending WhatsApp notification to:", target);
    const response = await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        target: target,
        message: pesan,
      }),
    });

    const result = await response.json();
    console.log("[Yilzi] Fonnte response:", JSON.stringify(result));
    
    if (!response.ok) {
      console.error("[Yilzi] Fonnte API error:", result);
      throw new Error(`Fonnte API error: ${JSON.stringify(result)}`);
    }
    
    return result;
  } catch (err) {
    console.error("[Yilzi] Fonnte error:", err);
    throw err;
  }
}
