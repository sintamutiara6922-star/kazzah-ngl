import { NextResponse } from "next/server";
import { getQuestions } from "@/lib/db";

export async function GET() {
  try {
    const questions = await getQuestions();
    return NextResponse.json({ questions });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
