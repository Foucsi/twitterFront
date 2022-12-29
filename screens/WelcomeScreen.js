import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text>WelcomeScreen</Text>
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
