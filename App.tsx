import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { LandingPage } from './src/pages/LandingPage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LatestEpisodesPage } from './src/pages/LatestEpisodesPage';
import { Button, Icon } from 'react-native-elements';
import { JikanTypesObj, RootStackParamList, Screens } from './src/utils/constants';
import { ThemeProvider } from 'react-native-elements';

const theme = {
  colors: {
    primary: '#000E14',
    secondary: '#F77F00'
  },
};

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const Stack = createStackNavigator<RootStackParamList>();


export default function App() {

  return (
    <SafeAreaProvider style={styles.container}>
      <ThemeProvider theme={theme}>
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
              options={{
                headerRight: () => (
                  <Button
                    icon={
                      <Icon
                        name="search"
                        size={20}
                        color="white"
                      />
                    }
                    type="clear"
                  />
                ),
              }}
            />
            <Stack.Screen 
              name={"Latest Episodes"}
              component={Screens.LATEST_EPISODES_PAGE.component}
            />
            <Stack.Screen 
              name={"Top Anime"}
              component={Screens.TOP_ANIME_PAGE.component}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
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
  }
});
