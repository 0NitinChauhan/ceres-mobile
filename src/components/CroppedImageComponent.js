import React from "react";

import { View, Image, Text } from "react-native";
import Constants from "../utils/Constants";

const CroppedImageComponent = (props) => {
  let itemLocation = props.coordinates;
  console.log("Location inside cropped component", itemLocation);
  return (
    <View>
      <View
        style={[
          {
            overflow: "hidden",
            height: 200,
            width: 200,
            backgroundColor: "transparent",
          },
        ]}
      >
        <Image
          style={{
            position: "absolute",
            top: 10 * -1,
            left: 10 * -1,
            width: 200,
            height: 200,
          }}
          source={{
            uri: `${Constants.getNgrokUrl()}/images/shelf/shelf_1_left.jpg`,
          }}
          //resizeMode={this.props.resizeMode}
        ></Image>
      </View>
    </View>
  );
};

export default CroppedImageComponent;
