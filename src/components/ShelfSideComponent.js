import React, { useState } from "react";
import { Text, StyleSheet, View, Image, Modal } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

const SHELF_IMAGES = {
  image1: require("../../assets/images/shelf-tab/1.png"),
  image2: require("../../assets/images/shelf-tab/2.png"),
  image3: require("../../assets/images/shelf-tab/3.png"),
};

const CAMERA_IMAGES = {
  image1left: require("../../assets/images/shelf/shelf_1_left.jpg"),
  image1right: require("../../assets/images/shelf/shelf_1_right.jpg"),
  image2left: require("../../assets/images/shelf/shelf_2_left.jpg"),
  image2right: require("../../assets/images/shelf/shelf_2_right.jpg"),
  image3left: require("../../assets/images/shelf/shelf_3_left.jpg"),
  image3right: require("../../assets/images/shelf/shelf_3_right.jpg"),
};

const getShelfImage = (shelfId) => {
  return SHELF_IMAGES["image" + shelfId];
};

const getCameraImage = (shelfID, shelfSide) => {
  return CAMERA_IMAGES["image" + shelfID + shelfSide];
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
          <Image
            style={styles.shelfImageStyle}
            source={getShelfImage(props.shelfId)}
          />
        </View>
      </TouchableOpacity>

      <View>
        <Modal visible={modalOpen} animationType="slide">
          <View style={styles.modalContent}>
            <MaterialIcons
              name="close"
              size={24}
              style={styles.modalToggle}
              onPress={() => {
                setModalOpen(false);
              }}
            />
            <Image
              style={styles.cameraImageStyle}
              source={getCameraImage(props.shelfId, props.shelfSide)}
            />
          </View>
        </Modal>
      </View>
    </View>
  );
};

const stylesObj = {
  shelfImageStyle: {
    height: 220,
    width: 200,
  },
  cameraImageStyle: {
    height: 400,
    width: 400,
    left: 25,
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
