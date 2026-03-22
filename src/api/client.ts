// API client for The Jared McCain App backend
// Uses Cloudflare tunnel for external access
const BASE_URL = 'https://identify-mostly-pants-led.trycloudflare.com';

export async function apiGet(endpoint: string) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function apiPost(endpoint: string, body: any) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// Stats API
export const statsApi = {
  getSeasonAverages: () => apiGet('/api/stats/season'),
  getRecentGames: (count = 10) => apiGet(`/api/stats/games?last=${count}`),
  getCareerStats: () => apiGet('/api/stats/career'),
};

// Social API
export const socialApi = {
  getYouTubeVideos: () => apiGet('/api/social/youtube'),
  getTikToks: () => apiGet('/api/social/tiktoks'),
  getSocialLinks: () => apiGet('/api/social/links'),
};

// Chat API
export const chatApi = {
  sendToJared: (message: string, sessionId = 'default') =>
    apiPost('/api/chat/jared', { message, session_id: sessionId }),
  sendToNate: (message: string, sessionId = 'default') =>
    apiPost('/api/chat/nate', { message, session_id: sessionId }),
};

// News API
export const newsApi = {
  getNews: () => apiGet('/api/news'),
};

// Player info
export const playerApi = {
  getInfo: () => apiGet('/api/player'),
};
