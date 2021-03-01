import React, { useState } from 'react'

import { Layout, Text, Input, IndexPath, Select, SelectItem, Card, Avatar, Button } from '@ui-kitten/components';
import { RNCamera } from 'react-native-camera';
import Geolocation from '@react-native-community/geolocation';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

let camera = null;

const SelfieLogin = () => {
  const RenderOption = (title) => (
    <SelectItem key={title} title={title}/>
  );

  const saveImage = () => {
    const namefile = " "+new Date();

    const reference = storage().ref(namefile);

    const pathTofile = gambar;
     // uploads file
    reference.putFile(pathToFile).then(() => {
         console.log("Uploaded")
         storage()
         .ref(namefile)
         .getDownloadURL().then((downloadData) =>{
            console.log(downloadData)
            console.log(namefile)
            saveData(downloadData,namefile)
         
         })
    });
  }

  const saveData = (downloadData, nameImage) => {
     firestore()
    .collection('Users')
    .add({
      name: nama,
      gps: gps,
      gambar: downloadData,
    })
    .then(() => {
      console.log('User added!');
    });
  }

  const takePicture = async () => {
    console.log("test")
        if (camera) {
          const options = { quality: 0.5, base64: true };
          const data = await camera.takePictureAsync(options);
          console.log(JSON.stringify(data));
          setGambar(data.uri)
          console.log(data.uri);
        }
  };

  QrLogin = () => {
    this.props.navigation.navigate("QRCode");
  };

  return(
    <SafeAreaView style={styles.container}>
       <ScrollView style={styles.scrollView}>
          <Layout style={styles.container}>
          <RNCamera
            ref={ref => {
              camera = ref;
            }}
            style={{flexDirection: 'row', justifyContent: 'center', height:100 , width:100 }}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            />
            <Card style={styles.containerPicture}>
              <Button onPress={() => takePicture()}>
                Login
              </Button>
            </Card>
            <Text>-----------OR--------</Text>
            <Card style={styles.containerPicture}>
              <Button onPress={() => QRLogin()}>
                Scan QR Code Here
              </Button>
            </Card>
          </Layout>
       </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

    },
    
    layout: {
        margin: 15,
        alignItems: 'center',
    },

    containerPicture: {


        flexDirection: 'column',
        justifyContent: 'space-between'

    },
    avatar: {
        alignItems: 'center',
        margin: 8,
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
      },

});