import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";

export default function Profile() {
  const router = useRouter();
  const auth = getAuth();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      setUserEmail(email);
    };
    fetchUserEmail();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("userEmail");
      setUserEmail(null);
      Alert.alert("Logged out", "You have been logged out successfully.");
      router.push("/signin");
    } catch (error) {
      Alert.alert("Logout Error", "Error while logging out");
    }
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  return (
    <View className="flex-1 bg-[#1c1c1e] justify-center items-center px-6">
      {/* Profile Card */}
      <View className="w-full bg-[#2c2c2e] p-6 rounded-2xl shadow-md items-center border border-[#f49b33]">
        <Ionicons name="restaurant" size={64} color="#f49b33" />
        <Text className="text-2xl font-bold text-white mt-4">Welcome</Text>
        {userEmail ? (
          <Text className="text-[#f49b33] text-base mt-2 mb-4">
            {userEmail}
          </Text>
        ) : (
          <Text className="text-[#f49b33] text-base mt-2 mb-4">
            Guest User
          </Text>
        )}

        {/* Buttons */}
        {userEmail ? (
          <TouchableOpacity
            onPress={handleLogout}
            className="w-full bg-[#f49b33] py-3 rounded-xl mt-4"
          >
            <Text className="text-lg text-center text-black font-semibold">
              Logout
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleSignup}
            className="w-full bg-[#f49b33] py-3 rounded-xl mt-4"
          >
            <Text className="text-lg text-center text-black font-semibold">
              Sign Up
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Footer Section */}
      <View className="mt-10">
        <Text className="text-white text-sm opacity-60">
          Book your favorite meals anytime 🍽️
        </Text>
      </View>
    </View>
  );
}
