import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { Symptoms as SymptomsOptions } from '../Constants/Symptoms'
import theme from '../Constants/Themes'
import { fetchData } from '../axios/fetchData'

export default function DiagnosisScreen() {
    const [symptoms, setSymptoms] = useState([])
    const [disease, setDisease] = useState("")
    const handelSubmit = async () => {
        if(symptoms.length === 0){
            alert("Please select symptoms")
        } else {
            console.log('diagnosis');
            try {
                // call back-end api
                let response = await fetchData.post("/diagnose", {
                    symptoms: symptoms.join(", "),
                });
                // alert(response.data);
                // set the disease 
                console.log(response.data);
                setDisease(response.data);
            } catch (err) {
                alert("Something went wrong");
                console.log(err);
            }
        }
    }

    const handelClear = () => {
        setSymptoms([])
        setDisease("")
    }

    return (
        <SafeAreaView className='flex-1 items-center justify-center' style={{ backgroundColor: theme.colors.primaryLighter }}>
            <ScrollView className='flex-1 w-[100%] pt-4' contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', gap: 20, alignItems: 'center', paddingBottom: 150, paddingTop: 20 }} style={{ backgroundColor: theme.colors.primaryLighter }} showsVerticalScrollIndicator={false} >
                <Text className='text-4xl mb-4' style={{ color:theme.colors.primaryDark }}>
                    What Do You Feel ?
                </Text>
                <MultipleSelectList
                    setSelected={(val) => setSymptoms(val)}
                    placeholder="Select Symptoms"
                    boxStyles={{ width: '90%', marginTop: 10, borderRadius: 5, borderColor: theme.colors.primaryDark }}
                    dropdownStyles={{ width: '100%' }}
                    dropdownTextStyles={{ color: theme.colors.primaryDark }}
                    data={SymptomsOptions}
                    save="value"
                    onSelect={() => {console.log(symptoms);}}
                    label="Symptoms"
                    badgeStyles={{ backgroundColor: theme.colors.primaryDark }}
                />
                <View className='flex flex-row gap-3'>
                    <Pressable onPress={handelSubmit}>
                        <Text className='px-5 py-3' style={{ backgroundColor: theme.colors.primaryDark, color: 'white', borderRadius: 5 }}>Predict</Text>
                    </Pressable>
                    <Pressable onPress={handelClear}>
                        <Text className='px-5 py-3' style={{ backgroundColor: theme.colors.tertiaryDark, color: 'white', borderRadius: 5 }}>Clear</Text>
                    </Pressable>
                </View>
                {disease && 
                    <>
                    <View className='w-[100%] flex flex-row p-4 items-center gap-3'>
                        <Text className='text-2xl text-red-600'>Disease:</Text>
                        <Text className='text-2xl text-red-600'>{disease.Disease}</Text>
                    </View>
                    <View className='w-[100%] flex flex-row p-4 items-center gap-4'>
                        <Text className='text-lg' style={{ color: theme.colors.primaryDark }} >Spcialist:</Text>
                        <Text>{disease.Spcialist}</Text>
                    </View>
                    <View className='w-[100%] flex flex-row p-4'>
                        <View>
                            <Text className='w-[100%] text-lg' style={{ color: theme.colors.primaryDark }}>Precuations :</Text>
                            {disease.Precautions.split(",").map((precaution, i) => {
                                if (precaution === null) {
                                    return (
                                        <Text key={i}>
                                        </Text>
                                    )
                                }
                                return (
                                    <Text key={i}>
                                        {`${i + 1} - ${precaution}`}
                                    </Text>
                                )
                            }
                            )
                            }
                        </View>
                    </View>
                    <Text className='px-4 w-[100%] text-lg' style={{ color:theme.colors.primaryDark }}>Description :</Text>
                    <Text className='px-4'>{disease.Description}</Text>
                    </>
                }
            </ScrollView>
        </SafeAreaView>
    )
}