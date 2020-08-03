import React from "react";
import { StyleSheet, View, TouchableOpacity, Image, Linking, Dimensions } from "react-native";
import {
  Button,
  Text,
  Icon,
  Header,
  Body,
  Title,
  Content,
  Container,
} from "native-base";
import { data } from "../../common/index";
import { showNotification, postApiRequest } from "../../common/user";
import Spinner from "react-native-loading-spinner-overlay";
import { colors } from "../../common/index";
import { connect } from "react-redux";
import get from "lodash.get";
import moment from "moment";
import RazorpayCheckout from "react-native-razorpay";
import Fonts from "../../common/fonts";

const defaultDoc = require("../../assets/imgs/default_doctor.jpg");
class BookingConfirmation extends React.Component {
  constructor(props) {
    super(props);
    const outerSize = 12;
    const innerSize = 5;
    const filterSize = 10;
    const customStyle = StyleSheet.create({
      _circleOuterStyle: {
        width: outerSize,
        height: outerSize,
        borderRadius: outerSize / 2,
        backgroundColor: colors.THEME_BLUE,
      },
      _circleFilterStyle: {
        width: filterSize,
        height: filterSize,
        borderRadius: filterSize / 2,
        backgroundColor: "#FFF",
      },
      _circleInnerStyle: {
        width: innerSize,
        height: innerSize,
        borderRadius: innerSize / 2,
        backgroundColor: colors.THEME_BLUE,
      },
    });

    this.state = {
      customStyle: customStyle,
      checked: false,
      appointment: props.route.params.appointment,
      loader: false,
    };
  }

  _renderInner() {
    return this.state.checked ? (
      <View style={this.state.customStyle._circleInnerStyle} />
    ) : (
      <View />
    );
  }
  _toogleCheckBox = () => {
    this.setState({ checked: !this.state.checked });
  };
  goToPage = (page) => {
    page == "back" ? this.props.navigation.pop() : console.log("this");
  };

  handleAppointment = async () => {
    const { userInfo, selectedDoctor, doctorData } = this.props;
    if (!this.state.checked) {
      showNotification("danger", data.ToastMessages.accept_condition);
    } else {
      let amount;
      // if (data.doctor.type != "clinical") {
      //   amount = Number(get(doctorData, "VideoDetails.fees", 0));
      // } else {
      //   amount = Number(get(selectedDoctor, "doc_fees", 0));
      // }
     amount =  get(selectedDoctor, "doc_fees", 0)
      console.log("fees doctor", amount);
      if (amount > 0) {
        this.makePayment(amount);
      } else {
        this.makeAppointment();
      }
    }
  };

  makeAppointment = (reciept, amount) => {
    const { userInfo, selectedDoctor, isModify, route } = this.props;
    this.setState({ loader: true });
    let formdata = new FormData();
    let user = userInfo;
    let type = data.doctor.type == "clinical" ? 1 : 2;
    formdata.append("user_id", user.id);
    formdata.append("patient_id", user.id);

    formdata.append("name", get(route, "params.patientInfo.name", ""));
    formdata.append("email", get(route, "params.patientInfo.email", ""));

    formdata.append("number", get(route, "params.patientInfo.number", ""));

    formdata.append("age", get(route, "params.patientInfo.age", ""));

    formdata.append("gender", get(route, "params.patientInfo.gender", ""));
    formdata.append("isFamily", get(route, "params.isFamily"));

    formdata.append(
      "doctor_id",
      selectedDoctor.doctor_id || selectedDoctor.user_id
    );
    formdata.append(
      "clinic_id",
      data.doctor.type == "clinical" ? selectedDoctor.clinic_id : "1"
    );
    formdata.append(
      "date",
      moment(this.state.appointment.dateToSend).format("YYYY-MM-DD")
    );
    formdata.append("time", this.state.appointment.time);
    formdata.append("type", type);
    formdata.append("amount", amount || 0);
    formdata.append("transaction_id", reciept);
    if (isModify) {
      formdata.append("appointment_id", selectedDoctor.id);
    }
    console.log("booking confirmation...", formdata);
    postApiRequest(data.api_endpoint.book_appointment, formdata).then(
      (data) => {
        console.log(data, "book_appointment");
        this.setState({ loader: false });
        if (data.status == "success") {
          showNotification("success", data.message);

          this.props.navigation.navigate("AppointInfo", {
            appointment: this.state.appointment,
            reciept,
            data: data,
            paymentDate: new Date(),
          });
        } else {
          showNotification("danger", data.message);
        }
      },
      (error) => {
        console.log(data, "data in promise");
        this.setState({ loader: false });
        console.log(error);
      }
    );
  };

