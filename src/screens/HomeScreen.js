import React from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import ShelfSideComponent from "../components/ShelfSideComponent";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      {/* ROW 1 */}
      <View style={styles.container}>
        {/* Button 1 */}
        <View>
          <ShelfSideComponent />
        </View>
        <View>
          <ShelfSideComponent />
        </View>
      </View>
    </View>
  );
};

const styleObj = {
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
};

const styles = StyleSheet.create(styleObj);

export default HomeScreen;
