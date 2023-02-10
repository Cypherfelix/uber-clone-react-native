import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import NavOptions from '../components/NavOptions'
import { GOOGLE_MAPS_APIKEY } from "@env"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice'
import * as Location from "expo-location"
import NavFavourites from '../components/NavFavourites'

interface Origin {
    location: {
        lat: Number,
        lng: Number
    },
    description: String
}

const HomeScreen = () => {
    const dispatch = useDispatch();

    /**
     * @type {Origin}
     */
    let ori = {
        description: "",
        location: {
            lat: null,
            lng: null
        }
    };
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            ori.description = "current location";
            ori.location.lat = location.coords.latitude;
            ori.location.lng = location.coords.longitude;

            dispatch(setOrigin(ori))


            dispatch(setDestination(null))

            console.log(location);
            return;
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`} >
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain'

                    }}
                    source={{
                        uri: "https://links.papareact.com/gzs"
                    }} />
                <GooglePlacesAutocomplete
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={400}
                    placeholder="Where From"
                    styles={{
                        container: {
                            flex: 0,
                            marginBottom: 5
                        },
                        textInput: {
                            fontSize: 18,
                        },
                    }}
                    onPress={(data, details = null) => {
                        dispatch(setOrigin({
                            location: details?.geometry.location,
                            description: data.description
                        }))

                        dispatch(setDestination(null))
                    }}
                    fetchDetails={true}
                    enablePoweredByContainer={false}
                    minLength={2}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en',
                        components: 'country:ke',
                    }}

                />

                <NavOptions />

                <NavFavourites />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    text: {
        color: "blue"
    }
})