import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Store from './app/store';
import {Provider} from 'react-redux';

import NetInfo from '@react-native-community/netinfo';
import Feather from 'react-native-vector-icons/Feather';
import AppNavigator from './app/navigation';

const App = () => {
  const [internet, setInternet] = useState(true);

  useEffect(() => {
    NetInfo.addEventListener(net => setInternet(net.isConnected));

    // AsyncStorage.getItem('langID').then(lang => {
    //   if (!lang) {
    //     I18nManager.allowRTL(false);
    //     I18nManager.forceRTL(false);
    //      Strings.setLanguage('en');
    //   } else {
    //     I18nManager.allowRTL(lang === 'ar');
    //     I18nManager.forceRTL(lang === 'ar');
    //      Strings.setLanguage(lang);
    //   }
    // });
  }, []);

  if (internet === false) {
    return (
      <View style={styles.noInternet}>
        <StatusBar backgroundColor={'#fff'} barStyle="light-content" />
        <Feather
          name="wifi-off"
          size={Dimensions.get('screen').width * 0.33}
          color="#e8e8e8"
        />
        <Text style={styles.txt}>Please connect to the internet</Text>
      </View>
    );
  } else {
    return (
      <Provider store={Store}>
        <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <AppNavigator />
        </SafeAreaView>
      </Provider>
    );
  }
};

const styles = StyleSheet.create({
  noInternet: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#03bd00', //AppColors.primary
  },
  txt: {
    color: '#e8e8e8',
    fontSize: 22,
    marginTop: 30,
  },
});

export default App;
