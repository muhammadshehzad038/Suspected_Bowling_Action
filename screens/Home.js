import { StyleSheet, Text, View,Platform, TouchableOpacity, Image, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import {LinearGradient} from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { firebase } from '../config'

export default function Home() {
    const [image, setImage] =useState(null);
    const [name,setName]= useState('');
    const [predictions, setPredictions] = useState([]);
    const [detections, setDetections] = useState([]);

    useEffect(()=>{
        firebase.firestore().collection('user')
        .doc(firebase.auth().currentUser.uid).get()
        .then((snapshot)=>{
            if (snapshot.exists){
                setName(snapshot.data())
            }else{
                console.log('user does not exist')
            }
        })
    },[])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };
      const uploadImage = async () => {
        const formData = new FormData();
        formData.append('image', {
            uri: image,
            type: "image/jpeg",
            name: "image.jpg",
        });
        

        fetch('http://192.168.10.5:5000/predict_img', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
              },
          })
            .then(response => response.json())
            .then(data => {
                setPredictions(data);
                console.log(data.result)
            })
            .catch(error => {
              // Handle any errors here
              console.error(error);
            });
        }

        const hand = async () => {
            const formData = new FormData();
            formData.append('image', {
                uri: image,
                type: "image/jpeg",
                name: "image.jpg",
            });
            
    
            fetch('http://192.168.10.5:5000/hand_detect', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                  },
              })
                .then(response => response.json())
                .then(data => {
                    console.log(data.result)
                    setDetections(data)
                })
                .catch(error => {
                  // Handle any errors here
                  console.error(error);
                });
            }


      
  return (
    <View style={styles.main}>
    <View style={styles.header}>
      <Text style={styles.text_header}>Please pick your Bowling action image!
      </Text>
      <ScrollView>
      <TouchableOpacity onPress={pickImage}>
                <LinearGradient
                    colors={['#1e90ff', '#000000']}
                    style={styles.signIn}
                >
                <Text style={styles.textSign}>Pick Image</Text>
                <MaterialCommunityIcons name="image-plus" size={24} color="white" />
                </LinearGradient>
    </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={{ marginTop: 30, height:255 ,width:255 }} />}
      <TouchableOpacity onPress={uploadImage} onPressOut={hand}  >
                <LinearGradient
                    colors={['#1e90ff', '#000000']}
                    style={styles.signIn}
                >
                <Text style={styles.textSign}>Check Result </Text>
                <Foundation name="results" size={22} color="white" />
                </LinearGradient>
    </TouchableOpacity>
    </ScrollView>
    </View>
    <View style={styles.footer}>
        <ScrollView>
        <Text style={styles.text_footer}> Result: </Text>
        <Text>{predictions.result}</Text>
        <Text style={styles.text_footer}> Type: </Text>
        <Text>{detections.result}</Text>
        <View style={styles.button}>
            <TouchableOpacity onPress={()=> {firebase.auth().signOut()}}>
                <LinearGradient
                    colors={['#1e90ff', '#000000']}
                    style={styles.signOut}
                >
                    <Text style={styles.textSign}>Log out </Text>
                    <AntDesign name="logout" size={24} color="white" />
                </LinearGradient>
            </TouchableOpacity>
            </View>
            </ScrollView>
    </View>
    </View>
  )
  }

  const styles = StyleSheet.create({
    main: {
        flex: 1, 
        backgroundColor: '#1e90ff',
      },
      header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
      },
      footer: {
          flex: 0.5,
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 20,
          paddingVertical: 30
      },
      text_header: {
       
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
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
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',
        marginTop:20
    },
    signOut:{
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',
        marginTop:100
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold',
        justifyContent:'space-between',
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