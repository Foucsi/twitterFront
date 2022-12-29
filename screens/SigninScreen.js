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

export default function SigninScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = () => {
    fetch("http://172.20.10.2:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          navigation.navigate("Welcome");
          setMsg("");
          setPassword("");
          setUsername("");
        } else if (data.error === "Missing or empty fields") {
          setMsg("Missing or empty fields");
        } else if (data.error === "User not found or wrong password") {
          setPassword("");
          setUsername("");
          setMsg(
            <View>
              <Text style={{ color: "#00acee" }}>
                User not found or wrong password
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setMsg("");
                  navigation.navigate("Signup");
                }}
              >
                <Text
                  style={{
                    textDecorationLine: "underline",
                    textDecorationStyle: "solid",
                    textDecorationColor: "#000",
                  }}
                >
                  register
                </Text>
              </TouchableOpacity>
            </View>
          );
        }
      });
  };
  return (
    <View style={styles.container}>
      <View>
        <FontAwesome5 name="twitter" size={24} color="#00acee" />
        <Text>Connection</Text>
      </View>

      <View style={styles.containerInput}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#EBF0F1"
          autoCapitalize={false}
          style={styles.input}
          value={username}
          onChangeText={(value) => setUsername(value)}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#EBF0F1"
          autoCapitalize={false}
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
      </View>
      <View style={{ height: 25 }}>
        <Text style={{ color: "#00acee" }}>{msg}</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={styles.containerBtn}
      >
        <Text>Connection</Text>
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
    color: "#EBF0F1",
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
