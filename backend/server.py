"""
The Jared McCain App — Backend API Server
Serves NBA stats, social media feeds, and AI chat.
"""
import os
import json
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

from chat_prompts import JARED_SYSTEM_PROMPT, NATE_SYSTEM_PROMPT
from nba_stats import get_season_averages, get_recent_games, get_career_stats
from social_feed import get_youtube_videos, get_tiktok_videos, get_social_links

app = Flask(__name__)
CORS(app)

# OpenAI client
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "")
client = OpenAI(api_key=OPENAI_API_KEY)

# Chat history (in-memory, per session)
chat_sessions = {}
MAX_HISTORY = 20  # Keep last 20 messages for context


def get_chat_history(session_id, character):
    """Get or create chat history for a session."""
    key = f"{session_id}:{character}"
    if key not in chat_sessions:
        chat_sessions[key] = []
    return chat_sessions[key]


def trim_history(history):
    """Keep only the last MAX_HISTORY messages."""
    if len(history) > MAX_HISTORY:
        return history[-MAX_HISTORY:]
    return history


# ─── Health ───
@app.route("/api/health")
def health():
    return jsonify({"status": "ok", "app": "The Jared McCain App"})


# ─── Stats ───
@app.route("/api/stats/season")
def stats_season():
    try:
        return jsonify(get_season_averages())
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/stats/games")
def stats_games():
    count = request.args.get("last", 10, type=int)
    try:
        return jsonify(get_recent_games(count))
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/stats/career")
def stats_career():
    try:
        return jsonify(get_career_stats())
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ─── Social ───
@app.route("/api/social/youtube")
def social_youtube():
    try:
        return jsonify(get_youtube_videos())
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/social/tiktoks")
def social_tiktoks():
    try:
        return jsonify(get_tiktok_videos())
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/social/links")
def social_links():
    return jsonify(get_social_links())


# ─── AI Chat ───
@app.route("/api/chat/jared", methods=["POST"])
def chat_jared():
    return _handle_chat("jared", JARED_SYSTEM_PROMPT)


@app.route("/api/chat/nate", methods=["POST"])
def chat_nate():
    return _handle_chat("nate", NATE_SYSTEM_PROMPT)


def _handle_chat(character, system_prompt):
    """Handle AI chat for a character."""
    data = request.get_json()
    if not data or "message" not in data:
        return jsonify({"error": "message required"}), 400
    
    user_message = data["message"].strip()
    if not user_message:
        return jsonify({"error": "empty message"}), 400
    
    session_id = data.get("session_id", "default")
    history = get_chat_history(session_id, character)
    
    # Build messages for OpenAI
    messages = [{"role": "system", "content": system_prompt}]
    
    # Add conversation history
    for msg in history:
        messages.append(msg)
    
    # Add current user message
    messages.append({"role": "user", "content": user_message})
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            max_tokens=200,
            temperature=0.9,
        )
        
        reply = response.choices[0].message.content.strip()
        
        # Update history
        history.append({"role": "user", "content": user_message})
        history.append({"role": "assistant", "content": reply})
        chat_sessions[f"{session_id}:{character}"] = trim_history(history)
        
        return jsonify({
            "reply": reply,
            "character": character,
        })
    
    except Exception as e:
        return jsonify({"error": f"AI error: {str(e)}"}), 500


# ─── News (placeholder — add real scraping later) ───
@app.route("/api/news")
def news():
    """Curated news about Jared McCain."""
    return jsonify([
        {
            "title": "McCain drops career-high 26 as Thunder roll past Nets",
            "source": "ESPN",
            "date": "Mar 18, 2026",
            "url": "https://www.espn.com/nba/",
            "image": None,
        },
        {
            "title": "Jared McCain's nail art goes viral again — 'Thunder Nails' 💅⚡",
            "source": "Bleacher Report",
            "date": "Mar 15, 2026",
            "url": "https://bleacherreport.com/",
            "image": None,
        },
        {
            "title": "SGA praises McCain: 'He brings energy we didn't know we needed'",
            "source": "The Athletic",
            "date": "Mar 12, 2026",
            "url": "https://theathletic.com/",
            "image": None,
        },
        {
            "title": "How the Thunder turned Jared McCain into a perfect bench weapon",
            "source": "Yahoo Sports",
            "date": "Mar 8, 2026",
            "url": "https://sports.yahoo.com/",
            "image": None,
        },
        {
            "title": "McCain reflects on trade from Philly: 'OKC feels like home already'",
            "source": "OKC Thunder",
            "date": "Mar 5, 2026",
            "url": "https://www.nba.com/thunder/",
            "image": None,
        },
    ])


# ─── Player Info ───
@app.route("/api/player")
def player_info():
    """Static player profile info."""
    return jsonify({
        "name": "Jared McCain",
        "number": 3,
        "team": "Oklahoma City Thunder",
        "team_abbr": "OKC",
        "position": "Guard",
        "height": "6'3\"",
        "weight": "195 lbs",
        "age": 22,
        "birthdate": "February 20, 2004",
        "hometown": "Sacramento, CA",
        "college": "Duke",
        "draft": "2024 R1 Pick 16",
        "experience": "2nd Year",
        "socials": get_social_links(),
    })


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8081))
    print(f"🏀 The Jared McCain App API running on port {port}")
    app.run(host="0.0.0.0", port=port, debug=True)
