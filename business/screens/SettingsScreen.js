/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActionSheetIOS,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BusinessContext from '../applicationState/BusinessContext';
import EditProfileModal from '../components/EditProfileModal';
import HomeScreenHeader from '../components/HomeScreenHeader';

const defaultImageUrl = require('../assets/images/business-default.jpg');

export default function SettingsScreen(props) {
  const {
    name,
    email,
    phone,
    description,
  } = useContext(BusinessContext).currentBusiness;

  const { setAccessToken } = useContext(BusinessContext);

  const [editing, setEditing] = useState(false);

  const showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Edit Profile', 'Logout', 'Cancel'],
        tintColor: '#1E241F',
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) { // upon logout
          setAccessToken(null);
          props.navigation.navigate({ routeName: 'Auth' });
        }
        if (buttonIndex === 0) {
          showEditModal();
        }
      },
    );
  };

  const showEditModal = () => {
    setEditing(true);
  };

  const {
    container,
    titleContainer,
    titleText,
    contentContainer,
    subTitle,
    text,
    emailContainer,
    phoneContainer,
    imageContainer,
    defaultImage,
  } = styles;

  return (
    <View style={container}>
      <EditProfileModal
        visible={editing}
        closeModal={setEditing}
      />
      <View style={titleContainer}>
        <Text style={titleText}>{name}</Text>
        <TouchableOpacity onPress={showActionSheet}>
          <Ionicons
            name="ios-settings"
            size={40}
            style={{ color: '#EFF6E0' }}
          />
        </TouchableOpacity>
      </View>
      <View style={imageContainer}>
        <Image style={defaultImage} source={defaultImageUrl} />
      </View>
      <View style={contentContainer}>
        <Text style={subTitle}>Description:</Text>
        <Text style={text}>{description}</Text>
        <View style={emailContainer}>
          <Text style={subTitle}>Email address:</Text>
          <Text style={text}>{email}</Text>
        </View>
        <View style={phoneContainer}>
          <Text style={subTitle}>Phone number:</Text>
          <Text style={text}>{phone}</Text>
        </View>
      </View>
    </View>
  );
}

SettingsScreen.navigationOptions = {
  headerTitle: () => <HomeScreenHeader />,
  headerStyle: {
    backgroundColor: '#505950',
  },
  headerTintColor: 'white',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
    backgroundColor: '#39403A',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#EFF6E0',
  },
  defaultImage: {
    height: 300,
    width: 300,
    borderRadius: 5,
  },
  contentContainer: {
    paddingTop: '5%',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#EFF6E0',
    marginRight: 30,
  },
  text: {
    fontSize: 22,
    color: '#99AC9B',
    marginBottom: 20,
  },
  emailContainer: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'baseline',
  },
  phoneContainer: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'baseline',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
});
