import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import UserNavigator from './UserNavigator';
import AiServicesScreen from '../screens/AiServicesScreen';
import { Image, Text, View } from 'react-native';
import theme from '../Constants/Themes';
import { pixelRatio } from 'nativewind';
import ServicesNavigation from './ServicesNavigation';
import DoctorsScreen from '../screens/DoctorsScreen';
import ChatbotScreen from '../screens/ChatbotScreen';


const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                // tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    backgroundColor: theme.colors.paperLight,
                    height: 100,
                    position: 'absolute',
                    right: 10,
                    left: 10,
                    bottom: 20,
                    borderRadius:10
                },
            })}
            initialRouteName="Home"
        >
            <Tab.Screen
                name="Chat"
                component={ChatbotScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View className='items-center justify-center'>
                            <Image source={require('../assets/icons/chat.png')} style={{ width: focused ? 35 : 25, height: focused ? 35 : 25, tintColor: focused ? theme.colors.primaryDark : 'black' }} />
                            <Text className='text-sm my-3' style={{ color: focused ? theme.colors.primaryDark : 'black' }}>Chat</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="AiServices"
                component={ServicesNavigation}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View className='items-center justify-center'>
                            <Image source={require('../assets/icons/robot.png')} style={{ width: focused ? 35 : 30, height: focused ? 35:25, tintColor: focused ? theme.colors.primaryDark : 'black' }}/>
                            <Text className='text-sm my-3' style={{ color: focused ? theme.colors.primaryDark : 'black' }}>AiServices</Text>
                        </View>
                    )
                }}
                
            />
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View className='items-center justify-center'>
                            <Image source={require('../assets/icons/home.png')} style={{ width: focused ? 35 : 25, height: focused ? 35: 25, tintColor: focused ? theme.colors.primaryDark : 'black' }} />
                            <Text className='text-sm my-3' style={{ color: focused ? theme.colors.primaryDark : 'black' }}>HOME</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Doctor"
                component={DoctorsScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View className='items-center justify-center'>
                            <Image source={require('../assets/icons/doctor.png')} style={{ width: focused ? 35 : 25, height: focused ? 35: 25, tintColor: focused ? theme.colors.primaryDark : 'black' }} />
                            <Text className='text-sm my-3' style={{ color: focused ? theme.colors.primaryDark : 'black' }}>Doctors</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen name="User" component={UserNavigator} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <View className='items-center justify-center'>
                        <Image source={require('../assets/icons/user.png')} style={{ width: focused ? 35 : 25, height: focused ? 35: 25, tintColor: focused ? theme.colors.primaryDark : 'black' }} />
                        <Text className='text-sm my-3' style={{ color: focused ? theme.colors.primaryDark : 'black' }}>USER</Text>
                    </View>
                )
            }} />
        </Tab.Navigator>
    );
}