import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const path = require("path");

const ShelfSideComponent = (props) => {
  return (
    <View>
      <TouchableOpacity
        onPressIn={() => {
          console.log("Image pressed");
        }}
      >
        <View>
          <Image
            style={styles.imageStyle}
            source={require("../../assets/images/shelf-tab/1.png")}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const stylesObj = {
  imageStyle: {
    height: 200,
    width: 200,
  },
};

const styles = StyleSheet.create(stylesObj);

export default ShelfSideComponent;
