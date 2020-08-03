import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import {
  Button,
  Text,
  Icon,
  Header,
  Content,
  Container,
  Right,
} from "native-base";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/dist/Feather";
import FontAwesome from "react-native-vector-icons/dist/FontAwesome";
import AntDesign from "react-native-vector-icons/dist/AntDesign";
import { colors } from "../../common/index";
import { connect } from "react-redux";
import get from "lodash.get";
import CardButtons from "../CardButtons";
import { data } from "../../common/index";
import Fonts from "../../common/fonts";

const defaultDoc = require("../../assets/imgs/default_doctor.jpg");

class DoctorProfile extends React.Component {
  constructor(props) {
    super(props);
    console.log(props, "propsss");
    this.state = {
      searchQuery: "",
      doctorDetails: props.route.params.doctorDetails,
    };
  }

  goToPage = (page) => {
    const { userInfo, route, navigation } = this.props;

    if (page == "back") {
      this.props.navigation.pop();
    } else {
      if (get(userInfo, "user_id")) {
        this.props.navigation.navigate("BookingSlots", { userData: userInfo });
      } else {
        this.props.navigation.navigate("Signup", {
          previousRoute: "BookingSlots",
        });
      }
    }
  };

  renderServices = ({ item }) => {
    return (
      <View style={styles.serviceOfferedContainer}>
        <View style={styles.roundCircle} />
        <Text style={styles.serviceName}>{item.name}</Text>
      </View>
    );
  };

