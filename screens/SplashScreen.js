import  React  from 'react'
import { StyleSheet, Text, View, Platform, Image, TouchableOpacity, Dimensions} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'; 
import {LinearGradient} from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';

export default function SplashScreen({navigation}) {
    const { colors } = useTheme();
   return(
    <View style={styles.container}>
        <View style={styles.header}>
            <Image 
            source={require('../assets/image.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
            </View>
            <View 
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            
        >
            <Text style={[styles.title, {
                color: colors.text
            }]}>Welcome to Suspected Bowling Action!</Text>
            <Text style={styles.text}>Sign in with account</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=>navigation.navigate('Signin')}>
                <LinearGradient
                    colors={['#1e90ff', '#000000']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Let's Go</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            </View>
        </View>
      </View>

   )


}  
const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;


const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#1e90ff'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop:5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
  });