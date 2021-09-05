import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, Paragraph, Provider as PaperProvider, Snackbar } from 'react-native-paper';
import { RootStackParamList, SnackContext, SnackMessage } from './src/utils';
import { 
  EpisodeFullScreenPage, LandingPage, LatestEpisodesPage,
  SearchPage, TopAnimePage, WatchEpisodePage, AnimeDetailsPage 
} from './src/pages';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000E14',
    secondary: '#F77F00'
  },
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  const [visible, setVisible] = React.useState(false);
  const [snackMessage, setSetSnackMessage] = React.useState('');

  const onDismissSnackBar = React.useCallback(() => setVisible(false), []);

  const showMessage = React.useCallback(
    () => (arg: SnackMessage) => {
      setSetSnackMessage(arg.message);
      setVisible(true)
    }, []
  );

  return (
    <SafeAreaProvider style={styles.container}>
      <SnackContext.Provider value={{showMessage}}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={"Home"}
              screenOptions={{
                headerStyle: styles.headerStyle,
                headerTintColor: '#fff',
                headerTitleStyle: styles.headerTitleStyle
              }}
            >
              <Stack.Group>
                <Stack.Screen
                  name={"Home"}
                  component={LandingPage}
                />
                <Stack.Screen 
                  name={"Latest Episodes"}
                  component={LatestEpisodesPage}
                />
                <Stack.Screen 
                  name={"Top Anime"}
                  component={TopAnimePage}
                />
                <Stack.Screen 
                  name={"Search"}
                  component={SearchPage}
                  options={{ title: 'Search for your favourite Anime!' }}
                />
                <Stack.Screen 
                  name={"Watch Episode"}
                  component={WatchEpisodePage}
                />
                <Stack.Screen 
                  name={"Anime Details"}
                  component={AnimeDetailsPage}
                />
              </Stack.Group>
              <Stack.Group screenOptions={{ presentation: 'modal', headerShown: false }}>
                <Stack.Screen 
                  name={"Episode Full Screen"}
                  component={EpisodeFullScreenPage}
                />
              </Stack.Group>
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </SnackContext.Provider>

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
      >
        <Paragraph style={styles.snackMessage}>{snackMessage}</Paragraph>
      </Snackbar>

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#00151F',
    height: '8vh'
  },
  headerTitleStyle:  {
    fontWeight: '500',
  },
  container: {
    backgroundColor: '#000E14'
  },
  snackMessage: {
    textAlign: 'center'
  }
});
