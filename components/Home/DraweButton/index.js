import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Icon } from "native-base";
import Fonts from "../../../common/fonts";

const DrawerButton = ({ leftIcon, title, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.sub_container}
    >
      <View style={styles.left_icon}>{leftIcon}</View>
      <View style={styles.text_container}>
        <Text style={styles.text_size}>{title}</Text>
      </View>
      <View style={styles.right_icon}>
        <Icon
          ios="ios-star-forward"
          android="ios-arrow-forward"
          style={[{ fontSize: Platform.OS === "ios" ? 25 : 20 }]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default DrawerButton;

const styles = StyleSheet.create({
  sub_container: {
    flexDirection: "row",
    height: 40,
    marginTop: 10,
  },
  left_icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text_container: {
    flex: 2,
    justifyContent: "center",
  },
  right_icon: {
    flex: 0.4,
    justifyContent: "center",
  },
  text_size: {
    fontSize: 12,
    fontFamily: Fonts.Regular,
  },
});
