import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import Popover from "react-native-popover-view";
import CeresApi from "../api/ceres";

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
  console.log("checking for item location", itemLocation);
  console.log("checking for x, y", x, y);
  console.log("==================================================");
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

  const handleServerResponse = (dataObj) => {
    let itemsInfo = [];
    for (const item of dataObj) {
      let itemObj = {};
      let location = {};
      location.top_left_x = item.item_location[0].y / 3.44;
      location.top_left_y = item.item_location[0].x / 3.44;
      location.bottom_right_x =
        (item.item_location[0].y + item.item_location[0].w) / 3.44;
      location.bottom_right_y =
        (item.item_location[0].x + item.item_location[0].h) / 3.44;

      itemObj.itemLocation = location;
      Object.assign(itemObj, item);
      itemsInfo.push(itemObj);
    }
    setItemsInfo(itemsInfo);
  };

  const handlePopOverText = (x, y) => {
    console.log("popover text", x, y);
    let currentItem = undefined;
    for (let item of itemsInfo) {
      if (isPointWithinRectangle(x, y, item.itemLocation)) {
        currentItem = item;
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

            <View>
              <TouchableOpacity
                onPress={(event) => {
                  handlePopOverText(
                    event.nativeEvent.locationX,
                    event.nativeEvent.locationY
                  );
                  console.log("pop over text inside", popOverText);
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
                <Image
                  style={styles.cameraImageStyle}
                  source={getCameraImage(props.shelfId, props.shelfSide)}
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
