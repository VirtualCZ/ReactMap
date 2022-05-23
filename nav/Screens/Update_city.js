import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, Alert, TextInput} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useNavigation, useRoute} from '@react-navigation/native';
import Realm from 'realm';
let realm;

export default function Add_city() {
  const navigation = useNavigation();
  const route = useRoute();

  const [name, setName] = useState(route.params.name);
  const [latitude, setLatitude] = useState(route.params.latitude);
  const [longitude, setLongitude] = useState(route.params.longitude);
  const [id, setID] = useState(route.params.id);

  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  })

  realm = new Realm({path: 'myrealm'});

  const update_place = () => {
    realm.write(() => {
      let object = realm.objectForPrimaryKey("City", id)
      object.name = name
      object.latitude = parseFloat(region.latitude)
      object.longitude = parseFloat(region.longitude)
      object._id = id
    })
    Alert.alert(
      'Success',
      'Updated',
      [
        {
          text: 'Ok',
          onPress: () => navigation.navigate("Primary"),
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

        <Text>{'PLEASE ENTER CITY NAME'}</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={newName => setName(newName)}></TextInput>
        
        <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                //specify our coordinates.
                initialRegion=
                {{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0.002,
                  longitudeDelta: 0.002,
                }}
                onRegionChangeComplete={(region) => setRegion(region)}
            >
                <Marker
                  coordinate= {{
                    latitude: route.params.latitude,
                    longitude: route.params.longitude,
                  }}
                  pinColor={'blue'}
                />
                <Marker
                  coordinate= {{
                    latitude: region.latitude,
                    longitude: region.longitude,
                  }}
                />
            </MapView>
            <Text style={styles.underMap}>Current latitude: {region.latitude}</Text>
        <Text style={styles.underMap}>Current longitude: {region.longitude}</Text>

        <Text
            onPress={() => update_place()}
            style={styles.button}        
        >
          Confirm edit
        </Text>
        <Text
            onPress={() => navigation.navigate("Primary")}
            style={styles.button2}
        >
          Go back...
        </Text>
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
    margin: 5,
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
},
map:{
  flex:1,
  width:"90%",
},
  button2:{
    backgroundColor: "#b3b3b3",
    borderRadius: 5,
    alignItems: 'center',
    margin: 5,
    padding: 10,
    color: 'black',
    fontWeight: 'bold',
},
underMap:{
  fontSize: 12
}
});
