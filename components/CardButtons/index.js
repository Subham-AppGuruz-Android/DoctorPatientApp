import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { colors } from "../../common/index";
import { callNumber } from "../../common/utils";

const CardButtons = ({ onPress }) => {
  return (
    <View style={styles.bottomContainer}>
      <TouchableOpacity
        onPress={() => onPress("clinical")}
        style={styles.bottomButtonContainer}
      >
        <Image
          resizeMode="contain"
          style={{ height: 25, width: 25 }}
          source={require("../../assets/imgs/calendar-(1).png")}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onPress("video")}
        style={styles.bottomButtonContainer}
      >
        <Image
          resizeMode="contain"
          style={{ height: 25, width: 25 }}
          source={require("../../assets/imgs/Video.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.bottomButtonContainer}>
        <Image
          resizeMode="contain"
          style={{ height: 25, width: 25 }}
          source={require("../../assets/imgs/comment.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomButtonContainer}
        onPress={() => {
          callNumber("12345");
        }}
      >
        <Image
          resizeMode="contain"
          style={{ height: 25, width: 25 }}
          source={require("../../assets/imgs/Phone.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CardButtons;

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.borderColor,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdfbfc",
    height: 45,
  },

  bottomButtonContainer: {
    backgroundColor: "#fdfbfc",
    flex: 1,
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: colors.borderColor,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
