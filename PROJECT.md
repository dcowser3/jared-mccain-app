# The Jared McCain App

## Overview
An iOS app dedicated to NBA player and influencer Jared McCain (#3, OKC Thunder). A one-stop-shop for fans to follow his social media, watch his content, track his NBA stats, and "text" with AI versions of Jared and his best friend Nate.

## Tabs

### 1. 📱 Social Feed
- All social media accounts linked (Instagram, TikTok, YouTube, Twitter/X)
- Recent posts from each platform (embedded or previewed)
- Easy-to-watch TikTok carousel (swipe through recent TikToks in-app)
- Instagram highlights / recent posts
- YouTube video player for recent uploads

### 2. 🏀 Stats & News
- Current season stats (PPG, RPG, APG, FG%, 3P%, etc.)
- Recent game box scores (last 5-10 games)
- Game-by-game log
- News articles and stories about Jared
- Interesting shoutouts / highlights he's received
- Career milestones and highlights

### 3. 💬 Text Jared
- iMessage-style chat interface (blue/gray bubbles)
- AI trained on Jared McCain's speech patterns, vocabulary, and personality
- Training data: YouTube video transcripts, TikTok captions, Instagram captions, interviews
- Personality traits: Gen Z energy, basketball knowledge, influencer vibes, nail art enthusiast, positive attitude
- Should feel like actually texting Jared

### 4. 💬 Text Nate
- Same iMessage-style interface
- AI trained on Nate's personality (Jared's best friend)
- Personality: meme speak, funny, internet humor, Gen Z slang
- Should feel distinctly different from Jared's chat

## Jared McCain Info
- **Full Name:** Jared Dane McCain
- **Born:** February 20, 2004 (22 years old)
- **Height/Weight:** 6'3" / 195 lbs
- **Position:** Shooting Guard / Point Guard
- **Team:** Oklahoma City Thunder (#3)
- **Draft:** 2024 R1 Pick 16 (by Philadelphia 76ers)
- **College:** Duke (2023-2024)
- **High School:** Centennial (Corona, CA)
- **Instagram:** @jmccain24
- **TikTok:** @jaredmccain2
- **YouTube:** Jared McCain (need exact channel URL)
- **NBA Player ID:** 1642272
- **Basketball Reference:** /players/m/mccaija01.html
- **Best Friend:** Nate (featured in his content frequently)

## Tech Stack (TBD)
- **Option A:** React Native / Expo (cross-platform, faster dev)
- **Option B:** SwiftUI (native iOS, better UX)
- **Backend:** Flask or Node.js API
- **AI Chat:** OpenAI GPT-4o with custom system prompts
- **Stats API:** NBA.com API or basketball-reference scraping
- **Social Media:** Platform embed APIs or web scraping

## Data Sources
- NBA Stats API: `https://www.nba.com/stats/` endpoints
- Basketball Reference: `https://www.basketball-reference.com/players/m/mccaija01.html`
- YouTube Transcripts: For AI training data
- TikTok/Instagram: For social feed content
- News: Google News API or web scraping

## AI Training Plan
### Jared's Voice
- Scrape YouTube video transcripts (his channel + interviews)
- Collect TikTok captions and themes
- Instagram caption text and tone
- Interview quotes and soundbites
- Key traits: enthusiastic, uses Gen Z slang, talks about basketball/fashion/nails/music

### Nate's Voice  
- Extract Nate's dialogue from joint YouTube videos
- Meme references and internet humor patterns
- Distinct from Jared — more ironic, meme-heavy, deadpan humor
