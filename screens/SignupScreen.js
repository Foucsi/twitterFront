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
import { useDispatch } from "react-redux";
import { login } from "../reducers/users";

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = () => {
    fetch("http://192.168.1.51:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({ username: username, email: email, password: password })
          );
          navigation.navigate("Welcome");
          setUsername("");
          setEmail("");
          setPassword("");
          setMsg("");
        } else if (data.error === "Missing or empty fields") {
          setMsg("Missing or empty fields");
        } else if (data.error === "User already exists") {
          setUsername("");
          setEmail("");
          setPassword("");
          setMsg(
            <View>
              <Text style={{ color: "#00acee" }}>User already exists</Text>
              <TouchableOpacity
                onPress={() => {
                  setMsg("");
                  navigation.navigate("Signin");
                }}
              >
                <Text
                  style={{
                    textDecorationLine: "underline",
                    textDecorationStyle: "solid",
                    textDecorationColor: "#000",
                  }}
                >
                  connection
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
        <FontAwesome5
          name="twitter"
          size={24}
          color="#00acee"
          onPress={() => navigation.navigate("Home")}
        />
        <Text>Create a new account !</Text>
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
          placeholder="Email"
          placeholderTextColor="#EBF0F1"
          autoCapitalize={false}
          style={styles.input}
          value={email}
          onChangeText={(value) => setEmail(value)}
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
