import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { EvilIcons } from "@expo/vector-icons";
import fetchIp from "../fecthIp.json";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/users";

export default function Header({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const users = useSelector((state) => state.user.value);
  const [username, setUsername] = useState("");
  const [numberTweet, setNumberTweet] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://${fetchIp.myIp}:3000/users/user/${users.token}`)
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.data);
      });
  }, []);

  const refresh = () => {
    fetch(`http://${fetchIp.myIp}:3000/tweets/numberTweet/${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setNumberTweet(data.data);
        }
      });
  };

  const handleLogout = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.header}>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.headerModal}>
            <View
              style={{
                height: 45,
                width: 45,
                backgroundColor: "#fff",
                borderRadius: "50%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome name="user-circle-o" size={44} color="grey" />
            </View>
            <EvilIcons
              name="close-o"
              size={24}
              color="#fff"
              onPress={() => setModalVisible(false)}
            />

            <Feather name="settings" size={44} color="#fff" />
          </View>
          <Text style={{ color: "#fff" }}>Hi {username} !</Text>
          <Text style={{ color: "#fff" }}>
            Nombres de tweets : {numberTweet}
          </Text>
        </View>
      </Modal>
      <FontAwesome
        name="user-circle-o"
        size={24}
        color="black"
        onPress={() => {
          refresh();
          setModalVisible(true);
        }}
      />

      <FontAwesome5
        name="twitter"
        size={24}
        color="#00acee"
        onPress={() => navigation.navigate("Home")}
      />
      <AntDesign
        name="logout"
        size={24}
        color="black"
        onPress={() => handleLogout()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    width: "100%",
    height: "15%",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    paddingBottom: 15,
    flexDirection: "row",
  },
  centeredView: {
    padding: 15,
    flex: 1,
    backgroundColor: "#000",
    width: "85%",
  },
  headerModal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "10%",
    width: "100%",
  },
});
