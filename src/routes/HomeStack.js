import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "../screens/HomeScreen";
import HeaderComponent from "../components/HeaderComponent";
import React from "react";

const screens = {
  Home: {
    screen: HomeScreen,
    // due to navigationOptions, we get access to "navigation" object & we can pass it as a prop to Header Component
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <HeaderComponent title="Ceres" navigation={navigation} />
        ),
      };
    },
  },
};

//Draw navigator doesn't automatically show a header -->
// we wrap our screen drawn by draw navigator in a stack navigator

// stack navigator also gives the screen a header
const HomeStack = createStackNavigator(screens, {
  initialRouteName: "Home",
  defaultNavigationOptions: {
    title: "Ceres",
    headerTintColor: "#444",
    headerStyle: { backgroundColor: "#eee" },
  },
});

export default HomeStack;
