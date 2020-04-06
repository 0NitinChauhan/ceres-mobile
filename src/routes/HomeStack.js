import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import About from "../screens/About";
import AboutScreen from "../screens/About";

const screens = {
  Home: {
    screen: HomeScreen,
  },
  About: {
    screen: AboutScreen,
  },
};

// stack navigator also gives the screen a header
const HomeStack = createStackNavigator(screens, {
  initialRouteName: "Home",
  defaultNavigationOptions: {
    title: "Ceres",
  },
});

export default createAppContainer(HomeStack);
