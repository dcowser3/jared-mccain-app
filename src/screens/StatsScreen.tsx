import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { COLORS, JARED } from '../constants/theme';

const { width } = Dimensions.get('window');

interface GameEntry {
  date: string;
  opponent: string;
  pts: number;
  reb: number;
  ast: number;
  result: 'W' | 'L';
}

interface NewsItem {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
}

const SEASON_AVERAGES = [
  { label: 'PPG', value: '8.4' },
  { label: 'RPG', value: '2.1' },
  { label: 'APG', value: '1.4' },
  { label: 'FG%', value: '.441' },
  { label: '3P%', value: '.368' },
  { label: 'MPG', value: '22.6' },
];

const RECENT_GAMES: GameEntry[] = [
  { date: 'Mar 18', opponent: 'BKN', pts: 26, reb: 3, ast: 2, result: 'W' },
  { date: 'Mar 16', opponent: 'LAL', pts: 12, reb: 4, ast: 3, result: 'L' },
  { date: 'Mar 14', opponent: 'DEN', pts: 15, reb: 2, ast: 1, result: 'W' },
  { date: 'Mar 12', opponent: 'PHX', pts: 9, reb: 1, ast: 4, result: 'W' },
  { date: 'Mar 10', opponent: 'MIN', pts: 18, reb: 3, ast: 2, result: 'W' },
];

const NEWS_ITEMS: NewsItem[] = [
  {
    id: '1',
    title: 'McCain drops career-high 26 in Thunder rout',
    source: 'ESPN',
    timeAgo: '2h ago',
  },
  {
    id: '2',
    title: "Jared McCain's nail art goes viral again",
    source: 'Bleacher Report',
    timeAgo: '5h ago',
  },
  {
    id: '3',
    title: "SGA praises McCain's shooting: 'He's fearless'",
    source: 'The Athletic',
    timeAgo: '1d ago',
  },
  {
    id: '4',
    title: 'Thunder rookie McCain earning rotation minutes',
    source: 'Yahoo Sports',
    timeAgo: '2d ago',
  },
];

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function GameRow({ game }: { game: GameEntry }) {
  const isWin = game.result === 'W';
  return (
    <View style={styles.gameRow}>
      <View style={styles.gameLeft}>
        <View
          style={[
            styles.resultBadge,
            { backgroundColor: isWin ? COLORS.success + '22' : COLORS.error + '22' },
          ]}
        >
          <Text
            style={[
              styles.resultText,
              { color: isWin ? COLORS.success : COLORS.error },
            ]}
          >
            {game.result}
          </Text>
        </View>
        <View>
          <Text style={styles.gameOpponent}>vs {game.opponent}</Text>
          <Text style={styles.gameDate}>{game.date}</Text>
        </View>
      </View>
      <View style={styles.gameStats}>
        <Text style={styles.gameStatHighlight}>{game.pts}</Text>
        <Text style={styles.gameStatUnit}>PTS</Text>
        <Text style={styles.gameStatDivider}>·</Text>
        <Text style={styles.gameStat}>{game.reb}</Text>
        <Text style={styles.gameStatUnit}>REB</Text>
        <Text style={styles.gameStatDivider}>·</Text>
        <Text style={styles.gameStat}>{game.ast}</Text>
        <Text style={styles.gameStatUnit}>AST</Text>
      </View>
    </View>
  );
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <View style={styles.newsCard}>
      <View style={styles.newsAccent} />
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <View style={styles.newsMeta}>
          <Text style={styles.newsSource}>{item.source}</Text>
          <Text style={styles.newsTime}>{item.timeAgo}</Text>
        </View>
      </View>
    </View>
  );
}

export default function StatsScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Player Card */}
      <View style={styles.playerCard}>
        <View style={styles.playerNumberContainer}>
          <Text style={styles.playerNumber}>#{JARED.number}</Text>
        </View>
        <View style={styles.playerInfo}>
          <Text style={styles.playerName}>{JARED.name}</Text>
          <Text style={styles.playerTeam}>{JARED.team}</Text>
          <View style={styles.playerDetails}>
            <Text style={styles.playerDetail}>{JARED.position}</Text>
            <Text style={styles.detailDot}>•</Text>
            <Text style={styles.playerDetail}>{JARED.height}</Text>
            <Text style={styles.detailDot}>•</Text>
            <Text style={styles.playerDetail}>{JARED.weight}</Text>
          </View>
          <Text style={styles.playerDraft}>Draft: {JARED.draft}</Text>
        </View>
      </View>

      {/* Season Averages */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Season Averages</Text>
        <View style={styles.statsGrid}>
          {SEASON_AVERAGES.map((stat) => (
            <StatBox key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </View>
      </View>

      {/* Recent Games */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Games</Text>
        <View style={styles.gamesContainer}>
          {RECENT_GAMES.map((game, index) => (
            <React.Fragment key={game.date + game.opponent}>
              <GameRow game={game} />
              {index < RECENT_GAMES.length - 1 && <View style={styles.gameDivider} />}
            </React.Fragment>
          ))}
        </View>
      </View>

      {/* News & Highlights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>News & Highlights</Text>
        {NEWS_ITEMS.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  // Player Card
  playerCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  playerNumberContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  playerNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primary,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
  },
  playerTeam: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.accent,
    marginBottom: 6,
  },
  playerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  playerDetail: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  detailDot: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginHorizontal: 6,
  },
  playerDraft: {
    fontSize: 12,
    color: COLORS.textMuted,
  },

  // Sections
  section: {
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 14,
    letterSpacing: 0.3,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statBox: {
    width: (width - 60) / 3,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginTop: 4,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  // Game Log
  gamesContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  gameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  gameLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resultText: {
    fontSize: 13,
    fontWeight: '800',
  },
  gameOpponent: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  gameDate: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 1,
  },
  gameStats: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  gameStatHighlight: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.primary,
  },
  gameStat: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  gameStatUnit: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginLeft: 2,
    marginRight: 2,
  },
  gameStatDivider: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginHorizontal: 4,
  },
  gameDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 16,
  },

  // News Cards
  newsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  newsAccent: {
    width: 4,
    backgroundColor: COLORS.accent,
  },
  newsContent: {
    flex: 1,
    padding: 14,
  },
  newsTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    lineHeight: 20,
    marginBottom: 8,
  },
  newsMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newsSource: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  newsTime: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
});
