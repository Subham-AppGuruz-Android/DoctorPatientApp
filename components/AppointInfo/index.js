import React, { Component } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import styles from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import { CommonActions } from "@react-navigation/native";
import { connect } from "react-redux";
import get from "lodash.get";
import { data } from "../../common";
import { appActions } from "../../redux/actions/app";
import { bindActionCreators } from "redux";
import { AndroidBackHandler } from "../AndroidBackHandler";
import moment from "moment";

class AppointInfo extends Component {
  resetStack = () => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
    this.props.navigation.dispatch(resetAction);
  };

  goback = () => {
    return true;
  };

  render() {
    const { route, selectedDoctor, navigation, appActions } = this.props;
    const { setAppointmentType } = appActions;
    return (
      <AndroidBackHandler onBackPress={this.goback}>
        <View style={styles.container}>
          <ImageBackground
            resizeMode="cover"
            style={styles.upperContainer}
            source={require("../../assets/imgs/1.jpg")}
          >
            <AntDesign name="checkcircleo" size={50} color={"#fff"} />
            <Text style={styles.bookingConfirm}>
              Your Booking is confirmed with
            </Text>
            <Text style={styles.bookingConfirm}>
              {get(selectedDoctor, "prefix", "")}{" "}
              {get(selectedDoctor, "name", "")}
            </Text>
          </ImageBackground>

          {/* Bottom Container */}

          <View style={styles.bottomContainer}>
            <View>
              <Text style={[styles.transactionText, { marginTop: "2%" }]}>
                A Payment of {get(selectedDoctor, "doc_fees", 0)} INR has been
                made succesfully at{" "}
                {moment(get(route, "params.paymentDate", "")).format("hh:mm A")}
                {/* {get(route, "params.appointment.time", "")} */}
              </Text>
              <Text style={styles.transactionText}>
                Your transaction id {get(route, "params.reciept", "")}
              </Text>

              <View style={[styles.bookingContainer, { marginTop: "8%" }]}>
                <Text style={styles.bookingHeaderText}>Booking Id:</Text>
                <Text style={styles.bookingText}>
                  {get(route, "params.data.booking_id", "")}
                </Text>
              </View>
              <View style={styles.bookingContainer}>
                <Text style={styles.bookingHeaderText}>Date and Time:</Text>
                <Text style={styles.bookingText}>
                  {/* {moment(get(route, "params.paymentDate", "")).format(
                    "hh:mm A"
                  )}
                  ,{" "}
                  {moment(get(route, "params.paymentDate", "")).format(
                    "DD-MMM-YYYY"
                  )} */}
                  {route.params.appointment.date ? moment(get(route, "params.appointment.date", "")).format("MMMM D, YYYY") +
                  " " +
                  get(route, "params.appointment.time", "")
                   :
                    moment(get(route, "params.appointment.dateToSend", "")).format("MMMM D, YYYY") +
                      " " +
                      get(route, "params.appointment.time", "")}
                        {/* " " +
                    get(route, "params.appointment.time", "") */}
                </Text>
              </View>
              <View style={styles.bookingContainer}>
                <Text style={styles.bookingHeaderText}>Appointment Type:</Text>
                <Text style={styles.bookingText}>
                  {data.doctor.type == "clinical"
                    ? "Clinical Consultaion"
                    : "Video Consultation"}
                </Text>
              </View>

              <Text style={styles.loremText}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Text>
            </View>

            {/* Bottom Button Cnntainer */}

            <View style={styles.bottomButtonContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.homeContainer}
                onPress={this.resetStack}
              >
                <Text style={styles.homeText}>HOME</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.homeContainer}
                onPress={() => {
                  setAppointmentType(data.doctor.type == "clinical" ? 1 : 2);
                  navigation.navigate("MyAppointments");
                }}
              >
                <Text style={styles.homeText}>VIEW APPOINTMENTS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </AndroidBackHandler>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.auth.user,
  selectedDoctor: state.app.selectedDoctor,
  doctorData: state.app.doctorData,
});

const mapDispatchToProps = (dispatch) => ({
  appActions: bindActionCreators(appActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppointInfo);
