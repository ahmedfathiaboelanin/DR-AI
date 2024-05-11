import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthContextProvider from "./context/authContext";

import BottomTabs from "./Navigation/BottomTabs";
import WelcomeScreen from "./screens/WelcomeScreen";

const stack = createNativeStackNavigator();
function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <StatusBar style="dark" backgroundColor="#000"/>
        <stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Welcome"
        >
          <stack.Screen name="Main" component={BottomTabs} />
          <stack.Screen name="Welcome" component={WelcomeScreen} />
        </stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
