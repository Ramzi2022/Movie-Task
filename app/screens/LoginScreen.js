import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  I18nManager,
  Dimensions,
  TextInput,
  Platform,
} from 'react-native';
import Languages from '../common/Languages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

import RNRestart from 'react-native-restart';
import {useDispatch} from 'react-redux';

const WIDTH = Dimensions.get('screen').width;

const LoginScreen = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(async () => {}, []);

  const register = props => {
    dispatch({
      type: 'SAVE_USER',
      payload: {
        email: email,
        password: password,
      },
    });
    AsyncStorage.setItem(
      'user',
      JSON.stringify({
        email: email,
        password: password,
      }),
    );
    navigation.navigate('HomeScreen');
  };

  const validateEmail = email => {
    var checkEmail =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return checkEmail.test(email);
  };

  const validatePassword = password => {
    let checkPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,15})/;

    return checkPassword.test(password);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/log.jpg')}
        style={{width: WIDTH, height: WIDTH * 0.7}}
        resizeMode="contain"
      />

      <TextInput
        style={styles.input}
        onChangeText={txt => setEmail(txt)}
        value={email}
        placeholder="Email"
        placeholderTextColor="#000"
      />

      <TextInput
        style={styles.input}
        onChangeText={txt => setPassword(txt)}
        value={password}
        placeholder="Password"
        placeholderTextColor="#000"
      />

      <TouchableOpacity
        onPress={() => register()}
        style={[
          styles.NextBtn,
          {
            opacity:
              validatePassword(password) && validateEmail(email) ? 1 : 0.7,
          },
        ]}
        activeOpacity={0.7}
        disabled={
          validatePassword(password) && validateEmail(email) ? false : true
        }>
        <Text style={{color: '#fff'}}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: '#000',
    borderRadius: 7,
    borderColor: '#00000040',
  },

  image: {
    width: WIDTH,
    height: WIDTH * 0.75,
  },

  NextBtn: {
    width: '40%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#000',
    height: 50,
    marginTop: 20,
  },
});
export default LoginScreen;
