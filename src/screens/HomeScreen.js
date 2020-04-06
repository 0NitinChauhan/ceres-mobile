import React from "react";
import { StyleSheet, View } from "react-native";
import ShelfSideComponent from "../components/ShelfSideComponent";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      {/* ROW 1 */}
      <View style={styles.container}>
        {/* Button 1 */}
        <View>
          <ShelfSideComponent shelfId="1" shelfSide="left" />
        </View>
        <View>
          <ShelfSideComponent shelfId="1" shelfSide="right" />
        </View>
      </View>

      <View style={styles.container}>
        {/* Button 1 */}
        <View>
          <ShelfSideComponent shelfId="2" shelfSide="left" />
        </View>
        <View>
          <ShelfSideComponent shelfId="2" shelfSide="right" />
        </View>
      </View>

      <View style={styles.container}>
        {/* Button 1 */}
        <View>
          <ShelfSideComponent shelfId="3" shelfSide="left" />
        </View>
        <View>
          <ShelfSideComponent shelfId="3" shelfSide="right" />
        </View>
      </View>
    </View>
  );
};

const styleObj = {
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
};

const styles = StyleSheet.create(styleObj);

export default HomeScreen;
