import React from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { Text, Header, Body, Title, Icon } from "native-base";
import { colors, data } from "../../common/index";
import PastAppointmentsCard from "../../containers/PastAppointmentsCard";
import UpcomingAppointmentsCard from "../../containers/UpcomingAppointmentsCard";
import { client } from "../../services";
import { connect } from "react-redux";
import NoAppointContainer from "../../containers/NoAppointContainer";
import Loader from "../../containers/Loader";
import get from "lodash.get";
import { bindActionCreators } from "redux";
import { appActions } from "../../redux//actions/app";
import Fonts from "../../common/fonts";
import { AndroidBackHandler } from "../AndroidBackHandler";
import Quickblox from "../../common/Quickblox";

class MyAppointments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      starCount: 3.5,
      tab: "upcoming",
      pastData: [],
      upcomingdData: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getAppointments();
  }

  componentDidUpdate(prevProps) {
    const { appointmentType } = this.props;
    if (prevProps.appointmentType != appointmentType) {
      this.getAppointments();
    }
  }

  getAppointments = async () => {
    const { userInfo, appointmentType } = this.props;

    try {
      this.setState({ isLoading: true });
      let formdata = new FormData();
      formdata.append("user_id", get(userInfo, "id"));
      formdata.append("type", appointmentType);

      console.log("formdata appointments", formdata);

      let response = await client.post(`/Common_API/myAppointment`, formdata);
      this.setState({ isLoading: false });
      console.log("response appointments", response);
      if (response.data) {
        this.setState({
          pastData: response.data.past_appointments,
          upcomingdData: response.data.upcoming_appointments,
        });
      }
    } catch (error) {
      this.setState({ isLoading: false });
    }
  };

  tabNavigator = (tab) => {
    this.setState({ tab });
  };

  onReturn = () => {
    this.getAppointments();
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

  render() {
    const { tab, pastData, upcomingdData, isLoading } = this.state;
    const {
      navigation,
      userInfo,
      appActions: { setDoctorDetail, onModifyItem },
    } = this.props;

    return (
      <AndroidBackHandler onBackPress={this.goback}>
        <View style={styles.container}>
          <Header style={[styles.header_container]}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Icon
                ios="ios-menu"
                android="ios-menu"
                style={[
                  {
                    fontSize: Platform.OS === "ios" ? 35 : 30,
                    marginLeft: 15,
                    color: "#fff",
                    marginTop: 6,
                  },
                ]}
              />
            </TouchableOpacity>

            <Title style={{ fontFamily: Fonts.SemiBold }}>
              My Appointments
            </Title>
            <View />
          </Header>

          <View style={styles.content_container}>
            <View style={styles.tab_container}>
              <TouchableOpacity onPress={() => this.tabNavigator("upcoming")}>
                <Text
                  style={[
                    styles.tab_text,
                    {
                      color: tab == "upcoming" ? colors.GREEN_BTN : "black",
                      fontFamily: Fonts.Bold,
                      textDecorationLine:
                        tab == "upcoming" ? "underline" : "none",
                    },
                  ]}
                >
                  Upcoming Appointments
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.tabNavigator("past")}>
                <Text
                  style={[
                    styles.tab_text,
                    {
                      color: tab == "past" ? colors.GREEN_BTN : "black",
                      fontFamily: Fonts.Bold,
                      textDecorationLine: tab == "past" ? "underline" : "none",
                    },
                  ]}
                >
                  Past Appointments
                </Text>
              </TouchableOpacity>
            </View>

            {isLoading ? (
              <Loader />
            ) : (
              <View style={styles.appointment_container}>
                {tab == "past" ? (
                  <View style={{ flex: 1 }}>
                    <FlatList
                      data={pastData}
                      renderItem={({ item }) => (
                        <PastAppointmentsCard
                          navigation={navigation}
                          item={item}
                          onBookAgain={(item) => {
                            data.doctor.type =
                              item.type == "clinic" ? "clinical" : item.type;
                            setDoctorDetail(item);
                            onModifyItem(false);
                            navigation.navigate("BookingSlots");
                          }}
                        />
                      )}
                      keyExtractor={(_, index) => index.toString()}
                      ListEmptyComponent={() => (
                        <View style={{ height: 500 }}>
                          <NoAppointContainer />
                        </View>
                      )}
                    />
                  </View>
                ) : (
                  //  ***************** UPCOMING APPOINTMENT *******************
                  <View style={{ flex: 1 }}>
                    <FlatList
                      data={upcomingdData}
                      renderItem={({ item }) => (
                        <UpcomingAppointmentsCard
                          item={item}
                          navigation={navigation}
                          onPress={(item) =>
                            navigation.navigate("AppointmentDetails", {
                              item,
                              onReturn: () => this.onReturn(),
                            })
                          }
                          onModify={(item) => {
                            data.doctor.type =
                              item.type == "clinic" ? "clinical" : item.type;
                            onModifyItem(true);
                            setDoctorDetail(item);
                            navigation.navigate("BookingSlots");
                          }}
                          videoCallPress={(item) =>
                            Quickblox.videoCall(
                              parseInt(item.dr_q_id),
                              this.props,
                              item
                            )
                          }
                          isVideoCall={
                            this.props.appointmentType == 2 ? true : false
                          }
                        />
                      )}
                      keyExtractor={(_, index) => index.toString()}
                      ListEmptyComponent={() => (
                        <View style={{ height: 500 }}>
                          <NoAppointContainer />
                        </View>
                      )}
                    />
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </AndroidBackHandler>
    );
  }
}
const mapStateToProps = (state) => ({
  userInfo: state.auth.user,
  appointmentType: state.app.appointmentType,
});
const mapDispatchToProps = (dispatch) => ({
  appActions: bindActionCreators(appActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyAppointments);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  header_container: {
    height: 50,
    alignItems: "center",
    backgroundColor: colors.THEME_BLUE,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inner_header: {
    height: 80,
    width: 100,
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
  },
  header_btn: {
    textAlign: "left",
    position: "absolute",
    top: "20%",
    left: 0,
  },
  content_container: {
    flex: 1,
  },
  tab_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  tab_text: {
    fontSize: 14,
    marginVertical: 20,
  },
  appointment_container: {
    flex: 1,
    backgroundColor: "white",
  },
});
