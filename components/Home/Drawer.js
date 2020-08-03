import React from "react";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Text, Container, Content, Icon } from "native-base";
import Fontisto from "react-native-vector-icons/Fontisto";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { colors } from "../../common/index";
import DrawerButton from "./DraweButton";
import store from "../../redux/store";
import get from "lodash.get";
import { actions as authAction } from "../../redux/actions/auth";
import { CommonActions } from "@react-navigation/native";
import Fonts from "../../common/fonts";
import { appActions } from "../../redux/actions/app";
import Quickblox from "../../common/Quickblox";

const routes = ["Home", "Chat", "Profile"];

const DATA = [
  {
    title: "Appointments",
    left:
      "<Icon ios='ios-star-outline' android='ios-star-outline'style={[ {fontSize: Platform.OS === 'ios' ? 25 : 20,color:colors.THEME_BLUE}, ]} />",
  },
];
export class DrawerContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  UNSAFE_componentWillMount = async () => {};

  logout = () => {
    Alert.alert(
      "Logout",
      "are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => {
            // console.log("Cancel Pressed");
          },
          style: "cancel",
        },
        { text: "Yes", onPress: () => this.confirmLogout() },
      ],
      { cancelable: false }
    );
  };

  confirmLogout = async () => {
    Quickblox.logout();
    store.dispatch(authAction.onLogout());
    this.resetStack();
  };

  resetStack = () => {
    const { navigation } = this.props;
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      })
    );
  };

  goToNext = (type) => {
    const { navigation } = this.props;
    console.log("type", type, user);

    let {
      auth: { user },
    } = store.getState();

    if (get(user, "user_id")) {
      navigation.navigate(type);
    } else {
      navigation.navigate("Signup", { previousRoute: type });
    }
  };

  render() {
    const { navigation, routes, route } = this.props;
    let {
      auth: { user },
    } = store.getState();

    const { setAppointmentType } = appActions;

    // console.log("user>>>>.", user);

    return (
      <Container>
        <Content style={styles.item_container}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              get(user, "user_id")
                ? null
                : navigation.navigate("Signup", { previousRoute: "drawer" });
            }}
            style={{
              backgroundColor: colors.THEME_BLUE,
              height: 80,
              width: "100%",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Fontisto
                name="doctor"
                style={[
                  {
                    fontSize: Platform.OS === "ios" ? 35 : 35,
                    marginLeft: 10,
                    color: "white",
                  },
                ]}
              />
            </View>
            <View style={{ flex: 2, justifyContent: "center" }}>
              <Text
                style={{
                  color: "white",
                  fontFamily: Fonts.SemiBold,
                  fontSize: 15,
                }}
              >
                {get(user, "name", "Sign in")}
              </Text>
            </View>
            <View style={{ flex: 0.4 }}>
              <EvilIcons
                name="pencil"
                style={[
                  {
                    fontSize: Platform.OS === "ios" ? 35 : 35,
                    marginTop: 10,
                    color: "white",
                  },
                ]}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.item_container}>
            <DrawerButton
              leftIcon={
                <AntDesign
                  name="home"
                  style={[
                    {
                      fontSize: Platform.OS === "ios" ? 25 : 22,
                      color: colors.THEME_BLUE,
                    },
                  ]}
                />
              }
              title="Home"
              onPress={this.resetStack}
            />

            <DrawerButton
              leftIcon={
                <SimpleLineIcons
                  name="calendar"
                  style={[
                    {
                      fontSize: Platform.OS === "ios" ? 25 : 20,
                      color: colors.THEME_BLUE,
                    },
                  ]}
                />
              }
              title="Appointments"
              onPress={() => {
                this.goToNext("MyAppointments");
                store.dispatch(setAppointmentType(1));
              }}
            />

            <DrawerButton
              leftIcon={
                <Icon
                  ios="ios-videocam"
                  android="ios-videocam"
                  style={[
                    {
                      fontSize: Platform.OS === "ios" ? 25 : 20,
                      color: colors.THEME_BLUE,
                    },
                  ]}
                />
              }
              title="Video Consultations"
              onPress={() => {
                this.goToNext("MyAppointments");
                store.dispatch(setAppointmentType(2));
              }}
            />

            <DrawerButton
              leftIcon={
                <Fontisto
                  name="prescription"
                  style={[
                    {
                      fontSize: Platform.OS === "ios" ? 25 : 20,
                      color: colors.THEME_BLUE,
                    },
                  ]}
                />
              }
              title="Prescription"
              onPress={() => {
                this.goToNext("Prescription");
                // store.dispatch(setAppointmentType(2));
              }}
            />

            <DrawerButton
              leftIcon={
                <MaterialCommunityIcons
                  name="doctor"
                  style={[
                    {
                      fontSize: Platform.OS === "ios" ? 25 : 20,
                      color: colors.THEME_BLUE,
                    },
                  ]}
                />
              }
              title="My Doctor"
              onPress={() => {
                this.goToNext("MyDoctor");
                // store.dispatch(setAppointmentType(1));
              }}
            />

            <DrawerButton
              leftIcon={
                <AntDesign
                  name="wallet"
                  style={[
                    {
                      fontSize: Platform.OS === "ios" ? 25 : 20,
                      color: colors.THEME_BLUE,
                    },
                  ]}
                />
              }
              title="Payments"
              onPress={() => {
                this.goToNext("Payments");
                // store.dispatch(setAppointmentType(2));
              }}
              
            />

            <DrawerButton
              onPress={() => navigation.navigate("Settings")}
              leftIcon={
                <Icon
                  ios="ios-settings"
                  android="ios-settings"
                  style={[
                    {
                      fontSize: Platform.OS === "ios" ? 25 : 20,
                      color: colors.THEME_BLUE,
                    },
                  ]}
                />
              }
              title="Settings"
            />

            <DrawerButton
              onPress={() => navigation.navigate("Help")}
              leftIcon={
                <Icon
                  ios="ios-help-circle-outline"
                  android="ios-help-circle-outline"
                  style={[
                    {
                      fontSize: Platform.OS === "ios" ? 25 : 20,
                      color: colors.THEME_BLUE,
                    },
                  ]}
                />
              }
              title="Help Centre"
            />

            <DrawerButton
              leftIcon={
                <AntDesign
                  name="book"
                  style={[
                    {
                      fontSize: Platform.OS === "ios" ? 25 : 20,
                      color: colors.THEME_BLUE,
                    },
                  ]}
                />
              }
              title="Read About Health"
              onPress={() => {
                this.goToNext("Blogs");
                // store.dispatch(setAppointmentType(2));
              }}
            />

            <DrawerButton
              onPress={() => navigation.navigate("RateApp")}
              leftIcon={
                <Feather
                  name="thumbs-up"
                  style={[
                    {
                      fontSize: Platform.OS === "ios" ? 25 : 20,
                      color: colors.THEME_BLUE,
                    },
                  ]}
                />
              }
              title="Rate our App"
            />

            {get(user, "user_id") && (
              <DrawerButton
                onPress={this.logout}
                leftIcon={
                  <AntDesign
                    name="logout"
                    style={[
                      {
                        fontSize: Platform.OS === "ios" ? 25 : 20,
                        color: colors.THEME_BLUE,
                      },
                    ]}
                  />
                }
                title="Log Out"
              />
            )}
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  item_container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  sub_container: {
    flexDirection: "row",
    height: 40,
    marginTop: 10,
    backgroundColor: "red",
  },
  left_icon: { flex: 1, justifyContent: "center", alignItems: "center" },
  text_container: { flex: 2, justifyContent: "center" },
  right_icon: { flex: 0.4, justifyContent: "center" },
  text_size: { fontSize: 12 },
});
