import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import theme from '../Constants/Themes'
import { fetchData } from "../axios/fetchData"
import axios from 'axios'
import { AuthContext } from "../context/authContext"
import { useFocusEffect } from '@react-navigation/native'

export default function LoginScreen({ navigation }) {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const { login, token } = useContext(AuthContext)

    useFocusEffect(
        React.useCallback(() => {
            const checkAuthentication = () => {
                if (token) {
                    navigation.navigate('Profile')
                }
            };
            checkAuthentication();
        }, [])
    );
    
    const handelLogin = async () => {
        if (userName.length === 0 || password.length === 0) {
            alert("Username And Password are required")
        } else {
            try {
                let response = await fetchData.post("auth/login", { user_name: userName, password })
                if (response.data.access_token) {
                    login(response.data.access_token)
                    navigation.navigate('Profile')
                } else {
                    alert("Wrong Username or password")
                }
            } catch (err) {
                // check the status code
                if(err.response.status && err.response.status === 401){
                    alert("Wrong Username or password")
                } else {
                    alert("Something went wrong")
                }
            }
        }
    }
    return (
        <SafeAreaView style={{ flex: 1,paddingTop:150 }}>
            <View className ='w-[100%] flex justify-center items-center gap-3'>
                <Image source={require('../assets/Login.png')} style={{ width: 200, height: 200 }}/>
                <TextInput onChangeText={(text) => setUserName(text)} placeholder='Email' className='h-10 w-[80%] border-b-2 px-3' style={{ borderBottomColor:theme.colors.primaryDark }} placeholderTextColor={'gray'} />
                <TextInput onChangeText={(text) => setPassword(text)} placeholder='Password' secureTextEntry className='h-10 w-[80%] border-b-2 px-3' style={{ borderBottomColor:theme.colors.primaryDark }} placeholderTextColor={'gray'} />
                <TouchableOpacity className='w-[80%]' onPress={handelLogin}>
                    <Text className='text-white text-center rounded-lg px-10 py-4 mt-2' style={{ backgroundColor: theme.colors.primaryDark }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity className='w-[80%] flex flex-row gap-2' onPress={() => navigation.navigate("Register")}>
                    <Text>Dont't have an account?</Text>
                    <Text className='text-blue-700'>Register</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}