import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { fetchData } from '../axios/fetchData'
import theme from '../Constants/Themes'
import { useFocusEffect } from '@react-navigation/native'
export default function ProfileScreen({ navigation }) {
  const { token, logout, setUserData } = useContext(AuthContext)
  const [user, setUser] = useState(null)
  const [doctor, setDoctor] = useState(null)
  const [patient, setPatient] = useState(null)

  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       let response = await fetchData.get('auth/profile', {
  //         headers: { "Authorization": `Bearer ${token}` }
  //       })
  //       setUser(response.data.user)
  //       setUserData(response.data.user)
  //       if (response.data.doctor) {
  //         setDoctor(response.data.doctor)
  //       }
  //       if (response.data.patient) {
  //         setPatient(response.data.patient)
  //       }
  //     } catch (err) {
  //       alert("Please login again")
  //       navigation.navigate('Login')
  //     }
  //   }
  //   getUser()
  // }, [])
  
  useEffect(() => {
    if (!token) {
      navigation.navigate('Login')
    }
    const getUser = async () => {
      try {
        let response = await fetchData.get('auth/profile', {
          headers: { "Authorization": `Bearer ${token}` }
        })
        setUser(response.data.user)
        setUserData(response.data.user)
        if (response.data.doctor) {
          setDoctor(response.data.doctor)
        }
        if (response.data.patient) {
          setPatient(response.data.patient)
        }
      } catch (err) {
        alert("Please login")
        navigation.navigate('Login')
      }
    }
    getUser()
  }, [token]);

  const handelLogOut = () => {
    logout()
    setUserData(null)
    setUser(null)
    setDoctor(null)
    setPatient(null)
    navigation.navigate('Login')
  }

  return (
    <SafeAreaView className='flex-1 items-center justify-center pt-10' style={{ backgroundColor: theme.colors.primaryLighter }}>
      <ScrollView className='flex-1 w-[100%] pt-4' contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', gap: 20, alignItems: 'center', paddingBottom: 150, paddingTop: 20 }} style={{ backgroundColor: theme.colors.primaryLighter }} showsVerticalScrollIndicator={false} >
        {
          user ?
          <>
            {user &&
              <View className='rounded-xl bg-gray-100 p-1'>
                <Image source={user.gender === 'male' ? require('../assets/AvatarMaker.png') : require('../assets/avatarFemale.png')} style={{ width: 150, height: 150 }} className='rounded-xl' />
              </View>
            }
            {/* Info */}
            <View className='w-[90%] rounded-xl px-4 py-4' style={{ backgroundColor: theme.colors.paperLight }}>
              {user &&
                <>
                  <Text className='text-lg'>
                    <Text style={{ color: theme.colors.primaryDark }}>Name :</Text> {user.first_name + " " + (user.middle_name ? user.middle_name : "") + " " + user.last_name}
                  </Text>
                  <Text className='text-lg'>
                    <Text style={{ color: theme.colors.primaryDark }}>Email :</Text> {user.email}
                  </Text>
                  <Text className='text-lg'>
                    <Text style={{ color: theme.colors.primaryDark }}>Gender :</Text> {user.gender}
                  </Text>
                  {patient &&
                    <>
                      <Text className='text-lg'>
                        <Text style={{ color: theme.colors.primaryDark }}>Address :</Text> {patient.address}
                      </Text>
                      <Text className='text-lg'>
                        <Text style={{ color: theme.colors.primaryDark }}>Phone Number :</Text> {patient.phone_number}
                      </Text>
                      <Text className='text-lg'>
                        <Text style={{ color: theme.colors.primaryDark }}>Weight :</Text> {patient.weight} Kg
                      </Text>
                      <Text className='text-lg'>
                        <Text style={{ color: theme.colors.primaryDark }}>Height :</Text> {patient.height} cm
                      </Text>
                      <Text className='text-lg'>
                        <Text style={{ color: theme.colors.primaryDark }}>Date of Birth :</Text> {patient.date_of_birth}
                      </Text>
                    </>
                  }
                </>
              }
            </View>
            {/* Doctor Info */}
            {doctor &&
              <View className='w-[90%] rounded-xl px-4 py-4' style={{ backgroundColor: theme.colors.paperLight }}>
                <Text className='text-lg'>
                  <Text style={{ color: theme.colors.primaryDark }}>specialization :</Text> {doctor.specialization}
                </Text>
                <Text className='text-lg'>
                  <Text style={{ color: theme.colors.primaryDark }}>Description :</Text> {doctor.description}
                </Text>
                <Text className='text-lg'>
                  <Text style={{ color: theme.colors.primaryDark }}>Rate :</Text> {doctor.rate} ⭐
                </Text>
                <Text className='text-lg'>
                  <Text style={{ color: theme.colors.primaryDark }}>Price :</Text> {doctor.price} LE
                </Text>
              </View>
            }
            {/* Log Out */}
            <TouchableOpacity onPress={handelLogOut}>
              <Text className='w-64 text-center text-lg rounded-lg px-10 py-4 mt-2 text-white' style={{ backgroundColor: theme.colors.tertiaryDark }}>Log Out</Text>
            </TouchableOpacity>
          </>
            :
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className='w-64 text-center text-lg rounded-lg px-10 py-4 mt-2 text-white' style={{ backgroundColor: theme.colors.tertiaryDark }}>Please Login</Text>
            </TouchableOpacity>
        }
      </ScrollView>
    </SafeAreaView>
  )
}