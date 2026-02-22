import fs from "fs";
import path from "path";

// Use /tmp for serverless environments (Vercel), fallback to data/ for local
const DB_PATH = process.env.VERCEL
  ? path.join("/tmp", "questions.json")
  : path.join(process.cwd(), "data", "questions.json");

type Question = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  ipAddress?: string;
  processed?: boolean;
};

function readDB(): Question[] {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
      fs.writeFileSync(DB_PATH, "[]");
    }
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
  } catch {
    return [];
  }
}

export async function saveQuestion({
  name,
  message,
  ipAddress,
}: {
  name: string;
  message: string;
  ipAddress?: string;
}) {
  const questions = readDB();
  questions.unshift({
    id: Date.now().toString(),
    name,
    message,
    createdAt: new Date().toISOString(),
    ipAddress,
    processed: false,
  });
  fs.writeFileSync(DB_PATH, JSON.stringify(questions, null, 2));
}

export async function isDuplicateMessage(
  message: string,
  ipAddress: string
): Promise<boolean> {
  const questions = readDB();
  const oneMinuteAgo = Date.now() - 60 * 1000;

  return questions.some((q) => {
    const questionTime = new Date(q.createdAt).getTime();
    return (
      q.message === message &&
      q.ipAddress === ipAddress &&
      questionTime > oneMinuteAgo
    );
  });
}

export async function getQuestions() {
  return readDB();
}
