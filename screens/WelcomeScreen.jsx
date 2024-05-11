import {
    View,
    SafeAreaView,
} from "react-native";
import React from "react";
import theme from "../Constants/Themes";
import LottieView from 'lottie-react-native';
import Onboarding from 'react-native-onboarding-swiper';

export default function WelcomeScreen({ navigation }) {
    return (
        <SafeAreaView
            className="flex-1"
            style={{ backgroundColor: theme.colors.primaryLighter }}
        >
            <Onboarding
                pages={[
                    {
                        backgroundColor: theme.colors.primaryDark,
                        image: <View style={{ width: 290, aspectRatio: 1 }}>
                            <LottieView source={require('../assets/animated/hello.json')} style={{ flex: 1 }} autoPlay loop />
                        </View>,
                        title: 'Welcome',
                        subtitle: 'Empowering You with AI-driven Healthcare Solutions',
                    },
                    {
                        backgroundColor: theme.colors.tertiaryMain,
                        image: <View style={{ width: 290, aspectRatio: 1 }}>
                            <LottieView source={require('../assets/animated/Ai.json')} style={{ flex: 1 }} autoPlay loop />
                        </View>,
                        title: 'Explore Features',
                        subtitle: 'AI Diagnosis, Personalized Recommendations, and More',
                    },
                    {
                        backgroundColor: theme.colors.paperLight,
                        image: <View style={{ width: 290, aspectRatio: 1 }}>
                            <LottieView source={require('../assets/animated/gears.json')} style={{ flex: 1 }} autoPlay loop />
                        </View>,
                        title: 'AI Benefits',
                        subtitle: ' Faster Diagnoses, Improved Health Monitoring, and Peace of Mind',
                    },
                    {
                        backgroundColor: theme.colors.secondaryMain,
                        image: <View style={{ width: 290, aspectRatio: 1 }}>
                            <LottieView source={require('../assets/animated/celebrate.json')} style={{ flex: 1 }} autoPlay loop />
                        </View>,
                        title: 'Ready to Get Started?',
                        subtitle: " Let's Begin Your Journey to Better Health with AI",
                    },
                ]}
                onDone={() => navigation.navigate("Main")}
                onSkip={() => navigation.navigate("Main")}
            />
        </SafeAreaView>
    );
}
