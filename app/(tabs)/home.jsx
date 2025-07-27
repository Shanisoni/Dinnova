import {
  View,
  Text,
  Image,
  Platform,
  ScrollView,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
// import * as Animatable from "react-native-animatable";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import logo from "../../assets/images/DineTimeLogo.png";
import banner from "../../assets/images/homeBanner.png";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
// import { LinearGradient } from "expo-linear-gradient";
// Dine-Time
import GradientText from "../../css/GradientText.js"; // update path as needed

export default function Home() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push(`/restaurant/${item.name}`)}
      className="bg-[#3c3c3c] max-h-64 max-w-xs flex justify-center rounded-2xl p-4 mx-4 shadow-xl border border-[#f49b33]"
    >
      <Image
        resizeMode="cover"
        source={{ uri: item.image }}
        className="h-32 w-full mb-2 rounded-xl"
      />
      <Text className="text-white text-lg font-extrabold mb-1">
        {item.name}
      </Text>
      <Text className="text-gray-200 text-sm mb-1">{item.address}</Text>
      <Text className="text-gray-300 text-sm">
        🕒 {item.opening} - {item.closing}
      </Text>
    </TouchableOpacity>
  );

  const getRestaurants = async () => {
    const q = query(collection(db, "restaurants"));
    const res = await getDocs(q);
    res.forEach((item) => {
      setRestaurants((prev) => [...prev, item.data()]);
    });
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <SafeAreaView
      style={[
        { backgroundColor: "#1e1e1e" },
        Platform.OS === "android" && { paddingBottom: 55 },
        Platform.OS === "ios" && { paddingBottom: 20 },
      ]}
    >
      {/* Header */}
      <View className="flex items-center mb-2">
        <View className="bg-[#292929] w-11/12 rounded-2xl shadow-lg justify-between items-center flex flex-row p-3 border border-[#f49b33]">
          <View className="flex flex-row items-center">
            <Text
              className={`text-white font-medium text-base
              ${Platform.OS === "ios" ? "pt-[6px]" : "pt-1"}`}
            >
              Welcome to{" "}
            </Text>
            <Image
              resizeMode="contain"
              className="w-20 h-12 ml-1"
              source={logo}
            />
          </View>
        </View>
      </View>

      <ScrollView stickyHeaderIndices={[0]}>
        {/* Hero Banner */}
        <ImageBackground
          resizeMode="cover"
          className="mb-4 w-full bg-[#2b2b2b] h-52 items-center justify-center"
          source={banner}
        >
          <BlurView
            intensity={Platform.OS === "android" ? 100 : 25}
            tint="dark"
            className="w-full p-4 shadow-xl rounded-b-3xl"
          >
            <GradientText style={{ fontSize: 30, fontWeight: "800", marginTop: 19 }}>
              Dine with your loved ones 🍽️
            </GradientText>
          </BlurView>
        </ImageBackground>

        {/* Discount Title */}
        <View className="p-4 bg-[#1e1e1e] flex-row items-center ">
          <Text className="text-2xl text-[#f49b33] font-bold">
            🎉 Special Discount %
          </Text>
        </View>

        {/* Discounted Restaurants List */}
        {restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{ padding: 16 }}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <ActivityIndicator animating color={"#f49b33"} />
        )}

        {/* Restaurants Header */}
        <View className="p-4 bg-[#1e1e1e] flex-row items-center ">
          <Text className="text-2xl text-white font-bold">
            🍔 Our Restaurants
          </Text>
        </View>

        {/* Restaurant Cards */}
        {restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{ padding: 16 }}
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          />
        ) : (
          <ActivityIndicator animating color={"#f49b33"} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
