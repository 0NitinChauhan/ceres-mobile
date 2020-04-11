import React from "react";

import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import Constants from "../utils/Constants";

const ItemCardComponent = (props) => {
  const item = props.shelfItem;
  const shelfId = item.item_shelf_id;
  const shelfSide = item.item_side;
  const brand = item.item_brand;
  const category = item.item_category;
  return (
    <View>
      <TouchableOpacity>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.container}>
              <View>
                <Text style={styles.textStyle}>
                  {`${brand} ${category.slice(0, 1).toUpperCase()}${category.slice(1, category.length)}`}
                </Text>
              </View>
              <Image
                style={styles.imageStyle}
                source={{ uri: `${Constants.getNgrokUrl()}/images/shelf/shelf_${shelfId}_${shelfSide}.jpg` }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 6,
    marginVertical: 6,
    height: 100,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
  },
  textStyle: {
    fontFamily: "sans-serif",
    fontSize: 18,
    marginHorizontal: 0,
    marginVertical: 2,
  },
  imageStyle: {
    height: 80,
    width: 80,
  },
});
export default ItemCardComponent;
