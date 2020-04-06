import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const HeaderComponent = () => {
  return (
    <View>
      <View>
        <Text style={styles.headerText}>Ceres</Text>
      </View>
    </View>
  );
};

const styleObj = {
  header: {
    width: "100%", // we are given header by React --> we are just placing the component inside it
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    letterSpacing: 1,
  },
};

const styles = StyleSheet.create(styleObj);

export default HeaderComponent;
