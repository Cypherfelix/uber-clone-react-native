import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setDestination } from '../slices/navSlice';
import { GOOGLE_MAPS_APIKEY } from "@env"
import { useNavigation } from '@react-navigation/native';

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const des = useSelector(selectDestination);
    const [done, setDone] = useState(false);

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Good Morning, Felix </Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <View>
                    <GooglePlacesAutocomplete
                        placeholder='Where to ?'
                        debounce={400}
                        styles={{
                            container: {
                                backgroundColor: "white",
                                paddingTop: 20,
                                flex: 0,
                            },
                            textInput: {
                                backgroundColor: "#DDDDDF",
                                borderRadius: 0,
                                fontSize: 18,
                            },
                            textInputContainer: {
                                paddingHorizontal: 20,
                                paddingBottom: 0,
                            },
                        }}
                        onPress={(data, details = null) => {
                            dispatch(setDestination({
                                location: details?.geometry.location,
                                description: data.description
                            }));
                            navigation.navigate("RideOptionCard");
                        }}
                        fetchDetails={true}
                        returnKeyType={"search"}
                        enablePoweredByContainer={false}
                        minLength={2}
                        query={{
                            key: GOOGLE_MAPS_APIKEY,
                            language: 'en'
                        }}
                        nearbyPlacesAPI="GooglePlacesSearch"
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default NavigateCard

const styles = StyleSheet.create({})