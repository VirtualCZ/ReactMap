import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, Alert, TextInput} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useNavigation, useRoute} from '@react-navigation/native';
import Realm from 'realm';
let realm;

export default function Add_city() {
  const navigation = useNavigation();
  const route = useRoute();

  const [name, setName] = useState("");
  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  })

  realm = new Realm({path: 'myrealm'});
  
    const register_user = () => {

            realm.write(() => {
              realm.create('City', {
                _id: Date.now(),
                name: name,
                latitude: region.latitude,
                longitude: region.longitude,
              });

              Alert.alert(
                'Success',
                'Inserted',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate("Primary"),
                  },
                ],
                { cancelable: false }
              );

            });

    };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 10}}>
        <Text>{'PLEASE ENTER CITY NAME'}</Text>
        <TextInput
          style={styles.input}
          onChangeText={newName => setName(newName)}></TextInput>

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
                onRegionChangeComplete={(region) => setRegion(region)}
          >
            <Marker
                  coordinate= {{
                    latitude: region.latitude,
                    longitude: region.longitude,
                  }}  
                />
          </MapView>
        <Text
        style={styles.button}
            onPress={() => register_user()}
        >
          Add
        </Text>
        <Text style={styles.underMap}>Current latitude: {region.latitude}</Text>
        <Text style={styles.underMap}>Current longitude: {region.longitude}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '90%',
    backgroundColor: '#b3b3b3',
    marginBottom: 15
  },
  button:{
    backgroundColor: "#007aff",
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
},
  map: {
    flex: 1,
    width: '90%',
    borderRadius: 50,
  },
  underMap:{
    fontSize: 12
  }
});
