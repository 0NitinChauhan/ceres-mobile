import React from "react";
import { StyleSheet, Text, View, ShadowPropTypesIOS } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const HeaderComponent = ({ title, navigation }) => {
  const openMenu = () => {
    navigation.openDrawer(); // navigation object has openDrawer method
  };

  return (
    <View style={styles.header}>
      <MaterialIcons
        name="menu"
        size={28}
        onPress={openMenu}
        style={styles.icon}
      />
      <View>
        <Text style={styles.headerText}>{title}</Text>
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
    left: 10,
  },
  icon: {
    left: 1,
  },
};

const styles = StyleSheet.create(styleObj);

export default HeaderComponent;
