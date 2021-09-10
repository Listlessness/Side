import React from 'react';
import { StyleSheet } from 'react-native';
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
  RootStackParamList,
  SnackContext,
  SnackMessage,
  SSBookmarkedAnimeContext
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

      <Stack.Group
        screenOptions={{ presentation: 'modal', headerShown: false }}>
        <Stack.Screen
          name={'Episode Full Screen'}
          component={EpisodeFullScreenPage}
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
        />
        <Stack.Screen
          name={'Search'}
          component={SearchPage}
          options={{ title: 'Search for your favourite Anime!' }}
        />
    </Stack.Navigator>
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
  const { getItem, setItem } = useAsyncStorage(bookMarkedStorageKey);

  const readItemFromStorage = async () => {
    const item = await getItem();
    setBookmarkValue(JSON.parse(item || '{}'));
  };

  const updateBookmarks = async (newValue: BookmarkedAnime) => {
    await setItem(JSON.stringify(newValue));
    setBookmarkValue(newValue);
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
              <PaperProvider theme={theme}>
                <NavigationContainer>
                  <Tab.Navigator
                    barStyle={{ backgroundColor: "#000000c0" }}
                    screenOptions={({ route }) => ({
                      tabBarIcon: ({ focused, color }) => {
                        let iconName: any;
            
                        if (route.name === 'Home') {
                          iconName = focused
                            ? 'ios-home'
                            : 'ios-home-outline';
                        } else if (route.name === 'Genres') {
                          iconName = focused ? 'grid' : 'grid-outline';
                        } else if (route.name === 'Bookmarks') {
                          iconName = focused ? 'md-bookmarks' : 'md-bookmarks-outline';
                        }
                        // You can return any component that you like here!
                        return <Ionicons name={iconName} color={color} />;
                      },
                      tabBarActiveTintColor: 'tomato',
                      tabBarInactiveTintColor: 'gray',
                    })}
                  >
                    <Tab.Screen name="Home" component={HomeStackNavigator} />
                    <Tab.Screen name="Genres" component={GenreStackNavigator} />
                    <Tab.Screen name="Bookmarks" component={BookMarkStackNavigator} />
                  </Tab.Navigator>

                </NavigationContainer>
              </PaperProvider>
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
    height: '8vh',
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
  }
});
