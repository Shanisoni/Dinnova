import { Text, View } from "react-native";


export default function Index() {
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
      </Text>
    </View>
  );
}
