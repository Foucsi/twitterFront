import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { login } from "../reducers/users";
import { useState } from "react";
import { useEffect } from "react";
import fetchIp from "../fecthIp.json";
import Tweet from "../components/Tweet";

export default function WelcomeScreen({ navigation }) {
  const [allTweets, setAllTweets] = useState([]);

  useEffect(() => {
    fetch(`http://${fetchIp.myIp}:3000/tweets/allTweets`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setAllTweets(data.data);
        }

        // allTweets.map((e) => console.log(e[0].tweet));
      });
  }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={{ height: "85%", width: "100%" }}>
        <Text>Welcome All !</Text>
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
