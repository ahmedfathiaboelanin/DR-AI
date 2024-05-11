import { View, Text, Image } from 'react-native'
import React from 'react'
import theme from '../Constants/Themes'

export default function Message({ message }) {
    return (
        <View className={`w-[100%] flex px-2 mt-2`} >
            <View className='w-[100%] px-3 py-3 flex rounded-xl rounded-tr-none' style={{ backgroundColor: message.role === "user" ? theme.colors.paperLight : theme.colors.secondaryMain, elevation: 5 }}>
                <Image source={message.role === "user" ? require("../assets/AvatarMaker.png") : require("../assets/icons/chatbot.png")} style={{ width: 23, height: 23, marginBottom: 10, borderRadius: 50 }} />
                <Text className='text-white text-base' style={{ color: message.role === "user" ? theme.colors.textField : theme.colors.paperLight }}>{message.content}</Text>
            </View>
        </View>
    )
}