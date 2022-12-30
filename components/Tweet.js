import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import fetchIp from "../fecthIp.json";

export default function Tweet({ tweet }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch(`http://${fetchIp.myIp}:3000/tweets/userByTweet/${tweet}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
      });
  }, []);
  return (
    <View style={styles.container}>
      <Text>{tweet}</Text>
      <Text>user: {user}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    width: "100%",
    height: "10%",
    borderBottomColor: "#00acee",
    flexDirection: "row",
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
