# Warhammer 40K — Collection Tracker

A PWA for tracking your Warhammer 40,000 miniature collection with live MFM points data.

## Features
- Live points from the Munitorum Field Manual via BSData
- Multi-faction roster tracking (models owned, built, painted)
- Inventory Dashboard with progress bars
- BCP/TTB List Checker — see what you can run vs what you need to buy/build
- Multi-user support via Supabase (each user has their own private roster)
- Installable PWA — works on iOS, Android, and desktop
- Offline support via service worker

## Tech Stack
- Vanilla HTML/CSS/JS (no framework)
- Supabase (auth + database)
- Netlify (hosting)
- BSData/wh40k-11e-mfm (live points data)

## Setup

### 1. Supabase Database
1. Go to your Supabase project → SQL Editor → New Query
2. Paste the contents of `supabase-schema.sql` and run it
3. You should see 3 tables: `profiles`, `roster_units`, `saved_lists`

### 2. Deploy to Netlify
1. Push this repo to GitHub
2. Go to netlify.com → New site → Import from GitHub
3. Select your repo — build settings are auto-detected from `netlify.toml`
4. Deploy

### 3. Share with friends
Just send them your Netlify URL. They can sign up for their own account and build their own roster from the default data.

## App Icons
Place your app icons in `/assets/`:
- `icon-192.png` — 192×192px
- `icon-512.png` — 512×512px

These are used for the PWA home screen icon. Any Warhammer-appropriate icon works.

## Adding New Factions
Edit `js/data.js` — add a new entry to the `FACTIONS` array following the existing pattern.
The `yaml` field should match the BSData slug (check `github.com/BSData/wh40k-11e-mfm/tree/main/data`).

## Local Development
```bash
npx serve .
```
Then open `http://localhost:3000`

## Notes
- The Supabase `anon` key in `supabase.js` is safe to be public — row-level security ensures users can only access their own data
- MFM data is fetched fresh on each app load
- Roster data syncs to Supabase when online; falls back to localStorage when offline
