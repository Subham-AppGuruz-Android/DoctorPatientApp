import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  StyleSheet,
  Image,
} from "react-native";
import Feather from "react-native-vector-icons/dist/Feather";
import { colors } from "../../common/index";
import { callNumber } from "../../common/utils";
import get from "lodash.get";
import Fonts from "../../common/fonts";

const DoctorCard = ({ item, onPress }) => {
  return (
    <View style={{ marginTop: 10 }}>
      <TouchableOpacity onPress={() => onPress("profile", item)}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            width: "100%",
            backgroundColor: "#fdfbfc",
            paddingBottom: 15,
          }}
        >
          <View
            style={{
              width: "25%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {get(item, "doctorsDetails.profile_pic") ? (
              <Image
                resizeMode="cover"
                style={{ height: 80, width: 80, borderRadius: 5 }}
                source={{ uri: item.doctorsDetails.profile_pic }}
              />
            ) : (
                <Image
                  resizeMode="contain"
                  style={{ height: 70, width: 70, borderRadius: 5 }}
                  source={require("../../assets/imgs/default_doctor.jpg")}
                />
              )}
          </View>
          <View style={{ flex: 1 }}>
            {/*  */}

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {/* DOctor Details */}
              <View style={{ flexBasis: "60%" }}>
                <Text
                  style={{ fontSize: 14, fontFamily: Fonts.Bold }}
                  numberOfLines={1}
                >
                  {item.doctorsDetails.prefix} {item.doctorsDetails.name}
                </Text>
                <Text
                  style={{
                    fontSize: 8,
                    marginTop: 2,
                    fontFamily: Fonts.Regular,
                  }}
                  numberOfLines={2}
                >
                  {get(item, "doctorsSpecialities[0].title", "")}
                </Text>
              </View>

              {/* Verified */}

              {/* {get(item, "doctorsDetails.is_verified") == "1" ? ( */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexBasis: "40%",
                  alignItems: "center",
                  paddingRight: 15,
                }}
              >
                <Text style={{ fontFamily: Fonts.Regular }}>Verified</Text>
                <Image
                  tintColor={colors.GREEN}
                  style={{ height: 20, width: 20, tintColor: colors.GREEN }}
                  source={require("../../assets/imgs/Verified.png")}
                />
                {/* <Feather
                  name="check-circle"
                  style={[
                    {
                      fontSize: Platform.OS === "ios" ? 20 : 20,
                      color: colors.GREEN,
                    },
                  ]}
                /> */}
              </View>
              {/* ) : null} */}
            </View>

            {/*  */}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  marginTop: 2,
                  fontFamily: Fonts.Regular,
                  flexBasis: "60%",
                }}
                numberOfLines={2}
              >
                {get(item, "doctorOwnClinic[0].name", "")}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexBasis: "40%",
                  paddingRight: 15,
                }}
              >
                <Text style={{ marginLeft: 20, fontFamily: Fonts.Regular }}>
                  {get(item, "doctorsDetails.rankings")}%
                </Text>

                <Feather
                  name="thumbs-up"
                  style={[
                    {
                      fontSize: Platform.OS === "ios" ? 20 : 20,
                      color: colors.GREEN,
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.bottomButtonContainer}
          onPress={() => {
            onPress("clinical", item);
          }}
        >
          <Image
            resizeMode="contain"
            style={{ height: 25, width: 25 }}
            source={require("../../assets/imgs/calendar-(1).png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomButtonContainer}
          onPress={() => {
            onPress("video", item);
          }}
        >
          <Image
            resizeMode="contain"
            style={{ height: 25, width: 25 }}
            source={require("../../assets/imgs/Video.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomButtonContainer}
          onPress={() => {
            console.log("pressed");
          }}
        >
          <Image
            resizeMode="contain"
            style={{ height: 25, width: 25 }}
            source={require("../../assets/imgs/comment.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomButtonContainer}
          onPress={() => {
            callNumber(get(item, "contact_no", "12345"));
          }}
        >
          <Image
            resizeMode="contain"
            style={{ height: 25, width: 25 }}
            source={require("../../assets/imgs/Phone.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DoctorCard;

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
