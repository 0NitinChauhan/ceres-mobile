import React, { useState } from "react";
import { Text, StyleSheet, View, Image, Modal, TouchableOpacity } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import Popover from "react-native-popover-view";
import CeresApi from "../api/ceres";
import Constants from "../utils/Constants";

const getShelfImage = (shelfId) => {
  return `${Constants.getNgrokUrl()}/images/shelf-tab/${shelfId}.png`;
};

/** TODO: change image if the image changes on the server */
const getCameraImage = (shelfId, shelfSide) => {
  return `${Constants.getNgrokUrl()}/images/shelf/shelf_${shelfId}_${shelfSide}.jpg`;
};

/**
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
**/

const createTitle = (item) => {
  let arr = {
    item_brand: "Brand",
    item_category: "Category",
    item_current_weight: "Current Weight",
    item_full_weight: "Full Weight",
  };
  let stringArr = [];
  for (const [key, value] of Object.entries(arr)) {
    if (item[key] != undefined || item[key] == "") {
      stringArr.push(`${value}: ${item[key]}`);
    }
  }
  return stringArr.join("\n");
};

const isPointWithinRectangle = (x, y, itemLocation) => {
  if (
    x > itemLocation.top_left_x &&
    y > itemLocation.top_left_y &&
    x < itemLocation.bottom_right_x &&
    y < itemLocation.bottom_right_y
  ) {
    return true;
  }
  return false;
};

const ShelfSideComponent = (props) => {
  // Makes server request to get item information for all items in a camera image
  const makeServerRequest = (shelfId, shelfSide) => {
    try {
      CeresApi.get("/get-image-item-info", {
        params: {
          shelfId: shelfId,
          shelfSide: shelfSide,
        },
      }).then(function (response) {
        handleServerResponse(response.data);
      });
    } catch (err) {
      console.log("caught error: ", err);
    }
  };

  // sets item information to be later compared to the tap on item on the camera image
  const handleServerResponse = (dataObj) => {
    let itemsInfo = [];
    let currentSize = { width: 400, height: 400 };
    for (const item of dataObj) {
      let itemObj = {};
      let location = Constants.getResizedImageCoordinates(
        Constants.getOriginalCameraImageSize(),
        currentSize,
        item.item_location[0]
      );
      itemObj.itemLocation = location;
      Object.assign(itemObj, item);
      itemsInfo.push(itemObj);
    }
    setItemsInfo(itemsInfo);
  };

  // compares coordinates of tap on the item in the camera image with itemsInfo
  // sets popover text based on the determined item using the above info
  const handlePopOverText = (x, y) => {
    let currentItem = undefined;
    for (let item of itemsInfo) {
      if (isPointWithinRectangle(x, y, item.itemLocation)) {
        currentItem = item;
        console.log("==================================================");
        console.log("found item");
        break;
      }
    }
    if (currentItem == undefined) {
      setPopoverText("");
    } else {
      let text = createTitle(currentItem);
      setPopoverText(text);
      console.log(text);
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [imagePopoverState, setImagePopoverState] = useState(false);
  const [popOverText, setPopoverText] = useState(false);
  const [itemsInfo, setItemsInfo] = useState({});

  return (
    <View>
      <TouchableOpacity
        onPressIn={() => {
          makeServerRequest(props.shelfId, props.shelfSide);
          setModalOpen(true);
        }}
      >
        <View>
          <Image style={styles.shelfImageStyle} source={{ uri: getShelfImage(props.shelfId) }} />
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

            <View>
              <TouchableOpacity
                onPress={(event) => {
                  handlePopOverText(event.nativeEvent.locationX, event.nativeEvent.locationY);

                  if (popOverText.length != 0) {
                    setImagePopoverState(true);
                    setTimeout(
                      function () {
                        setImagePopoverState(false);
                        //setPopoverText("");
                      }.bind(this),
                      1000
                    );
                  } else {
                    setPopoverText(false);
                  }
                }}
              >
                {/** TODO: change image if the image changes on the server */}
                <Image
                  style={styles.cameraImageStyle}
                  source={{
                    uri: getCameraImage(props.shelfId, props.shelfSide),
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View>
        <Popover isVisible={imagePopoverState}>
          <View style={styles.popover}>
            <MaterialIcons
              name="close"
              size={20}
              onPress={() => {
                setImagePopoverState(false);
              }}
            />

            <Text>{popOverText}</Text>
          </View>
        </Popover>
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
  popover: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
};

const styles = StyleSheet.create(stylesObj);

export default ShelfSideComponent;
