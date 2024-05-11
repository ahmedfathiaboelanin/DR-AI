import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback, TouchableWithoutFeedbackBase, Pressable } from 'react-native'
import React from 'react'
import theme from '../Constants/Themes'

export default function ServiceCard({ onPressFunc, image, title, cardColor, textColor, description }) {
    return (
        <Pressable className='items-center justify-center flex gap-3 w-[80%] h-48 px-4 rounded-lg mt-3' style={{
            backgroundColor: cardColor, shadowColor: '#1976D2',
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 1,
            shadowRadius: 50,
            elevation: 5
        }}
            onPress={() => { onPressFunc() }}
        >
            <Image source={image} style={{ width: 70, height: 70 , tintColor: 'white'}} />
            <Text className='' style={{ textAlign: 'center', color: textColor, fontWeight: 'bold', fontSize: 20 }}>{title}</Text>
            <Text className='' style={{ textAlign: 'center', color: textColor, fontSize: 15 }}>{ description }</Text>
        </Pressable>
    )
}