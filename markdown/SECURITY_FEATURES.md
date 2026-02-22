# Security & Moderation Features

This document explains the security and content moderation features implemented in the Takok OPO? platform.

## 1. Rate Limiting (IP-Based)

### Configuration
- **Location**: `middleware.ts`
- **Rate Limit**: 1 question per minute per IP address
- **Time Window**: 60 seconds

### How It Works
- Tracks IP addresses using `x-forwarded-for` header
- Blocks excessive requests with HTTP 429 (Too Many Requests)
- Returns countdown timer showing seconds until next allowed request
- Automatically resets counter after 60 seconds

### Example Response
```json
{
  "error": "Mohon tunggu 45 detik sebelum mengirim pertanyaan lagi",
  "retryAfter": 45
}
```

### Benefits
- Prevents spam and abuse
- Protects server resources
- Fair usage for all users

---

## 2. Content Moderation & Filtering

### Configuration
- **Location**: `lib/moderation.ts`
- **Applied In**: `app/api/submit-question/route.ts`

### Features

#### a) Bad Word Detection
- Filters Indonesian and English profanity
- Blocks questions containing inappropriate content
- Returns clear error message to user

#### b) Obfuscation Prevention
- Detects common workarounds like:
  - Spaces between letters: "a n j i n g" → blocked
  - Leet speak: "4nj1ng", "@njing" → blocked
  - Special characters: "an!jing", "anj*ng" → blocked
  - Repeated letters: "anjiiiing" → blocked

#### c) Censoring Option
The moderation utility provides censoring functionality:
```typescript
// Automatically censor inappropriate words
const result = censorMessage("kata anjing");
// Returns: "kata a****g"
```

### How to Update Blocked Words

Edit `lib/moderation.ts` and add words to the `BLOCKED_WORDS` array:

```typescript
const BLOCKED_WORDS = [
  "anjing",
  "babi",
  "kontol",
  // Add your own words here
  "newbadword",
];
```

### API Response
When inappropriate content is detected:
```json
{
  "error": "Pesan mengandung konten yang tidak pantas. Harap gunakan bahasa yang sopan.",
  "blockedWords": 1
}
```

---

## 3. Cloudflare Turnstile Verification

### Configuration
- **Location**: `components/turnstile-verification.tsx`
- **Environment Variables**: `.env.local`

### How It Works
- Shows verification challenge on first visit
- Uses sessionStorage to remember verified users
- Only appears once per browser session
- Alternative to reCAPTCHA (more privacy-friendly)

### Setup
1. Get free keys from: https://dash.cloudflare.com/turnstile
2. Add to `.env.local`:
```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key_here
TURNSTILE_SECRET_KEY=your_secret_key_here
```

See `CLOUDFLARE_TURNSTILE_SETUP.md` for detailed instructions.

---

## 4. Anti-Inspect Protection

### Configuration
- **Location**: `components/anti-inspect.tsx`
- **Applied In**: `app/layout.tsx`

### Features
- Disables right-click context menu
- Prevents opening DevTools (F12, Ctrl+Shift+I)
- Blocks view source shortcuts
- Adds basic protection against code inspection

**Note**: This is basic protection and can be bypassed by determined users.

---

## Security Best Practices

### For Production Deployment

1. **Environment Variables**
   - Never commit `.env.local` to version control
   - Use Vercel environment variables dashboard
   - Rotate keys regularly

2. **Rate Limiting**
   - Monitor abuse patterns
   - Adjust rate limits based on usage
   - Consider adding IP whitelist for trusted users

3. **Content Moderation**
   - Regularly review blocked words list
   - Monitor false positives
   - Add language-specific filters

4. **Database Security**
   - Sanitize all inputs before saving
   - Use parameterized queries (already implemented)
   - Regular backups of `data/questions.json`

5. **Monitoring**
   - Track rate limit violations
   - Log blocked content attempts
   - Monitor for patterns of abuse

---

## Testing Security Features

### Test Rate Limiting
```bash
# Try sending multiple requests quickly
for i in {1..3}; do
  curl -X POST http://localhost:3000/api/submit-question \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","message":"Test message","platform":"whatsapp"}'
  echo "Request $i"
  sleep 1
done
```

### Test Content Moderation
```bash
# Try sending inappropriate content
curl -X POST http://localhost:3000/api/submit-question \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","message":"kata anjing","platform":"whatsapp"}'
```

---

## Troubleshooting

### Rate Limit Not Working
- Check if `x-forwarded-for` header is present
- Verify middleware is running (`middleware.ts`)
- Check server logs for rate limit hits

### Content Filter Too Strict
- Review `BLOCKED_WORDS` list in `lib/moderation.ts`
- Adjust word patterns if needed
- Test with real user feedback

### Turnstile Not Showing
- Verify `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set
- Check browser console for errors
- Ensure domain is allowed in Cloudflare dashboard

---

## Future Enhancements

Potential improvements for enhanced security:

1. **Database-Based Rate Limiting**
   - Use Redis or database instead of in-memory Map
   - Persists across server restarts
   - More accurate for distributed systems

2. **AI-Powered Moderation**
   - Integrate OpenAI Moderation API
   - Detect hate speech, threats, etc.
   - More nuanced content filtering

3. **IP Reputation Checking**
   - Block known VPN/proxy IPs
   - Check against spam databases
   - Geographic restrictions

4. **Admin Dashboard**
   - Review flagged messages
   - Ban specific IPs
   - Whitelist trusted users

5. **Email Verification**
   - Optional email verification for non-anonymous users
   - Reduces spam from bots
   - Enables user notifications
