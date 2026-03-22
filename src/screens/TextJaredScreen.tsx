import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  SafeAreaView,
  ListRenderItemInfo,
} from 'react-native';
import { COLORS } from '../constants/theme';
import { chatApi } from '../api/client';

interface Message {
  id: string;
  text: string;
  sent: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

const FALLBACK_RESPONSES = [
  'Bro that\'s so fire 🔥 no cap',
  'Lol you\'re funny fr 😂 but nah for real though...',
  'Okayyy I see you! 🫡 that\'s a W',
  'Nah bro you trippin 💀 but I respect it',
  'Yo that reminds me of this one time at Duke... crazy times fr',
  'Literally tho!! 💅 I was just thinking about that',
];

const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
};

export default function TextJaredScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Yooo what\'s good! 🏀 Ask me anything — hoops, nails, music, whatever fr fr',
      sent: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [fallbackIndex, setFallbackIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = useCallback(async () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: trimmed,
      sent: true,
      timestamp: new Date(),
    };

    const typingMsg: Message = {
      id: 'typing',
      text: '',
      sent: false,
      timestamp: new Date(),
      isTyping: true,
    };

    setMessages(prev => [typingMsg, userMsg, ...prev]);
    setInputText('');

    try {
      const response = await chatApi.sendToJared(trimmed);
      const replyMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: response.reply,
        sent: false,
        timestamp: new Date(),
      };
      setMessages(prev => [replyMsg, ...prev.filter(m => m.id !== 'typing')]);
    } catch (error) {
      // Fallback to canned responses if API fails
      const currentResponse = FALLBACK_RESPONSES[fallbackIndex % FALLBACK_RESPONSES.length];
      setFallbackIndex(prev => prev + 1);
      setTimeout(() => {
        const replyMsg: Message = {
          id: (Date.now() + 1).toString(),
          text: currentResponse,
          sent: false,
          timestamp: new Date(),
        };
        setMessages(prev => [replyMsg, ...prev.filter(m => m.id !== 'typing')]);
      }, 800);
    }
  }, [inputText, fallbackIndex]);

  const renderMessage = useCallback(({ item }: ListRenderItemInfo<Message>) => {
    if (item.isTyping) {
      return (
        <View style={[styles.bubbleRow, styles.bubbleRowReceived]}>
          <View style={[styles.bubble, styles.bubbleReceived]}>
            <Text style={styles.typingDots}>● ● ●</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={[styles.bubbleRow, item.sent ? styles.bubbleRowSent : styles.bubbleRowReceived]}>
        <View style={[styles.bubble, item.sent ? styles.bubbleSent : styles.bubbleReceived]}>
          <Text style={[styles.bubbleText, item.sent ? styles.bubbleTextSent : styles.bubbleTextReceived]}>
            {item.text}
          </Text>
        </View>
        <Text style={[styles.timestamp, item.sent ? styles.timestampSent : styles.timestampReceived]}>
          {formatTime(item.timestamp)}
        </Text>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Jared McCain 🏀</Text>
      </View>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          inverted
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
        />
        <View style={styles.inputBar}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="iMessage"
              placeholderTextColor="#666"
              multiline
              maxLength={500}
              returnKeyType="default"
            />
          </View>
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={!inputText.trim()}
            activeOpacity={0.7}
          >
            <Text style={styles.sendArrow}>↑</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS?.background ?? '#000000',
  },
  flex: {
    flex: 1,
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2a2a2a',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  messagesList: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 4,
  },
  bubbleRow: {
    marginVertical: 2,
    maxWidth: '80%',
  },
  bubbleRowSent: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  bubbleRowReceived: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 9,
    minHeight: 36,
    justifyContent: 'center',
  },
  bubbleSent: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  bubbleReceived: {
    backgroundColor: COLORS?.surface ?? '#1a1a1a',
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    fontSize: 16,
    lineHeight: 21,
  },
  bubbleTextSent: {
    color: '#fff',
  },
  bubbleTextReceived: {
    color: '#fff',
  },
  timestamp: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  timestampSent: {
    textAlign: 'right',
  },
  timestampReceived: {
    textAlign: 'left',
  },
  typingDots: {
    color: '#999',
    fontSize: 14,
    letterSpacing: 2,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#2a2a2a',
    backgroundColor: COLORS?.background ?? '#000000',
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: COLORS?.surface ?? '#1a1a1a',
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#3a3a3a',
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 8 : 4,
    marginRight: 8,
    maxHeight: 100,
    justifyContent: 'center',
  },
  textInput: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 20,
    maxHeight: 80,
    padding: 0,
  },
  sendButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1,
  },
  sendButtonDisabled: {
    backgroundColor: '#333',
  },
  sendArrow: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: -1,
  },
});
