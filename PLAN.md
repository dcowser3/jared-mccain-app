# The Jared McCain App — Comprehensive Plan

## 🔬 Research Findings

### About Jared McCain
- **Full name:** Jared Dane McCain
- **Born:** February 20, 2004 (age 22), Sacramento CA
- **Height/Weight:** 6'3" / 195 lbs
- **Position:** Shooting Guard / Point Guard
- **Current team:** Oklahoma City Thunder (#3) — traded from 76ers in Feb 2026
- **Draft:** 2024 R1 Pick 16 by Philadelphia 76ers
- **College:** Duke (2023–2024), averaged 14.3 PPG, 5.0 RPG
- **High school:** Centennial (Corona, CA) — 2x California Gatorade Player of the Year, McDonald's All-American
- **Family:** Mom Jina (White/Filipino), Dad Lance (African American), older brother Jayce (Duke Player Dev Specialist)
- **Injuries:** Meniscus tear (Dec 2024, missed rest of rookie season), UCL thumb surgery (Oct 2025, missed 1 month)
- **NBA career:** Rookie of the Month Oct/Nov 2024, career-high 34 pts & 10 ast vs Cavs. 76ers record: 16.0 PPG (first 18 games). Current OKC stats: 8.4 PPG, 2.1 RPG, 1.4 APG (off bench)

### His Social Media Presence
- **TikTok:** @jaredmccain2 — 1.7M+ followers (as of early research). Known for dance trends, basketball content, personality videos. Posts with teammates, girlfriend, family. Some videos hit 15M+ views.
- **Instagram:** @jmccain24 — 227K+ followers. Lifestyle, fashion, game day fits, nail art
- **YouTube:** @jaredmccain024 — Personal vlogs. Content includes:
  - "I got traded to the Oklahoma City Thunder..." (996K views, 14 min)
  - "I Went to LA for NBA All Star Weekend!" (202K views, 20 min)
  - "I Played Against LeBron James and Luka Doncic!" (174K views, 30 min)
  - "My Morning Yoga Routine" (128K views, 13 min)
  - "I Went Camping in the Wild!" (94K views, 22 min, with Nate for Ralph Lauren)
  - "Jared McCain & Kyle Lowry Give Out Presents!" (66K views, 32 min)
  - "My First Official NBA Game!" (334K views, 33 min)
  - "My 1st NBA Season THE MOVIE" (63K views, 3h39m)
  - "I Played The New York Knicks!" (85K views, 23 min)
- **YouTube Channel ID:** UC5VYF0LHox2_7Ql2pKihqCQ
- **Second channel/presence:** @JaredMcCainn (older handle)
- **"Believe" Docuseries:** By Nick Ramos (@nickinthecutt) — 10+ episodes, 2.4M total views. Documentary following his high school/Duke journey. Playlist: PL9z_JnKbkVhOTrn5lzm11uAdUOeVH_-da
- **nickinthecutt** also filmed "Week In The Life: Jared McCain's Trade to OKC" (223K views)
- **Known as:** "The Zesty Hooper" — his embrace of being unapologetically himself
- **Brand deals:** Crocs, Lemon Perfect, Champs Sports, Ralph Lauren Fragrances (Polo 67)
- **Personality traits from articles:**
  - Always smiling, genuine positivity ("Ur so happy all the time makes me smile")
  - Meditates daily, does yoga since freshman year
  - Compared to Corbin Bleu (High School Musical) as a kid
  - Sings Justin Bieber songs, entertainer at heart
  - Paints his nails (signature 💅)
  - Loves fashion, mental health advocacy
  - "This is just him. This is not being fake." — his mom
  - Basketball first, influencer second (gets annoyed when called just a TikToker)

### Best Friend "Nate"
- Featured in camping vlog with Ralph Lauren (Yosemite)
- Appears in multiple vlogs and TikToks
- From research, likely **Nate Sasser** or a childhood friend
- Need to get more specific info on Nate's personality and speaking style from video content
- Based on Derian's description: "mainly meme speak" — internet humor, Gen Z slang, deadpan, ironic

### Jared's Speech Patterns (from articles + video summaries)
- Uses "fr fr" (for real for real)
- Uses "no cap"
- High energy, enthusiastic
- Self-deprecating humor
- Authentic, unfiltered
- References faith/meditation
- Talks about basketball with genuine passion
- References Duke memories fondly
- Calls things "crazy" a lot
- References nail art / fashion naturally
- Gen Z vocabulary but not forced
- Grateful/humble tone
- Uses 💅🏀🔥😂💀 emojis frequently

### NBA Stats APIs Available
| API | Free? | Notes |
|-----|-------|-------|
| stats.nba.com | Yes (but rate-limited, blocks cloud IPs) | Official NBA stats, needs specific headers |
| BallDontLie API | Freemium (needs key for v2) | Clean REST API, game logs |
| data.nba.net | Yes | Deprecated but still works for some endpoints |
| cdn.nba.com | Yes | Schedule data, static JSON |
| Basketball Reference | Scraping | Detailed stats, no official API |

**Recommendation:** Use stats.nba.com via a server-side proxy (to add proper headers) for live stats, with local caching. Fallback to BallDontLie free tier.

### Social Media Integration Options
| Platform | Embed Support | API Needed? |
|----------|--------------|-------------|
| TikTok | WebView embed (oEmbed endpoint) | No API key needed for embeds |
| Instagram | oEmbed endpoint | Meta API key for feed data |
| YouTube | iframe embed + Data API v3 | API key for feed/search |
| Twitter/X | WebView embed | No key for embeds |

**TikTok Embed:** `https://www.tiktok.com/oembed?url=VIDEO_URL` returns embed HTML. Can render in WebView.
**YouTube Data API v3:** Can list channel videos with API key ($0 for 10K requests/day)

---

## 🏗️ Architecture Plan

### Tech Stack
| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | React Native + Expo | Cross-platform, test on phone instantly via Expo Go |
| **Navigation** | @react-navigation/bottom-tabs | Native tab bar |
| **State** | React Context + AsyncStorage | Simple, no Redux needed |
| **Backend API** | Flask (Python) on VPS | Proxy NBA stats, serve AI chat, cache data |
| **AI Chat** | OpenAI GPT-4o | Derian already has API key, good for personality mimicry |
| **Stats Data** | stats.nba.com → server proxy → app | Server handles headers/caching |
| **Social Embeds** | react-native-webview | TikTok/Instagram/YouTube embeds |
| **Styling** | StyleSheet (RN built-in) | Dark theme, premium feel |

### Backend API Endpoints (Flask)
```
GET /api/stats/season          → Season averages (cached 1h)
GET /api/stats/games?last=10   → Recent game logs (cached 15min)
GET /api/stats/career          → Career stats (cached 24h)
GET /api/news                  → Recent news articles about Jared (cached 30min)
GET /api/social/tiktoks        → Recent TikTok URLs/embeds (cached 1h)
GET /api/social/youtube        → Recent YouTube videos (cached 1h)
GET /api/social/instagram      → Recent Instagram posts (cached 1h)
POST /api/chat/jared           → AI chat as Jared McCain
POST /api/chat/nate            → AI chat as Nate
```

### App Screens (4 tabs)

#### Tab 1: 📱 Social Feed
- **Hero:** Jared's profile image, name, team, social stats
- **Quick Links:** Buttons to open Instagram, TikTok, YouTube, Twitter in native apps
- **TikTok Carousel:** Horizontal scroll of recent TikToks (tap to play in WebView modal)
- **YouTube Section:** Recent videos with thumbnails (tap to play inline or open YouTube)
- **Instagram Grid:** Recent post thumbnails (tap to view full post)

#### Tab 2: 🏀 Stats & News
- **Player Card:** Photo, name, #3, OKC Thunder, position, height/weight, draft info
- **Season Stats Bar:** PPG, RPG, APG, FG%, 3P% in big numbers
- **Game Log:** Last 10 games with date, opponent, result (W/L), PTS/REB/AST, color-coded
- **Career Stats:** Collapsible section with season-by-season breakdown
- **News Feed:** ScrollView of recent articles/highlights about Jared (with thumbnails + headlines)

#### Tab 3: 💬 Text Jared
- **iMessage-style UI:** Blue sent bubbles (right), gray received (left)
- **Typing indicator:** Three dots animation
- **AI System Prompt:** Trained on Jared's actual speech patterns, vocabulary, topics
- **Initial greeting:** Something very Jared — upbeat, uses emojis, genuine
- **Topics the AI should be knowledgeable about:**
  - Basketball (his games, teammates, opponents, OKC, Duke memories)
  - Fashion and nail art
  - Mental health and meditation/yoga
  - Music (Justin Bieber, trending songs)
  - Social media / TikTok
  - His family (Jayce, mom, dad)
  - Brand deals (Crocs, Lemon Perfect)
  - Faith and gratitude
  - Food and restaurants from his vlogs
- **Key speech characteristics for AI:**
  - Enthusiastic, uses exclamation marks
  - "fr fr", "no cap", "lowkey", "ngl"
  - 💅🏀🔥😂 emojis
  - References real events from his life
  - Self-deprecating but confident
  - Calls people "bro", "dude"
  - "That's crazy", "I'm so grateful", "it's a blessing"

#### Tab 4: 😂 Text Nate
- **Same iMessage UI**
- **AI System Prompt:** Meme-speak personality, internet humor
- **Distinct from Jared:** More ironic, sarcastic, references memes
- **Key traits:**
  - Short responses, lots of "💀💀💀" and "LMAOOO"
  - References internet culture heavily
  - Deadpan humor
  - Uses "bruh", "bro", "nah"
  - L/W talk, "ratio", "no shot"
  - Gaming references
  - Roasts Jared playfully

---

## 📋 Implementation Phases

### Phase 1: Foundation (Current)
- [x] Create Expo project
- [x] Set up tab navigation
- [x] Create skeleton screens (subagents did this)
- [ ] Set up Flask backend on VPS
- [ ] Verify all screen files exist and work

### Phase 2: Backend + AI Chat
- [ ] Build Flask API server with all endpoints
- [ ] Create NBA stats proxy (stats.nba.com with proper headers + caching)
- [ ] Create AI chat endpoints with Jared/Nate system prompts
- [ ] Write comprehensive system prompts for both characters
- [ ] Test chat API locally

### Phase 3: Stats & News Screen
- [ ] Connect to real NBA stats API via backend
- [ ] Build game log with real data
- [ ] Add news scraping (Google News API or web scraping)
- [ ] Season averages auto-updating

### Phase 4: Social Feed Screen
- [ ] YouTube Data API v3 integration (channel video listing)
- [ ] TikTok embed integration via WebView
- [ ] Instagram feed (may need manual curation or scraping)
- [ ] Social media deep links (open native apps)

### Phase 5: AI Training Data Collection
- [ ] Find way to get YouTube video transcripts (proxy service or manual)
- [ ] Compile Jared's interview quotes from articles
- [ ] Document his specific phrases, vocabulary, and topics
- [ ] Same for Nate from joint content
- [ ] Build comprehensive system prompts with examples

### Phase 6: Polish & Deploy
- [ ] App icon and splash screen design
- [ ] Loading states, error handling, pull-to-refresh
- [ ] Animations and transitions
- [ ] Performance optimization
- [ ] TestFlight deployment
- [ ] App Store submission

---

## 🎨 Design System

### Colors (Dark Theme)
```
Background:     #000000
Surface:        #1a1a1a
Surface Light:  #2a2a2a
Primary Blue:   #007AFF (OKC Thunder blue, also iMessage blue)
Accent Orange:  #FF6B35 (Thunder accent)
Text Primary:   #FFFFFF
Text Secondary: #999999
Text Muted:     #666666
Border:         #333333
Success Green:  #34C759 (wins)
Error Red:      #FF3B30 (losses)
Message Sent:   #007AFF (blue bubbles)
Message Recv:   #333333 (gray bubbles)
```

### Typography
- Headlines: System Bold, 24-32pt
- Body: System Regular, 16pt
- Stats Numbers: System Bold, 36-48pt
- Chat Messages: System Regular, 17pt (matches iMessage)

### Key UI Patterns
- Rounded corners (12-16px radius)
- Card-based layouts with subtle elevation
- Smooth scrolling with momentum
- Pull-to-refresh on data screens
- Skeleton loading states
- Bottom sheet modals for video players

---

## 🔐 API Keys Needed
| Service | Key Status | Cost |
|---------|-----------|------|
| OpenAI GPT-4o | ✅ Have it | ~$0.005/chat message |
| YouTube Data API v3 | Need to create | Free (10K req/day) |
| TikTok oEmbed | No key needed | Free |
| NBA Stats | No key needed | Free (rate limited) |
| Google News API | Optional | Free tier available |
| Instagram Graph API | Need Meta app | Free but requires approval |

---

## ⚠️ Risks & Mitigations
1. **NBA stats API blocks cloud IPs** → Server-side proxy with caching + proper headers
2. **YouTube transcripts blocked** → Manual compilation of speech patterns from articles/interviews
3. **TikTok API restrictions** → Use oEmbed for embeds, WebView for playback
4. **Instagram feed access** → May need to manually curate or use unofficial scraping
5. **App Store approval** → Need to be careful about celebrity likeness/name usage (fan app disclaimer)
6. **AI accuracy** → Disclaimer that it's AI, not the real Jared/Nate

---

## 📱 File Structure
```
JaredMcCainApp/
├── App.tsx                      # Tab navigator
├── src/
│   ├── screens/
│   │   ├── SocialFeedScreen.tsx  # Tab 1
│   │   ├── StatsScreen.tsx       # Tab 2
│   │   ├── TextJaredScreen.tsx   # Tab 3
│   │   └── TextNateScreen.tsx    # Tab 4
│   ├── components/
│   │   ├── ChatBubble.tsx        # Reusable iMessage bubble
│   │   ├── ChatInput.tsx         # Text input bar
│   │   ├── StatCard.tsx          # Big stat number display
│   │   ├── GameLogRow.tsx        # Single game result row
│   │   ├── NewsCard.tsx          # News article card
│   │   ├── SocialLink.tsx        # Social media button
│   │   ├── TikTokCard.tsx        # TikTok preview card
│   │   └── VideoPlayer.tsx       # YouTube/TikTok player modal
│   ├── api/
│   │   ├── client.ts             # Base API client
│   │   ├── stats.ts              # NBA stats API calls
│   │   ├── social.ts             # Social media API calls
│   │   └── chat.ts               # AI chat API calls
│   ├── constants/
│   │   └── theme.ts              # Colors, fonts, Jared info
│   └── assets/
│       ├── jared-profile.png     # Jared's photo
│       └── nate-profile.png      # Nate's photo
├── backend/
│   ├── server.py                 # Flask API server
│   ├── nba_stats.py              # NBA stats proxy
│   ├── social_feed.py            # Social media aggregation
│   ├── chat_prompts.py           # AI system prompts
│   └── requirements.txt
└── assets/
    ├── icon.png
    ├── splash.png
    └── adaptive-icon.png
```
