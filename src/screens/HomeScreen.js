import React from "react";
import { View, Text, Button } from "react-native";
import { logoutUser } from "../config/authService";

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigation.navigate("Login");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Welcome to GarbageWalla</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
