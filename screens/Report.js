 import { StyleSheet, Text, View,Platform, TouchableOpacity, Image , Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../config'
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Table, Row, Rows } from 'react-native-table-component';
import { Octicons } from '@expo/vector-icons';
import { LineChart, PieChart } from 'react-native-chart-kit';

export default function Report() { 
    const [tableHead,setTableHead]=useState([
        'Layer (type) ',
        'Output Shape',
        'Param #'
    ]);
    const[tableData,setTableData]=useState([
        ['conv2d (Conv2D)','None, 254, 254, 16','448'],
        ['max_pooling2d','None, 127, 127, 16', '0' ],
        ['conv2d_1 (Conv2D)','None, 125, 125, 32','4640'],
        ['max_pooling2d_1','None, 62, 62, 32', '0'],
        ['conv2d_1 (Conv2D)','None, 60, 60, 16','4624'],
        ['max_pooling2d_1','None, 30, 30, 16', '0'],
        ['flatten (Flatten)','None, 14400', '0'],
        ['dense (Dense)','None, 256', '3686656 '],
        ['dense_1 (Dense)','None, 1', '257'],
    ]);
    const[tableFooter,setTableFooter]=useState([
        'Total params: 3,696,625 \nTrainable params: 3,696,625 \nNon-trainable params: 0'
    ])
    const dataPie = [
        {
          name: "Precision",
          population: 0.95,
          color: "red",
          legendFontColor: "#7F7F7F",
          legendFontSize: 12
        },
        {
          name: "Recall",
          population: 0.99,
          color: "blue",
          legendFontColor: "#7F7F7F",
          legendFontSize: 12
        },
        {
          name: "Accuracy",
          population: 0.94,
          color: "pink",
          legendFontColor: "#7F7F7F",
          legendFontSize: 12
        },
      ];

      const screenWidth = Dimensions.get("window").width;

      const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };
  return (
    <View style={styles.main}>
    <View style={styles.header}>
    <Octicons name="report" size={24} color="white" >
      <Text style={styles.text_header}>Report!
      </Text>
      </Octicons>
      </View>
      <ScrollView style={{flex:0.5}}>
      <View style={styles.footer}>
        <Text style={styles.text_footer}>
            This app is totally a machine learning or AI based app where we check bowler action using deep learning algorithm of image classifier.
            </Text>
            <Text style={{fontSize:16, fontWeight:'bold'}}>Core library which will used in this project are:</Text>
            <Entypo name="dot-single" size={18} color="black" >
                <Text style={{fontSize:15,color:'#00ff7f'}}>
                    React-native image picker
                </Text>
                </Entypo>
                <Entypo name="dot-single" size={18} color="black" >
                <Text style={{fontSize:15,color:'#00ff7f'}}>
                    React-native navigations(stack and Drawer Navigation)
                </Text>
                </Entypo>
                <Entypo name="dot-single" size={18} color="black" >
                <Text style={{fontSize:15,color:'#00ff7f'}}>
                    Expo linear Gradients
                </Text>
                </Entypo>
                 <Entypo name="dot-single" size={18} color="black" >
                <Text style={{fontSize:15,color:'#00ff7f'}}>
                    Tensor Flow
                </Text>
                </Entypo>
                 <Entypo name="dot-single" size={18} color="black" >
                <Text style={{fontSize:15,color:'#00ff7f'}}>
                    OpenCv
                </Text>
                </Entypo>
                 <Entypo name="dot-single" size={18} color="black" >
                <Text style={{fontSize:15,color:'#00ff7f'}}>
                    MatplotLib
                </Text>
                </Entypo>
        <View style={{ paddingTop:30, backgroundColor:'#fff'}}>
        <Text style={{fontSize:18, fontWeight:'bold'}}>why tensor flow?
        </Text>
        <FontAwesome5 name="bullseye" size={14} color="black">
        <Text style={styles.textInput}>
        TensorFlow is an open-source library developed by Google primarily for deep learning applications. It also supports traditional machine learning. TensorFlow was originally developed for large numerical computations without keeping deep learning in mind. However, it proved to be very useful for deep learning development as well, and therefore Google open-sourced it.
TensorFlow accepts data in the form of multi-dimensional arrays of higher dimensions called tensors. Multi-dimensional arrays are very handy in handling large amounts of data.

TensorFlow works on the basis of data flow graphs that have nodes and edges. As the execution mechanism is in the form of graphs, it is much easier to execute TensorFlow code in a distributed manner across a cluster of computers while using GPUs.
        </Text>
</FontAwesome5>
</View>
<View style={{ paddingTop:30, backgroundColor:'#fff'}}>
       <Text style={{fontSize:18, fontWeight:'bold'}}>why Keras?</Text> 
        <FontAwesome5 name="bullseye" size={14} color="black">
        <Text style={styles.textInput}>
     In this project keras actually a application programable interface of tensor flow.Keras actually a data pipeline direct function or helper built into as well.If we use this we don't need to build labels and classes.It's actually going to do a bunch of preprocessing out of the box and its resize your images as well.

        </Text>
</FontAwesome5>
</View>
<View style={{ paddingTop:30, backgroundColor:'#fff'}}>
<Text style={{ fontSize:18, fontWeight:'bold'}}>Why CNN?
</Text>
<FontAwesome5 name="bullseye" size={14} color="black">
        <Text style={styles.textInput}>
       CNN is basically a convolutional neural network.It is advanced deep learning algorithm which is used for image classifier.
       There are saveral layer which we apply in this project are:
        </Text>
</FontAwesome5>
</View>
<View style={{flex:1,padding:16, paddingTop:30, backgroundColor:'#fff'}}>
<Table borderStyle={{borderWidth:2, borderColor:'#00008b'}}>
    <Row data={tableHead} style={{height:50, backgroundColor:'#1e90ff'}} textStyle={{margin:6,color:'white'}}/>
    <Rows data={tableData} style={{height:50, backgroundColor:'#fff',}} />
    <Row data={tableFooter} style={{height:60, backgroundColor:'#1e90ff'}}  textStyle={{margin:3,color:'white'}}/>
 
</Table>
</View>
<View style={{ paddingTop:30, backgroundColor:'#fff'}}>
<Text style={{ fontSize:18, fontWeight:'bold'}}>Plotting Performance</Text>
<View style={{flexDirection:'column',justifyContent:'center',alignContent:'center' }}>
<Image
        style={styles.Image}
        source={require('../assets/graph1.png')}
      />
      <Image
        style={styles.Image}
        source={require('../assets/graph2.png')}
      />
      </View>
</View>

<View style={{ paddingTop:30, backgroundColor:'#fff'}}>
<Text style={{ fontSize:18, fontWeight:'bold'}}>Evaluate Performance</Text>
<PieChart
  data={dataPie}
  width={screenWidth}
  height={200}
  chartConfig={chartConfig}
  accessor={"population"}
  backgroundColor={"transparent"}
  center={[10, 10]}
  absolute
/>
</View>

      </View>
      </ScrollView>
      </View>

      
  )
}

  const styles = StyleSheet.create({
    main: {
        flex: 1, 
        backgroundColor: '#1e90ff',
      },
      header: {
        flex: 0.2 ,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
      },
      footer: {
          flex: 0.8,
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
        justifyContent:'center',
        alignSelf:'center',
        padding:40,
        margin:10,
        height:150,
        width:210
    }
})