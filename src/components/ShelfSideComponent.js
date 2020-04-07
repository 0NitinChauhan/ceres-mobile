import React, { useState } from "react";
import { Text, StyleSheet, View, Image, Modal } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

const IMAGES = {
  image1: require("../../assets/images/shelf-tab/1.png"),
  image2: require("../../assets/images/shelf-tab/2.png"),
  image3: require("../../assets/images/shelf-tab/3.png"),
};

const getImage = (num) => {
  let element = IMAGES["image" + num];
  return element;
};

const ShelfSideComponent = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        onPressIn={() => {
          setModalOpen(true);
        }}
      >
        <View>
          <Image style={styles.imageStyle} source={getImage(props.shelfId)} />
        </View>
      </TouchableOpacity>

      <View>
        <Modal visible={modalOpen} animationType="slide">
          <View style={StyleSheet.modalContent}>
            <MaterialIcons
              name="close"
              size={24}
              style={styles.modalToggle}
              onPress={() => {
                setModalOpen(false);
              }}
            />
            <Text style={styles.titleText}>
              Hello, from the modal {props.shelfId + " " + props.shelfSide} :)
            </Text>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const stylesObj = {
  imageStyle: {
    height: 220,
    width: 200,
  },
  modalToggle: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#F2F2F2",
    padding: 10,
    borderRadius: 10,
  },
  modalContent: {
    flex: 1,
  },
  titleText: {
    fontFamily: "nunito-bold",
    fontSize: 18,
  },
};

const styles = StyleSheet.create(stylesObj);

export default ShelfSideComponent;
