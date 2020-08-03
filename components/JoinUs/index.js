import React, { Component } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Icon } from "native-base";
import styles from "./styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors, data } from "../../common";
import Share from "react-native-share";
import { showNotification } from "../../common/user";
import get from "lodash.get";
import store from "../../redux/store";
import { client } from "../../services";

export class JoinUs extends Component {
  constructor() {
    super();
    this.state = {
      email1: "",
      email2: "",
    };
  }

  async sharePress(social) {
    const shareOptions = {
      title: "Share via",
      message: "Wishhealth \n",
      url: "https://uat.wishhealth.in/",
      social: social ? social : Share.Social.WHATSAPP,
      whatsAppNumber: "9199999999",
    };
    await Share.shareSingle(shareOptions)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  }

  onSubmit = async () => {
    const { email1, email2 } = this.state;
    let {
      auth: { user },
    } = store.getState();
    if (!email1.match(data.regex.email)) {
      showNotification("danger", data.ToastMessages.valid_email);
    } else {
      let formata = new FormData();
      formata.append("user_id", get(user, "id", ""));
      formata.append("doctor_email[]", email1);
      formata.append("doctor_email[]", email2);

      // console.log("formdataa for join use", formata);

      const response = await client.post("/Common_API/addReferral", formata);
      // console.log("join response>>>>>>", response);
      if (response.data.status == "success") {
        this.setState({ email1: "", email2: "" });
        showNotification("success", response.data.message);
      }
    }
  };

  render() {
    const { email1, email2 } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => this.props.navigation.pop()}
        >
          <Icon
            ios="ios-arrow-back"
            android="ios-arrow-back"
            style={[{ fontSize: Platform.OS === "ios" ? 35 : 30 }]}
          />
        </TouchableOpacity>
        <Image
          resizeMode="cover"
          style={styles.doctorIcon}
          source={require("../../assets/imgs/1.jpg")}
        />
        {/* Info Container */}

        <ScrollView>
          <View style={styles.innerContainer}>
            {/* Dcctor Info */}
            <View style={styles.doctorInfoContainer}>
              <TextInput
                value={email1}
                underlineColor="transparent"
                placeholder="Doctor's Email"
                style={styles.inputContainer}
                onChangeText={(value) => this.setState({ email1: value })}
              />
              {/* <TextInput
                value={email2}
                underlineColor="transparent"
                placeholder="Doctor's Email"
                style={styles.inputContainer}
                onChangeText={(value) => this.setState({ email2: value })}
              /> */}
              {/* Button Conatiner */}
              <View style={styles.buttonConatiner}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    styles.submitButtonConatiner,
                    { backgroundColor: "#35b1fb" },
                  ]}
                  onPress={this.onSubmit}
                >
                  <Text style={[styles.submitTextStyle, { color: "#fff" }]}>
                    Submit
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.submitButtonConatiner}
                  onPress={() => this.setState({ email1: "" })}
                >
                  <Text style={styles.submitTextStyle}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* IconContainer */}

            {/* <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={() => this.sharePress(Share.Social.WHATSAPP)}
              >
                <FontAwesome
                  name="whatsapp"
                  size={30}
                  color={colors.WHATSAPP_ICON}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.sharePress(Share.Social.FACEBOOK)}
              >
                <EvilIcons
                  name="sc-facebook"
                  size={32}
                  color={colors.FACEBOOK_ICON}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.sharePress(Share.Social.INSTAGRAM)}
              >
                <Image
                  style={{ height: 25, width: 25 }}
                  source={require("../../assets//imgs/insta.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.sharePress(Share.Social.EMAIL)}
              >
                <Ionicons name="ios-mail" size={30} color={colors.RED_TEXT} />
              </TouchableOpacity> */}

            {/* <TouchableOpacity
                onPress={() => this.sharePress(Share.Social.EMAIL)}
              > */}
            {/* <SimpleLineIcons
                name="social-skype"
                size={28}
                color={colors.THEME_BLUE}
              /> */}
            {/* </TouchableOpacity> */}

            {/* <AntDesign name="twitter" size={28} color={colors.TWITTER_ICON} />
            </View> */}

            {/* Book Appointment */}

            {/* <TouchableOpacity activeOpacity={0.7} style={styles.bookAppoint}>
              <Text style={styles.appointmentText}>BOOK APPOINTMENT</Text>
            </TouchableOpacity>*/}
          </View>
        </ScrollView>
      </View>
    );
  }
}
