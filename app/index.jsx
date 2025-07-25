import { Text, View , TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";


export default function Index() {
  const router = useRouter();
  return (
    <View
    className="flex-1 items-center justify-center bg-red-100"
      style={{
        flex: 1,

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-red-500">Shani Soni
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-lg"
        onPress={() => router.push("/testing")}
      >
        <Text className="text-white">Go to Testing Page</Text>
      </TouchableOpacity>
      </Text>
    </View>
  );
}
