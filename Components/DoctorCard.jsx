import { View, Text, Image } from 'react-native'
import React from 'react'
import theme from '../Constants/Themes'

export default function DoctorCard({ doctor }) {
    return (
        <View className="p-5 w-[100%] rounded-md" style={{ backgroundColor: theme.colors.paperLight, elevation: 5 }}>
            <View className="flex flex-row gap-3 items-center mb-3">
                <Image source={require("../assets/AvatarMaker.png")} style={{ width: 50, height: 50, borderRadius: 50 }} />
                <View className="">
                    <Text>{doctor.name}</Text>
                    <Text>{doctor.specialist}</Text>
                </View>
            </View>
            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis non maxime corrupti vel quisquam cum neque culpa, tempore perferendis eaque! .</Text>
            <View className="flex gap-1 mt-1">
                <Text>Longitude : {doctor.longitude}</Text>
                <Text>Latitude : {doctor.latitude}</Text>
            </View>
            <View className="flex flex-row gap-3 items-center mt-1">
                <Text>Rate : {doctor.rate} ⭐</Text>
                <Text>Price : {doctor.price} LE</Text>
            </View>
        </View>
    )
}