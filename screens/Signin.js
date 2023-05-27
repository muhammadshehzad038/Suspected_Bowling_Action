import  React, { useContext, useState }  from 'react'
import { StyleSheet, Text, View, Platform, Image, TouchableOpacity} from 'react-native'
import FontAwesome from "@expo/vector-icons/FontAwesome"
import Feather from "@expo/vector-icons/Feather"
import { TextInput } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native'

export default function Signin() {
    const navigation=useNavigation();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
 const handleForgotPassword =async(email) => {
    try{
      await firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert('Password reset link sent to your email');
      })
    } catch(error) {alert(error.message)};
  };

    const loginUser= async(email,password)=>{
        try{
            await firebase.auth().signInWithEmailAndPassword(email,password)
        } catch(error) {
            alert(error.message)

        }

    }
    const [data, setData] = React.useState({
        Email: '',
        Password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });


    const textInputChange= (val) =>{
        if (val.lenght != 0){
            setData({
                ...data,
                Email: val,
                check_textInputChange: true
                
            })
            
        }else {
            setData({
                ...data,
                Email: val, 
                check_textInputChange: false
                
            })

        }

    }
    const handlePasswordchange=(val)=>{
        setData({
            ...data,
            Password : val
        })

    }
    const updateSecuretext=()=>{
        setData({
            ...data,
            secureTextEntry : !data.secureTextEntry
        })
    }
  return (
        <View style={styles.main}>
        <View style={styles.header}>

            <Text style={styles.text_header}>SignIn!</Text>
        </View>
        <View style={styles.footer}>
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
            <FontAwesome 
                    name="user-o"
                    color={"#05375a"}
                    size={20}
                />
            <TextInput
            placeholder='enter your email'
            autoCapitalize='none'
            onChangeText={(email)=> setEmail(email)}
            onChange={(val) => textInputChange(val)}
            style={styles.textInput}></TextInput>
            {data.check_textInputChange ?
            <Feather
            name="check-circle"
            color="green"
            size={20}
        ></Feather>
        :null}
            </View>
            <Text style={[styles.text_footer,{marginTop:35}]}>Password</Text>
            <View style={styles.action}>
            <FontAwesome 
                    name="lock"
                    color={"#05375a"}
                    size={20}
                />
            <TextInput
            placeholder='enter your password'
            autoCapitalize='none'
            onChange={(val) => handlePasswordchange(val)}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={data.secureTextEntry? true:false}
            style={styles.textInput}></TextInput>
            <TouchableOpacity onPress={updateSecuretext}
            
            >
                {data.secureTextEntry ?
            <Feather
            name="eye-off"
            color="grey"
            size={20}
        ></Feather>:
        <Feather
        name="eye"
        color="grey"
        size={20}
    ></Feather>
    }
            </TouchableOpacity>
                
            </View>
            <TouchableOpacity onPress={()=> handleForgotPassword(email)}>
                <Text style={{color: '#000000', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity>

            <View style={styles.button}>
            <LinearGradient
                 colors={['#1e90ff', '#000000']}
                 style={styles.signIn}
                 >
                    <TouchableOpacity onPress={()=> loginUser(email,password)}>
                     <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In
                   <FontAwesome name="sign-out" size={24} color="white" /></Text>
                    </TouchableOpacity>
                    
                </LinearGradient>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Signup')}
                    style={[styles.signIn, {
                        borderColor: '#1e90ff',
                        borderWidth: 2,
                        marginTop: 15
                    }]}
                >
                   
                    <Text style={[styles.textSign, {
                        color: '#000000'
                    }]}>Sign Up
                    <FontAwesome name="sign-out" size={24} color="black" /></Text>
                </TouchableOpacity>

            </View>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    main: {
        flex: 1, 
        backgroundColor: '#1e90ff'
      },
      header: {
          flex: 1, 
          justifyContent: 'center',
          paddingHorizontal: 10,
      },
      footer: {
          flex: 2,
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 20,
          paddingVertical: 30
      },
      text_header: {
       
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        marginTop:80
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row'
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    Image:{
        justifyContent:"center",
        alignSelf:"center",
        margin:40,
        marginTop:140,
        padding:40,
        height:150,
        width:150
    }
})