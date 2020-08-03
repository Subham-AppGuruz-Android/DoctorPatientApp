import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../common/index";
import { Icon, Footer } from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import { showNotification, postApiRequest } from "../../common/user";
import { data } from "../../common/index";
import { ProgressBar, Colors } from "react-native-paper";
import * as session from "../../services/session";
import { connect } from "react-redux";
import { actions as authActions } from "../../redux/actions/auth";
import { bindActionCreators } from "redux";
import get from "lodash.get";
import { client } from "../../services/index";
import Quickblox from "../../common/Quickblox";

class OtpVerify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "+1",
      name: "",
      email: "",
      number: "",
      timer: 60,
      timerinterval: "",
      loader: false,
      ProgressBar: 0,
      userData: this.props.route.params.user_id,
    };
    console.log(this.props.route.params.user_id, "user_id");
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.state.timerinterval);
  }

  goBack = () => {
    this.props.navigation.popToTop();
  };

  resendOtp = () => {
    this.setState({ loader: true, timer: 60, ProgressBar: 0 });
    clearInterval(this.state.timerinterval);
    let formdata = new FormData();
    formdata.append("user_id", this.state.userData.user_id);
    formdata.append("name", this.state.userData.name);
    formdata.append("phone", this.state.userData.phone);

    postApiRequest(data.api_endpoint.resend_otp, formdata).then(
      (data) => {
        this.startTimer();
        this.setState({ loader: false });
        console.log(data, "data in promise");
      },
      (error) => {
        this.setState({ loader: false });
      }
    );
  };

  verifyOtp = () => {
    const {
      authActions: { setUserDetail },
      route,
      navigation,
    } = this.props;
    this.setState({ loader: true });
    console.log(this.state.number, this.state.userData.user_id);
    let formdata = new FormData();
    formdata.append("otp", this.state.number);
    formdata.append("user_id", this.state.userData.user_id);

    client.post(data.api_endpoint.otp_verify_signup, formdata).then(
      (data) => {
        console.log("dataaa from verify", data);

        this.setState({ loader: false });
        if (data.data == 0) {
          showNotification("danger", "Incorrect one time password");
        } else {
          console.log("Data------------", data.data);
          const user = get(data, "data", null);
          if (user) {
            Quickblox.login(user);
          }

          setUserDetail(data.data);
          if (get(route, "params.previousRoute")) {
            if (get(route, "params.previousRoute") === "drawer") {
              navigation.popToTop();
            } else {
              navigation.navigate(get(route, "params.previousRoute"), {
                fromVerify: true,
              });
            }
          }
          // else {
          //   this.props.navigation.navigate("DoctorProfile", {
          //     userData: data,
          //     fromVerify: true,
          //     doctorDetails: get(route, "params.doctorDetails", null),
          //   });
          // }
        }
        console.log(data, "data in promise");
      },
      (error) => {
        console.log(60, error);

        this.setState({ loader: false });
      }
    );
    //
  };

  startTimer = () => {
    this.state.timerinterval = setInterval(() => {
      let time = this.state.timer - 1;
      time < 10 ? "0" + time : time;
      this.setState(
        { timer: time, ProgressBar: this.state.ProgressBar + 0.01666666666667 },
        () => {
          if (this.state.timer == 0) {
            clearInterval(this.state.timerinterval);
          }
        }
      );
    }, 1000);
  };

  verifyLoginOtp = () => {
    const {
      authActions: { setUserDetail },
      route,
      navigation,
    } = this.props;
    this.setState({ loader: true });
    console.log(this.state.number, this.state.userData.user_id);
    let formdata = new FormData();
    formdata.append("otp", this.state.number);
    formdata.append("user_id", this.state.userData.user_id);

    postApiRequest(data.api_endpoint.otp_verify, formdata).then(
      (data) => {
        console.log("verifyLoginOtp", data);

        this.setState({ loader: false });
        if (data.status) {
          setUserDetail(this.state.userData);
          Quickblox.login(this.state.userData);

          // session.setUser(data);

          if (get(route, "params.previousRoute")) {
            if (get(route, "params.previousRoute") === "drawer") {
              navigation.popToTop();
            } else {
              navigation.navigate(get(route, "params.previousRoute"), {
                fromVerify: true,
              });
            }
          }
          // else {
          //   this.props.navigation.navigate("DoctorProfile", {
          //     userData: data,
          //     fromVerify: true,
          //     doctorDetails: get(route, "params.doctorDetails", null),
          //   });
          // }
        } else {
          showNotification("danger", data.message);
        }
        console.log(data, "data in promise");
      },
      (error) => {
        console.log(5, error, error.response);

        this.setState({ loader: false });
      }
    );
  };

  render() {
    const { code, name, email, number, contact_no, loader, timer } = this.state;
    const { route } = this.props;

    return (
      <View style={styles.container}>
        {/*  */}
        <Spinner visible={this.state.loader} color={colors.THEME_BLUE} />
        <View
          style={{ justifyContent: "flex-end", alignItems: "center", flex: 1 }}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Verify Otp</Text>
          <Text style={{ fontSize: 10 }}>
            You'll receive 5 digit number on registered phone number
          </Text>
        </View>

        <View style={{ flex: 2, paddingTop: 40 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 2, alignItems: "center" }}>
              <Text style={{}}>Enter Here</Text>
            </View>
            <View style={{ flex: 3 }}>
              <TextInput
                keyboardType={"numeric"}
                style={{ borderBottomWidth: 1, width: 200 }}
                placeholder="Otp"
                placeholderTextColor="gray"
                value={number}
                onChangeText={(text) => this.setState({ number: text })}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <ProgressBar
              style={{ width: 220 }}
              progress={this.state.ProgressBar}
              color={colors.THEME_BLUE}
            />
            <Text style={{ marginLeft: 10 }}>00:{this.state.timer}</Text>
          </View>
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <TouchableOpacity
              style={[
                styles.resend_btn,
                {
                  backgroundColor:
                    timer == 0 ? colors.GREEN_BTN : colors.CANCEL,
                },
              ]}
              onPress={() => this.resendOtp()}
              disabled={timer == 0 ? false : true}
            >
              <Text style={styles.loginText}>Resend Otp</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{ justifyContent: "flex-end", alignItems: "center", flex: 1 }}
        >
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              get(route, "params.isVerified")
                ? this.verifyLoginOtp()
                : this.verifyOtp();
            }}
          >
            <Text style={styles.loginText}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.loginBtn, { marginTop: 5 }]}
            onPress={() => this.goBack()}
          >
            <Text style={styles.loginText}>Back to home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OtpVerify);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  inputView: {
    height: 50,
    justifyContent: "center",
    padding: 1,
    marginLeft: 50,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginHorizontal: 3,
  },
  inputText: {
    fontSize: 18,
  },

  loginBtn: {
    width: "80%",
    backgroundColor: colors.THEME_BLUE,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    bottom: 10,
  },
  resend_btn: {
    width: "30%",
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: "white",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  code: {
    width: 100,
    paddingRight: 20,
  },
  phone: {
    width: 200,
  },
  row: {
    flexDirection: "row",
  },
});