  makePayment = (amount) => {
    const { userInfo } = this.props;
    var options = {
      description: "Credits towards consultation",
      image: "https://wishhealth.in/assets/images/logo.png",
      currency: "INR",
      key: "rzp_test_PfIQ0IKTLkjYap",
      amount: amount * 100,
      name: "Wish Health",
      prefill: {
        email: get(userInfo, "email", ""),
        contact: get(userInfo, "phone", ""),
        name: get(userInfo, "name", ""),
      },
      theme: { color: "#F37254" },
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        const reciept = get(data, "razorpay_payment_id", null);
        this.makeAppointment(reciept, amount);
        console.log("Respnse of success pay-----------", data);
        // handle success
      })
      .catch((error) => {
        console.log("error in pay--------------", error);
        showNotification("danger", error.description);
      });
  };

  render() {
    const { code, name, email, number, contact_no, loader } = this.state;
    const { selectedDoctor, userInfo } = this.props;

    return (
      <Container>
        <Spinner visible={this.state.loader} color={colors.THEME_BLUE} />
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
            <Title>
              {get(selectedDoctor, "doctor_name", "") ||
                get(selectedDoctor, "name", "")}
            </Title>
          </Body>
        </Header>

        <Content>
          <View style={styles.conatiner}>
            <View style={styles.progress_text_container}>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.labelText}>Avaliabilty</Text>
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.labelText}>Patient Info</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.labelText}>Confirm</Text>
              </View>
            </View>

            <View style={styles.progress_container}>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <View style={styles.MiddlecircleStyle} />
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: "center",
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
                <View style={styles.MiddlecircleStyle} />
              </View>

              <View
                style={[styles.leftBar, { borderTopColor: colors.SLOTS_BTN }]}
              />
              <View style={styles.rightBar} />
            </View>

            <View style={styles.doctor_conatiner}>
              <View style={{ flex: 1 }}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: 100,
                    height: 100,
                  }}
                  source={
                    selectedDoctor && selectedDoctor.profile_pic
                      ? { uri: selectedDoctor.profile_pic }
                      : defaultDoc
                  }
                />
              </View>
              <View style={{ flex: 2 }}>
                <Text style={{ fontSize: 15, fontFamily: Fonts.Bold }}>
                  {data.doctor.name}
                </Text>
                <Text style={{ fontSize: 12, fontFamily: Fonts.Regular }}>
                  {data.doctor.details.doctorsSpecialities &&
                  data.doctor.details.doctorsSpecialities.length > 0
                    ? data.doctor.details.doctorsSpecialities[0].title
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
            </View>
            <View style={{ backgroundColor: "#f8f8f8" }}>
              <View
                style={[
                  styles.text_container,
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  },
                ]}
              >
                <View>
                  <Text style={styles.heading_text}>Appointment Type</Text>

                  <Text style={styles.value_text}>
                    {data.doctor.type.charAt(0).toUpperCase() +
                      data.doctor.type.slice(1)}{" "}
                    Consutation
                  </Text>
                </View>

                <Icon
                  ios="ios-information"
                  android="ios-information"
                  style={[
                    {
                      fontSize: Platform.OS === "ios" ? 35 : 30,
                    },
                  ]}
                />
              </View>
            </View>
            <View style={{ backgroundColor: "#f8f8f8", marginTop: 15 }}>
              <View style={styles.text_container}>
                <Text style={styles.heading_text}>Consultation Fees</Text>
                <Text style={styles.value_text}>
                  {get(selectedDoctor, "doc_fees", 0)} INR
                </Text>
              </View>
            </View>
            <View style={{ backgroundColor: "#f8f8f8", marginTop: 15 }}>
              <View style={styles.text_container}>
                <Text style={styles.heading_text}>Payment Options</Text>
                <Text style={styles.bullet_operator}>
                  {"\u2B24"}{" "}
                  <Text style={{ fontSize: 12, fontFamily: Fonts.Regular }}>
                    {" "}
                    Paytm
                  </Text>{" "}
                </Text>
                <Text style={styles.bullet_operator}>
                  {"\u2B24"}{" "}
                  <Text style={{ fontSize: 12, fontFamily: Fonts.Regular }}>
                    {" "}
                    Credit/Debit Card
                  </Text>{" "}
                </Text>
                <Text style={styles.bullet_operator}>
                  {"\u2B24"}{" "}
                  <Text style={{ fontSize: 12, fontFamily: Fonts.Regular }}>
                    {" "}
                    Pay at Clinic
                  </Text>{" "}
                </Text>
              </View>
            </View>
            <View activeOpacity={1} style={{ marginLeft: 30, marginTop: 30 }}>
              <View style={[styles.checkBoxContainer]}>
                <TouchableOpacity
                  onPress={() => this._toogleCheckBox()}
                  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                  activeOpacity={0.7}
                  style={[
                    styles.alignStyle,
                    this.state.customStyle._circleOuterStyle,
                  ]}
                >
                  <View
                    style={[
                      styles.alignStyle,
                      this.state.customStyle._circleFilterStyle,
                    ]}
                  >
                    {this._renderInner()}
                  </View>
                </TouchableOpacity>
                <Text style={styles.checkBoxLabel}>
                  I accept terms and policies for wishhealth.Click here to{" "}
                  <Text onPress={null} style={styles.read_text} onPress={()=> Linking.openURL("https://uat.wishhealth.in/index/terms_condition")}>
                    read
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.btn_container}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this.handleAppointment()}
              >
                <Text style={{ color: "white", fontFamily: Fonts.Bold }}>
                  {" "}
                  CONFIRM{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.auth.user,
  selectedDoctor: state.app.selectedDoctor,
  isModify: state.app.isModify,
  doctorData: state.app.doctorData,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingConfirmation);

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
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    marginBottom: 10,
  },
  field_conatiner: {
    flexDirection: "row",
    marginTop: 15,
  },
  bullet_operator: {
    color: colors.THEME_BLUE,
    fontSize: 10,
    marginTop: 10,
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  alignStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  checkBoxLabel: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 11,
    fontFamily: Fonts.Regular,
  },
  read_text: {
    fontSize: 11,
    color: colors.GREEN,
    textDecorationLine: "underline",
    fontFamily: Fonts.Bold,
  },
  btn: {
    backgroundColor: colors.THEME_BLUE,
    width: 240,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  btn_container: {
    marginTop: 30,
    alignItems: "center",
  },
  text_container: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  heading_text: {
    fontSize: 13,
    fontFamily: Fonts.Bold,
  },
  value_text: {
    fontSize: 11,
    marginTop: 5,
    fontFamily: Fonts.Regular,
  },
  progress_container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
  },
  progress_text_container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
  },

  circleStyle: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: "#9c9c9c",
    borderColor: "#9c9c9c",
    borderWidth: 3,
    bottom: 2,
    zIndex: 2,
  },
  MiddlecircleStyle: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: colors.SLOTS_BTN,
    borderColor: colors.SLOTS_BTN,
    borderWidth: 3,
    bottom: 2,
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
    left: 20,
    right: Dimensions.get("window").width / 2.5,
    borderTopWidth: 3,
    borderTopColor: "#ebebe4",
    marginRight: 16 / 2 + 4,
  },
  rightBar: {
    position: "absolute",
    top: 16 / 2,
    right: 20,
    left: Dimensions.get("window").width / 2.5,
    borderTopWidth: 3,
    borderTopColor: colors.SLOTS_BTN,
    marginLeft: 16 / 2 + 4,
  },
  stepNum: {
    color: "black",
  },
});
