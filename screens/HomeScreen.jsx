import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import theme from '../Constants/Themes'
import { AuthContext } from '../context/authContext'
import Carousel from 'react-native-snap-carousel-new'
import doctorsData from '../Constants/doctors'
import DoctorCard from '../Components/DoctorCard'

export default function HomeScreen({navigation}) {
  const [doctors, setDoctors] = useState(doctorsData.filter(doctor => doctor.rate > 4).slice(0,3))
  console.log("top rated",doctors.length);
  const { userData, isLoggedIn } = useContext(AuthContext)
  const sliderData = [
    { title: 'Our Doctors', img: require("../assets/doctor.png"), color: theme.colors.primaryDark },
    { title: 'AI Services', img: require("../assets/ai healthcare.png"), color: theme.colors.secondaryDark },
    { title: 'Articles', img: require("../assets/articles.png"), color: theme.colors.primaryLight },
    { title: 'Medicine', img: require("../assets/medicine.png"), color: theme.colors.tertiaryMain },
  ];
  useEffect(() => {
    console.log(userData);
  })
  const { width: screenWidth } = Dimensions.get('window');
  const renderItem = ({ item }) => (
    <View className='rounded-xl flex items-center justify-center gap-1 p-4' style={{ backgroundColor: item.color }}>
      <Image
        source={item.img}
        style={{ width: 100, height: 100, marginBottom: 20 }}
        resizeMode='contain'
      />
      <Text className='text-2xl font-bold text-white'>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView className='flex-1 items-center justify-center' style={{ backgroundColor: theme.colors.primaryLighter }}>
      <ScrollView className='flex-1 w-[100%] pt-4' contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', gap: 20, alignItems: 'center', paddingBottom: 150, paddingTop: 20 }} style={{ backgroundColor: theme.colors.primaryLighter }} showsVerticalScrollIndicator={false} >
        {/* header */}
        <View className='w-[95%] flex-row justify-between items-center mt-4 py-2 rounded-lg px-3'
          style={{
          backgroundColor: theme.colors.paperLight, shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5
        }}>
          <Text className='text-base text-green-950'>
            Hi,{userData ? userData.first_name+' '+userData.last_name : 'Guest'}
          </Text>
          <Image
            source={require('../assets/AvatarMaker.png')}
            style={{ width: 40, height: 40, borderRadius: 20 }}
            resizeMode='contain'
          />
        </View>
        {/* carousel */}
        <Carousel
          data={sliderData}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth * 0.8}
          layout="default"
          loop
          autoplay
        />
        {/* Top rated Doctor */}
        <View className='flex-1 w-[100%] items-center justify-center gap-2 px-5'>
          <View className='flex flex-row w-[100%] items-center justify-between'>
            <Text className=' text-base' style={{ color: theme.colors.primaryMain }}>
              Top Rated Doctor
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Doctor")}>
              <Text className='text-blue-500 text-base' style={{ }}>
                See All 
              </Text>
            </TouchableOpacity>
          </View>
          {doctors.map(doctor => <View key={doctor.id} className="w-[100%]" ><DoctorCard doctor={doctor}/></View>)}
        </View>
        {/* AI Services */}
        
      </ScrollView>
    </SafeAreaView>
  )
}