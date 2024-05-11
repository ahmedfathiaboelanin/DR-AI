import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import theme from '../Constants/Themes';
import { fetchData } from '../axios/fetchData';

export default function BrainTumorScreen() {
    const [hasGalleryPermission, setHasGalleryPermission] = useState(false);
    const [image, setImage] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const [hasCameraPermission, setHasCameraPermission] = useState(null);

    // get permissions for both camera
    useEffect(() => {
        const getPermissions = async () => {
            const cameraPermission = await ImagePicker.getCameraPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === 'granted');
        };

        getPermissions();
    }, []);

    // take photo with camera
    const takePhoto = async () => {
        try {
            const pickerResult = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!pickerResult.cancelled) {
                setImage(pickerResult.assets[0]);
                const uri = pickerResult.assets[0].uri;
                setImageSrc(uri);
            }
        } catch (error) {
            alert('Camera Colsed')
        }
    }

    // get permissions for gallery
    useEffect(() => {
        const getPermission = async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status === 'granted') {
                setHasGalleryPermission(true);
            }
        };
        getPermission();
    }, []);

    // pick photo from gallery
    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                // allowsEditing: true,
                quality: 1,
            });

            if (!result.cancelled) {
                setImage(result.assets[0]);
                const uri = result.assets[0].uri;
                setImageSrc(uri);
                console.log('Image uploaded');
            }
        } catch (error) {
            alert('Gallery Colsed');
        }
    };

    const handleSubmit = async () => {
        if (image) {
            setErrorMessage(null)
            setResult(null)
            try {
                setLoading(true);
                // Create form data
                let formData = new FormData();
                formData.append('image', {
                    uri: imageSrc,
                    name: 'image.jpg',
                    type: 'image/jpeg',
                });

                // Send form data to server
                let response = await fetchData.post('/brain-tumor', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                setResult(response.data.prediction);
                setLoading(false);
            } catch (error) {
                setErrorMessage(error.message);
                alert("Something went wrong");
                setLoading(false);
            }
        } else {
            console.error('No image selected');
        }
    };

    const handleReset = () => {
        setImage(null);
        setImageSrc(null);
        setResult(null);
        setLoading(false);
        setErrorMessage(null);
    };

    const getGalleryPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === 'granted') {
            setHasGalleryPermission(true);
        }
    };

    if (!hasGalleryPermission) {
        return (
            <SafeAreaView className='flex-1 items-center justify-center'>
                <ScrollView className='w-[100%]' contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 100, backgroundColor: theme.colors.primaryLighter }}>
                    {/* pressable to get permission */}
                    <Pressable onPress={getGalleryPermission}>
                        <Text className='px-5 py-3 rounded-sm' style={{ backgroundColor: theme.colors.secondaryDark, color: 'white' }}>Get Permission</Text>
                    </Pressable>
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className='flex-1 items-center justify-center'>
            <ScrollView className='w-[100%]' contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 100, backgroundColor: theme.colors.primaryLighter }}>
                <View className='items-center w-[95%] gap-1 justify-center border-2 py-10 border-dashed border-cyan-500'>
                    {image && <Image source={{ uri: imageSrc }} style={{ width: 300, height: 300 }} />}
                    <View className='flex flex-row gap-3 flex-wrap items-center justify-center flex-1'>
                        {!image &&
                            <Pressable onPress={pickImage} className='py-3 px-5 rounded-lg' style={{ backgroundColor: theme.colors.tertiaryMain }}>
                                <Image source={require('../assets/icons/gallery.png')} style={{ width: 20, height: 20, tintColor: 'white' }} />
                            </Pressable>
                        }
                        {!image &&
                            <Pressable onPress={takePhoto} className='py-3 px-5 bg-green-700 rounded-lg' style={{ backgroundColor: theme.colors.primaryMain }}>
                                <Image source={require('../assets/icons/camera.png')} style={{ width: 20, height: 20, tintColor: 'white' }} />
                            </Pressable>
                        }
                        {image &&
                            <Pressable onPress={handleReset} className='py-3 px-5 rounded-lg' style={{ backgroundColor: theme.colors.tertiaryMain }}>
                                <Image source={require('../assets/icons/cancel.png')} style={{ width: 20, height: 20, tintColor: 'white' }} />
                            </Pressable>
                        }
                        {image &&
                            <Pressable onPress={handleSubmit} className='py-3 px-5 rounded-lg' style={{ backgroundColor: theme.colors.secondaryDark }}>
                                <Image source={require('../assets/icons/examin.png')} style={{ width: 20, height: 20, tintColor: 'white' }} />
                            </Pressable>
                        }
                    </View>
                </View>
                {loading &&
                    // activity indicator
                    <ActivityIndicator size="large" color={theme.colors.primaryDark} />
                }
                {errorMessage &&
                    <View className={`p-4 mt-3 rounded-lg flex flex-row bg-red-500 w-[95%]`}>
                        <Text style={{ color: 'white' }} className='text-lg'>Error : {errorMessage}</Text>
                    </View>
                }
                {result &&
                    <View className={`p-4 mt-3 rounded-lg flex flex-row ${result !== "notumor" ? "bg-red-500" : "bg-green-500"} w-[95%]`}>
                        <Text style={{ color: 'white' }} className='text-lg'>Predection : {result}</Text>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
}
