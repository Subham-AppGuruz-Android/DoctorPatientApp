import React from "react";
import { Text, View } from "react-native";
import { colors } from "../../common";
import Fonts from "../../common/fonts";

const NoAppointContainer = ({}) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text
      style={{ fontSize: 20, fontFamily: Fonts.Bold, color: colors.LIGHT_GREY }}
    >
      No Appointment Found!
    </Text>
  </View>
);

export default NoAppointContainer;
