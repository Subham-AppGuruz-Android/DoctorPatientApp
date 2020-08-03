import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import {
  Button,
  Text,
  Icon,
  Header,
  Body,
  Title,
  Container,
} from "native-base";
import Feather from "react-native-vector-icons/dist/Feather";
import { colors, data } from "../../common/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import get from "lodash.get";
import { client } from "../../services";
import moment from "moment";
import Fonts from "../../common/fonts";
import { appActions } from "../../redux//actions/app";

const defaultDoc = require("../../assets/imgs/default_doctor.jpg");

class AppointmentDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
    };
  }

  goToPage = (page) => {
    page === "back" ? this.props.navigation.pop() : console.log("this");
  };

  onCancel = async () => {
    const { route, navigation } = this.props;
    try {
      let formata = new FormData();
      formata.append("appointment_id", get(route, "params.item.id"));
      const response = await client.post(
        "/Common_API/cancelAppointmentV2",
        formata
      );
      // console.log("respomms", response);
      if (response.data.status == "success") {
        route.params.onReturn();
        navigation.goBack();
      }
    } catch (error) {}
  };

  render() {
    const { code, name, email, number, contact_no, loader } = this.state;
    const {
      route,
      appActions: { setDoctorDetail, onModifyItem },
      navigation,
    } = this.props;

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
          </View>
          <Body>
            <Title style={{ fontFamily: Fonts.SemiBold }}>
              My Appointments
            </Title>
          </Body>
        </Header>

        <View style={styles.container}>
          {/**********TOP CONTAINER ********/}

          <View style={{ flex: 1 }}>
            <View style={styles.doctor_conatiner}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: 50,
                    height: 50,
                  }}
                  source={defaultDoc}
                />
              </View>
              <View style={{ flex: 3 }}>
                <Text style={{ fontSize: 11, fontFamily: Fonts.SemiBold }}>
                  Appointment with{" "}
                  <Text style={{ fontSize: 12, fontFamily: Fonts.Bold }}>
                    Dr. {get(route, "params.item.doctor_name")}{" "}
                  </Text>
                </Text>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <Text
                    style={{ fontSize: 10, flex: 1, fontFamily: Fonts.Regular }}
                  >
                    {get(route, "params.item.clinic_name")}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Feather
                      name="check-circle"
                      style={[
                        {
                          fontSize: Platform.OS === "ios" ? 20 : 13,
                          color: colors.GREEN,
                          flex: 0.2,
                        },
                      ]}
                    />
                    <Text
                      style={{
                        fontSize: 10,
                        flex: 1,
                        fontFamily: Fonts.Regular,
                      }}
                    >
                      wishealth verified
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    color: colors.THEME_BLUE,
                    fontSize: 9,
                    fontFamily: Fonts.SemiBold,
                  }}
                >
                  22 years as Specialist
                </Text>
              </View>
            </View>
          </View>

          {/* /*********MIDDLE CONTAINER *********/}

          <View style={{ flex: 3 }}>
            <View style={{ backgroundColor: "#f8f8f8" }}>
              <View style={styles.text_container}>
                <Text style={styles.heading_text}>Date and Time</Text>
                <Text style={styles.value_text}>
                  {moment(get(route, "params.item.date2")).format("LLLL")}
                </Text>
                <View style={{ position: "absolute" }} />
              </View>
            </View>
            <View style={{ backgroundColor: "#f8f8f8", marginTop: 15 }}>
              <View style={styles.text_container}>
                <Text style={styles.heading_text}>Address</Text>
                <Text style={styles.value_text}>
                  {get(route, "params.item.address")}
                </Text>
              </View>
            </View>
            <View style={{ backgroundColor: "#f8f8f8", marginTop: 15 }}>
              <View style={styles.text_container}>
                <Text style={styles.heading_text}>Booking Details</Text>
                <Text style={styles.value_text}>
                  Appointment Id:{get(route, "params.item.id")}
                </Text>
                <Text style={styles.value_text}>
                  Appointment Type:{" "}
                  {get(route, "params.item.type", "OPD Consultation")}
                </Text>
              </View>
            </View>
            <View style={{ backgroundColor: "#f8f8f8", marginTop: 15 }}>
              <View style={styles.text_container}>
                <Text style={styles.heading_text}>
                  Booked For:{" "}
                  <Text style={{ fontSize: 11, fontWeight: "100" }}>
                    {get(route, "params.item.username")}
                  </Text>
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={this.onCancel}
            >
              <Text style={{ color: "white", fontSize: 14 }}> Cancel </Text>
            </TouchableOpacity>
          </View>
          {/*********  FOTTER COMPONENT ************/}
          <View
            style={{
              flex: 0.6,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.btn_container}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  data.doctor.type =
                    route.params.item.type == "clinic"
                      ? "clinical"
                      : route.params.item.type;
                  setDoctorDetail(route.params.item);
                  onModifyItem(true);
                  navigation.navigate("BookingSlots");
                }}
              >
                <Text style={{ color: "white" }}> MODIFY </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  appActions: bindActionCreators(appActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppointmentDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header_container: {
    height: 50,
    alignItems: "center",
    backgroundColor: colors.THEME_BLUE,
  },
  inner_header: {
    height: 80,
    width: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  header_btn: {
    textAlign: "left",
    position: "absolute",
    top: "20%",
    left: 0,
  },
  doctor_conatiner: {
    flexDirection: "row",
    marginLeft: 25,
    marginRight: 25,
    marginTop: 30,
    flex: 1,
  },
  field_conatiner: {
    flexDirection: "row",
    marginTop: 15,
  },
  alignStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  read_text: {
    fontSize: 11,
    color: colors.GREEN,
    textDecorationLine: "underline",
  },
  btn: {
    backgroundColor: colors.THEME_BLUE,
    width: 240,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  btn_container: {
    alignItems: "center",
  },
  text_container: {
    paddingTop: 10,
    paddingLeft: 30,
    paddingBottom: 10,
  },
  heading_text: {
    fontSize: 13,
    fontFamily: Fonts.Bold,
  },
  value_text: {
    fontSize: 11,
    marginTop: 5,
    fontFamily: Fonts.SemiBold,
  },
  cancelButton: {
    alignSelf: "flex-end",
    backgroundColor: colors.CANCEL,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginTop: 20,
    marginRight: 20,
  },
});
