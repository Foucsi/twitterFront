import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import fetchIp from "../fecthIp.json";
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function Tweet({ tweet, getRefresh }) {
  const [user, setUser] = useState("");
  const [getUser, setGetUser] = useState(false);
  const users = useSelector((state) => state.user.value);
  const [colorHeart, setColorHeart] = useState();
  const [moreUser, setMoreUser] = useState(false);

  useEffect(() => {
    refreshpage();
    console.log("color: ", colorHeart);
    fetch(`http://${fetchIp.myIp}:3000/tweets/getLiked/${tweet}`)
      .then((res) => res.json())
      .then((data) => {
        const test = data.data.map((e) => e.liked);
        test.map((e) => setColorHeart(e));
      });
  }, []);

  const refreshpage = () => {
    fetch(`http://${fetchIp.myIp}:3000/tweets/userByTweet/${tweet}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
        if (data.data === users.username) {
          setGetUser(true);
        }
      });
  };

  const handleRemove = (e) => {
    if (e === tweet) {
      fetch(
        `http://${fetchIp.myIp}:3000/tweets/removeTweets/${users.username}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tweet: tweet }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data.result);
          getRefresh();
        });
    }
  };

  const handleHeart = () => {
    fetch(`http://${fetchIp.myIp}:3000/tweets/isLiked/${tweet}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ liked: !colorHeart }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          console.log(data.data);
          data.data ? setColorHeart(true) : setColorHeart(false);
          getRefresh();
        } else {
          console.log(data.result);
        }
      });
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ padding: 5 }}>
          <FontAwesome name="user-circle-o" size={48} color="#25283D" />
        </View>

        <View style={{ width: "80%", padding: 5 }}>
          <Text
            style={{
              fontWeight: "bold",
              color: getUser ? "#00acee" : "#898A8E",
            }}
          >
            {user}
          </Text>
          <Text>{tweet}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: 150,
          justifyContent: "space-around",
        }}
      >
        <FontAwesome
          name="heart"
          size={20}
          color={colorHeart ? "red" : "#25283D"}
          onPress={() => handleHeart()}
        />

        {getUser && (
          <AntDesign
            name="delete"
            size={20}
            color="black"
            onPress={() => handleRemove(tweet)}
          />
        )}
        <SimpleLineIcons
          name="user-follow"
          size={24}
          color={moreUser ? "#00acee" : "black"}
          onPress={() => setMoreUser(!moreUser)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    width: "100%",
    height: 150,
    borderBottomColor: "grey",
    flexDirection: "column",
    justifyContent: "space-around",
    borderBottomWidth: 0.2,
    padding: 10,
  },
});
