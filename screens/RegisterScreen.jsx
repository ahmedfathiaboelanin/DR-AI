import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import theme from '../Constants/Themes'
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { fetchData } from '../axios/fetchData';

export default function RegisterScreen({ navigation }) {
    const [role, setRole] = useState('patient');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [specialist, setSpecialist] = useState('')
    const [doctorId, setDoctorId] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [government, setGovernment] = useState('')
    const [gender, setGender] = useState('male')
    const [errors, setErrors] = useState(null);

    const handelRegister = async () => {
        console.log('register');
        if (firstName.length === 0 || lastName.length === 0 || email.length === 0 || userName.length === 0 || password.length === 0 || confirmPassword.length === 0) {
            alert("All fields are required")
        } else if (password !== confirmPassword) {
            alert("Password and Confirm Password does not match")
        } else {
            if (role === 'doctor') {
                if (specialist.length === 0 || doctorId.length === 0) {
                    alert("Doctor Data are required")
                } else {
                    console.log('doctor');
                    try {
                        let response = await fetchData.post("/auth/register", {
                            first_name: firstName,
                            last_name: lastName,
                            gender: gender,
                            email: email,
                            user_name: userName,
                            password: password,
                            user_type: 'doctor',
                            doctor_personal_id: doctorId,
                            specialization: specialist,
                            street: street,
                            city: city,
                            government: government,
                        })
                        console.log(response);
                    } catch (error) {
                        alert(error)
                        setErrors(Object.values(error.response.data));
                    }
                }
            } else {
                try {
                    let res = await fetchData.post("/auth/register", {
                        first_name: firstName,
                        last_name: lastName,
                        gender: gender,
                        email: email,
                        user_name: userName,
                        password: password,
                        user_type: 'patient',
                    })
                    console.log(res)
                } catch (error) {
                    setErrors(Object.values(error.response.data));
                }
            }
        }
    }

    return (
        <SafeAreaView className='flex-1 items-center justify-center' style={{ backgroundColor: theme.colors.primaryLighter }}>
            <ScrollView className='flex-1 w-[100%] pt-4' contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', gap: 20, alignItems: 'center', paddingBottom: 150, paddingTop: 20 }} style={{ backgroundColor: theme.colors.primaryLighter }} showsVerticalScrollIndicator={false} >
                <View className='w-[100%] flex justify-center items-center gap-3'>
                    <Image source={require('../assets/register.png')} style={{ width: 250, height: 200 }} />
                    <View className='flex flex-row gap-3 w-[100%] px-3'>
                        {/* UserName */}
                        <TextInput placeholder='First Name' onChangeText={(text) => setFirstName(text)} className='h-10 flex-1 border-b-2 px-3' style={{ borderBottomColor: theme.colors.primaryDark }} placeholderTextColor={'gray'} />
                        <TextInput placeholder='Lastt Name' onChangeText={(text) => setLastName(text)} className='h-10 flex-1 border-b-2 px-3' style={{ borderBottomColor: theme.colors.primaryDark }} placeholderTextColor={'gray'} />
                    </View>
                    <View className='flex flex-row gap-3 w-[100%] px-3'>
                        {/* Email */}
                        <TextInput placeholder='Email' onChangeText={(text) => setEmail(text)} className='h-10 flex-1 border-b-2 px-3' style={{ borderBottomColor: theme.colors.primaryDark }} placeholderTextColor={'gray'} />
                        <TextInput placeholder='User Name' onChangeText={(text) => setUserName(text)} className='h-10 flex-1 border-b-2 px-3' style={{ borderBottomColor: theme.colors.primaryDark }} placeholderTextColor={'gray'} />
                    </View>
                    <View className='flex flex-row gap-3 w-[100%] px-3'>
                        {/* Password */}
                        <TextInput placeholder='Password' onChangeText={(text) => setPassword(text)} secureTextEntry className='h-10 flex-1 border-b-2 px-3' style={{ borderBottomColor: theme.colors.primaryDark }} placeholderTextColor={'gray'} />
                        <TextInput placeholder='Enter Password Again' onChangeText={(text) => setConfirmPassword(text)} secureTextEntry className='h-10 flex-1 border-b-2 px-3' style={{ borderBottomColor: theme.colors.primaryDark }} placeholderTextColor={'gray'} />
                        {/* check if doctor display inputs to get id and specialist */}
                    </View>
                    <View className='flex flex-row gap-3 w-[100%] px-3'>
                        {/* select role */}
                        <View className='h-10 flex-1 border-b-2' style={{ borderBottomColor: theme.colors.primaryDark }} >
                            <Picker
                                style={{ borderBottomColor: theme.colors.primaryDark }}
                                selectedValue={role}
                                onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
                            >
                                <Picker.Item label="Patient" value="patient" />
                                <Picker.Item label="Doctor" value="doctor" />
                            </Picker>
                        </View>
                        {/* gender */}
                        <View className='h-10 flex-1 border-b-2' style={{ borderBottomColor: theme.colors.primaryDark }} >
                            <Picker
                                style={{ borderBottomColor: theme.colors.primaryDark }}
                                selectedValue={role}
                                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                            >
                                <Picker.Item label="male" value="male" />
                                <Picker.Item label="female" value="female" />
                            </Picker>
                        </View>
                    </View>
                    {role === 'doctor' && (
                        <View className='w-[100%] flex justify-center items-center'>
                            <View className='flex flex-row gap-3 w-[100%] px-3'>
                                {/* id should be number */}
                                <TextInput keyboardType='numeric' placeholder='id' onChangeText={(text) => setDoctorId(text)} className='h-10 flex-1 border-b-2 px-3' style={{ borderBottomColor: theme.colors.primaryDark }} placeholderTextColor={'gray'} />
                                {/* specialist */}
                                <TextInput placeholder='specialist' onChangeText={(text) => setSpecialist(text)} className='h-10 flex-1 border-b-2 px-3' style={{ borderBottomColor: theme.colors.primaryDark }} placeholderTextColor={'gray'} />
                            </View>
                            <View className='flex flex-row gap-3 my-3 w-[100%] px-3'>
                                {/* address */}
                                <TextInput placeholder='City' onChangeText={(text) => setCity(text)} className='h-10 flex-1 border-b-2 px-3' style={{ borderBottomColor: theme.colors.primaryDark }} placeholderTextColor={'gray'} />
                                <TextInput placeholder='Government' onChangeText={(text) => setGovernment(text)} className='h-10 flex-1 border-b-2 px-3' style={{ borderBottomColor: theme.colors.primaryDark }} placeholderTextColor={'gray'} />
                                <TextInput placeholder='Street' onChangeText={(text) => setStreet(text)} className='h-10 flex-1 border-b-2 px-3' style={{ borderBottomColor: theme.colors.primaryDark }} placeholderTextColor={'gray'} />
                            </View>
                        </View>
                    )}
                    {/* Submit */}
                    <TouchableOpacity className='w-[100%] px-3 flex justify-center items-center' onPress={handelRegister}>
                        <Text className=' text-white text-center rounded-lg w-[100%] px-10 py-4 mt-2' style={{ backgroundColor: theme.colors.primaryDark }}>Register</Text>
                    </TouchableOpacity>
                    {/* Already have an account? */}
                    <TouchableOpacity className='w-[80%] flex flex-row gap-2' onPress={() => navigation.navigate("Login")}>
                        <Text>Already have an account?</Text>
                        <Text className='text-blue-700'>Login</Text>
                    </TouchableOpacity>
                </View>
                {errors && errors.map((error, index) => (
                    <Text className="w-[100%] text-red-900" key={index}>{Object.values(error)}</Text>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}
