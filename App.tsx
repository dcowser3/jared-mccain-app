import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import SocialFeedScreen from './src/screens/SocialFeedScreen';
import StatsScreen from './src/screens/StatsScreen';
import TextJaredScreen from './src/screens/TextJaredScreen';
import TextNateScreen from './src/screens/TextNateScreen';
import { COLORS } from './src/constants/theme';

const Tab = createBottomTabNavigator();

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  const icons: Record<string, string> = {
    'Social': '📱',
    'Stats': '🏀',
    'Text Jared': '💬',
    'Text Nate': '😂',
  };
  return (
    <Text style={{ fontSize: focused ? 26 : 22 }}>
      {icons[label] || '📱'}
    </Text>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <TabIcon label={route.name} focused={focused} />
          ),
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.textMuted,
          tabBarStyle: {
            backgroundColor: COLORS.surface,
            borderTopColor: COLORS.border,
            height: 90,
            paddingBottom: 30,
            paddingTop: 8,
          },
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTintColor: COLORS.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen
          name="Social"
          component={SocialFeedScreen}
          options={{ title: 'Social' }}
        />
        <Tab.Screen
          name="Stats"
          component={StatsScreen}
          options={{ title: 'Stats' }}
        />
        <Tab.Screen
          name="Text Jared"
          component={TextJaredScreen}
          options={{ title: 'Text Jared' }}
        />
        <Tab.Screen
          name="Text Nate"
          component={TextNateScreen}
          options={{ title: 'Text Nate' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
