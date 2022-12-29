import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FontAwesome5 name="twitter" size={128} color="#EBF0F1" />
      <Text style={styles.txt}>Twitter</Text>
      <View style={styles.containerBtn}>
        <TouchableOpacity
          style={{
            width: "50%",
            height: "20%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 25,
            borderColor: "#EBF0F1",
            borderWidth: 1,
          }}
          onPress={() => navigation.navigate("Signin")}
        >
          <Text style={{ color: "#EBF0F1", fontWeight: "bold", fontSize: 18 }}>
            Connection
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "50%",
            height: "20%",
            backgroundColor: "#EBF0F1",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 25,
          }}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={{ color: "#42515E", fontWeight: "bold", fontSize: 18 }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00acee",
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    color: "#EBF0F1",
    fontSize: 28,
    fontWeight: "bold",
  },
  containerBtn: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
