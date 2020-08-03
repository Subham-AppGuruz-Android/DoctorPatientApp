import { StyleSheet } from "react-native";
import { colors } from "../../common";
import Fonts from "../../common/fonts";

export default StyleSheet.create({
  cardStyle: {
    flexDirection: "row",
    paddingHorizontal: 30,
    backgroundColor: "#fdfbfc",
    marginVertical: 4,
    paddingVertical: 10,
  },
  modify_btn: {
    width: "30%",
    backgroundColor: colors.MODIFY_BTN,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  modifyText: {
    color: "white",
    fontSize: 10,
    fontFamily: Fonts.SemiBold,
  },
  description_text: {
    fontSize: 12,
    fontFamily: Fonts.Regular,
  },
});
