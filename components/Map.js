import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import tw from 'tailwind-react-native-classnames'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'


const Map = () => {
    const origin = useSelector(selectOrigin);
    const [state, setState] = useState({
        delta: {
            expected: 0.005,
            current: 0,
        },
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setState(prevState => ({
                ...prevState,
                ...Object.keys(prevState).reduce((acc, key) => {
                    if (prevState[key].current < prevState[key].expected) {
                        return {
                            ...acc,
                            [key]: {
                                ...prevState[key],
                                current: prevState[key].current + Math.abs(prevState[key].expected / 10),
                            },
                        };
                    }
                    return acc;
                }, {}),
            }));
        }, 30);

        return () => clearInterval(interval);
    }, [state]);



    return (
        <MapView
            // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={tw`flex-1`}
            mapType="mutedStandard"
            region={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: state.delta.current,
                longitudeDelta: state.delta.current,
            }}
        >
            {
                origin?.location && (
                    <Marker
                        coordinate={{
                            latitude: origin.location.lat,
                            longitude: origin.location.lng

                        }}
                        title="Origin"
                        description={origin.description}
                        identifier="origin"
                    />
                )
            }
        </MapView>
    )
}

export default Map

const styles = StyleSheet.create({})