import * as React from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Map_map() {
  const navigation = useNavigation()
  const route = useRoute()

  return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
              onPress={() => navigation.goBack()} title="Go back from ProfileScreen" />
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                //specify our coordinates.
                initialRegion=
                {{
                  latitude: route.params.latitude,
                  longitude: route.params.longitude,
                  latitudeDelta: 0.002,
                  longitudeDelta: 0.002,
                }}
            >


                <Marker
                  coordinate= {{
                    latitude: route.params.latitude,
                    longitude: route.params.longitude,
                  }}  
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
      height: '100%',
      width: '100%',
      flex: 1
    },
  });