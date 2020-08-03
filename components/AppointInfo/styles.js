import { StyleSheet, Dimensions } from "react-native";
import Fonts from "../../common/fonts";
import colors from "../../common/colors";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  upperContainer: {
    height: height * 0.3,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bookingConfirm: {
    color: "#fff",
    fontFamily: Fonts.SemiBold,
    fontSize: 16,
  },
  bottomContainer: {
    height: height * 0.7,
    paddingVertical: "10%",
    paddingHorizontal: "5%",
    justifyContent: "space-between",
  },
  transactionText: {
    fontSize: 12,
    fontFamily: Fonts.Regular,
  },
  bookingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "6%",
  },
  bookingHeaderText: {
    fontFamily: Fonts.Bold,
  },
  bookingText: {
    fontFamily: Fonts.Regular,
    marginLeft: 5,
  },
  bottomButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
  },
  homeContainer: {
    height: "100%",
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#35b1fb",
  },
  homeText: {
    fontFamily: Fonts.Bold,
    color: "#fff",
  },
  loremText: {
    fontFamily: Fonts.Regular,
    marginTop: "8%",
  },
});
