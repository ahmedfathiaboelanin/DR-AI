import { View, Text, Keyboard, SafeAreaView, ScrollView, Image, TextInput, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import theme from '../Constants/Themes'
import axios from 'axios'
import Message from '../Components/Message'

export default function ChatbotScreen() {
  const { height } = Dimensions.get('window');
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([
    { role: "system", content: "How can I help You ?" },
  ])

  const handelSubmit = async () => {
    Keyboard.dismiss()
    if (prompt.length === 0) {
      alert("Please enter a prompt")
    } else {
      setMessages(prevMessages => [...prevMessages, { role: "user", content: prompt }])
      setLoading(true)
      await axios.post("http://192.168.1.8:5000/chat", { message: prompt }).then((response) => {
        setLoading(false)
        setMessages(prevMessages => [...prevMessages, { role: "assistant", content: response.data.replace(/assistant\n\s/g, "") }])
        setPrompt("")
      }).catch((err) => {
        setLoading(false)
        alert(`Error: ${err}`)
        console.log(err.status)
      })
    }
  }

  return (
    <SafeAreaView className='flex-1 items-center justify-center' style={{ backgroundColor: theme.colors.primaryLighter }}>
      <View className='flex-1 items-center w-[100%] pt-4' style={{ flexGrow: 1, gap: 20, paddingTop: 50, backgroundColor: theme.colors.primaryLighter }} >
        <View className='w-[100%]' style={{ height: height * 0.72 }}>
          <ScrollView className='w-[100%]' contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end', alignItems: 'center', }} >
            {
              messages.map((message, index) => (
                <Message message={message} key={index} />
              ))
            }
            {loading && <ActivityIndicator size="large" color={theme.colors.primaryDark} style={{ marginTop: 20, marginBottom: 20 }} />}
          </ScrollView>
        </View>
        <View className='w-[100%]flex gap-2 px-3 rounded-lg flex-row justify-center items-center' style={{ backgroundColor: theme.colors.primaryLighter, position: 'absolute', bottom: 125 }}>
          <TextInput editable={loading ? false : true} onChangeText={(text) => setPrompt(text)} value={prompt} className='flex-1 bg-white rounded-lg p-3' placeholder='Ask any question' />
          <TouchableOpacity disabled={loading} onPress={handelSubmit}>
            <Image source={require('../assets/icons/send.png')} style={{ width: 30, height: 30, tintColor: theme.colors.primaryDark }} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}