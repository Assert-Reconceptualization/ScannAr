import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import BusinessContext from '../applicationState/BusinessContext';
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const {
    name,
    email,
    password,
    phone,
    description
  } = useContext(BusinessContext).currentBusiness;

  // variables to hold form state
  const [businessName, setBusinessName] = useState(name);
  const [businessEmail, setBusinessEmail] = useState(email);
  const [businessPassword, setBusinessPassword] = useState(password);
  const [businessNumber, setBusinessNumber] = useState(phone);
  const [businessDescription, setBusinessDescription] = useState(description);
  const [editing, setEditing] = useState(false);

  const {
    container,
    titleContainer,
    titleText,
    contentContainer,
    subTitle,
    text,
    emailContainer,
    phoneContainer,
  } = styles;

  return (
    <View style={container}>
      <View style={titleContainer}>
        <Text style={titleText}>{businessName}</Text>
        <TouchableOpacity>
          <Ionicons
            name="ios-settings"
            size={40}
            style={{ color: '#EFF6E0' }}
          />
        </TouchableOpacity>
      </View>
      <View style={contentContainer}>
        <Text style={subTitle}>Description:</Text>
        <Text style={text}>{businessDescription}</Text>
        <View style={emailContainer}>
          <Text style={subTitle}>Email address</Text>
          <Text style={text}>{businessEmail}</Text>
        </View>
        <View style={phoneContainer}>
          <Text style={subTitle}>Phone number:</Text>
          <Text style={text}>{businessNumber}</Text>
        </View>
      </View>
    </View>
  );
}

SettingsScreen.navigationOptions = {
  title: 'Edit Business Profile',
  headerStyle: {
    backgroundColor: "#505950"
  },
  headerTintColor: "white"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
    backgroundColor: "#39403A"
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#EFF6E0'
  },
  contentContainer: {
    paddingTop: "5%"
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: "italic",
    color: '#EFF6E0',
    marginRight: 30
  },
  text: {
    fontSize: 15,
    color: '#99AC9B',
    marginBottom: 20
  },
  emailContainer: {
    flexDirection: "row",
    height: 50,
    alignItems: 'baseline'
  },
  phoneContainer: {
    flexDirection: "row",
    height: 50,
    alignItems: 'baseline'
  }
});
