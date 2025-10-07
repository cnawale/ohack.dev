import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000'
  },
  container: {
    backgroundColor: '#1A1A1A',
    margin: 25,
    padding: 25,
    borderRadius: 25
  },
  container_field: {
    marginVertical: 5
  },
  field_text: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 15,
    paddingVertical: 5
  },
  field_input: {
    alignSelf: 'flex-start',
    color: '#FFFFFF',
    borderColor: '#FFFFFF',
    fontWeight: 'bold',
    width: '80%',
    borderWidth: 2.5,
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 10
  },
  btn: {
    backgroundColor: '#028A0F',
    padding: 10,
    width: 100,
    borderRadius: 10,
    marginRight: 20
  },
  btn_text: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold'
  },
  pass_icon: {
    width: 20,
    height: 20,
    marginVertical: '50%',
    position: 'relative',
    right: '50%'
  },
  signup_icons: {
    width: 50,
    height: 50,
    marginHorizontal: 25
  },
  picker_input: {
    color: '#FFFFFF', 
    position: 'relative', 
    bottom: 7
  },
  picker_item: {
    fontSize: 15,
    fontWeight: 'bold'
  }
})

export default function Register() {

  const show = require('../assets/images/show.png')
  const hide = require('../assets/images/hide.png')

  const [hidden, setHidden] = useState(true);
  const [values, setValues] = useState({
      first: 'John',
      last: 'Doe',
      email: 'John.Doe@gmail.com',
      passwd: 'pass',
      cpasswd: 'cpass',
      role: 'None'
  })
  // const bgImage = require('../assets/images/nmtsa.jpg')

  const changeHandler = (name: any,val: any) => {setValues({...values, [name]: val})}

  const check = (passwd: String, cpasswd: String) => {
    const match = (passwd == cpasswd) && passwd.trim() != '' ? true : false
    const chars = Array.from(cpasswd);

    const min = (chars.length >= 6) ? true : false
    const upper = (chars.some(char => /[A-Z]/.test(char))) ? true : false
    const special = (chars.some(char => /[!@#$%^&*(),.?":{}|<>]/.test(char))) ? true : false
    const num = (chars.some(char => /[0-9]/.test(char))) ? true : false

    return [match, min, upper, special, num]
  }

  return (
    // <ImageBackground source={bgImage} style={{ flex: 1 }}>
    <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#000000'}}>

      <View style={styles.container}>

        <View style={[styles.container_field,{flexDirection:'row'}]}>
          <View style={{width:'45%'}}>
            <Text style={styles.field_text}>First Name</Text>
            <TextInput style={styles.field_input} placeholder={'First'} onChangeText={(val)=>changeHandler('first',val)} placeholderTextColor={'#FFFFFF'}></TextInput>
          </View>
          <View style={{width:'45%'}}>
            <Text style={styles.field_text}>Last Name</Text>
            <TextInput style={styles.field_input} placeholder={'Last'} onChangeText={(val)=>changeHandler('last',val)} placeholderTextColor={'#FFFFFF'}></TextInput>
          </View>
        </View>

        <View style={styles.container_field}>
          <Text style={styles.field_text}>Enter Your Email</Text>
          <TextInput style={styles.field_input} placeholder={'Email'} onChangeText={(val)=>changeHandler('email',val)} placeholderTextColor={'#FFFFFF'}></TextInput>
        </View>

        <View style={styles.container_field}>
          <Text style={styles.field_text}>Enter Your Password</Text>
          <TextInput style={styles.field_input} placeholder={'Password'} onChangeText={(val)=>changeHandler('passwd',val)} placeholderTextColor={'#FFFFFF'} secureTextEntry={true} autoCorrect={false} autoCapitalize='none'></TextInput>
        </View>

        <View style={styles.container_field}>
          <Text style={styles.field_text}>Re-Enter Your Password</Text>

          <View style={[styles.field_input, { flexDirection: 'row' }]}>
            <TextInput style={{ flex: 1, color: '#FFFFFF' }} placeholder='Confirm Password' onChangeText={(val)=>changeHandler('cpasswd',val)} placeholderTextColor={'#FFFFFF'} secureTextEntry={hidden}></TextInput>
            <TouchableOpacity activeOpacity={0.8} onPress={() => { setHidden(!hidden) }}>
              <Image
                source={hidden ? show : hide}
                style={styles.pass_icon}
              />
            </TouchableOpacity>
          </View>

          <Text style={{ color: check(values['passwd'], values['cpasswd'])[0] ? '#028A0F' : '#ff0000', fontWeight: 'bold', marginTop: 5 }}>{check(values['passwd'], values['cpasswd'])[0] ? 'Passwords Matching' : 'Passwords Not Matching'}
          </Text>
        </View>

        <View style={[styles.container_field, { marginBottom: 15 }]}>
          <Text style={styles.field_text}>Enter User Role</Text>
          <View style={[styles.field_input,{height:45}]}>
            <Picker
              selectedValue={values['role']}
              style={styles.picker_input}
              onValueChange={(itemValue, itemIndex) => changeHandler('role',itemValue)}
              dropdownIconColor='#028A0F'
            >
              <Picker.Item style={styles.picker_item} label='-- Select Role --' value='None' />
              <Picker.Item style={styles.picker_item} label='Administrator' value='AD' />
              <Picker.Item style={styles.picker_item} label='HealthCare Professional' value='HCP' />
              <Picker.Item style={styles.picker_item} label='Client/User' value='CF' />
            </Picker>
          </View>

        </View>

        <TouchableOpacity activeOpacity={0.7} onPress={() => { console.log(`SignUp Pressed ${JSON.stringify(values)}`) }} style={styles.btn}>
          <Text style={styles.btn_text}>Sign Up</Text>
        </TouchableOpacity>

      </View>
    </View>
    // </ImageBackground>
  )
}
