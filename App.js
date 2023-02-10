import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import { store } from './store';
import "react-native-gesture-handler"
import { NavigationContainer, NavigationContext } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './screens/MapScreen';
import { useEffect, useState } from 'react';
import { Point } from "react-native-maps"
import { setDestination, setOrigin } from './slices/navSlice'

export interface Origin {
  location: Point,
  description: String
}


export default function App() {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
            style={{ flex: 1 }}>
            <Stack.Navigator>
              <Stack.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name='MapScreen'
                component={MapScreen}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>

          {/* <HomeScreen /> */}
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>


  );
}

const styles = StyleSheet.create({

});
