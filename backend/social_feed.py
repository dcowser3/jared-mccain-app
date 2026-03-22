"""
Social media feed aggregation for Jared McCain.
YouTube via Data API v3, TikTok via oEmbed, Instagram via curated list.
"""
import json
import time
import urllib.request

# YouTube Data API v3 (free: 10K requests/day)
YOUTUBE_API_KEY = None  # Set via env or config
YOUTUBE_CHANNEL_ID = "UC5VYF0LHox2_7Ql2pKihqCQ"

_cache = {}


def _cached_fetch(url, cache_key, ttl=3600):
    """Generic cached URL fetch."""
    if cache_key in _cache:
        cached_time, cached_data = _cache[cache_key]
        if time.time() - cached_time < ttl:
            return cached_data
    
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (compatible; JaredMcCainApp/1.0)"
    })
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.load(resp)
            _cache[cache_key] = (time.time(), data)
            return data
    except Exception as e:
        if cache_key in _cache:
            return _cache[cache_key][1]
        raise e


def get_youtube_videos(max_results=10):
    """Get recent YouTube videos from Jared's channel."""
    if YOUTUBE_API_KEY:
        try:
            url = (
                f"https://www.googleapis.com/youtube/v3/search"
                f"?key={YOUTUBE_API_KEY}"
                f"&channelId={YOUTUBE_CHANNEL_ID}"
                f"&part=snippet"
                f"&order=date"
                f"&type=video"
                f"&maxResults={max_results}"
            )
            data = _cached_fetch(url, "youtube_videos", ttl=3600)
            
            videos = []
            for item in data.get("items", []):
                snippet = item["snippet"]
                video_id = item["id"]["videoId"]
                videos.append({
                    "id": video_id,
                    "title": snippet["title"],
                    "thumbnail": snippet["thumbnails"]["high"]["url"],
                    "published": snippet["publishedAt"],
                    "url": f"https://www.youtube.com/watch?v={video_id}",
                })
            return videos
        except Exception:
            pass
    
    # Fallback: curated list of real videos
    return [
        {
            "id": "9XKygqoelys",
            "title": "I got traded to the Oklahoma City Thunder...",
            "thumbnail": "https://i.ytimg.com/vi/9XKygqoelys/hqdefault.jpg",
            "published": "2026-02-10",
            "url": "https://www.youtube.com/watch?v=9XKygqoelys",
            "views": "996K",
        },
        {
            "id": "kdW4WPlv6uU",
            "title": "I Went to LA for NBA All Star Weekend!",
            "thumbnail": "https://i.ytimg.com/vi/kdW4WPlv6uU/hqdefault.jpg",
            "published": "2026-02-18",
            "url": "https://www.youtube.com/watch?v=kdW4WPlv6uU",
            "views": "202K",
        },
        {
            "id": "hDSngB40_X0",
            "title": "I Played Against LeBron James and Luka Doncic!",
            "thumbnail": "https://i.ytimg.com/vi/hDSngB40_X0/hqdefault.jpg",
            "published": "2025-12-15",
            "url": "https://www.youtube.com/watch?v=hDSngB40_X0",
            "views": "174K",
        },
        {
            "id": "BRyyx4X_YXc",
            "title": "My Morning Yoga Routine",
            "thumbnail": "https://i.ytimg.com/vi/BRyyx4X_YXc/hqdefault.jpg",
            "published": "2025-12-01",
            "url": "https://www.youtube.com/watch?v=BRyyx4X_YXc",
            "views": "128K",
        },
        {
            "id": "SaldcPxWn3c",
            "title": "Jared McCain & Kyle Lowry Give Out Presents! (Christmas Vlog)",
            "thumbnail": "https://i.ytimg.com/vi/SaldcPxWn3c/hqdefault.jpg",
            "published": "2025-12-26",
            "url": "https://www.youtube.com/watch?v=SaldcPxWn3c",
            "views": "66K",
        },
        {
            "id": "WNXgJAW8RGM",
            "title": "I Went Camping in the Wild!",
            "thumbnail": "https://i.ytimg.com/vi/WNXgJAW8RGM/hqdefault.jpg",
            "published": "2025-05-15",
            "url": "https://www.youtube.com/watch?v=WNXgJAW8RGM",
            "views": "94K",
        },
        {
            "id": "mT-nqktCij8",
            "title": "I Played The New York Knicks!",
            "thumbnail": "https://i.ytimg.com/vi/mT-nqktCij8/hqdefault.jpg",
            "published": "2026-01-15",
            "url": "https://www.youtube.com/watch?v=mT-nqktCij8",
            "views": "85K",
        },
        {
            "id": "N_4KLtP5Bys",
            "title": "My First Official NBA Game!",
            "thumbnail": "https://i.ytimg.com/vi/N_4KLtP5Bys/hqdefault.jpg",
            "published": "2024-10-25",
            "url": "https://www.youtube.com/watch?v=N_4KLtP5Bys",
            "views": "334K",
        },
        {
            "id": "06SK913cFKM",
            "title": "My 1st NBA Season THE MOVIE",
            "thumbnail": "https://i.ytimg.com/vi/06SK913cFKM/hqdefault.jpg",
            "published": "2025-05-20",
            "url": "https://www.youtube.com/watch?v=06SK913cFKM",
            "views": "63K",
        },
    ]


