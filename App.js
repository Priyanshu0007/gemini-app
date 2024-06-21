import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ChatBot from './src/ChatBot';

export default function App() {
  return (
    <SafeAreaView className="flex-1 mt-10">
      <ChatBot/>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

