import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import get from "lodash.get";
import moment from "moment";
import Fonts from "../../common/fonts";

const UpcomingAppointmentsCard = ({
  item,
  onPress,
  onModify,
  videoCallPress,
  isVideoCall,
}) => {
  const defaultDoc = require("../../assets/imgs/default_doctor.jpg");
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(item)}
      style={styles.cardStyle}
    >
      <View style={{ width: "25%" }}>
        <Image
          resizeMode="contain"
          style={{ width: 60, height: 60 }}
          source={defaultDoc}
        />
      </View>

      <View style={{ width: "75%" }}>
        <Text style={{ fontSize: 11, fontFamily: Fonts.SemiBold }}>
          Appointment with{" "}
          <Text style={{ fontSize: 12, fontFamily: Fonts.Bold }}>
            {get(item, "doctor_name", "")}
          </Text>
        </Text>
        <Text style={styles.description_text}>
          {get(item, "clinic_name", "")}
        </Text>
        <Text style={styles.description_text}>
          {moment(item.date2).format("LLL")}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 8,
          }}
        >
          <TouchableOpacity
            style={[styles.modify_btn]}
            onPress={() => onModify(item)}
          >
            <Text style={styles.modifyText}>Modify</Text>
          </TouchableOpacity>
          {isVideoCall ? (
            <TouchableOpacity
              style={[styles.modify_btn, { marginLeft: 10 }]}
              onPress={() => videoCallPress(item)}
            >
              <Text style={styles.modifyText}>Video Call </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UpcomingAppointmentsCard;
