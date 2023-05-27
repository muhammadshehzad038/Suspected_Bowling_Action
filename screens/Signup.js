import  React, { useState }  from 'react'
import { StyleSheet, Text, View, Platform, Image, TouchableOpacity} from 'react-native'
import FontAwesome from "@expo/vector-icons/FontAwesome"
import Feather from "@expo/vector-icons/Feather"
import { TextInput } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'


export default function Signup() {
    const[email,setEmail]=useState('')
    const[firstName,setFirstName]=useState('')
    const[lastName,setLastName]=useState('')
    const[password,setPassword]=useState('')
    const [emailError,setEmailError]=useState('');
    const [passwordError,setPasswordError]=useState('');
    const [firstError,setFirstError]=useState('');
    const [lastError,setLastError]=useState('');

    const Validate =()=>{
        if(!email.includes('@')){
            setEmailError('Invalid Email!')
        }
        else if(password.length>6){
            setPasswordError('password should be six character')
        }
        else if(email.length===0){
            setEmailError('Email is Required')
        }
        else if(email.indexOf(' ')>=0){
            setEmailError('Email can not contain spaces')
        }
        else if(password.indexOf(' ')>=0){
            setPasswordError('password can not cantain spaces')
        }
        else if(firstName.length>9){
            setFirstError('your first name should be contain 9 character')
        }
        else if(lastName.length>12){
            setLastError('your last name should be contain 12 character')
        }else if(firstName.indexOf(' ')>=0){
            setFirstError('Email can not contain spaces')
        }
        else if(lastName.indexOf(' ')>=0){
            setLastError('password can not cantain spaces')
        }
        else{
            setEmailError(' ');
            setPasswordError(' ');
            setFirstError(' ');
            setLastError(' ');
        }
    }


   const SignupUser=async (email,firstName,lastName,password)=>{
      {Validate}
    await firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(()=>{
        firebase.auth().currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url:'https://test-4b615.firebaseapp.com',
        }).then(()=>{
            alert('email verification send!')
        }).catch((error)=>{
            alert(error.message)
        }).then(()=>{
            firebase.firestore().collection('users')
            .doc(firebase.auth().currentUser.uid)
            .set({
                firstName,
                lastName,
                email,
            })
        }).catch((error)=>{
            alert(error.message)
        })
    }).catch((error)=>{
          alert(error.message)
    })

   }

    const [data, setData] = React.useState({
        Email: '',
        Password: '',
        confirmPassword: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
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

  const updateSecuretext=()=>{
    setData({
        ...data,
        secureTextEntry : !data.secureTextEntry
    })
}
   

  const navigation = useNavigation();
  return (
        <View style={styles.main}>
        <View style={styles.header}>
            <Text style={styles.text_header}>SignUp!</Text>
        </View>
        <View style={styles.footer}>
           
            <Text style={[styles.text_footer,{marginTop: 30}]}>firstName:</Text>
            <View style={styles.action}>
            <FontAwesome 
                    name="user-o"
                    color={"#05375a"}
                    size={20}
                />
            <TextInput
            placeholder='enter your FirstName'
            autoCapitalize='none'
            onChange={(val) => textInputChange(val)}
            onChangeText={(firstName)=>setFirstName(firstName)}
            style={styles.textInput}></TextInput>
            {data.check_textInputChange ?
            <Feather
            name="check-circle"
            color="green"
            size={20}
        ></Feather>
        :null}
            </View>
            <Text style={styles.errorMsg}>{firstError}</Text>
            <Text style={[styles.text_footer,{marginTop: 30}]}>lastName:</Text>
            <View style={styles.action}>
            <FontAwesome 
                    name="user-o"
                    color={"#05375a"}
                    size={20}
                />
            <TextInput
            placeholder='enter your LastName'
            autoCapitalize='none'
            onChange={(val) => textInputChange(val)}
            onChangeText={(lastName)=>setLastName(lastName)}
            style={styles.textInput}></TextInput>
            {data.check_textInputChange ?
            <Feather
            name="check-circle"
            color="green"
            size={20}
        ></Feather>
        :null}
            </View>
            <Text style={styles.errorMsg}>{lastError}</Text>
            <Text style={[styles.text_footer,{marginTop: 30}]}>Email:</Text>
            <View style={styles.action}>
            <FontAwesome 
                    name="user-o"
                    color={"#05375a"}
                    size={20}
                />
            <TextInput
            placeholder='enter your email'
            autoCapitalize='none'
            onChange={(val) => textInputChange(val)}
            onChangeText={(email)=>setEmail(email)}
            style={styles.textInput}></TextInput>
            {data.check_textInputChange ?
            <Feather
            name="check-circle"
            color="green"
            size={20}></Feather>
        :null}
            </View>
            <Text style={styles.errorMsg}>{emailError}</Text>
            <Text style={[styles.text_footer,{marginTop:30}]}>Password</Text>
            <View style={styles.action}>
            <FontAwesome 
                    name="lock"
                    color={"#05375a"}
                    size={20}
                />
            <TextInput
            placeholder='enter your password'
            autoCapitalize='none'
            onChangeText={(password)=>setPassword(password)}
            secureTextEntry={data.secureTextEntry? true:false}
            style={styles.textInput}>
            </TextInput>
            <TouchableOpacity onPress={updateSecuretext}>
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
            <Text style={styles.errorMsg}>{passwordError}</Text>
            {/* <Text style={[styles.text_footer,{marginTop:35}]}>Confirm Password</Text>
            <View style={styles.action}>
            <FontAwesome 
                    name="lock"
                    color={"#05375a"}
                    size={20}
                />
            <TextInput
            placeholder='Confirm your password'
            autoCapitalize='none'
            onChangeText={(val) => handleconfirmPasswordchange(val)}
            secureTextEntry={data.confirm_secureTextEntry? true:false}
            style={styles.textInput}></TextInput>
            <TouchableOpacity onPress={updateconfirmSecuretext}
            
            >
                {data.confirm_secureTextEntry ?
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
                
            </View> */}
            <View style={styles.button}>
                <LinearGradient
                 colors={['#1e90ff', '#000000']}
                 style={styles.signIn}
                 >
                    <TouchableOpacity onPress={()=> SignupUser(email,password,firstName,lastName)}
                    onPressOut={Validate}>
                     <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign Up 
                   <FontAwesome name="sign-out" size={24} color="white" /></Text>
                    </TouchableOpacity>
                    
                </LinearGradient>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Signin')}
                    style={[styles.signIn, {
                        borderColor: '#1e90ff',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#000000'
                    }]}>Sign In
                <FontAwesome name="sign-in" size={24} color="black" /></Text>
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
          flex: 1.5, 
          margin:2,
          justifyContent: 'center',
          paddingHorizontal: 20,
      },
      footer: {
          flex: 3,
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
        marginTop:60
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
        flexDirection:'row'
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