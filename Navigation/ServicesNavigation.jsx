import { createStackNavigator } from '@react-navigation/stack';
import AiServicesScreen from '../screens/AiServicesScreen';
import DiagnosisScreen from '../screens/DiagnosisScreen';
import SkinCancerScreen from '../screens/SkinCancerScreen';
import ChestScreen from '../screens/ChestScreen';
import BrainTumorScreen from '../screens/BrainTumorScreen';

const Stack = createStackNavigator();
const ServicesNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AllServices" component={AiServicesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Diagnosis" component={DiagnosisScreen} />
            <Stack.Screen name="SkinCancer" component={SkinCancerScreen} />
            <Stack.Screen name="Chest" component={ChestScreen} />
            <Stack.Screen name="BrainTumor" component={BrainTumorScreen} />
        </Stack.Navigator>
    );
};

export default ServicesNavigation;