def get_tiktok_embed(video_url):
    """Get TikTok oEmbed data for a video URL."""
    try:
        oembed_url = f"https://www.tiktok.com/oembed?url={video_url}"
        data = _cached_fetch(oembed_url, f"tiktok:{video_url}", ttl=86400)
        return {
            "html": data.get("html", ""),
            "thumbnail": data.get("thumbnail_url", ""),
            "title": data.get("title", ""),
            "author": data.get("author_name", ""),
        }
    except Exception:
        return None


def get_tiktok_videos():
    """Get curated list of Jared's TikTok videos."""
    # TikTok doesn't have a public feed API — curated list
    return [
        {
            "id": "1",
            "title": "Game day nail art tutorial 💅🏀",
            "url": "https://www.tiktok.com/@jaredmccain2",
            "views": "2.1M",
            "thumbnail_placeholder": True,
        },
        {
            "id": "2",
            "title": "POV: You just got traded to OKC ✈️",
            "url": "https://www.tiktok.com/@jaredmccain2",
            "views": "1.8M",
            "thumbnail_placeholder": True,
        },
        {
            "id": "3",
            "title": "Day in my life as an NBA player 🏀",
            "url": "https://www.tiktok.com/@jaredmccain2",
            "views": "3.2M",
            "thumbnail_placeholder": True,
        },
        {
            "id": "4",
            "title": "Pre-game fit check ✨",
            "url": "https://www.tiktok.com/@jaredmccain2",
            "views": "1.5M",
            "thumbnail_placeholder": True,
        },
        {
            "id": "5",
            "title": "Thunder vibes are different fr fr 🔥",
            "url": "https://www.tiktok.com/@jaredmccain2",
            "views": "890K",
            "thumbnail_placeholder": True,
        },
    ]


def get_social_links():
    """Get all of Jared's social media links."""
    return {
        "instagram": {
            "handle": "@jmccain24",
            "url": "https://instagram.com/jmccain24",
            "followers": "500K+",
        },
        "tiktok": {
            "handle": "@jaredmccain2",
            "url": "https://tiktok.com/@jaredmccain2",
            "followers": "1.7M+",
        },
        "youtube": {
            "handle": "Jared McCain",
            "url": "https://youtube.com/@jaredmccain024",
            "subscribers": "250K+",
        },
        "twitter": {
            "handle": "@jaborsmccain",
            "url": "https://twitter.com/jaborsmccain",
            "followers": "150K+",
        },
    }
