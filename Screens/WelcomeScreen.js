import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import SantaAnimation from '../components/SantaClaus.js';
import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends Component {
  constructor(){
    super()
    this.state={
      emailId : '',
      password: '',
      isModalVisible: "false",
      firstName:"",
      LastName:"",
      address:"",
      contact:"",
      confirmPassword:"",
    }
  }

  userSignUp = (emailId, password,confirmPassword) =>{
    if(password !== confirmPassword){
        return Alert.alert("password doesn't match\nCheck your password.")
    }else{
      firebase.auth().createUserWithEmailAndPassword(emailId, password)
      .then(()=>{
        db.collection('users').add({
          first_name:this.state.firstName,
          last_name:this.state.lastName,
          contact:this.state.contact,
          email_id:this.state.emailId,
          address:this.state.address
        })
        return  Alert.alert(
             'User Added Successfully',
             '',
             [
               {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
             ]
         );
      })
      .catch((error)=> {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
      });
    }
  }

  userLogin = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password)
    .then(()=>{
      this.props.navigation.navigate('DonateBooks')
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  }

  showModal = ()=>{
    return(
      <Modal visible = {this.state.isModalVisible}
      transparent = {true}
      animationType = "fade">
        <View>
          <ScrollView>
            <KeyboardAvoidingView>
              <Text>
                Registration
              </Text>
              <TextInput
              style={styles.formTextInput}
              placeholder = {"First Name"}
              onChangeText = {(text)=>{
                this.setState({firstName:text})
              }}
              />

              <TextInput
              style={styles.formTextInput}
              placeholder = {"Last Name"}
              onChangeText = {(text)=>{
                this.setState({lastName:text})
              }}
              />

              <TextInput
              style={styles.formTextInput}
              placeholder = {"Address"}
              multiline = {true}
              onChangeText = {(text)=>{
                this.setState({address:text})
              }}
              />

              <TextInput
              style={styles.formTextInput}
              placeholder = {"Phone Number"}
              keyboardType = {'numeric'}
              maxLength = {13}
              onChangeText = {(text)=>{
                this.setState({contact:text}) 
              }}
              />

              <TextInput
              style={styles.formTextInput}
              placeholder = {"example@gmail.com"}
              keyboardType = {'email-address'}
              onChangeText = {(text)=>{
                this.setState({emailId:text})
              }}
              />

              <TextInput
              style={styles.formTextInput}
              placeholder = {"Password"}
              secureTextEntry = {true}
              onChangeText = {(text)=>{
                this.setState({password:text})
              }}
              />

              <TextInput
              style={styles.formTextInput}
              placeholder = {"Confirm Password"}
              secureTextEntry = {true}
              onChangeText = {(text)=>{
                this.setState({confirmPassword:text})
              }}
              />

              <TouchableOpacity 
              style={styles.registerButton}
              onPress={()=>
                this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
              }
            >
            <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.registerButton} onPress = {()=>this.setState({isModalVisible:false})}>
                <Text style={styles.registerButtonText}> Cancel </Text>
              </TouchableOpacity>

            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    )
  }

  render(){
    return(
      <View style={styles.container}>

        <View style={styles.profileContainer}>
          <Text style={styles.title}>Barter</Text>
        </View>

        <View styles={styles.modulestyle}>

          {this.showModal()}

        </View>
        
        <View style={styles.buttonContainer}>
          <TextInput
          style={styles.loginBox}
          placeholder="example@gmail.com"
          placeholderTextColor = "#ffff"
          keyboardType ='email-address'
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />

        <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="password"
          placeholderTextColor = "#ffff"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
          <TouchableOpacity
            style={[styles.button,{marginBottom:20, marginTop:20}]}
            onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{this.userSignUp(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F8BE85'
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title :{
    fontSize:70,
    fontWeight:'350',
    paddingBottom:35,
    color : '#ff3d00'
  },
  loginBox:{
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor : '#ff8a65',
    fontSize: 20,
    margin:10,
    paddingLeft:10
  },
  button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ff9800",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText:{
    color:'#ffff',
    fontWeight:'200',
    fontSize:20
  },
  buttonContainer:{
    flex:1,
    alignItems:'center'
  },
  modulestyle:{
    
  },
  registerButton:{
    width:200,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:10,
    marginTop:30
  },
  registerButtonText:{
    color:'#ff5722',
    fontSize:15,
    fontWeight:'bold'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10
  },
  
})