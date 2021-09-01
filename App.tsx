import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, Paragraph, Provider as PaperProvider, Snackbar } from 'react-native-paper';
import { RootStackParamList, Screens, SnackContext, SnackMessage } from './src/utils';

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
              <Stack.Screen
                name={"Home"}
                component={Screens.LANDING_PAGE.component}
              />
              <Stack.Screen 
                name={"Latest Episodes"}
                component={Screens.LATEST_EPISODES_PAGE.component}
              />
              <Stack.Screen 
                name={"Top Anime"}
                component={Screens.TOP_ANIME_PAGE.component}
              />
              <Stack.Screen 
                name={"Search"}
                component={Screens.SEARCH_PAGE.component}
                options={{ title: 'Search for your favourite Anime!' }}
              />
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
