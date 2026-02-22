// Content moderation for filtering inappropriate messages
// Add your own list of inappropriate words based on your needs

const BLOCKED_WORDS = [
  // Indonesian profanity
  "anjing",
  "babi",
  "bangsat",
  "kontol",
  "memek",
  "ngentot",
  "jancok",
  "jembut",
  "tolol",
  "goblok",
  "bodoh",
  "tai",
  "bajingan",
  "kampret",
  "asu",
  "perek",
  "pelacur",
  "sundal",
  "bitch",
  "fuck",
  "shit",
  "dick",
  "pussy",
  "asshole",
  "bastard",
  // Add more as needed
];

// Common variations to catch
const LEET_REPLACEMENTS: Record<string, string> = {
  "0": "o",
  "1": "i",
  "3": "e",
  "4": "a",
  "5": "s",
  "7": "t",
  "@": "a",
  "!": "i",
  "$": "s",
};

/**
 * Normalize text to catch common obfuscation attempts
 */
function normalizeText(text: string): string {
  let normalized = text.toLowerCase();
  
  // Remove spaces between letters (e.g., "a n j i n g" -> "anjing")
  normalized = normalized.replace(/\s+/g, "");
  
  // Replace common leet speak
  Object.entries(LEET_REPLACEMENTS).forEach(([leet, normal]) => {
    normalized = normalized.replace(new RegExp(leet, "g"), normal);
  });
  
  // Remove special characters except spaces
  normalized = normalized.replace(/[^a-z\s]/g, "");
  
  return normalized;
}

/**
 * Check if message contains inappropriate content
 */
export function containsInappropriateContent(message: string): boolean {
  const normalized = normalizeText(message);
  
  return BLOCKED_WORDS.some((word) => {
    // Check exact match
    if (normalized.includes(word)) {
      return true;
    }
    
    // Check with variations (e.g., repeated letters: "anjiiiing")
    const pattern = word.split("").join("+\\s*");
    const regex = new RegExp(pattern, "i");
    return regex.test(normalized);
  });
}

/**
 * Censor inappropriate words in message
 */
export function censorMessage(message: string): string {
  let censored = message;
  const normalized = normalizeText(message);
  
  BLOCKED_WORDS.forEach((word) => {
    const regex = new RegExp(word, "gi");
    if (normalized.includes(word)) {
      // Replace with asterisks, keeping first and last letter
      const censoredWord = word.length > 2 
        ? word[0] + "*".repeat(word.length - 2) + word[word.length - 1]
        : "*".repeat(word.length);
      censored = censored.replace(regex, censoredWord);
    }
  });
  
  return censored;
}

/**
 * Moderate message: check and optionally censor
 */
export function moderateMessage(message: string): {
  isClean: boolean;
  censored: string;
  blockedWords: string[];
} {
  const isClean = !containsInappropriateContent(message);
  const censored = censorMessage(message);
  const normalized = normalizeText(message);
  
  const blockedWords = BLOCKED_WORDS.filter((word) => 
    normalized.includes(word)
  );
  
  return {
    isClean,
    censored,
    blockedWords,
  };
}
