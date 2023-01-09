import React, {useEffect} from 'react';
import {Image, StyleSheet, View, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WIDTH = Dimensions.get('screen').width;

const SplashScreen = props => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('user').then(data => {
        console.log(data);
        if (data) {
          navigation.navigate('HomeScreen');
        } else {
          navigation.navigate('LoginScreen');
        }
      });
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/log.jpg')}
        style={{width: WIDTH, height: WIDTH}}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
});

export default SplashScreen;
