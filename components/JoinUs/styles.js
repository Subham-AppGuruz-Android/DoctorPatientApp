import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../common/index";
import Fonts from "../../common/fonts";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    color: "#fff",
  },
  doctorIcon: {
    width: "100%",
    height: "30%",
  },
  innerContainer: {
    marginVertical: "5%",
    alignItems: "center",
  },
  doctorInfoContainer: {
    width: "80%",
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  inputContainer: {
    height: 40,
    width: "85%",
    backgroundColor: "#ededed",
    marginTop: 15,
    fontFamily: Fonts.SemiBold,
    color: colors.CANCEL,
  },
  buttonConatiner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "85%",
    marginVertical: "5%",
  },
  submitButtonConatiner: {
    backgroundColor: "#ededed",
    justifyContent: "center",
    width: width * 0.3,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  submitTextStyle: {
    fontFamily: Fonts.Regular,
  },
  iconContainer: {
    width: "75%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "40%",
    alignItems: "center",
  },
  bookAppoint: {
    marginTop: "15%",
    width: "80%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#35b1fb",
  },
  appointmentText: {
    color: "#fff",
    fontFamily: Fonts.Bold,
  },
  backIcon: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 1,
  },
});
