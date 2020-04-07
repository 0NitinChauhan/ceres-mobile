import { createDrawerNavigator } from "react-navigation-drawer";

import { createAppContainer } from "react-navigation";

import HomeStack from "../routes/HomeStack";
import AboutStack from "./AboutStack";

const RootDrawerNavigator = createDrawerNavigator({
  // options on the draw
  // "Name that appears on the drawer"

  // show Home stack --> in Home stack --> the default screen will be shown first
  Home: {
    screen: HomeStack,
  },

  // show About stack --> in About Stack --> the default screen (about screen is the only screen)
  About: {
      screen: AboutStack
  }
});


// this wraps the RootDrawerNavigator into a component
export default createAppContainer(RootDrawerNavigator);