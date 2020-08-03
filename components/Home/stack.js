import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, View, TouchableOpacity } from "react-native";

import HomeScreen from "../HomeScreen";
import DoctorProfile from "../DoctorProfile";
import DoctorReview from "../DoctorReview";
import BookingSlots from "../BookingSlots";
import Signup from "../Signup";
import OtpVerify from "../OtpVerify";
import PatientInfo from "../PatientInfo";
import BookingConfirmation from "../BookingConfirmation";
import MyAppointments from "../MyAppointments";
import AppointmentDetails from "../AppointmentDetails";
import Payments from "../Payments";
import Prescription from "../Prescription";
import Help from "../Help";
import Settings from "../Settings";
import Blogs from "../Blogs";
import BlogDetails from "../BlogDetails";
import RateApp from "../RateApp";
import ReferDoctor from "../ReferDoctor";
import ReferForm from "../ReferForm";
import Chat from "../ReferForm";
import VideoCall from "../VideoCall";
import { JoinUs } from "../JoinUs";
import AppointInfo from "../AppointInfo";
import Prescription_Detail from "../Prescription/PrescriptionDetails";
import MyDoctor from "../MyDoctor";

const Stack = createStackNavigator();

export const FeedStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: "Twitter" }}
      />
      <Stack.Screen
        name="DoctorProfile"
        component={DoctorProfile}
        options={{ headerTitle: "DoctorProfile" }}
      />
      <Stack.Screen
        name="DoctorReview"
        component={DoctorReview}
        options={{ headerTitle: "DoctorReview" }}
      />
      <Stack.Screen
        name="BookingSlots"
        component={BookingSlots}
        options={{ headerTitle: "BookingSlots" }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerTitle: "Signup" }}
      />
      <Stack.Screen
        name="OtpVerify"
        component={OtpVerify}
        options={{ headerTitle: "OtpVerify" }}
      />
      <Stack.Screen
        name="PatientInfo"
        component={PatientInfo}
        options={{ headerTitle: "PatientInfo" }}
      />
      <Stack.Screen
        name="BookingConfirmation"
        component={BookingConfirmation}
        options={{ headerTitle: "BookingConfirmation" }}
      />
      <Stack.Screen
        name="MyAppointments"
        component={MyAppointments}
        options={{ headerTitle: "MyAppointments" }}
      />
       <Stack.Screen
        name="MyDoctor"
        component={MyDoctor}
        options={{ headerTitle: "MyDoctor" }}
      />
      <Stack.Screen
        name="AppointmentDetails"
        component={AppointmentDetails}
        options={{ headerTitle: "AppointmentDetails" }}
      />
      <Stack.Screen
        name="Payments"
        component={Payments}
        options={{ headerTitle: "Payments" }}
      />
      <Stack.Screen
        name="Prescription"
        component={Prescription}
        options={{ headerTitle: "Prescription" }}
      />
       <Stack.Screen
        name="Prescription_Detail"
        component={Prescription_Detail}
        options={{ headerTitle: "Prescription Detail" }}
      />
      <Stack.Screen
        name="Help"
        component={Help}
        options={{ headerTitle: "Help" }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerTitle: "Settings" }}
      />
      <Stack.Screen
        name="Blogs"
        component={Blogs}
        options={{ headerTitle: "Blogs" }}
      />
      <Stack.Screen
        name="BlogDetails"
        component={BlogDetails}
        options={{ headerTitle: "BlogDetails" }}
      />
      <Stack.Screen
        name="RateApp"
        component={RateApp}
        options={{ headerTitle: "RateApp" }}
      />
      <Stack.Screen
        name="ReferDoctor"
        component={ReferDoctor}
        options={{ headerTitle: "ReferDoctor" }}
      />
      <Stack.Screen
        name="ReferForm"
        component={ReferForm}
        options={{ headerTitle: "ReferForm" }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerTitle: "Chat" }}
      />
      <Stack.Screen name="VideoCall" component={VideoCall} />
      <Stack.Screen name="JoinUs" component={JoinUs} />
      <Stack.Screen name="AppointInfo" component={AppointInfo} />
    </Stack.Navigator>
  );
};
