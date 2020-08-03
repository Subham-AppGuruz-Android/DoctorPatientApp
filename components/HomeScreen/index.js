import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
  Linking,
} from "react-native";
import { Button, Text, Header, Container, Picker, Icon } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import SplashScreen from "react-native-splash-screen";
import { postApiRequest } from "../../common/user";
import { data } from "../../common/index";
import * as session from "../../services/session";
import { colors } from "../../common/index";
import DoctorCard from "./DoctorCard";
import { connect } from "react-redux";
import get from "lodash.get";
import { bindActionCreators } from "redux";
import { appActions } from "../../redux/actions/app";
import Quickblox from "../../common/Quickblox";
import Fonts from "../../common/fonts";
import { PERMISSIONS, request } from "react-native-permissions";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      isLogin: false,
      loader: false,
      searchResult: [],
      joinUs: false,
      language: "Mohali",
    };
  }
  async componentDidMount() {
    this.requestPermissions()
    const { userInfo } = this.props;
    if (userInfo) {
      await Quickblox.login(userInfo);
    }
    this.search();
  }

  requestPermissions() {
    request("android.permission.CAMERA").then((res) => {
      if (res == "granted") {
        request("android.permission.RECORD_AUDIO").then((resp) => {
          if (resp == "granted") {

          } else {
            Linking.openSettings()
          }
        });
      } else {
        Linking.openSettings()
      }
    });
  }

  goToPage = (type, item) => {
    const { userInfo } = this.props;

    data.doctor.name =
      item.doctorsDetails.prefix + " " + item.doctorsDetails.name;
    data.doctor.doctor_id = item.doctorsDetails.user_id;
    data.doctor.details = item;

    // console.log(data.doctor.doctor_id, "doctor id");

    data.doctor.type = type;
    if (type == "video" || type == "clinical") {
      if (get(userInfo, "user_id")) {
        this.props.navigation.navigate("BookingSlots", { userData: userInfo });
      } else {
        this.props.navigation.navigate("Signup", {
          doctorDetails: item,
          previousRoute: "BookingSlots",
        });
      }
    } else {
      this.props.navigation.navigate("DoctorProfile", { doctorDetails: item });
    }
  };
  openDrawer = () => {
    this.props.navigation.openDrawer();
  };

  onChangeText = (value) => {
    this.setState({ searchQuery: value }, () => {
      this.search(value);
    });
  };

  //Searh APi call
  search = async () => {
    const { userInfo } = this.props;

    console.log(this.state.searchQuery, "quey");
    this.setState({ loader: true });

    let formdata = new FormData();
    formdata.append("doctorParams", this.state.searchQuery);
    formdata.append("location", this.state.language);
    formdata.append("user_id", get(userInfo, "user_id", ""));
    formdata.append("type", "");

    postApiRequest(data.api_endpoint.search, formdata).then(
      (data) => {
        // console.log("dataaaaaaaaaaaaaaaaA>", data.doctor_list, this.state.searchQuery);

        this.setState(
          {
            searchResult: data.doctor_list,
            loader: false,
          },
          () => {
            setTimeout(() => {
              this.setState({ joinUs: data.doctor_list.length ? false : true });
            }, 1000);
          }
        );
        SplashScreen.hide();
      },
      (error) => {
        console.log(error);
        this.setState({ loader: false });
        SplashScreen.hide();
      }
    );
  };

  render() {
    const {
      appActions: {
        setDoctorDetail,
        setDoctorDetailWholeContent,
        onModifyItem,
      },
      navigation,
    } = this.props;
    const { searchResult, joinUs, loader } = this.state;

    // console.log("this.state.searchResult", this.state.searchResult);

    return (
      <Container>
        <Header style={[styles.header_container]}>
          <View style={[styles.inner_header]}>
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => this.openDrawer()}
            >
              <Ionicons
                name="ios-menu"
                color="white"
                style={[{ fontSize: Platform.OS === "ios" ? 35 : 30 }]}
              />
            </TouchableOpacity>

            <View
              style={{
                width: "85%",
                flexDirection: "row",
                backgroundColor: "white",
                alignItems: "center",
                paddingHorizontal: 20,
              }}
            >
              <EvilIcons
                name="location"
                // android="location-pin"
                style={[
                  {
                    fontSize: Platform.OS === "ios" ? 30 : 25,
                    color: colors.THEME_BLUE,
                  },
                ]}
              />
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                selectedValue={this.state.language}
                style={{ height: 30, width: 195, backgroundColor: "white" }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ language: itemValue }, () => this.search())
                }
              >
                <Picker.Item label="Mohali" value="Mohali" />
                <Picker.Item label="Chandigarh" value="Chandigarh" />
                <Picker.Item label="Panchkula" value="Panchkula" />
                <Picker.Item label="Mumbai" value="Mumbai" />
                <Picker.Item label="Delhi" value="Delhi" />
                <Picker.Item label="Bengaluru" value="Bengaluru" />
                <Picker.Item label="Ahmedabad" value="Ahmedabad" />
                <Picker.Item label="Hyderabad" value="Hyderabad" />
                <Picker.Item label="Chennai" value="Chennai" />
                <Picker.Item label="Kolkata" value="Kolkata" />
                <Picker.Item label="Pune" value="Pune" />
                <Picker.Item label="Jaipur" value="Jaipur" />
                <Picker.Item label="Surat" value="Surat" />
              </Picker>
              <Icon
                ios="ios-arrow-down"
                android="ios-arrow-down"
                style={[
                  {
                    fontSize: Platform.OS === "ios" ? 25 : 20,
                    color: colors.THEME_BLUE,
                  },
                ]}
              />
            </View>
          </View>
        </Header>

        <View style={{ flex: 1 }}>
          <View style={{}}>
            <View
              style={{
                flexDirection: "row",
                borderColor: colors.BORDER_COLOR,
                borderWidth: 1,
                marginTop: 20,
                marginLeft: 30,
                marginRight: 30,
                alignItems: "center",
              }}
            // activeOpacity={1}
            // onPress={()=> this.searchRef && this.searchRef.focus()}
            >
              <TextInput
                ref={(refs) => this.searchRef = refs}
                style={{ height: 40, width: "85%", paddingLeft: 10 }}
                placeholder="Search Doctors, Specialities, Clinics"
                onChangeText={(text) => this.onChangeText(text)}
                value={this.state.searchQuery}
              />
              {this.state.loader ? (
                <ActivityIndicator size="large" color={colors.THEME_BLUE} />
              ) : (
                  <Icon
                    ios="ios-search"
                    android="ios-search"
                    style={[
                      {
                        fontSize: Platform.OS === "ios" ? 35 : 30,
                        color: colors.THEME_BLUE,
                        marginLeft: 10,
                      },
                    ]}
                  />
                )}
            </View>
          </View>
          <View style={{ flex: 1 }}>
            {joinUs && !searchResult.length && !loader ? (
              <View style={{ marginHorizontal: 30, marginTop: 10 }}>
                <Text style={{ fontFamily: Fonts.Regular, fontSize: 13 }}>
                  Couldn't find your doctor. Click on the link below and refer
                  to joining wishhealth team.
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.SemiBold,
                    color: colors.WHATSAPP_ICON,
                    textDecorationLine: "underline",
                  }}
                  onPress={() => navigation.navigate("JoinUs")}
                >
                  Join Us
                </Text>
              </View>
            ) : null}

            {this.state.searchResult && this.state.searchResult.length > 0 && (
              <>
                <View style={{ marginHorizontal: 30, marginTop: 10 }}>
                  {/* <Text style={{ fontFamily: Fonts.Regular, fontSize: 13 }}>
                    Couldn't find your doctor. Click on the link below and refer
                    to joining wish health team.
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.SemiBold,
                      color: colors.WHATSAPP_ICON,
                      textDecorationLine: "underline",
                    }}
                    onPress={() => navigation.navigate("JoinUs")}
                  >
                    Join Us
                  </Text> */}

                  <Text
                    style={{
                      fontFamily: Fonts.Regular,
                      alignSelf: "center",
                      fontSize: 12,
                      marginTop: 10,
                    }}
                    onPress={() => navigation.navigate("JoinUs")}
                  >
                    Featured Doctors: Verified by wishhealth team
                  </Text>
                </View>
                <FlatList
                  style={{
                    marginVertical: 5,
                  }}
                  data={this.state.searchResult}
                  renderItem={(item) => (
                    <DoctorCard
                      item={item.item}
                      onPress={(id, item) => {
                        this.goToPage(id, item);
                        let details = item.doctorsDetails;
                        setDoctorDetail(details);
                        setDoctorDetailWholeContent(item);
                        onModifyItem(false);
                      }}
                    />
                  )}
                  keyExtractor={(item) => item.doctorsDetails.name}
                />
              </>
            )}

            {/* {this.state.searchResult.length == 0 && !loader && (
              <View style={{ alignSelf: "center", paddingTop: 250 }}>
                <Text style={{ fontSize: 20, fontFamily: Fonts.Bold }}>
                  No Doctor Available
                </Text>
              </View>
            )} */}

            {/* {this.state.isLogin && (
              <View>
                <View
                  style={{
                    alignItems: "center",
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Today Appointment
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    backgroundColor: "#fdfbfc",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Fontisto
                      name="doctor"
                      style={[
                        {
                          fontSize: Platform.OS === "ios" ? 35 : 50,
                          marginLeft: 10,
                        },
                      ]}
                    />
                  </View>
                  <View style={{ flex: 2 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      Appointment With
                    </Text>
                    <Text style={{ fontSize: 12 }}>Maxwell Dental Clinic</Text>
                    <Text style={{ fontSize: 13 }}>25th May 2020 2:00 Pm</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 10 }}>Dr. Christian Maxwell</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    backgroundColor: "#fdfbfc",
                    marginTop: 20,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Fontisto
                      name="doctor"
                      style={[
                        {
                          fontSize: Platform.OS === "ios" ? 35 : 50,
                          marginLeft: 10,
                        },
                      ]}
                    />
                  </View>
                  <View style={{ flex: 2 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      Appointment With
                    </Text>
                    <Text style={{ fontSize: 12 }}>Maxwell Dental Clinic</Text>
                    <Text style={{ fontSize: 13 }}>25th May 2020 2:00 Pm</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 10 }}>Dr. Christian Maxwell</Text>
                  </View>
                </View>
              </View>
            )} */}
          </View>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.auth.user,
});
const mapDispatchToProps = (dispatch) => ({
  appActions: bindActionCreators(appActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  header_container: {
    height: 80,
    alignItems: "center",
    backgroundColor: colors.THEME_BLUE,
  },
  inner_header: {
    flexDirection: "row",
    // justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  header_btn: {
    textAlign: "left",
  },
  doctor_name: { fontSize: 15, fontWeight: "bold" },
  doctor_container: {
    flexDirection: "row",
    marginTop: 40,
    width: "100%",
    backgroundColor: "#fdfbfc",
  },
});
