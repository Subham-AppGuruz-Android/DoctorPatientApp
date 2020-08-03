import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { colors } from "../../common";

const Loader = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator color={colors.THEME_BLUE} size="large" />
  </View>
);

export default Loader;
