import { SafeAreaView, ScrollView, Text } from 'react-native'
import React from 'react'
import theme from '../Constants/Themes'
import ServiceCard from '../Components/ServiceCard'

export default function AiServicesScreen({navigation}) {
  const services = [
    {
      id: 1,
      title: 'Diagnosis Service',
      description: 'Utilizes user-provided symptoms to predict health conditions.',
      image: require('../assets/icons/diagnosis icon.png'),
      route: 'Diagnosis',
      cardColor: theme.colors.primaryMain,
      textColor: theme.colors.paperLight
    },
    {
      id: 2,
      title: 'Skin-Cancer',
      description: 'Analyzes user-provided images to detect malignancy.',
      image: require('../assets/icons/skin cancer icon.png'),
      route: 'SkinCancer',
      cardColor: theme.colors.secondaryMain,
      textColor:theme.colors.paperLight
    },
    {
      id: 3,
      title: 'Chest',
      description: 'Analyzes user-provided images to detect chest diseases.',
      image: require('../assets/icons/chest.png'),
      route: 'Chest',
      cardColor: theme.colors.tertiaryMain,
      textColor:theme.colors.paperLight
    },
    {
      id: 4,
      title: 'Brain Tumor AI Service',
      description: 'Advanced AI-driven service for precise brain tumor diagnosis and treatment.',
      image: require('../assets/icons/brain.png'),
      route: 'BrainTumor',
      cardColor: theme.colors.secondaryDark,
      textColor: theme.colors.paperLight
    },
    {
      id: 5,
      title: 'ChatBot',
      description:"Chat with AI assistant to get personalized recommendations.",
      image: require('../assets/icons/chat.png'),
      route: 'Chat',
      cardColor: theme.colors.tertiaryDark,
      textColor:theme.colors.paperLight
    },
  ]
  return (
    <SafeAreaView className='flex-1 items-center justify-center pt-10' style={{ backgroundColor: theme.colors.primaryLighter }}>
      <ScrollView className='flex-1 w-[100%] pt-4' contentContainerStyle={{ flexGrow: 1,justifyContent:'center',gap:20, alignItems: 'center', paddingBottom: 150, paddingTop:20 }} style={{ backgroundColor: theme.colors.primaryLighter }} showsVerticalScrollIndicator={false} >
        {/* <Text className='text-center text-2xl font-bold px-9' style={{ color: theme.colors.primaryMain }}>Ai Services</Text> */}
        {services.map((service) => <ServiceCard cardColor={service.cardColor} textColor={service.textColor} key={service.id} onPressFunc={() => navigation.navigate(service.route)} image={service.image} title={service.title} description={service.description}/>)}
      </ScrollView>
    </SafeAreaView>
  )
}