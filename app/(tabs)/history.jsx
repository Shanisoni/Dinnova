import {
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";




const History = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const router = useRouter();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      setUserEmail(email);
    };
    fetchUserEmail();
  }, []);



  const fetchBookings = async () => {
    if (!userEmail) return;

    try {
      const bookingCollection = collection(db, "bookings");
      const bookingQuery = query(
        bookingCollection,
        where("email", "==", userEmail)
      );
      const snapshot = await getDocs(bookingQuery);

      const bookingsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBookings(bookingsList);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch booking history.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };



  useEffect(() => {
    fetchBookings();
  }, [userEmail]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchBookings();
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-[#1c1c1e]">
        <ActivityIndicator size="large" color="#f59e0b" />
        <Text className="text-white mt-4">Loading your bookings...</Text>
      </SafeAreaView>
    );
  }



  return (
    <SafeAreaView className="flex-1 bg-[#1c1c1e] px-4">
      {userEmail ? (
        bookings.length > 0 ? (
          <FlatList
            data={bookings}
            keyExtractor={(item) => item.id}
            onRefresh={handleRefresh}
            refreshing={refreshing}
            contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
            renderItem={({ item }) => (
              <View className="bg-[#2a2a2d] rounded-2xl shadow-md p-5 mb-4 border border-[#f59e0b]">
                <Text className="text-white font-semibold mb-1">
                  📅 Date: <Text className="text-gray-300">{item.date}</Text>
                </Text>
                <Text className="text-white font-semibold mb-1">
                  ⏰ Slot: <Text className="text-gray-300">{item.slot}</Text>
                </Text>
                <Text className="text-white font-semibold mb-1">
                  👥 Guests:{" "}
                  <Text className="text-gray-300">{item.guests}</Text>
                </Text>
                <Text className="text-white font-semibold mb-1">
                  🍽️ Restaurant:{" "}
                  <Text className="text-gray-300">{item.restaurant}</Text>
                </Text>
                <Text className="text-white font-semibold">
                  📧 Email: <Text className="text-gray-300">{item.email}</Text>
                </Text>
              </View>
            )}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-white text-lg">
              No bookings found 😕
            </Text>
          </View>
        )
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-lg text-center mb-4">
            Please sign in to view your booking history
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/signin")}
            className="bg-[#f59e0b] px-6 py-3 rounded-xl"
          >
            <Text className="text-black font-bold text-lg">Sign In</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default History;
