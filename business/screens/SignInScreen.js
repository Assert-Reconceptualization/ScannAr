import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button
} from 'react-native';
import RegisterModal from '../components/RegisterModal';
import SignUp from '../components/buttons/SignUp';

export default function SignInScreen(props) {
  const [register, setRegister] = useState(false);
  const isRegistering = () => {
    setRegister(true);
  }
  const cancelRegistration = () => {
    setRegister(false);
  }

  const {
    container,
    titleContainer,
    subTitleContainer,
    buttonContainer,
    titleLeftText,
    titleRightText,
    subTitle,
    signInButton,
    signInText,
  } = styles;
  return (
    <View style={container}>
      <RegisterModal
        visible={register}
        navigation={props.navigation}
        cancelRegistration={cancelRegistration}
      />
      <View style={titleContainer}>
        <Text style={titleLeftText}>Scann</Text>
        <Text style={titleRightText}>AR</Text>
      </View>
      <View style={subTitleContainer}>
        <Text style={subTitle}>
          Business
        </Text>
      </View>
      <View style={buttonContainer}>
        <SignUp navigation={props.navigation}/>
        <Button title="Register" onPress={isRegistering} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '20%',
    backgroundColor: '#3B423C',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  subTitleContainer: {
    flex: 2,
    alignItems: 'center'
  },
  titleLeftText: {
    color: '#EFF6E0',
    fontSize: 40,
    fontWeight: 'bold',
  },
  titleRightText: {
    color: '#AEC3B0',
    fontSize: 40,
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#AEC3B0',
    fontSize: 40,
  },
  buttonContainer: {
    flex: 3,
    alignItems: 'center'
  },
});