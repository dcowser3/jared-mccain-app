import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { COLORS, JARED } from '../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TIKTOK_CARD_WIDTH = SCREEN_WIDTH * 0.42;
const POST_IMAGE_HEIGHT = 220;

// ─── Placeholder Data ────────────────────────────────────────────────

const SOCIAL_LINKS = [
  {
    id: 'instagram',
    label: 'Instagram',
    handle: `@${JARED.instagram}`,
    icon: 'logo-instagram' as const,
    color: '#E4405F',
    url: `https://instagram.com/${JARED.instagram}`,
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    handle: `@${JARED.tiktok}`,
    icon: 'musical-notes' as const,
    color: '#00F2EA',
    url: `https://tiktok.com/@${JARED.tiktok}`,
  },
  {
    id: 'youtube',
    label: 'YouTube',
    handle: 'Jared McCain',
    icon: 'logo-youtube' as const,
    color: '#FF0000',
    url: 'https://youtube.com/@jaredmccain',
  },
  {
    id: 'twitter',
    label: 'X / Twitter',
    handle: '@jaboredmccain',
    icon: 'logo-twitter' as const,
    color: '#FFFFFF',
    url: 'https://x.com/jaboredmccain',
  },
];

const RECENT_TIKTOKS = [
  {
    id: '1',
    title: 'Nail art before game day 💅🏀',
    views: '4.2M',
    thumbnail: 'https://picsum.photos/seed/jm-nail/400/700',
  },
  {
    id: '2',
    title: 'Day in my life as an NBA rookie',
    views: '8.1M',
    thumbnail: 'https://picsum.photos/seed/jm-ditl/400/700',
  },
  {
    id: '3',
    title: 'POV: you hit a game winner 🔥',
    views: '12.3M',
    thumbnail: 'https://picsum.photos/seed/jm-gw/400/700',
  },
  {
    id: '4',
    title: 'Get ready with me – pregame fit check',
    views: '6.7M',
    thumbnail: 'https://picsum.photos/seed/jm-grwm/400/700',
  },
  {
    id: '5',
    title: 'Cooking challenge with the squad 🍳',
    views: '3.9M',
    thumbnail: 'https://picsum.photos/seed/jm-cook/400/700',
  },
];

