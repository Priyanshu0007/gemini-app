import { View, Text, TextInput,FlatList,ActivityIndicator,StyleSheet, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import axios from 'axios'
import { speak,isSpeakingAsync,stop } from 'expo-speech'
import ChatBubble from './ChatBubble';
import {Ionicons} from "react-native-vector-icons"
export default function ChatBot() {
    const [chat,setChat]=useState([]);
    const [userInput,setUserInput]=useState("");
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [isSpeaking,setIsSpeaking]=useState(false);
    const API_KEY="AIzaSyBm5M7tXDKPeiqgvr-zZj0VfqHHejgGf0s";
    const handleUserInput=async ()=>{
        if(userInput.length<1){return;}
        let updatedChat=[...chat,{role:"user",parts:[{text:userInput}]},]
        setLoading(true);
        try{
            const response=await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
                {contents:updatedChat}
            )
            const modalResponse=response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
            if(modalResponse){
                const updatedChatWithModal=[...updatedChat,{role:"model",parts:[{text:modalResponse}]}];
                setChat(updatedChatWithModal);
                setUserInput("");
            }
        }catch(error){
            setError("An error occured. Please try again")
        }finally{
            setLoading(false);
        }
    }
    const handleSpeech= async(text)=>{
        if(isSpeaking){stop();setIsSpeaking(false);}
        else{
            if(!(await isSpeakingAsync())){
                speak(text);
                setIsSpeaking(true);
            }
        }

    }
    const handleSuggestion=(text)=>{
        setUserInput(text);
    }
    const renderChatItem=({item})=>(
        <ChatBubble role={item.role} text={item.parts[0].text} onSpeech={()=>handleSpeech(item.parts[0].text)}/>
    )
  return (
    <View className="flex-1 p-4 ">
      <Text className="text-3xl font-bold mb-4 text-center text-blue-800">Gemini ChatBot</Text>
      {chat.length>0 ? <FlatList className="" data={chat} renderItem={renderChatItem} keyExtractor={(item,index)=>index.toString()}/> :
         <View className="flex-1 justify-center items-center">
            <Text className="text-black text-2xl">Ask anything</Text>
            <TouchableOpacity className="py-2 px-4 bg-blue-200 rounded-full mt-4" onPress={()=>{handleSuggestion("What is the height of the Taj Mahal?")}}>
                <Text className="text-lg">What is the height of the Taj Mahal?</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-2 px-4 bg-blue-200 rounded-full mt-4" onPress={()=>{handleSuggestion("What is bodmas?")}}>
                <Text className="text-lg">What is bodmas?</Text>
            </TouchableOpacity>
            </View>}
        <View className="flex-row items-center mt-2 px-4 rounded-full border-2 border-gray-300">
            <TextInput className="flex-1 h-16" placeholder='Type your message...' placeholderTextColor="#aaa" value={userInput} onChangeText={setUserInput}/>
            <TouchableOpacity className="rounded-full bg-blue-400 px-5 py-2" onPress={handleUserInput}>
                {!loading && <Ionicons className="" name="send" size={24} color="#fff"/>}
                {loading && <ActivityIndicator color={"#333"}></ActivityIndicator>}
            </TouchableOpacity>
        </View>
        
        {error && <Text>{error}</Text>}
    </View>
  )
}