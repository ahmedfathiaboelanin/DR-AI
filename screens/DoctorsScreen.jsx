import {
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import theme from "../Constants/Themes";
import DoctorCard from "../Components/DoctorCard";
import * as Location from "expo-location";
import doctorsData from "../Constants/doctors";

export default function DoctorsScreen() {
  const [doctors, setDoctors] = useState(doctorsData);

  const [distance, setDistance] = useState(1000000000);
  const [userLocation, setUserLocation] = useState(null);
  const { height } = Dimensions.get("window");

  useEffect(() => {
    getLocationPermission();
  }, []);

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setUserLocation(location.coords);
  };

  const calculateDistance = (doctor) => {
    if (!userLocation) return null;

    const R = 6371; // Radius of the earth in km
    const dLat = toRadians(doctor.latitude - userLocation.latitude);
    const dLon = toRadians(doctor.longitude - userLocation.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(userLocation.latitude)) *
        Math.cos(toRadians(doctor.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const toRadians = (angle) => {
    return (angle * Math.PI) / 180;
  };

  const filteredDoctors = doctors.filter(
    (doctor) => calculateDistance(doctor) <= distance
  );
  return (
    <SafeAreaView
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: theme.colors.primaryLighter, paddingTop: 20 }}
    >
      <View
        className="w-[100%] flex justify-center items-center p-2 mt-5"
        style={{
          height: height * 0.12,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View className="w-[100%] items-center flex flex-row gap-2">
          <TextInput
            keyboardType="numeric"
            onChangeText={(text) => setDistance(text)}
            className="bg-white rounded-lg p-3 flex-1"
            placeholder="Filter By distance in Km"
            style={{ elevation: 5 }}
          />
          {
            distance < 1000000000 &&
            <TouchableOpacity onPress={() => setDistance(1000000000)}>
              <Image source={require('../assets/icons/cancel.png')} style={{ width: 30, height: 30, tintColor: theme.colors.primaryDark }} />
            </TouchableOpacity>
          }
        </View>
        {userLocation &&
          <Text className="mt-3">
            User Location : {"(longitude : "}{userLocation.longitude} , Latitude : {userLocation.latitude}{")"}
          </Text>
        }
      </View>
      <ScrollView
        className="flex-1 w-[100%] px-3"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          gap: 20,
          alignItems: "center",
          paddingBottom: 150,
          paddingTop: 20,
        }}
        style={{ backgroundColor: theme.colors.primaryLighter }}
        showsVerticalScrollIndicator={false}
      >
        {filteredDoctors.map((doctor) => {
          return <DoctorCard doctor={doctor} key={doctor.id} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
