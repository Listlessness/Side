import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  DefaultTheme,
  IconButton,
  Paragraph,
  Provider as PaperProvider,
  Snackbar,
} from 'react-native-paper';
import {
  BookmarkedAnime,
  bookMarkedStorageKey,
  LastWatchedAnime,
  lastWatchedStorageKey,
  RootStackParamList,
  SnackContext,
  SnackMessage,
  SSBookmarkedAnimeContext,
  SSLastWatchedAnimeContext
} from './src/utils';
import {
  EpisodeFullScreenPage,
  LandingPage,
  LatestEpisodesPage,
  SearchPage,
  TopAnimePage,
  WatchEpisodePage,
  AnimeDetailsPage,
  SimpleListPage,
  GenresPage,
  BookmarkedAnimePage
} from './src/pages';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000E14',
    secondary: '#F77F00',
  },
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createMaterialBottomTabNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTintColor: '#fff',
        headerTitleStyle: styles.headerTitleStyle,
      }}>
      <Stack.Group>
        <Stack.Screen
          name={'Home'}
          component={LandingPage}
          options={({ navigation, route }) => ({
            headerRight: () => (
              <IconButton
                  icon='magnify'
                  color={"#fff"}
                  size={25}
                  onPress={() => navigation.navigate('Search')}
              />
            ),
            headerTitle: () => (
              <Image
                style={{width: windowWidth * .4, height: windowHeight * .07}}
                source={require('./assets/splash.png')}
                resizeMode="contain"
              />
            )
          })}
        />
        <Stack.Screen
          name={'Latest Episodes'}
          component={LatestEpisodesPage}
        />
        <Stack.Screen name={'Top Anime'} component={TopAnimePage} />
        <Stack.Screen
          name={'Search'}
          component={SearchPage}
          options={{ title: 'Search for your favourite Anime!' }}
        />
        <Stack.Screen
          name={'Watch Episode'}
          component={WatchEpisodePage}
        />
        <Stack.Screen
          name={'Simple List'}
          component={SimpleListPage}
          options={{headerTitle: '...'}}
        />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          headerTransparent: true,
          headerBlurEffect: 'regular',
          headerStyle: { backgroundColor: 'transparent' },
          headerTintColor: '#fff',
          headerShadowVisible: false,
          title: '',
        }}>
        <Stack.Screen
          name={'Anime Details'}
          component={AnimeDetailsPage}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

const GenreStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTintColor: '#fff',
        headerTitleStyle: styles.headerTitleStyle,
      }}>
        <Stack.Screen
          name={'Genres'}
          component={GenresPage}
          options={({ navigation, route }) => ({
            headerRight: () => (
              <IconButton
                  icon='magnify'
                  color={"#fff"}
                  size={25}
                  onPress={() => navigation.navigate('Search')}
              />
            ),
          })}
        />
        <Stack.Screen
          name={'Search'}
          component={SearchPage}
          options={{ title: 'Search for your favourite Anime!' }}
        />
    </Stack.Navigator>
  )
}

const BookMarkStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTintColor: '#fff',
        headerTitleStyle: styles.headerTitleStyle,
      }}>
        <Stack.Screen
          name={'Bookmarked Anime'}
          component={BookmarkedAnimePage}
          options={({ navigation, route }) => ({
            headerRight: () => (
              <IconButton
                  icon='magnify'
                  color={"#fff"}
                  size={25}
                  onPress={() => navigation.navigate('Search')}
              />
            ),
          })}
        />
        <Stack.Screen
          name={'Search'}
          component={SearchPage}
          options={{ title: 'Search for your favourite Anime!' }}
        />
    </Stack.Navigator>
  )
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      barStyle={styles.tabStyle}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName: any;

          if (route.name === 'Home Tab Screen') {
            iconName = focused
              ? 'ios-home'
              : 'ios-home-outline';
          } else if (route.name === 'Genres Tab Screen') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Bookmarks Tab Screen') {
            iconName = focused ? 'md-bookmarks' : 'md-bookmarks-outline';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={18} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home Tab Screen" options={{title: "Home"}} component={HomeStackNavigator} />
      <Tab.Screen name="Genres Tab Screen" options={{title: "Genres"}} component={GenreStackNavigator} />
      <Tab.Screen name="Bookmarks Tab Screen" options={{title: "Bookmarks"}} component={BookMarkStackNavigator} />
    </Tab.Navigator>
  )
}

