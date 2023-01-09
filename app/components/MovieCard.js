import React from 'react';
import {View, StyleSheet, Dimensions, Text, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

const WIDTH = Dimensions.get('screen').width;

const MovieCard = props => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.ItemsCards}
      onPress={() =>
        navigation.navigate('MovieDetailsScreen', {
          id: props.item.id,
        })
      }>
      <View style={{flex: 1, paddingBottom: 25}} key={props.index}>
        <View
          style={{
            aspectRatio: 1,
            height: '100%',
            borderRadius: 50,
          }}
          key={props.index}>
          {props.item.backdrop_path ? (
            <FastImage
              source={{
                uri:
                  'https://image.tmdb.org/t/p/w780' + props.item.backdrop_path,
              }}
              defaultSource={require('../../assets/images/NoImage.jpg')}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 14,
                marginBottom: 3,
              }}
              resizeMode={FastImage.resizeMode.stretch}
            />
          ) : (
            <FastImage
              source={require('../../assets/images/NoImage.jpg')}
              style={{width: '100%', height: '100%'}}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}

          <Text
            numberOfLines={2}
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: '#000',
              textAlign: 'center',
            }}>
            {props.item.original_title}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  ItemsCards: {
    width: '100%',
    paddingVertical: 20,
    flex: 1,
    alignSelf: 'center',
    height: WIDTH * 0.46,
    borderRadius: 25,
    backgroundColor: '#fff',
    marginBottom: 15,
    marginTop: 3,
    marginHorizontal: 10,
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});

export default MovieCard;
