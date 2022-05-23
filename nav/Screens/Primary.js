import React, {useState, useEffect} from 'react';
import { StyleSheet, ScrollView, View, Text, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Realm from "realm"
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
let realm

export default function Primary()
{
    realm = new Realm({path: 'myrealm'})
    const [Cities, setCities] = useState( realm.objects("City") )

    const deleteFunc=(item)=>{
            realm.write(() =>
                realm.delete(
                    realm.objectForPrimaryKey("City", item._id),
                ),
            )
            setCities(realm.objects("City"))
    }

    console.log(Cities)

    const navigation = useNavigation();
    /*useLayoutEffect(() => {
        navigation.setOptions(
            {headerRight:()=>(
                <IonIcon 
                    name="md-add-circle-outline"
                    size={16}
                    color="red" 
                    onPress={()=>navigation.navigate("Add_city")}
                />
                
            )}
        )
    }, [navigation])*/
    return(
        <ScrollView style=
            {{ 
                flex: 1,
                width: "100%"
            }}>
            <View>
                {Cities.map(item => (
                    <View
                        key={item.name} 
                        style={{ flexDirection: "row" }}
                    >
                        <Text 
                        style={styles.card} 
                        onPress={() => navigation.navigate('Map_map', {
                            latitude: item.latitude,
                            longitude: item.longitude
                            })}
                        >
                            {item.name}
                        </Text>
                        <MaterialCommunityIcon name="square-edit-outline" size={20} style={styles.addCard} color="white" 
                            onPress={() => navigation.navigate('Update_city', {
                                name: item.name,
                                latitude: item.latitude,
                                longitude: item.longitude,
                                id: item._id
                                })}
                        />
                        <IonIcon name="trash-outline" size={20} style={styles.deleteCard} color="white" 
                            onPress={()=>{
                                deleteFunc(item)
                            }}
                        />
                    </View>
                ))}
                <Text 
                    style={styles.deleteCard} 
                    onPress={() => 
                        realm.write(() => 
                        {
                            // Delete all objects from the realm.
                            realm.deleteAll();
                            setCities(realm.objects("City"))
                        })
                    }
                    >
                    Delete all
                </Text>
            </View>
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    card:{
        backgroundColor: "#007aff",
        borderRadius: 5,
        alignItems: 'center',
        margin: 5,
        padding: 10,
        color: 'white',
        fontWeight: 'bold',
        flex: 1
    },
    deleteCard:{
        backgroundColor: "#fa234a",
        borderRadius: 5,
        alignItems: 'center',
        margin: 5,
        padding: 10,
        color: 'white',
        fontWeight: 'bold',
    },
    addCard:{
        backgroundColor: "#007aff",
        borderRadius: 5,
        alignItems: 'center',
        margin: 5,
        padding: 10,
        color: 'white',
        fontWeight: 'bold',
    },
  });