import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "./styles";
import { colors } from "../../common";
import get from "lodash.get";
import moment from "moment";
import Fonts from "../../common/fonts";

const PastAppointmentsCard = ({ item, onBookAgain }) => {
  const defaultDoc = require("../../assets/imgs/default_doctor.jpg");
  return (
    <View style={{ marginVertical: 5 }}>
      <View style={styles.cardStyle}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            style={{
              width: 75,
              height: 75,
            }}
            source={defaultDoc}
          />
        </View>

        <View style={{ width: "75%" }}>
          <Text style={{ fontSize: 13, fontFamily: Fonts.SemiBold }}>
            Appointment with{" "}
            <Text style={{ fontSize: 14, fontFamily: Fonts.Bold }}>
              {get(item, "doctor_name", "")}
            </Text>
          </Text>

          {item.clinic_name ? (
            <View style={styles.rowContainer}>
              <FontAwesome
                name="hospital-o"
                color={colors.GREEN_BTN}
                size={18}
              />
              <Text style={styles.description_text}>
                {" "}
                {get(item, "clinic_name", "")}
              </Text>
            </View>
          ) : null}

          <View style={styles.rowContainer}>
            <AntDesign name="calendar" color={colors.GREEN_BTN} size={18} />
            <Text style={styles.description_text}>
              {moment(item.date2).format("LLL")}
            </Text>
          </View>

          <View style={styles.rowContainer}>
            <Feather name="phone-call" color={colors.GREEN_BTN} size={18} />
            <Text style={styles.description_text}>Call lasted 30 minutes</Text>
          </View>
        </View>
      </View>

      {/* Bottom */}
      <View style={styles.btn_container}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.btn_view,
            { borderRightWidth: 1, borderColor: colors.BORDER_COLOR },
          ]}
        >
          <Fontisto name="prescription" size={18} color={colors.THEME_BLUE} />
          <Text style={styles.btn_text}>Prescription</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btn_view,
            { borderRightWidth: 1, borderColor: colors.BORDER_COLOR },
          ]}
          activeOpacity={0.7}
          onPress={() => onBookAgain(item)}
        >
          <AntDesign name="book" size={18} color={colors.THEME_BLUE} />
          <Text style={styles.btn_text}>Book Again</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} style={styles.btn_view}>
          <AntDesign name="message1" size={18} color={colors.THEME_BLUE} />
          <Text style={styles.btn_text}>Give Feedback</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PastAppointmentsCard;
