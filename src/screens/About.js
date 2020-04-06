import React from "react";
import { StyleSheet, View, Text } from "react-native";

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text>About</Text>
    </View>
  );
};

const styleObj = {
  container: {
    padding: 24,
  },
};
const styles = StyleSheet.create(styleObj);
export default AboutScreen;
