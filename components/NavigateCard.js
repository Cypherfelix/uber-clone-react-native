import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setDestination } from '../slices/navSlice';
import { GOOGLE_MAPS_APIKEY } from "@env"
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const des = useSelector(selectDestination);
    const origin = useSelector(selectOrigin);
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
                            language: 'en',
                            radius: 50000,
                            location: origin?.location
                        }}
                        nearbyPlacesAPI="GooglePlacesSearch"
                    />
                </View>

                <NavFavourites />
            </View>

            <View style={tw`flex-row bg-white justify-evenly  py-2 mt-auto border-t border-gray-100`}>
                <TouchableOpacity style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
                    onPress={() => navigation.navigate("RideOptionCard")}
                >
                    <Icon name="car" type="font-awesome" color="white" size={16} />
                    <Text style={tw`text-white text-center`}>Rides</Text>
                </TouchableOpacity>

                <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
                    <Icon
                        name="fast-food-outline" type="ionicon"
                        color="black"
                        size={16} />
                    <Text
                        style={tw`text-center`}>Eats</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default NavigateCard

const styles = StyleSheet.create({})