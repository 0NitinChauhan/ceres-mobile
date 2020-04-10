import { createStackNavigator } from "react-navigation-stack";

import React from "react";
import HeaderComponent from "../components/HeaderComponent";
import ListShelfItemsScreen from "../screens/ListShelfItemsScreen";

const screens = {
  ListShelfItems: {
    screen: ListShelfItemsScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <HeaderComponent title="List of Items" navigation={navigation} />
        ),
      };
    },
  },
};

//Draw navigator doesn't automatically show a header -->
// we wrap our screen drawn by draw navigator in a stack navigator

// stack navigator also gives the screen a header
const AboutStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#444",
    headerStyle: { backgroundColor: "#eee" },
  },
});

export default AboutStack;