const RECENT_POSTS = [
  {
    id: '1',
    image: 'https://picsum.photos/seed/jm-post1/800/800',
    caption: 'Thunder up ⚡️ Blessed to be here. #OKC',
    likes: '284K',
    timeAgo: '2h ago',
  },
  {
    id: '2',
    image: 'https://picsum.photos/seed/jm-post2/800/800',
    caption: 'New nails, new game 💅✨ Which set y\'all rocking with?',
    likes: '412K',
    timeAgo: '1d ago',
  },
  {
    id: '3',
    image: 'https://picsum.photos/seed/jm-post3/800/800',
    caption: 'Duke boys reunion 💙🤍 Miss y\'all fr',
    likes: '198K',
    timeAgo: '3d ago',
  },
  {
    id: '4',
    image: 'https://picsum.photos/seed/jm-post4/800/800',
    caption: 'Off day vibes. Reset and go again 🧘‍♂️',
    likes: '156K',
    timeAgo: '5d ago',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────

const openLink = async (url: string) => {
  await WebBrowser.openBrowserAsync(url);
};

// ─── Components ──────────────────────────────────────────────────────

function HeroSection() {
  return (
    <View style={styles.hero}>
      <View style={styles.heroOverlay}>
        <Text style={styles.heroNumber}>#{JARED.number}</Text>
        <Text style={styles.heroName}>{JARED.name}</Text>
        <Text style={styles.heroTeam}>{JARED.team}</Text>
        <View style={styles.heroBadgeRow}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>{JARED.position}</Text>
          </View>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>{JARED.height}</Text>
          </View>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>{JARED.college}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function SocialLinkButton({ item }: { item: typeof SOCIAL_LINKS[0] }) {
  return (
    <TouchableOpacity
      style={styles.socialButton}
      activeOpacity={0.7}
      onPress={() => openLink(item.url)}
    >
      <View style={[styles.socialIconWrap, { backgroundColor: item.color + '20' }]}>
        <Ionicons name={item.icon} size={22} color={item.color} />
      </View>
      <View style={styles.socialTextWrap}>
        <Text style={styles.socialLabel}>{item.label}</Text>
        <Text style={styles.socialHandle}>{item.handle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
    </TouchableOpacity>
  );
}

function TikTokCard({ item }: { item: typeof RECENT_TIKTOKS[0] }) {
  return (
    <TouchableOpacity
      style={styles.tiktokCard}
      activeOpacity={0.8}
      onPress={() => openLink(`https://tiktok.com/@${JARED.tiktok}`)}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.tiktokThumb} />
      <View style={styles.tiktokOverlay}>
        <View style={styles.tiktokViewsRow}>
          <Ionicons name="play" size={12} color="#FFF" />
          <Text style={styles.tiktokViews}>{item.views}</Text>
        </View>
      </View>
      <View style={styles.tiktokInfo}>
        <Text style={styles.tiktokTitle} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function PostCard({ item }: { item: typeof RECENT_POSTS[0] }) {
  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.postAvatar}>
          <Text style={styles.postAvatarText}>JM</Text>
        </View>
        <View style={styles.postHeaderText}>
          <Text style={styles.postUsername}>{JARED.instagram}</Text>
          <Text style={styles.postTime}>{item.timeAgo}</Text>
        </View>
      </View>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.postActions}>
        <View style={styles.postActionsLeft}>
          <Ionicons name="heart-outline" size={24} color={COLORS.text} />
          <Ionicons
            name="chatbubble-outline"
            size={22}
            color={COLORS.text}
            style={{ marginLeft: 16 }}
          />
          <Ionicons
            name="paper-plane-outline"
            size={22}
            color={COLORS.text}
            style={{ marginLeft: 16 }}
          />
        </View>
        <Ionicons name="bookmark-outline" size={22} color={COLORS.text} />
      </View>
      <Text style={styles.postLikes}>{item.likes} likes</Text>
      <Text style={styles.postCaption}>
        <Text style={styles.postCaptionBold}>{JARED.instagram} </Text>
        {item.caption}
      </Text>
    </View>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────

export default function SocialFeedScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero */}
        <HeroSection />

        {/* Social Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connect</Text>
          <View style={styles.socialList}>
            {SOCIAL_LINKS.map((item) => (
              <SocialLinkButton key={item.id} item={item} />
            ))}
          </View>
        </View>

        {/* Recent TikToks */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Recent TikToks</Text>
            <TouchableOpacity
              onPress={() => openLink(`https://tiktok.com/@${JARED.tiktok}`)}
            >
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={RECENT_TIKTOKS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.tiktokList}
            renderItem={({ item }) => <TikTokCard item={item} />}
          />
        </View>

        {/* Recent Posts */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Recent Posts</Text>
            <TouchableOpacity
              onPress={() => openLink(`https://instagram.com/${JARED.instagram}`)}
            >
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          {RECENT_POSTS.map((item) => (
            <PostCard key={item.id} item={item} />
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // Hero
  hero: {
    backgroundColor: COLORS.surface,
    paddingTop: 60,
    paddingBottom: 32,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
  },
  heroOverlay: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  heroNumber: {
    fontSize: 64,
    fontWeight: '900',
    color: COLORS.accent,
    letterSpacing: -2,
    opacity: 0.9,
  },
  heroName: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: -8,
    letterSpacing: -0.5,
  },
  heroTeam: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
  heroBadge: {
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  heroBadgeText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },

  // Section
  section: {
    marginTop: 28,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },

  // Social Links
  socialList: {
    paddingHorizontal: 16,
    gap: 6,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
  },
  socialIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialTextWrap: {
    flex: 1,
    marginLeft: 14,
  },
  socialLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  socialHandle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 1,
  },

  // TikTok Cards
  tiktokList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  tiktokCard: {
    width: TIKTOK_CARD_WIDTH,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
  },
  tiktokThumb: {
    width: '100%',
    height: TIKTOK_CARD_WIDTH * 1.45,
    backgroundColor: COLORS.surfaceLight,
  },
  tiktokOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: TIKTOK_CARD_WIDTH * 1.45,
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  tiktokViewsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tiktokViews: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  tiktokInfo: {
    padding: 10,
  },
  tiktokTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 17,
  },

  // Post Cards
  postCard: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    overflow: 'hidden',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  postAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postAvatarText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 13,
  },
  postHeaderText: {
    marginLeft: 10,
  },
  postUsername: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 14,
  },
  postTime: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 1,
  },
  postImage: {
    width: '100%',
    height: POST_IMAGE_HEIGHT,
    backgroundColor: COLORS.surfaceLight,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  postActionsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postLikes: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 14,
    paddingHorizontal: 14,
  },
  postCaption: {
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 14,
    paddingBottom: 14,
    paddingTop: 4,
  },
  postCaptionBold: {
    fontWeight: '700',
  },
});
