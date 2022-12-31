import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { login } from "../reducers/users";
import { useState } from "react";
import { useEffect } from "react";
import fetchIp from "../fecthIp.json";
import Tweet from "../components/Tweet";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

export default function WelcomeScreen({ navigation }) {
  const [allTweets, setAllTweets] = useState([]);
  const [postTweet, setPostTweet] = useState("");
  const [username, setUsername] = useState("");
  const users = useSelector((state) => state.user.value);

  useEffect(() => {
    fetch(`http://${fetchIp.myIp}:3000/users/user/${users.token}`)
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.data);
      });
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    getRefresh();
  }, []);

  const getRefresh = () => {
    fetch(`http://${fetchIp.myIp}:3000/tweets/allTweets`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setAllTweets(data.data);
        }

        // allTweets.map((e) => console.log(e[0].tweet));
      });
  };

  const handlePostTweet = () => {
    if (postTweet) {
      console.log(users.username);
      fetch(`http://${fetchIp.myIp}:3000/tweets/addTweets/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tweet: postTweet }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            getRefresh();
            dispatch(login({ tweet: postTweet }));
          }
        })
        .catch((error) => {
          console.error(error);
        });
      setPostTweet("");
    }
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={{ height: "85%", width: "100%" }}>
        <View style={{ backgroundColor: "grey", height: "10%" }}>
          <TextInput
            value={postTweet}
            onChangeText={(value) => setPostTweet(value)}
            placeholder="add tweet"
            placeholderTextColor="#fff"
            style={{
              paddingBottom: 10,
              borderBottomColor: "#fff",
              borderWidth: 1,
            }}
          />
          <MaterialIcons
            name="add-comment"
            size={24}
            color="#fff"
            onPress={() => handlePostTweet()}
          />
        </View>
        <View style={{ width: "100%", height: "80%" }}>
          {allTweets.length > 0 ? (
            // Si la longueur de allTweets est supérieure à 0, on affiche les tweets
            allTweets.map((elmt, index) => {
              // Si l'élément courant contient plus d'un tweet, on affiche tous les tweets
              if (elmt.length > 1) {
                return elmt.map((e, i) => <Tweet key={i} tweet={e.tweet} />);
              } else {
                // Sinon, on vérifie si l'élément existe, et on affiche le tweet s'il existe
                return elmt[0] ? (
                  <Tweet key={index} tweet={elmt[0].tweet} />
                ) : null;
              }
            })
          ) : (
            // Sinon, on affiche un message indiquant qu'il n'y a pas de tweets
            <Text>L'utilisateur n'a pas de tweets enregistrés</Text>
          )}
        </View>
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
