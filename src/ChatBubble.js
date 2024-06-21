import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {Ionicons} from "react-native-vector-icons"
export default function ChatBubble({role, text, onSpeech}) {
  return (
    <View className={`mb-2 p-2 max-w-[70%] rounded-2xl relative ${role==="user" ? "self-end bg-blue-100" : "self-start bg-blue-200"}`}>
      <Text className="text-lg">{text}</Text>
      {role === "model" && (<TouchableOpacity className="" onPress={onSpeech}>
        <Ionicons className="bottom-[5px] right-[5px]" name="volume-high-outline" size={24} color="#fff"/>
      </TouchableOpacity>)}
    </View>
  )
}