export default function App() {
  const [visible, setVisible] = React.useState(false);
  const [snackMessage, setSetSnackMessage] = React.useState('');

  const onDismissSnackBar = React.useCallback(() => setVisible(false), []);

  const showMessage = React.useCallback((arg: SnackMessage) => {
    setSetSnackMessage(arg.message);
    setVisible(true);
  }, []);

  const [bookmarkedAnime, setBookmarkValue] = React.useState<BookmarkedAnime>({});
  const { getItem: getBookmarks, setItem: setBookmarks } = useAsyncStorage(bookMarkedStorageKey);

  const updateBookmarks = async (newValue: BookmarkedAnime) => {
    await setBookmarks(JSON.stringify(newValue));
    setBookmarkValue(Object.assign({},newValue));
  };


  const [lastWatchedAnime, setLastWatchedValue] = React.useState<LastWatchedAnime>({});
  const { getItem: getLastWatched, setItem: setLastWatched } = useAsyncStorage(lastWatchedStorageKey);


  const updateLastWatched = async (newValue: LastWatchedAnime) => {
    await setLastWatched(JSON.stringify(newValue));
    setLastWatchedValue(Object.assign({},newValue));
  };

  
  const readItemFromStorage = async () => {
    const bookmarks = await getBookmarks();
    setBookmarkValue(JSON.parse(bookmarks || '{}'));

    const lastWatched = await getLastWatched();
    setLastWatchedValue(JSON.parse(lastWatched || '{}'));
  };

  React.useEffect(() => {
    readItemFromStorage();
  }, []);

  return (
    <>
      <StatusBar
        style="light"
        translucent={true}
        backgroundColor={'transparent'}
      />
      <SafeAreaProvider>
          <SnackContext.Provider value={{ showMessage }}>
            <SSBookmarkedAnimeContext.Provider value={ {bookmarkedAnime, updateBookmarks} }>
              <SSLastWatchedAnimeContext.Provider value={ {lastWatchedAnime, updateLastWatched} }>
                <PaperProvider theme={theme}>
                  <NavigationContainer>

                    <Stack.Navigator
                      initialRouteName={'Main Screen'}
                      screenOptions={{
                        headerStyle: styles.headerStyle,
                        headerTintColor: '#fff',
                        headerTitleStyle: styles.headerTitleStyle,
                        headerShown: false
                      }}>
                        <Stack.Screen
                          name={'Main Screen'}
                          component={TabNavigator}
                        />
                        <Stack.Screen
                          name={'Episode Full Screen'}
                          component={EpisodeFullScreenPage}
                          options={{
                            presentation: 'modal'
                          }}
                        />
                    </Stack.Navigator>

                  </NavigationContainer>
                </PaperProvider>
              </SSLastWatchedAnimeContext.Provider>
            </SSBookmarkedAnimeContext.Provider>
          </SnackContext.Provider>
        <Snackbar
          visible={visible}
          style={styles.snackbar}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Okay',
            onPress: onDismissSnackBar,
          }}>
          <Paragraph style={styles.snackMessage}><Ionicons name="information-circle-outline" size={14} color="white" /> {snackMessage}</Paragraph>
        </Snackbar>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#00151F',
    height: windowHeight * .08,
  },
  headerTitleStyle: {
    fontWeight: '500',
  },
  snackMessage: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 10,
  },
  snackbar: {
    backgroundColor: '#1B2434',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 5,
  },
  tabStyle: {
    backgroundColor: '#00151F',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 5,
  }
});
