import React, { useState, useEffect } from 'react'

import { Layout, Text, Input, IndexPath, Select, SelectItem, Card, Avatar, Button, Datepicker, Icon} from '@ui-kitten/components';
import { RNCamera } from 'react-native-camera';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import firestore from '../SelfieLogin/node_modules/@react-native-firebase/firestore';
import storage from '../SelfieLogin/node_modules/@react-native-firebase/storage';
import DatePicker from 'react-native-datepicker';

const CalendarIcon = (props) => (
    <Icon {...props} name='calendar'/>
)
const lstizin = ["IzinSakit", "IzinBencana"]
let camera = null;
const Absen = () => {
    const [izin, setIzin] = useState(0)
    const [dateawal, setDateAwal] = React.useState(new Date())
    const [dateakhir, setDateAkhir] = React.useState(new Date())
    const [perihal, setPerihal] = useState(" ")
    const [ket, setKet] = useState(" ")
    const [gambar, setGambar] = useState('https://i.pinimg.com/originals/46/01/f7/4601f773e41c094849e10288a7aec5e8.png')
    

    const RenderOption = (title) => (
        <SelectItem key={title}title={title}></SelectItem>
    );

    const saveImage = () => {
        const namefile = " "+ new Date();
        const reference = store().ref(namefile);
        const pathTofile = gambar;

        //upload file
        reference.putFile(pathTofile).then(() => {
            console.log("Uploaded")
            storage().ref(namefile)
            .getDownloadURL().then((downloadData) => {
                console.log(downloadData)
                console.log(namefile)
                saveData(downloadData,namefile)
            })
        });
    }

    const saveData = (downloadData, nameImage) => {
        firestore().collection('Users')
        .add({
            izin: lstizin[izin.row],
            perihal: perihal,
            keterangan: ket,
            gambar: downloadData,
            nameImage: nameImage,
        }).then(() => {
            console.log("Surat Izin telah dibuat");
        })
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

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Layout style={styles.container}>
                    <Select style={styles.layout}
                        selectedIndex={new IndexPath(izin)}
                        placeholder='Default'
                        value={lstizin[izin.row]}
                        onSelect={index => setIzin(index)}>
                        {lstizin.map(RenderOption)}
                    </Select>
                   <DatePicker 
                     label='Tanggal Awal izin'
                     caption = 'caption'
                     placeholder='Pick Date'
                     date={dateawal}
                     onSelect={nextDate => setDateAwal(nextDate)}
                     accessoryRight={CalendarIcon}
                   />
                    <DatePicker 
                     label='Tanggal Akhir izin'
                     caption = 'caption'
                     placeholder='Pick Date'
                     date={dateakhir}
                     onSelect={nextDate => setDateAkhir(nextDate)}
                     accessoryRight={CalendarIcon}
                   />
                    <Input style={styles.layout}
                        placeholder="Tulis Perihal"
                        value={perihal}
                        onChangeText={txtPerihal => setPerihal(txtPerihal)}
                    ></Input>
                    <Input style={styles.layout}
                        placeholder="Tulis Perihal"
                        value={perihal}
                        onChangeText={txtPerihal => setPerihal(txtPerihal)}
                    ></Input>
                    <RNCamera 
                        ref={ref => {
                            camera = ref;
                        }}
                        style={{flexDirection: 'row', justifyContent: 'center', height:100, width:100}}
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
                        <Avatar style={styles.avatar} size="giant" source={{ uri: gambar}}></Avatar>
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
        minHeight: 360,

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

export default Absen