  render() {
    // console.log("doctorDetails>>>>>>>>..", this.state.doctorDetails);

    return (
      <Container>
        <Header style={[styles.header_container]}>
          <View
            style={[
              styles.inner_header,
              { marginTop: Platform.OS === "ios" ? 0 : 10 },
            ]}
          >
            <Button transparent style={[styles.header_btn, {}]}>
              <TouchableOpacity onPress={() => this.goToPage("back")}>
                <Icon
                  ios="ios-arrow-back"
                  android="ios-arrow-back"
                  style={[{ fontSize: Platform.OS === "ios" ? 35 : 30 }]}
                />
              </TouchableOpacity>
            </Button>
            <Right>
              <Button transparent style={[{}]}>
                <TouchableOpacity onPress={() => console.log("pressed")}>
                  {/* <Icon
                    ios="ios-star-outline"
                    android="ios-star-outline"
                    style={[{ fontSize: Platform.OS === "ios" ? 35 : 25 }]}
                  /> */}
                  <Image
                    tintColor="#fff"
                    style={{ height: 20, width: 20, tintColor: "#fff" }}
                    source={require("../../assets/imgs/star.png")}
                  />
                </TouchableOpacity>
              </Button>
              <Button transparent style={[{}]}>
                <TouchableOpacity onPress={() => console.log("press")}>
                  <Image
                    tintColor="#fff"
                    style={{ height: 20, width: 20, tintColor: "#fff" }}
                    source={require("../../assets/imgs/share.png")}
                  />
                </TouchableOpacity>
              </Button>
            </Right>
          </View>
        </Header>

        <Content>
          <View style={{ margin: 10 }}>
            <View
              style={{
                flexDirection: "row",
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 30,
              }}
            >
              <View style={{ flex: 2 }}>
                <Text style={{ fontSize: 15, fontFamily: Fonts.Bold }}>
                  {this.state.doctorDetails.doctorsDetails.prefix}{" "}
                  {this.state.doctorDetails.doctorsDetails.name}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    marginVertical: 5,
                    fontFamily: Fonts.Regular,
                  }}
                >
                  {this.state.doctorDetails.doctorsSpecialities.length > 0
                    ? this.state.doctorDetails.doctorsSpecialities[0].title
                    : "Dentist"}
                </Text>
                <Text
                  style={{
                    color: colors.THEME_BLUE,
                    fontSize: 12,
                    fontFamily: Fonts.SemiBold,
                  }}
                >
                  22 years as Specialist
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                {get(this.state.doctorDetails, "doctorsDetails.profile_pic") ? (
                  <Image
                    resizeMode="cover"
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 5,
                    }}
                    source={{
                      uri: get(
                        this.state.doctorDetails,
                        "doctorsDetails.profile_pic"
                      ),
                    }}
                  />
                ) : (
                  <Image
                    resizeMode="contain"
                    style={{
                      width: 80,
                      height: 80,
                    }}
                    source={defaultDoc}
                  />
                )}
              </View>
            </View>

            <View style={styles.progress_text_container}>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.labelText}>Detail</Text>
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.labelText}>Reviews</Text>
              </View>
            </View>

            <View style={styles.progress_container}>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <View style={styles.MiddlecircleStyle} />
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <View style={styles.circleStyle} />
              </View>

              <View style={styles.leftBar} />
              <View style={styles.rightBar} />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Feather
                  name="thumbs-up"
                  style={[
                    {
                      fontSize: 25,
                      color: colors.GREEN,
                      paddingLeft: 10,
                    },
                  ]}
                />

                <View style={{ marginLeft: 15 }}>
                  <Text style={styles.heading_text}>
                    {get(this.state.doctorDetails, "doctorsDetails.rating")}%
                  </Text>
                  <Text style={{ fontSize: 10, fontFamily: Fonts.Regular }}>
                    (
                    {this.state.doctorDetails.doctorsDetails.profile_view_count}{" "}
                    ratings)
                  </Text>
                </View>
              </View>

              {get(this.state.doctorsDetails, "doctorsDetails.is_verified") ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Feather
                    name="check-circle"
                    style={[
                      {
                        fontSize: 23,
                        color: colors.GREEN,
                        marginRight: 10,
                      },
                    ]}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      alignSelf: "center",
                      fontFamily: Fonts.Bold,
                    }}
                  >
                    {" "}
                    Wishhealth Verified
                  </Text>
                </View>
              ) : null}
            </View>

            <View style={{ marginVertical: 15 }}>
              <View style={styles.field_conatiner}>
                <View style={{ flex: 0.2 }}>
                  <FontAwesome
                    name="graduation-cap"
                    style={[
                      {
                        fontSize: 30,
                        color: colors.THEME_BLUE,
                        marginLeft: 10,
                      },
                    ]}
                  />
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.heading_text}>Qualification</Text>
                  <FlatList
                    style={{ flex: 1, marginTop: 5 }}
                    data={this.state.doctorDetails.doctorsDetails.doctorDegrees}
                    renderItem={(item) => (
                      <Text style={{ fontSize: 12, fontFamily: Fonts.Regular }}>
                        {item.item.degree}
                      </Text>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              </View>

              <View style={styles.field_conatiner}>
                <View style={{ flex: 0.2 }}>
                  <Entypo
                    name="location-pin"
                    android="location-pin"
                    style={[
                      {
                        fontSize: 30,
                        color: colors.THEME_BLUE,
                        paddingLeft: 10,
                      },
                    ]}
                  />
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.heading_text}>Address</Text>
                  <Text style={styles.detailText}>
                    {get(
                      this.state.doctorDetails,
                      "doctorOwnClinic[0].address",
                      ""
                    )}
                  </Text>
                </View>
              </View>

              <View style={styles.field_conatiner}>
                <View style={{ flex: 0.2 }}>
                  <AntDesign
                    name="wallet"
                    style={[
                      {
                        fontSize: 30,
                        color: colors.THEME_BLUE,
                        marginLeft: 10,
                      },
                    ]}
                  />
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.heading_text}>Consultations Charges</Text>
                  <Text style={styles.detailText}>
                    {data.doctor.type != "clinical"
                      ? get(this.props.doctorData, "VideoDetails.fees")
                        ? `₹${get(
                            this.state.doctorDetails,
                            "VideoDetails.fees"
                          )} for regular visit`
                        : "Free"
                      : get(this.state.doctorDetails, "doctorsDetails.doc_fees")
                      ? `₹${get(
                          this.state.doctorDetails,
                          "doctorsDetails.doc_fees"
                        )} for regular visit`
                      : "Free"}
                  </Text>
                </View>
              </View>

              <View style={styles.field_conatiner}>
                <View style={{ flex: 0.2 }}>
                  <Feather
                    name="clock"
                    style={[
                      {
                        fontSize: Platform.OS === "ios" ? 35 : 30,
                        color: colors.THEME_BLUE,
                        marginLeft: 10,
                      },
                    ]}
                  />
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.heading_text}>Timings</Text>
                  <Text style={{ fontSize: 12, fontFamily: Fonts.Bold }}>
                    Available Mon-Sat
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      marginLeft: 44,
                      fontFamily: Fonts.Regular,
                    }}
                  >
                    10:00 AM- 1:00 PM
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      marginLeft: 44,
                      fontFamily: Fonts.Regular,
                    }}
                  >
                    05:00 PM- 8:00 PM
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 10, marginLeft: 10 }}>
              <Text style={{ fontFamily: Fonts.Bold, marginBottom: 10 }}>
                Services Offered
              </Text>

              <FlatList
                data={this.state.doctorDetails.doctorsServices}
                renderItem={this.renderServices}
              />
            </View>

            <Text style={styles.review_text}>
              Reviews <Text style={styles.detailText}>(120 Ratings)</Text>
            </Text>

            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text
                style={[
                  styles.detailText,
                  { color: "gray", fontFamily: Fonts.SemiBold, fontSize: 16 },
                ]}
              >
                {" "}
                No reviews for now
              </Text>
            </View>

            {data.doctor.type != "profile" && (
              <View style={{ marginTop: 20, alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.THEME_BLUE,
                    width: 240,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    this.goToPage();
                  }}
                >
                  <Text style={{ color: "white" }}> Book Appointment </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Content>

        {data.doctor.type == "profile" && (
          <CardButtons
            onPress={(type) => {
              this.goToPage();
              data.doctor.type = type;
            }}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.auth.user,
  doctorData: state.app.doctorData,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps)(DoctorProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  header_container: {
    height: 50,
    alignItems: "center",
    backgroundColor: colors.THEME_BLUE,
  },
  inner_header: {
    height: 80,
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  header_btn: {
    textAlign: "left",
    position: "absolute",
    top: "20%",
    left: 0,
  },
  field_conatiner: {
    flexDirection: "row",
    marginTop: 15,
  },
  heading_text: {
    fontSize: 14,
    fontFamily: Fonts.Bold,
  },
  bullet_operator: {
    color: colors.THEME_BLUE,
    fontSize: 12,
  },
  progress_container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  progress_text_container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
  },

  circleStyle: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: "#9c9c9c",
    borderColor: "#9c9c9c",
    borderWidth: 3,
    bottom: 2,
  },
  MiddlecircleStyle: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: colors.SLOTS_BTN,
    borderColor: colors.SLOTS_BTN,
    borderWidth: 3,
    bottom: 1,
    zIndex: 2,
  },
  circleText: {
    alignSelf: "center",
    top: 20 / 3,
  },
  labelText: {
    fontSize: 12,
    fontFamily: Fonts.SemiBold,
  },
  leftBar: {
    position: "absolute",
    top: 20 / 2.22,
    left: 0,
    right: 148,
    borderTopWidth: 3,
    borderTopColor: "#ebebe4",
    marginRight: 16 / 2 + 4,
  },
  rightBar: {
    position: "absolute",
    top: 16 / 2,
    right: 20,
    left: "40%",
    borderTopWidth: 3,
    borderTopColor: colors.SLOTS_BTN,
    marginLeft: 16 / 2 + 4,
  },
  stepNum: {
    color: "black",
  },
  review_text: {
    fontFamily: Fonts.Bold,
    marginTop: 10,
    marginLeft: 10,
  },
  review_container: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "#fafafa",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  serviceOfferedContainer: {
    marginVertical: 4,
    flexDirection: "row",
  },
  roundCircle: {
    height: 8,
    width: 8,
    borderRadius: 8 / 2,
    backgroundColor: colors.THEME_BLUE,
    marginTop: 5,
  },
  serviceName: {
    marginLeft: 15,
    fontSize: 10,
    fontFamily: Fonts.Regular,
  },
  detailText: {
    fontSize: 10,
    fontFamily: Fonts.Regular,
  },
});
