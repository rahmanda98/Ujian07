import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  PermissionsAndroid,
  Platform,
  ToastAndroid
} from 'react-native';

import styles from './style';
import auth from '../LoginPage/node_modules/@react-native-firebase/auth';
import database from '@react-native-firebase/database';

class Home extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {id:1, title: "Check In", image:"https://img.icons8.com/color/48/000000/checked--v1.png"},
                {id:2, title: "Check Out", image:"https://img.icons8.com/dusk/70/000000/checklist.png"} ,
                {id:3, title: "Ijin", image:"https://img.icons8.com/color/48/000000/calendar--v1.png"} ,
                {id:3, title: "History", image:"https://img.icons8.com/color/48/000000/clock--v1.png"} ,
                {id:4, title: "Signout", image:"https://img.icons8.com/color/70/000000/shutdown.png"} ,
            ],
            counter : 1,
            email: ""
        };
    }

    componentDidMount(){
        this._isMounted = true;
        auth().onAuthStateChanged((user) => {
            if (user) {
                if (this._isMounted) {
                    console.log(user.email);
                    this.setState({email: user.email});
                }
            }else{
                this.props.navigation.reset({
                    index: 0,
                    route: [{name: 'Login'}],
                });
            }
        })
    }

    componentWillMount(){
        this._IsMounted = false
    }

    clickEventListener = (item) =>{
        Alert.alert(item.title)
        switch (item.title) {
            case "Ijin":
                this.props.navigation.navigate("Absen")
                break;
        
            case "Signout":
                this.logout()
                break;

            case "History":
                this.props.navigation.navigate("History")
                break;    
        }
    }

    logout = () =>{
        console.log("signOut")
        auth().signOut()
        .then(() =>{
          console.log("User signed out!!!!")
          this.props.navigation.reset({
              index: 0,
              route: [{name:"login"}],
          });
        }).catch((error) => {
            this.props.navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
            <FlatList style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={this.state.data}
            horizontal={false}
            numColumns={2}
            keyExtractor= {(item) => {
              return item.id;
            }}
            renderItem={({item}) => {
              return (
                <TouchableOpacity style={styles.card} onPress={()=>this.clickEventListener(item)}>
                  <View style={styles.cardFooter}></View>
                  <Image style={styles.cardImage} source={{uri:item.image}}/>
                  <View style={styles.cardHeader}>
                    <View style={{alignItems:"center", justifyContent:"center"}}>
                      <Text style={styles.title}>{item.title}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }}/>
            </View>
        );
    }
}

export default Home;