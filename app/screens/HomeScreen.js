import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import * as fetchData from '../services/fetchData';
import MovieCard from '../components/MovieCard';
import Languages from '../common/Languages';

const HomeScreen = props => {
  const [upcomingMovie, setUpcomingMovie] = useState([]);
  const [topRatedMovie, setTopRatedMovie] = useState([]);
  const [popularMovie, setPopularMovie] = useState([]);
  const [currentPage, setCurrentPage] = useState({
    upcomingMovie: 1,
    popularMovie: 1,
    topRatedMovie: 1,
  });
  const [selected, setSelected] = useState(1);
  const [pages, setPages] = useState({
    upcomingMovie: 1,
    popularMovie: 1,
    topRatedMovie: 1,
  });
  const [loading, setLoading] = useState(false);
  const [loadingTab, setLoadingTab] = useState(false);
  const flatListRef1 = React.useRef();
  const flatListRef2 = React.useRef();
  const flatListRef3 = React.useRef();

  let tabs = [
    {title: `${Languages.upcoming}`, id: 1},
    {title: `${Languages.popular}`, id: 2},
    {title: `${Languages.topRated}`, id: 3},
  ];

  useEffect(() => {
    switch (selected) {
      case 1:
        UpcomingData(true);
        break;
      case 2:
        PopularData(true);
        break;
      case 3:
        TopRatedData(true);
        break;
    }
  }, []);

  //Fetch Upcoming Data
  const UpcomingData = async (startFromFirst = false) => {
    const upcomingMovieResult = await fetchData.getUpcomingMovie(
      currentPage.upcomingMovie,
    );
    let newData2 = upcomingMovieResult?.data.results;
    setPages({...pages, upcomingMovie: upcomingMovieResult?.data.total_pages});

    if (startFromFirst) {
      setUpcomingMovie([...newData2]);
    } else {
      setUpcomingMovie([...upcomingMovie, ...newData2]);
    }

    setCurrentPage({
      ...currentPage,
      upcomingMovie: currentPage.upcomingMovie + 1,
    });

    setLoading(false);
    setLoadingTab(false);
  };

  //Fetch Popular Data
  const PopularData = async (startFromFirst = false) => {
    const popularMovieResult = await fetchData.getPopularMovie(
      currentPage.popularMovie,
    );
    let newData3 = popularMovieResult?.data.results;
    setPages({...pages, popularMovie: popularMovieResult?.data.total_pages});

    if (startFromFirst) {
      setPopularMovie([...newData3]);
    } else {
      setPopularMovie([...popularMovie, ...newData3]);
    }

    setCurrentPage({
      ...currentPage,
      popularMovie: currentPage.popularMovie + 1,
    });
    setLoading(false);
    setLoadingTab(false);
  };

  //Fetch Top Rated Data
  const TopRatedData = async (startFromFirst = false) => {
    const topRatedMovieResult = await fetchData.getTopRatedMovie(
      currentPage.topRatedMovie,
    );
    let newData1 = topRatedMovieResult?.data.results;
    setPages({...pages, topRatedMovie: topRatedMovieResult?.data.total_pages});

    if (startFromFirst) {
      setTopRatedMovie([...newData1]);
    } else {
      setTopRatedMovie([...topRatedMovie, ...newData1]);
    }

    setCurrentPage({
      ...currentPage,
      topRatedMovie: currentPage.topRatedMovie + 1,
    });
    setLoading(false);
    setLoadingTab(false);
  };

  const onChangeTab = id => async () => {
    await setSelected(id);
    // To start from the top of the page
    flatListRef1?.current?.scrollToOffset({animated: false, offset: 0});
    flatListRef2?.current?.scrollToOffset({animated: false, offset: 0});
    flatListRef3?.current?.scrollToOffset({animated: false, offset: 0});

    currentPage.popularMovie = 1;
    pages.popularMovie = 1;
    currentPage.upcomingMovie = 1;
    pages.upcomingMovie = 1;
    currentPage.topRatedMovie = 1;
    pages.topRatedMovie = 1;

    switch (Number(id)) {
      case 1:
        await UpcomingData(true);
        break;
      case 2:
        await PopularData(true);
        break;
      case 3:
        await TopRatedData(true);
        break;
    }
  };

  const Tabs = (items, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onChangeTab(items.id)}
        style={[
          styles.Tabs,
          {
            borderRadius: 50,
            backgroundColor: items.id === selected ? '#03bd00' : 'white',
          },
        ]}
        key={index}>
        <Text
          style={{
            textAlign: 'center',
            color: items.id === selected ? 'white' : 'black',
            fontSize: 13,
          }}
          numberOfLines={2}>
          {items.title}
        </Text>
      </TouchableOpacity>
    );
  };

  // for pagination
  const endReach = () => {
    console.log(' currentPage ', currentPage);
    console.log(' Pages ', pages);

    setLoading(true);
    switch (selected) {
      case 1:
        if (currentPage.upcomingMovie < pages.upcomingMovie) {
          UpcomingData();
        } else {
          setLoading(false);
        }
        break;
      case 2:
        if (currentPage.popularMovie < pages.popularMovie) {
          PopularData();
        } else {
          setLoading(false);
        }
        break;
      case 3:
        if (currentPage.topRatedMovie < pages.topRatedMovie) {
          TopRatedData();
        } else {
          setLoading(false);
        }
        break;
    }
  };

  const renderContent = () => {
    switch (selected) {
      case 1:
        return loadingTab ? (
          <ActivityIndicator
            color={'#000'}
            size="large"
            style={{flex: 1, justifyContent: 'center'}}
          />
        ) : (
          <View style={{flex: 1, width: '100%', marginTop: 20}}>
            <FlatList
              ref={flatListRef1}
              numColumns={2}
              data={upcomingMovie}
              renderItem={({item, index}) => (
                <MovieCard item={item} index={index} />
              )}
              onEndReached={() => endReach()}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        );
      case 2:
        return loadingTab ? (
          <ActivityIndicator
            color={'#000'}
            size="large"
            style={{flex: 1, justifyContent: 'center'}}
          />
        ) : (
          <View style={{flex: 1, width: '100%', marginTop: 20}}>
            <FlatList
              ref={flatListRef2}
              numColumns={2}
              data={popularMovie}
              renderItem={({item, index}) => (
                <MovieCard item={item} index={index} />
              )}
              onEndReached={() => endReach()}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        );
      case 3:
        return loadingTab ? (
          <ActivityIndicator
            color={'#000'}
            size="large"
            style={{flex: 1, justifyContent: 'center'}}
          />
        ) : (
          <View style={{flex: 1, width: '100%', marginTop: 20}}>
            <FlatList
              ref={flatListRef3}
              numColumns={2}
              data={topRatedMovie}
              renderItem={({item, index}) => (
                <MovieCard item={item} index={index} />
              )}
              onEndReached={() => endReach()}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.TabContainer}>
        {tabs.map((d, i) => {
          return Tabs(d, i);
        })}
      </View>

      {renderContent()}
      {loading ? <ActivityIndicator color={'#000'} size="large" /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Tabs: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '33%',
    height: '100%',
  },
  TabContainer: {
    width: '94%',
    height: 40,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default HomeScreen;
