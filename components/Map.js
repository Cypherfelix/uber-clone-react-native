import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useReducer, useRef, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import tw from 'tailwind-react-native-classnames'
import { useDispatch, useSelector } from 'react-redux'
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_APIKEY } from "@env"


const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const dispatch = useDispatch();

    /**
     * @type {React.MutableRefObject<MapView>}
     */
    const mapRef = useRef(null);

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
        }, 1000);
        return () => clearInterval(interval);
    }, [origin, destination])


    useEffect(() => {
        if (!origin || !destination) return;
        const getTravelTime = async () => {
            const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`;

            fetch(URL)
                .then((res) => res.json())
                .then((data) => {
                    dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
                })
        }
        const interval = setTimeout(() => {
            getTravelTime();
        }, 1000);
        return () => clearInterval(interval);


    }, [origin, destination, GOOGLE_MAPS_APIKEY])

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