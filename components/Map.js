import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useReducer, useRef, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import tw from 'tailwind-react-native-classnames'
import { useSelector } from 'react-redux'
import { selectDestination, selectOrigin } from '../slices/navSlice'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_APIKEY } from "@env"


const Map = () => {
    const [ignored, forceUpdate] = useReducer(x => x + 1);
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const [v, setV] = useState(0);
    /**
     * @type {React.MutableRefObject<MapView>}
     */
    const mapRef = useRef(null);

    const [state, setState] = useState({
        delta: {
            expected: 0.005,
            current: 0.005,
        },
    });

    useEffect(() => {
        if (!origin || !destination) return;
        const interval = setTimeout(() => {
            mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }
            });
            console.log("resizing to fit markers");
        }, 1000)

    }, [origin, destination]);

    useEffect(() => {

        if (destination) return;
        const interval = setTimeout(() => {
            mapRef.current.fitToSuppliedMarkers(["origin"], {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }
            });
            console.log("Not done");
        }, 1000);
        return () => clearInterval(interval);
    }, [origin, destination])


    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setState(prevState => ({
    //             ...prevState,
    //             ...Object.keys(prevState).reduce((acc, key) => {
    //                 if (prevState[key].current < prevState[key].expected) {
    //                     return {
    //                         ...acc,
    //                         [key]: {
    //                             ...prevState[key],
    //                             current: prevState[key].current + Math.abs(prevState[key].expected / 10),
    //                         },
    //                     };
    //                 }
    //                 return acc;
    //             }, {}),
    //         }));
    //     }, 30);

    //     return () => clearInterval(interval);
    // }, [state]);


    return (
        <MapView
            renderToHardwareTextureAndroid={true}
            // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            ref={mapRef}
            style={tw`flex-1`}
            mapType="mutedStandard"
            region={{
                latitude: origin.location.lat,
                longitude: origin.location.lng
            }}
        >
            {origin && destination && (
                <MapViewDirections
                    origin={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng
                    }}
                    destination={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng
                    }}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="black"
                />
            )}
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
            {
                destination?.location && (
                    <Marker
                        coordinate={{
                            latitude: destination.location.lat,
                            longitude: destination.location.lng

                        }}
                        title="Destination"
                        description={destination.description}
                        identifier="destination"

                    />
                )
            }
        </MapView>
    )
}

export default Map

const styles = StyleSheet.create({})