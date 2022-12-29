import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("test");
  };
  return (
    <View style={styles.container}>
      <View>
        <FontAwesome5 name="twitter" size={24} color="#00acee" />
        <Text>Create a new account !</Text>
      </View>

      <View style={styles.containerInput}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#EBF0F1"
          autoCapitalize={false}
          style={styles.input}
          value={username}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#EBF0F1"
          autoCapitalize={false}
          style={styles.input}
          value={email}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#EBF0F1"
          autoCapitalize={false}
          secureTextEntry={true}
          style={styles.input}
          value={password}
        />
      </View>
      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={styles.containerBtn}
      >
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  containerInput: {
    backgroundColor: "#00acee",
    width: "70%",
    height: "30%",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 15,
  },
  input: {
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: "#EBF0F1",
    paddingBottom: 10,
  },
  containerBtn: {
    borderColor: "#00acee",
    borderWidth: 2,
    width: "40%",
    height: "5%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
});
