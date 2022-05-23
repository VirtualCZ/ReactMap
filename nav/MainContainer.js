import * as React from 'react';
import {useEffect} from 'react';
import {
  NavigationContainer,
  StackActions,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import Realm from 'realm';

// Screens
import Primary from './Screens/Primary';
import Secondary from './Screens/Secondary';
import Map_map from './Screens/Map_map';
import Add_city from './Screens/Add_city';
import Update_city from './Screens/Update_city';

//tvorba tabulky
const CitySchema = {
  name: "City",
  properties: {
    _id: "int",
    name: "string",
    latitude: "double",
    longitude: "double",
  },
  primaryKey: "_id",
};

//use realm to interact with database
(async () => {

  const realm = await Realm.open({
    path: "myrealm",
    schema: [CitySchema],
  });
})();

//Screen names
export const screenNames = {
  secondary: 'Secondary', //home
  primary: 'Primary', //details
  map_map: 'Map_map', //innerDetails
  add_city: 'Add_city', //innerDetails
  update_city: 'Update_city', //innerDetails
  secondaryStack: 'Mapa', //homeStack
  primaryStack: 'Lokace', //detailsStack
};

const SecondaryStack = createStackNavigator();

function SecondaryStackScreen() {
  return (
    <SecondaryStack.Navigator
      initialRouteName={screenNames.secondary}
      headerMode="none">
      <SecondaryStack.Screen
        name={screenNames.secondary}
        children={() => <Secondary /*towns={mesta}*/ />}
      />
    </SecondaryStack.Navigator>
  );
}

const PrimaryStack = createStackNavigator();

function PrimaryStackScreen({navigation, route}) {
  const tabHiddenRoutes = ['Map_map', 'City_add'];
  useEffect(() => {
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({tabBarVisible: false});
    } else {
      navigation.setOptions({tabBarVisible: true});
    }
  }, [navigation, route]);

  return (
    <PrimaryStack.Navigator
      initialRouteName={screenNames.primary}
      headerMode="none">
      <PrimaryStack.Screen
        name={screenNames.primary}
        children={() => <Primary /*towns={mesta}*/ />}
      />
      <PrimaryStack.Screen
        name={screenNames.map_map}
        children={() => <Map_map />}
      />
      <PrimaryStack.Screen
        name={screenNames.add_city}
        children={() => <Add_city />}
      />
      <PrimaryStack.Screen
        name={screenNames.update_city}
        children={() => <Update_city />}
      />
    </PrimaryStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer independent>
      <Tab.Navigator
        initialRouteName={screenNames.primaryStack}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            if (rn === screenNames.primaryStack) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === screenNames.secondaryStack) {
              iconName = focused ? 'map' : 'map-outline';
            }
            else if (rn === screenNames.add_city) {
              iconName = focused ? "md-add-circle" : "md-add-circle-outline"
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          tabBarActiveTintColor: '#007aff',
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: {
            paddingBottom: 10,
            fontSize: 10,
          },
          tabBarStyle: [
            {
              display: 'flex',
            },
            null,
          ],
        }}>
        <Tab.Screen
          name={screenNames.primaryStack}
          component={PrimaryStackScreen}
        />
        <Tab.Screen
          name={screenNames.add_city}
          children={() => <Add_city/>}
        />
        <Tab.Screen
          name={screenNames.secondaryStack}
          component={SecondaryStackScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
