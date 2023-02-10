import { StyleSheet, Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'

import React, { useReducer } from 'react'
import Map from '../components/Map'
import { createStackNavigator } from '@react-navigation/stack'
import RideOptionCard from '../components/RideOptionCard'
import NavigateCard from '../components/NavigateCard'

const MapScreen = () => {
    const Stack = createStackNavigator();
    const [ignored, forceUpdate] = useReducer(x => x + 1);
    return (
        <View>
            <View style={tw`h-1/2`}>
                <Map forceUpdate={forceUpdate} />
            </View>
            <View style={tw`h-1/2`}>
                <Stack.Navigator>
                    <Stack.Screen
                        name='NavigateCard'
                        component={NavigateCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name='RideOptionCard'
                        component={RideOptionCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            </View>
        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({})