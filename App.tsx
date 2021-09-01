import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, Screens } from './src/utils/constants';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000E14',
    secondary: '#F77F00'
  },
};

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  return (
    <SafeAreaProvider style={styles.container}>
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
  flashText: {
    textAlign: 'center'
  }
});
