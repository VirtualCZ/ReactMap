import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import React, {useCallback, useState} from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Realm from 'realm';
let realm

export default function DetailsScreen() {
    const navigation = useNavigation();
    const [Cities, setCities] = useState([])
    useFocusEffect(
        useCallback(() => {
            getData();
        }, []),
      );

    getData = () => {
    realm = new Realm({path: 'myrealm'});
    setCities(realm.objects("City"))
    console.log(Cities)
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                //specify our coordinates.
                initialRegion=
                {{
                latitude: 49.743236,
                longitude: 15.338939,
                latitudeDelta: 8,
                longitudeDelta: 8,
                }}
            >
                
                {Cities.map(marker => (
                    <Marker
                    key={marker.name}
                    coordinate={{
                        latitude:marker.latitude,
                        longitude:marker.longitude
                    }}
                    title={marker.name}
                    />
                ))}
            </MapView>
        </View>
    );
}
const styles = StyleSheet.create({
    map: {
      height: '100%',
      width: '100%'
    },
  });