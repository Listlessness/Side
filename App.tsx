import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  DefaultTheme,
  IconButton,
  Paragraph,
  Provider as PaperProvider,
  Snackbar,
} from 'react-native-paper';
import {
  RootStackParamList,
  SnackContext,
  SnackMessage,
  UseNavigation,
} from './src/utils';
import {
  EpisodeFullScreenPage,
  LandingPage,
  LatestEpisodesPage,
  SearchPage,
  TopAnimePage,
  WatchEpisodePage,
  AnimeDetailsPage,
  SimpleListPage
} from './src/pages';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000E14',
    secondary: '#F77F00',
  },
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [visible, setVisible] = React.useState(false);
  const [snackMessage, setSetSnackMessage] = React.useState('');

  const onDismissSnackBar = React.useCallback(() => setVisible(false), []);

  const showMessage = React.useCallback((arg: SnackMessage) => {
    setSetSnackMessage(arg.message);
    setVisible(true);
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
            <PaperProvider theme={theme}>
              <NavigationContainer>
                <Stack.Navigator
                  initialRouteName={'Home'}
                  screenOptions={{
                    headerStyle: styles.headerStyle,
                    headerTintColor: '#fff',
                    headerTitleStyle: styles.headerTitleStyle,
                  }}>
                  <Stack.Group>
                    <Stack.Screen name={'Home'} component={LandingPage} />
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
                      options={{headerTitle: 'Lists'}}
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
              </NavigationContainer>
            </PaperProvider>
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
