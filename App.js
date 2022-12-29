import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import SigninScreen from "./screens/SigninScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/users";

const Stack = createNativeStackNavigator();

const store = configureStore({
  reducer: { user },
});

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Signin" component={SigninScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
