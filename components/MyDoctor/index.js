import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
  Linking, Image
} from "react-native";
import { Button, Text, Header, Container, Picker, Icon } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import SplashScreen from "react-native-splash-screen";
import { postApiRequest, getApiRequestCustom } from "../../common/user";
import { data } from "../../common/index";
import * as session from "../../services/session";
import { colors } from "../../common/index";
// import DoctorCard from "./DoctorCard";
import { connect } from "react-redux";
import get from "lodash.get";
import { bindActionCreators } from "redux";
import { appActions } from "../../redux/actions/app";
import Quickblox from "../../common/Quickblox";
import Fonts from "../../common/fonts";
import { PERMISSIONS, request } from "react-native-permissions";
import DoctorCard from "../HomeScreen/DoctorCard";
import Feather from "react-native-vector-icons/dist/Feather";
import { callNumber } from "../../common/utils";

class MyDoctor extends React.Component {
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

    // if (userInfo) {
    //   await Quickblox.login(userInfo);
    // }
    // this.search();
    this.getMyDoctors();
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
  /**
   * @function getMyDoctors get the doctors based on userId
   */
  getMyDoctors = async () => {
    const { userInfo } = this.props;
    console.log('userInfo', userInfo)
    getApiRequestCustom(`${data.api_endpoint.getMyDoctor}7579`)
      .then(response => {
        console.log('response of Api ', response)
        if (response.doctor_list.length > 0) {
          this.setState({ searchResult: response.doctor_list, loader: false })
        }
        else {
          setTimeout(() => {
            this.setState({ loader: false })
          }, 500);
        }


      })
      .catch(error => {
        console.log('error', error)
      })
  }
  //Searh APi call
  search = async () => {
    const { userInfo } = this.props;

    console.log(this.state.searchQuery, "quey");
    // this.setState({ loader: true });

    let formdata = new FormData();
    formdata.append("doctorParams", this.state.searchQuery);
    formdata.append("location", this.state.language);
    formdata.append("user_id", get(userInfo, "user_id", ""));
    formdata.append("type", "");
    // postApiRequest(data.api_endpoint.search, formdata).then(
    //   (data) => {
    //     // console.log("dataaaaaaaaaaaaaaaaA>", data.doctor_list, this.state.searchQuery);

    //     this.setState(
    //       {
    //         searchResult: data.doctor_list,
    //         loader: false,
    //       },
    //       () => {
    //         setTimeout(() => {
    //           this.setState({ joinUs: data.doctor_list.length ? false : true });
    //         }, 1000);
    //       }
    //     );
    //     SplashScreen.hide();
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.setState({ loader: false });
    //     SplashScreen.hide();
    //   }
    // );
  };

  onDoctorPress = (id, item) => {
    console.log('id', id);
    console.log('item', item)
    this.goToPage(id, item);
    let details = item.doctorsDetails;
    setDoctorDetail(details);
    setDoctorDetailWholeContent(item);
    onModifyItem(false);
  }
  renderMyDoctor = (item) => {
    return (
      <View style={{ marginTop: 10 }}>
        <TouchableOpacity onPress={() => this.onDoctorPress("profile", item.item)}>
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
              {get(item.item, "doctorsDetails.profile_pic") ? (
              <Image
                resizeMode="cover"
                style={{ height: 80, width: 80, borderRadius: 5 }}
                source={{ uri: item.item.doctorsDetails.profile_pic }}
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

              <View
                style={{ flexDirection: "row", justifyContent: "space-between" }}
              >
                {/* DOctor Details */}
                <View style={{ flexBasis: "60%" }}>
                  <Text
                    style={{ fontSize: 14, fontFamily: Fonts.Bold }}
                    numberOfLines={1}
                  >
                    {item.item.doctorsDetails.prefix} {item.item.doctorsDetails.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 8,
                      marginTop: 2,
                      fontFamily: Fonts.Regular,
                    }}
                    numberOfLines={2}
                  >
                    {get(item.item, "doctorsSpecialities[0].title", "")}
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
                  {get(item.item, "doctorOwnClinic[0].name", "")}
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
                    {get(item.item, "doctorsDetails.rankings")}%
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
              this.onDoctorPress("clinical", item);
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
              this.onDoctorPress("video", item);
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
              callNumber(get(item.item, "contact_no", "12345"));
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
    )
  }

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

            {/* <View
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
            </View> */}
          </View>
        </Header>

        <View style={{ flex: 1 }}>

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
            <View style={{ marginHorizontal: 30, marginTop: 10 }}>
              <Text
                style={{
                  fontFamily: Fonts.Bold,

                  fontSize: 14,
                  marginTop: 10,
                }}
              // onPress={() => navigation.navigate("JoinUs")}
              >
                My Doctors
                  </Text>
            </View>

            {this.state.searchResult && this.state.searchResult.length > 0 && (
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
                keyExtractor={(item) => item.index}
              />

            )}

            {this.state.searchResult.length == 0 && !loader && (
              <View style={{ alignSelf: "center", justifyContent: 'center', flex: 1 }}>
                <Text style={{ fontSize: 20, fontFamily: Fonts.Bold }}>
                  No Doctor Available
                </Text>
              </View>
            )}

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
)(MyDoctor);

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
