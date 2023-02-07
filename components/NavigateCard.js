import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from "tailwind-react-native-classnames";

const NavigateCard = () => {

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Good Morning, Felix </Text>
            <View>

            </View>
        </SafeAreaView>
    )
}

export default NavigateCard

const styles = StyleSheet.create({})