import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Modal,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import RegisterModal from '../components/RegisterModal';
import SignUp from '../components/buttons/SignUp';
import BusinessContext from '../applicationState/BusinessContext';
import serverConfig from '../serverConfig';
const server = serverConfig().url;

export default function SignInScreen(props) {
  const context = useContext(BusinessContext)
  const [register, setRegister] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isRegistering = () => {
    setRegister(true);
  }
  const isSigningIn = () => {
    setSignIn(true);
  }
  const cancelSigningIn = () => {
    setSignIn(false);
  }
  const cancelRegistration = () => {
    setRegister(false);
  }

  const handleSignIn = () => {
    // fetch business info
    fetch(`${server}/business?email=${email}&password=${password}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    }).then(business => business.json())
      .then(businessInfo => {
        if(businessInfo.data[0] === undefined) throw Error
        return context.setCurrentBusiness(businessInfo.data[0])
      })
      .then(() => {
        props.navigation.navigate({routeName: 'Home'});
      })
      .catch(() => {
        console.log("Wrong email or password")
      });
    // get business info
    // 
  }

  const {
    container,
    titleContainer,
    subTitleContainer,
    buttonContainer,
    titleLeftText,
    titleRightText,
    subTitle,
    loginModal,
    textInput,
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
        <TouchableOpacity
          onPress={isSigningIn}
        >
          <SignUp />
        </TouchableOpacity>
        <Button title="Register" onPress={isRegistering} />
      </View>
      <Modal 
        visible={signIn}
        animationType="slide"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={loginModal}>
            <Text>Sign In</Text>
            <TextInput
              style={textInput}
              onChangeText={text => setEmail(text)}
              value={email}
              placeholder="Email"
            />
            <TextInput
              style={textInput}
              onChangeText={text => setPassword(text)}
              value={password}
              placeholder="Password"
              secureTextEntry
            />
            <Button onPress={handleSignIn} title="Submit" />
            <Button onPress={cancelSigningIn} title="Cancel" />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  loginModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },  
  textInput: {
    width: "70%",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    fontSize: 25,
    marginBottom: 20,
    paddingLeft: 5
  },
});