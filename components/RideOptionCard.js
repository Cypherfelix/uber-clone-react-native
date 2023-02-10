import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin } from '../slices/navSlice';

const RideOptionCard = () => {

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);

    return (
        <View>
            <Text>{JSON.stringify(origin)}</Text>
            <Text>{JSON.stringify(destination)}</Text>
        </View>
    )
}

export default RideOptionCard

const styles = StyleSheet.create({})