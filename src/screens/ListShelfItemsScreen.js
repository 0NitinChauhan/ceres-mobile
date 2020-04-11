import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import CeresApi from "../api/ceres";
import ItemCardComponent from "../components/ItemCardComponent";

async function handleServerResponse(dataObj) {
  return dataObj;
}

const ListShelfItemsScreen = () => {
  const [allItems, setAllItems] = useState([]);
  async function makeServerRequest() {
    try {
      const response = await CeresApi.get("/get-all-items");
      const dataObj = await handleServerResponse(response.data);
      setAllItems(dataObj);
    } catch (err) {
      console.log("caught error: ", err);
    }
  }

  // The code inside useEffect is run one-time when the component is first rendered
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
