import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin } from '../slices/navSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

const data = [
    {
        id: "Uber-X-123",
        title: "UberX",
        multiplier: 1,
        image: "https://links.papareact.com/3pn",
    },
    {
        id: "Uber-XL-456",
        title: "Uber XL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8",
    },
    {
        id: "Uber-LUX-789",
        title: "Uber LUX",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf",
    },
];

const RideOptionCard = () => {
    const [selected, setSelected] = useState(null);
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);

    return (
        <SafeAreaView style={tw`bg-white flex-grow p-0 mt-0`}>
            <View style={[tw`flex-row`, {
                alignItems: "center",
                justifyContent: "flex-start"
            }]}>
                <TouchableOpacity
                    style={tw`pb-2 mr-20 ml-5 rounded-full`}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name='chevron-left' type='fontawesome' />
                </TouchableOpacity>
                <Text style={tw`text-center py-1 text-xl`}>Select a ride</Text>

            </View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item: { id, image, multiplier, title }, item }) => (
                    <TouchableOpacity
                        onPress={() => setSelected(item)}
                        style={tw`flex-row justify-between items-center px-10 ${id === selected?.id && "bg-gray-200"}`}>
                        <Image
                            style={{
                                width: 80,
                                height: 80,
                                resizeMode: 'contain'

                            }}
                            source={{
                                uri: image
                            }}
                        />

                        <View style={tw`-ml-6`}>
                            <Text style={tw`text-xl font-semibold`}>{title}</Text>
                            <Text>Travel time...</Text>
                        </View>

                        <Text>$99</Text>
                    </TouchableOpacity>
                )}
            />

            <View>
                <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}>
                    <Text style={tw`text-center text-white text-xl`}>
                        Choose {selected?.title}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionCard

const styles = StyleSheet.create({})