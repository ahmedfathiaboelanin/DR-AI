import React, { useState, useEffect } from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import LottieView from 'lottie-react-native';

export default function AudioRecorder() {
    const [recording, setRecording] = useState();
    const [isRecording, setIsRecording] = useState(false);
    const [audioUri, setAudioUri] = useState(null);

    useEffect(() => {
        return () => {
            if (recording) {
                recording.stopAndUnloadAsync();
                setRecording(null);
            }
        };
    }, []);

    const startRecording = async () => {
        try {
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to record audio denied');
                return;
            }

            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            setRecording(recording);
            setIsRecording(true);
        } catch (error) {
            console.error('Failed to start recording', error);
        }
    };

    const stopRecording = async () => {
        try {
            await recording.stopAndUnloadAsync();
            setIsRecording(false);

            const uri = recording.getURI();
            setAudioUri(uri);
        } catch (error) {
            console.error('Failed to stop recording', error);
        }
    };

    return (
        <View>
            {isRecording ?
                <TouchableOpacity onPress={stopRecording}>
                    <View style={{ width: 30, aspectRatio: 1 }}>
                        <LottieView source={require('../assets/animated/pause.json')} style={{ flex: 1 }} autoPlay loop />
                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={startRecording}>
                    <View style={{ width: 30, aspectRatio: 1 }}>
                        <LottieView source={require('../assets/animated/voice.json')} style={{ flex: 1 }} autoPlay loop />
                    </View>
                </TouchableOpacity>
            }
            {isRecording && <Text>Recording...</Text>}
            <Button title="Get Recorded Audio" onPress={() => console.log(audioUri)} />
        </View>
    );
}
