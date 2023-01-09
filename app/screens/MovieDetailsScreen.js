import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import * as fetchData from '../services/fetchData';
import FastImage from 'react-native-fast-image';
import Languages from '../common/Languages';

const WIDTH = Dimensions.get('screen').width;

const MovieDetailsScreen = props => {
  const id = props.route.params?.id;
  const [data, setData] = useState([]);
  const [credit, setCredit] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    setLoading(true);
    const movieDetailsResult = await fetchData.getMovieDetails(id);
    let newMovieDetailsResult = movieDetailsResult?.data;
    setData(newMovieDetailsResult);

    const movieCreditsResult = await fetchData.getMovieCredits(id);
    let newMovieCreditsResult = movieCreditsResult?.data;
    setCredit(newMovieCreditsResult);

    setLoading(false);
  };

  return loading ? (
    <ActivityIndicator
      color={'#000'}
      size="large"
      style={{flex: 1, justifyContent: 'center'}}
    />
  ) : (
    <View style={{flex: 1, width: '100%', paddingTop: 15}}>
      <ScrollView style={{flex: 1, width: '100%', height: '100%'}}>
        <View
          style={{
            aspectRatio: 1,
            width: '60%',
            borderRadius: 50,
            alignSelf: 'center',
          }}
          key={props.index}>
          {data?.backdrop_path ? (
            <FastImage
              source={{
                uri: 'https://image.tmdb.org/t/p/w780' + data?.backdrop_path,
              }}
              defaultSource={require('../../assets/images/NoImage.jpg')}
              style={{width: '100%', height: '100%', borderRadius: 14}}
              resizeMode={FastImage.resizeMode.stretch}
            />
          ) : (
            <FastImage
              source={require('../../assets/images/NoImage.jpg')}
              style={{width: '100%', height: '100%'}}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
        </View>

        <View style={{paddingTop: 20, alignItems: 'center'}}>
          <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>
            {data.original_title}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: '#7CaC00',
              fontWeight: 'bold',
            }}>
            {(data.vote_average * 10).toFixed(0) + '%'}
          </Text>
        </View>

        <View style={{paddingTop: 20, paddingHorizontal: 10}}>
          <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>
            {Languages.overview}
          </Text>

          <Text style={{color: '#000000aa', fontSize: 16}}>
            {data.overview}
          </Text>
        </View>

        <View style={{paddingTop: 20, paddingHorizontal: 10}}>
          <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>
            {Languages.genres}
          </Text>

          <View style={{flexDirection: 'row'}}>
            {data?.genres?.map((e, i) => {
              return (
                <Text key={i} style={styles.genresCard}>
                  {e.name}
                </Text>
              );
            })}
          </View>
        </View>

        <View style={{paddingTop: 20, paddingHorizontal: 10}}>
          <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>
            {Languages.credits}
          </Text>

          <ScrollView horizontal={true}>
            {credit?.cast?.map((e, i) => {
              return (
                <View
                  key={i}
                  style={{
                    marginHorizontal: 8,
                    marginVertical: 15,
                  }}>
                  {e?.profile_path ? (
                    <FastImage
                      source={{
                        uri:
                          'https://image.tmdb.org/t/p/w500' + e?.profile_path,
                      }}
                      defaultSource={require('../../assets/images/NoImage.jpg')}
                      style={{
                        width: WIDTH * 0.3,
                        height: WIDTH * 0.3,
                        borderRadius: Math.round(WIDTH + WIDTH / 2),
                      }}
                      resizeMode={FastImage.resizeMode.stretch}
                    />
                  ) : (
                    <FastImage
                      source={require('../../assets/images/NoImage.jpg')}
                      style={{
                        width: WIDTH * 0.3,
                        height: WIDTH * 0.3,
                        borderRadius: Math.round(WIDTH + WIDTH / 2),
                      }}
                      resizeMode={FastImage.resizeMode.stretch}
                    />
                  )}
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: 'bold',
                      width: '70%',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {e.name}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  genresCard: {
    borderRadius: 50,
    fontSize: 16,
    color: '#000000aa',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#ddd',
    padding: 5,
    margin: 3,
  },
});

export default MovieDetailsScreen;
