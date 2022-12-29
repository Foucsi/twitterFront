import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={{ height: "85%" }}>
        <Text>Welcome</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
