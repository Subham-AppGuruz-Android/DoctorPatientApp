import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
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
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { showNotification } from "../../common/user";
import { colors, data } from "../../common/index";
import { connect } from "react-redux";
import get from "lodash.get";
import { client } from "../../services";
import Fonts from "../../common/fonts";
import { appActions } from "../../redux/actions/app";
import { bindActionCreators } from "redux";
import { AndroidBackHandler } from "../AndroidBackHandler";
import Spinner from "react-native-loading-spinner-overlay";

class BookingSlots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
      date: new Date(),
      mode: "date",
      dateText: moment().format("DD-MMM-YYYY"),
      dateToShow: "",
      timeslot: "",
      day: "",
      clinics: [],
      selectedClinic: { name: "Select Clinic" },
      toggleClinic: false,
      loader: false,
      timeSlots: [],
      bookedSlots: [],
      previousSlots: [],
    };
  }

  componentDidMount() {
    if (data.doctor.type == "clinical") {
      this.getDoctorInfo();
    } else {
      this.getSlots();
    }

    this.handleDate();
  }

  componentDidCatch(error) {
    console.log("err>>>>>>>", error);
  }

  getDoctorInfo = async () => {
    const {
      selectedDoctor,
      appActions: { setDoctorDetail },
      route,
    } = this.props;

    this.setState({ loader: true });

    console.log("setDoctorDetail", selectedDoctor);

    try {
      const response = await client.get(
        `/Common_API/doctorsallClinics/${selectedDoctor.doctor_id ||
          selectedDoctor.user_id}`
      );
      console.log("response", response);

      if (response.data.response && response.data.response.length) {
        let preSelctedClinicId = response.data.response.find(
          (e) => e.clinic_id == selectedDoctor.clinic_id
        );

        // console.log("preSelctedClinicId", preSelctedClinicId);

        let details = selectedDoctor;
        details["clinic_id"] = preSelctedClinicId
          ? preSelctedClinicId.clinic_id
          : response.data.response[0].clinic_id;
        setDoctorDetail(details);

        this.setState(
          {
            clinics: response.data.response,
            selectedClinic: preSelctedClinicId
              ? preSelctedClinicId
              : response.data.response[0],
          },
          () => this.getSlots()
        );
      }
      this.setState({ loader: false });
    } catch (error) {
      this.setState({ loader: false });
    }
  };

  getSlots = async () => {
    const { selectedDoctor } = this.props;
    const { selectedClinic, dateText } = this.state;
    this.setState({ loader: true });

    try {
      let formData = new FormData();

      formData.append(
        "clinic_id",
        data.doctor.type == "clinical" ? selectedClinic.clinic_id : "1"
      );
      formData.append(
        "doctor_id",
        selectedDoctor.doctor_id || selectedDoctor.user_id
      );

      console.log("formData>??????????", formData);

      const response = await client.post("/Common_API/getSlots", formData);
      console.log("slots response>>>>>>>>>", response);
      if (response.data.availability) {
        if (dateText !== "Select Date") {
          let weekNumber = new Date(dateText).getDay();
          weekNumber = weekNumber == 0 ? 7 : weekNumber;

          let slots = Object.keys(response.data.availability).find(
            (e) => e == weekNumber
          );

          let timeSlots = !slots
            ? []
            : response.data.availability[slots].split(",").slice(1);
          let bookedSlots = [],
            previousSlots = [];

          if (dateText == moment().format("DD-MMM-YYYY")) {
            previousSlots = timeSlots.filter((e) => {
              return moment().format("HH:mm") > convertTime12to24(e);
            });
          }

          if (response.data.booked_slots && response.data.booked_slots.length) {
            response.data.booked_slots.forEach((element) => {
              if (element.date == dateText) {
                bookedSlots.push(element.time);
              }
            });
          }

          this.setState({
            timeSlots: timeSlots || [],
            bookedSlots,
            previousSlots,
          });
        }

        // else {
        //   let weekNumber = new Date().getDay();
        //   weekNumber = weekNumber == 0 ? 7 : weekNumber;
        //   let slots = Object.keys(response.data.availability).find(
        //     (e) => e == weekNumber
        //   );

        //   this.setState({
        //     timeSlots: response.data.availability[slots].split(",").slice(1),
        //     dateText: moment().format("DD-MMM-YYYY"),
        //   });
        // }
      }

      this.setState({ loader: false });
    } catch (error) {
      this.setState({ loader: false });
    }
  };

  handleDate = () => {
    const { isModify, selectedDoctor } = this.props;

    if (isModify) {
      let day = moment(selectedDoctor.date).format("dddd");
      let dateToShow = moment(selectedDoctor.date).format("MMMM DD YYYY");

      this.setState({
        dateText: selectedDoctor.date,
        dateToShow,
        day,
        timeslot: selectedDoctor.time,
      });
    }
  };

  onChange = (date, item) => {
    let formattedDate = moment(item).format("DD-MMM-YYYY");
    let dateToShow = moment(item).format("MMMM DD YYYY");
    let day = moment(item).format("dddd");
    console.log(dateToShow, "datto show");
    this.setState(
      {
        dateText: formattedDate,
        showPicker: false,
        dateToShow: dateToShow,
        day: day,
        date: item,
      },
      () => this.getSlots()
    );
  };

  goback = () => {
    const { route, navigation } = this.props;
    if (get(route, "params.fromVerify")) {
      navigation.pop(3);
    } else {
      this.props.navigation.pop();
    }
    return true;
  };

  setTime = (time) => {
    this.setState({ timeslot: time });
  };

  goToPage = (time) => {
    const {} = this.props;
    if (this.state.dateText == "Select Date") {
      showNotification("danger", "Please select a date.");
    } else if (!this.state.timeslot) {
      showNotification("danger", "Please select a timeslot.");
    } else {
      this.props.navigation.navigate("PatientInfo", {
        appointment: {
          date: this.state.dateToShow,
          time: this.state.timeslot,
          day: this.state.day,
          dateToSend: this.state.dateText,
        },
      });
    }
  };

  openPicker = () => {
    this.setState({ showPicker: true });
  };

  renderClinic = ({ item }) => {
    const {
      selectedDoctor,
      appActions: { setDoctorDetail },
      route,
    } = this.props;

    return (
      <TouchableOpacity
        onPress={() => {
          let details = selectedDoctor;
          details["clinic_id"] = item.clinic_id;
          setDoctorDetail(details);
          this.setState(
            {
              selectedClinic: item,
              toggleClinic: !this.state.toggleClinic,
            },
            () => this.getSlots()
          );
        }}
        style={styles.clinicContainer}
      >
        <Text style={styles.clinicText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  renderTimeSlots = ({ item }) => {
    const { timeslot, bookedSlots, previousSlots } = this.state;
    return (
      <TouchableOpacity
        disabled={
          previousSlots.includes(item)
            ? true
            : bookedSlots.includes(item)
            ? true
            : false
        }
        onPress={() => this.setTime(item)}
        style={[
          styles.slotContainer,
          {
            backgroundColor:
              timeslot == item
                ? colors.THEME_BLUE
                : previousSlots.includes(item)
                ? colors.CANCEL
                : bookedSlots.includes(item)
                ? "#d04848"
                : colors.SLOTS_BTN,
          },
        ]}
      >
        <Text style={styles.slotText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {
      clinics,
      toggleClinic,
      dateText,
      timeSlots,
      bookedSlots,
      previousSlots,
      loader,
      timeslot,
    } = this.state;
    const { selectedDoctor, route } = this.props;

    return (
      <AndroidBackHandler onBackPress={this.goback}>
        <Container>
          <Spinner visible={loader} color={colors.THEME_BLUE} />
          <Header style={[styles.header_container]}>
            <View
              style={[
                styles.inner_header,
                { marginTop: Platform.OS === "ios" ? 0 : 10 },
              ]}
            >
              <Button transparent style={[styles.header_btn, {}]}>
                <TouchableOpacity onPress={() => this.goback()}>
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
                  <Text style={styles.labelText}>Availability</Text>
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
                  <View
                    style={
                      timeslot ? styles.MiddlecircleStyle : styles.circleStyle
                    }
                  />
                </View>

                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View style={styles.circleStyle} />
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

                <View
                  style={[
                    styles.leftBar,
                    { borderTopColor: timeslot ? colors.SLOTS_BTN : "#ebebe4" },
                  ]}
                />
                <View style={styles.rightBar} />
              </View>

              {this.state.showPicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  timeZoneOffsetInMinutes={0}
                  format="DD-MM-YYYY"
                  value={this.state.date}
                  mode={this.state.mode}
                  is24Hour={false}
                  display="default"
                  minimumDate={new Date()}
                  onChange={(date, item) => {
                    if (date.type != "dismissed") {
                      this.onChange(date, item);
                    }
                  }}
                />
              )}

              <TouchableOpacity
                onPress={() => {
                  this.openPicker();
                }}
                style={styles.buttonContainer}
              >
                <View style={{ padding: 10, flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.buttonText}>{this.state.dateText}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Icon
                      ios="ios-arrow-down"
                      android="ios-arrow-down"
                      style={[
                        {
                          fontSize: Platform.OS === "ios" ? 25 : 20,
                          alignSelf: "flex-end",
                          color: "#fff",
                        },
                      ]}
                    />
                  </View>
                </View>
              </TouchableOpacity>

              {data.doctor.type == "clinical" && (
                <TouchableOpacity
                  onPress={() => this.setState({ toggleClinic: !toggleClinic })}
                  style={[styles.buttonContainer, { marginTop: 15 }]}
                >
                  <View style={{ padding: 10, flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.buttonText}>
                        {this.state.selectedClinic.name}
                      </Text>
                    </View>
                    <Icon
                      ios="ios-arrow-down"
                      android="ios-arrow-down"
                      style={[
                        {
                          fontSize: Platform.OS === "ios" ? 25 : 20,
                          alignSelf: "flex-end",
                          color: "#fff",
                        },
                      ]}
                    />
                  </View>
                </TouchableOpacity>
              )}

              {toggleClinic && (
                <FlatList
                  style={{ maxHeight: 120, paddingHorizontal: 30 }}
                  data={clinics}
                  renderItem={this.renderClinic}
                  keyExtractor={(_, index) => index.toString()}
                  ItemSeparatorComponent={() => (
                    <View
                      style={{
                        height: 1,
                        backgroundColor: "#a6a6a6",
                        width: "100%",
                      }}
                    />
                  )}
                />
              )}

              <Text
                style={{
                  marginLeft: 30,
                  marginVertical: 10,
                  fontFamily: Fonts.SemiBold,
                }}
              >
                Morning Slots
              </Text>

              <FlatList
                style={{ paddingHorizontal: 30 }}
                numColumns={3}
                data={timeSlots.filter((e) => e.includes("AM"))}
                renderItem={this.renderTimeSlots}
                keyExtractor={(_, index) => index.toString()}
                ListEmptyComponent={() => (
                  <Text style={styles.emptySlots}>No Slots Found</Text>
                )}
              />

              <View
                style={{
                  height: 1,
                  width: "80%",
                  alignSelf: "center",
                  backgroundColor: "#d2d2d2",
                  marginTop: 20,
                  marginBottom: 5,
                }}
              />

              <Text
                style={{
                  marginLeft: 30,
                  marginVertical: 10,
                  fontFamily: Fonts.SemiBold,
                }}
              >
                Afternoon Slots
              </Text>
              <FlatList
                style={{ paddingLeft: 30, paddingRight: 30 }}
                numColumns={3}
                data={timeSlots.filter(
                  (e) =>
                    convertTime12to24(e) >= "12:00" &&
                    convertTime12to24(e) <= "16:00"
                )}
                renderItem={this.renderTimeSlots}
                keyExtractor={(_, index) => index.toString()}
                ListEmptyComponent={() => (
                  <Text style={styles.emptySlots}>No Slots Found</Text>
                )}
              />

              <View
                style={{
                  height: 1,
                  width: "80%",
                  alignSelf: "center",
                  backgroundColor: "#d2d2d2",
                  marginTop: 20,
                  marginBottom: 5,
                }}
              />

              <Text
                style={{
                  marginLeft: 30,
                  marginVertical: 10,
                  fontFamily: Fonts.SemiBold,
                }}
              >
                Evening Slots
              </Text>
              <FlatList
                style={{ paddingLeft: 30, paddingRight: 30 }}
                numColumns={3}
                data={timeSlots.filter(
                  (e) => convertTime12to24(e) > "16:00" && e.includes("PM")
                )}
                renderItem={this.renderTimeSlots}
                keyExtractor={(_, index) => index.toString()}
                ListEmptyComponent={() => (
                  <Text style={styles.emptySlots}>No Slots Found</Text>
                )}
              />
            </View>
          </Content>
          <TouchableOpacity
            style={{
              backgroundColor: colors.THEME_BLUE,
              width: "60%",
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 20,
              alignSelf: "center",
            }}
            onPress={() => {
              this.goToPage();
            }}
          >
            <Text style={{ color: "white", fontFamily: Fonts.Bold }}>
              Book Appointment
            </Text>
          </TouchableOpacity>
        </Container>
      </AndroidBackHandler>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.auth.user,
  selectedDoctor: state.app.selectedDoctor,
  isModify: state.app.isModify,
});
const mapDispatchToProps = (dispatch) => ({
  appActions: bindActionCreators(appActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingSlots);

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
  cancel_btn: {
    width: 80,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  cancel_btn_container: { flex: 1 },
  slot_conatiner: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
    borderBottomWidth: 1,
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
    bottom: 1,
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
    overflow: "hidden",
  },
  circleText: {
    alignSelf: "center",
    top: 20 / 3,
  },
  labelText: {
    fontSize: 12,
    fontFamily: Fonts.Bold,
  },
  leftBar: {
    position: "absolute",
    top: 20 / 2.22,
    left: 20,
    // right: 148,
    right: Dimensions.get("window").width / 2.5 ,
    borderTopWidth: 3,
    borderTopColor: colors.SLOTS_BTN,
    marginRight: 16 / 2 + 4,
  },
  rightBar: {
    position: "absolute",
    top: 16 / 2,
    right: 20,
    left: Dimensions.get("window").width / 2.5,
    borderTopWidth: 3,
    borderTopColor: "#ebebe4",
    marginLeft: 16 / 2 + 4,
  },
  stepNum: {
    color: "black",
  },
  buttonContainer: {
    backgroundColor: colors.THEME_BLUE,
    marginHorizontal: 30,
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontFamily: Fonts.SemiBold,
  },
  clinicContainer: {
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "#f2f2f2",
  },
  clinicText: {
    fontSize: 14,
    color: "#000",
    fontFamily: Fonts.Regular,
  },
  slotText: {
    fontSize: 14,
    color: "#fff",
    fontFamily: Fonts.SemiBold,
  },
  slotContainer: {
    width: "30%",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.SLOTS_BTN,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  emptySlots: {
    fontFamily: Fonts.Bold,
    marginVertical: 10,
    alignSelf: "center",
  },
});

const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(" ");

  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }

  if (hours.length == 1) {
    hours = `0${hours}`;
  }

  return `${hours}:${minutes}`;
};
