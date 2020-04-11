import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import CeresApi from "../api/ceres";
import ItemCardComponent from "../components/ItemCardComponent";

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

  // The code inside useEffect is run one-time when the component is first rendered
  //
  useEffect(() => {
    makeServerRequest();
  }, []);

  return (
    <View>
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
            <View>
              <ItemCardComponent shelfItem={item} />
            </View>
          );
        }}
      />
    </View>
  );
};

const styleObj = {};
const styles = StyleSheet.create(styleObj);
export default ListShelfItemsScreen;
