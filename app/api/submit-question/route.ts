import { NextRequest, NextResponse } from "next/server";
import { sendWhatsAppNotification } from "@/lib/fonnte";
import { sendTelegramNotification } from "@/lib/telegram";
import { saveQuestion, isDuplicateMessage } from "@/lib/db";
import { moderateMessage } from "@/lib/moderation";

export async function POST(req: NextRequest) {
  try {
    const { name, message, platform } = await req.json();
    const ipAddress = req.headers.get("x-forwarded-for") || "unknown";

    if (!name || !message || message.length < 5) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: "Pesan terlalu panjang (max 500 karakter)" },
        { status: 400 }
      );
    }

    // Content moderation
    const moderation = moderateMessage(message);
    if (!moderation.isClean) {
      return NextResponse.json(
        { 
          error: "Pesan mengandung konten yang tidak pantas. Harap gunakan bahasa yang sopan.",
          blockedWords: moderation.blockedWords.length 
        },
        { status: 400 }
      );
    }

    // Check for duplicate message from same IP within 1 minute
    const isDuplicate = await isDuplicateMessage(message, ipAddress);
    if (isDuplicate) {
      return NextResponse.json(
        { 
          error: "Pesan yang sama sudah dikirim. Mohon tunggu 1 menit sebelum mengirim pesan yang sama lagi.",
        },
        { status: 429 }
      );
    }

    await saveQuestion({ name, message, ipAddress });

    // Send notification based on selected platform
    try {
      if (platform === "telegram") {
        await sendTelegramNotification(name, message);
      } else {
        // Default to WhatsApp via Fonnte
        await sendWhatsAppNotification(name, message);
      }
    } catch (notificationError) {
      console.error("[Yilzi] Notification failed, but question saved:", notificationError);
      // Continue even if notification fails - question is already saved
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Yilzi] API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
        }
