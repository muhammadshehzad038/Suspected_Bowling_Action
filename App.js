import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './screens/Signup';
import Signin from './screens/Signin';
import SplashScreen from './screens/SplashScreen';
import Home from './screens/Home';
import { useEffect, useState } from 'react';
import { firebase } from './config'
import MyDrawer from './Navigation/MyDrawer';

const Stack= createNativeStackNavigator();

function App() {
  const [initialize,setInitialize]=useState(true);
  const [user,setUser]=useState();

  function onAuthStateChanged(user){
    setUser(user);
    if(initialize) setInitialize(false);
  }
  useEffect(()=>{
    const subscriber=firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  if (initialize) return null;

  if(!user){
    return(
      <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown: false}}>
          <Stack.Screen name='Splash' component={SplashScreen}/>
          <Stack.Screen name='Signin' component={Signin}/>
          <Stack.Screen name='Signup' component={Signup}/>

      </Stack.Navigator>
    );
  }
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='MyDrawer' component={MyDrawer} />
    </Stack.Navigator>
  )

  }
export default ()=>{
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>

  )
}

//   return (
//     <View style={styles.container}>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown: false}} >
//           <Stack.Screen name='Splash' component={SplashScreen}/>
//           <Stack.Screen name='Signin' component={Signin}/>
//           <Stack.Screen name='Signup' component={Signup}/>
//           <Stack.Screen name='home' component={Home} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',

//   },
// });
