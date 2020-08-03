import { StyleSheet } from "react-native";
import { colors } from "../../common";
import Fonts from "../../common/fonts";

export default StyleSheet.create({
  cardStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  description_text: {
    fontSize: 12,
    paddingLeft: 8,
    fontFamily: Fonts.Regular,
  },
  btn_container: {
    flexDirection: "row",
    borderWidth: 1,
    height: 45,
    borderColor: colors.BORDER_COLOR,
  },
  btn_view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btn_text: {
    fontSize: 10,
    fontFamily: Fonts.Regular,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
});
