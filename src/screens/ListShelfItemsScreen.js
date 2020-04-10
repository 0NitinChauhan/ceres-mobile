import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CeresApi from "../api/ceres";
import { useFocusEffect } from "@react-navigation/native";

const ListShelfItemsScreen = () => {
  const makeServerRequest = () => {
    try {
      CeresApi.get("/get-all-items").then(function (response) {
        handleServerResponse(response.data);
        console.log("Request to /get-all-items sucessful");
      });
    } catch (err) {
      console.log("caught error: ", err);
    }
  };

  const handleServerResponse = (dataObj) => {
    setAllItems(dataObj);
  };

  const [allItems, setAllItems] = useState([]);

  return (
    <View>
      {/** Remove this--> just for getting data */}
      <View>
        <TouchableOpacity
          onPress={() => {
            makeServerRequest();
          }}
        >
          <Text style={styles.dummy}>Dummy</Text>
        </TouchableOpacity>
      </View>

      {/** List of items */}
      <FlatList
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => {
          return item._id;
        }}
        data={allItems}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>
              <Text style={styles.listItem}>
                {item.item_brand + " " + item.item_category}
              </Text>
              <Text style={styles.listItem}>{item.item_current_weight}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styleObj = {
  container: {
    paddingVertical: 25,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    flex: 1,
    flexDirection: "row",

    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  listItem: {
    fontSize: 21,
    marginTop: 1,
  },
  dummy: {
    height: 40,
    width: 60,
    left: 180,
    backgroundColor: "green",
  },
};
const styles = StyleSheet.create(styleObj);
export default ListShelfItemsScreen;
