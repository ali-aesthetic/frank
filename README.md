# Frank — the honest life-OS app

> Habits, mood, a voice brain-dump and a daily briefing — from an AI that tells it straight.

**Status:** early scaffold (auth, API routes and screens are set up; features in progress).
`Frank App.html` is the clickable design prototype.

## What's inside

| Screen | What it does |
|:--|:--|
| Onboarding | First-run setup |
| Dashboard | Today at a glance |
| Habits | Track daily habits |
| Mood | Log how you feel |
| Brain dump | Speak freely; Frank sorts it for you |
| Briefing | A daily briefing written by Claude |

## Built with

Next.js 14 · TypeScript · Tailwind · Supabase (auth + data) · Claude (Anthropic) · Whisper (speech-to-text) · ElevenLabs (voice) · Stripe (subscriptions)

## Run it locally

```bash
npm install
cp .env.example .env.local   # then fill in your own keys
npm run dev
```

Never commit `.env.local` — it is already in `.gitignore`.

---

Made by [Asadbek Ruslanbekov](https://github.com/ali-aesthetic) · Tashkent
