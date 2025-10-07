import axios from 'axios';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const IMAGES = {
  show: require('../assets/images/show.png'),
  hide: require('../assets/images/hide.png')
};

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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInputContainer: {
    width: '48%',
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
    color: '#FFFFFF',
    borderColor: '#FFFFFF',
    fontWeight: 'bold',
    width: '100%',
    borderWidth: 2.5,
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 10
  },
  input_text: {
    flex: 1,
    color: '#FFFFFF',
  },
  btn: {
    backgroundColor: '#028A0F',
    padding: 10,
    width: 100,
    borderRadius: 10,
    marginTop: 15,
    alignSelf: 'flex-start'
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
    position: 'relative', right: 5
  },
  password_input_container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  picker_input: {
    color: '#FFFFFF',
    position: 'relative',
    bottom: 5
  },
  picker_item: {
    fontSize: 15,
    fontWeight: 'bold'
  },
});

export default function Register() {
  const [hidden, setHidden] = useState(true);

  const [values, setValues] = useState({
    first: '',
    last: '',
    email: '',
    passwd: '',
    cpasswd: '',
    role: 'None'
  });

  const changeHandler = (name: string, val: string) => {
    setValues(prev => ({ ...prev, [name]: val }));
  };

  const validatePasswords = (pass: string, confirm: string) => {
    const trimmed = pass.trim();
    const chars = Array.from(confirm);
    return {
      match: trimmed !== '' && pass === confirm,
      min: chars.length >= 6,
      upper: chars.some(c => /[A-Z]/.test(c)),
      special: chars.some(c => /[!@#$%^&*(),.?":{}|<>]/.test(c)),
      num: chars.some(c => /[0-9]/.test(c)),
    };
  };

  const passwordCheck = validatePasswords(values.passwd, values.cpasswd);

  const handleSubmit = () => {
    console.log('SignUp Pressed:', values);
    // Add actual form handling or navigation

    const field_check = Object.values(values).some(val => val == '' || val == 'None')
    if (field_check) {
      alert('Please Enter All Required Fields')
      return
    }

    axios.post('http://10.157.164.41:8080/signup', values)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>

        {/* First and Last Name */}
        <View style={[styles.container_field, styles.rowContainer]}>
          <View style={styles.halfInputContainer}>
            <Text style={styles.field_text}>First Name</Text>
            <TextInput
              style={styles.field_input}
              placeholder="First"
              placeholderTextColor="#FFFFFF"
              onChangeText={val => changeHandler('first', val)}
            />
          </View>

          <View style={styles.halfInputContainer}>
            <Text style={styles.field_text}>Last Name</Text>
            <TextInput
              style={styles.field_input}
              placeholder="Last"
              placeholderTextColor="#FFFFFF"
              onChangeText={val => changeHandler('last', val)}
            />
          </View>
        </View>

        {/* Email */}
        <View style={styles.container_field}>
          <Text style={styles.field_text}>Enter Your Email</Text>
          <TextInput
            style={styles.field_input}
            placeholder="Email"
            placeholderTextColor="#FFFFFF"
            onChangeText={val => changeHandler('email', val)}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        {/* Password */}
        <View style={styles.container_field}>
          <Text style={styles.field_text}>Enter Your Password</Text>
          <TextInput
            style={styles.field_input}
            placeholder="Password"
            placeholderTextColor="#FFFFFF"
            onChangeText={val => changeHandler('passwd', val)}
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>

        {/* Confirm Password */}
        <View style={styles.container_field}>
          <Text style={styles.field_text}>Re-Enter Your Password</Text>

          <View style={[styles.field_input, { flexDirection: 'row' }]}>
            <TextInput
              style={{ flex: 1, color: '#FFFFFF' }}
              placeholder="Confirm Password"
              onChangeText={(val) => changeHandler('cpasswd', val)}
              placeholderTextColor="#FFFFFF"
              secureTextEntry={hidden}
            />
            <TouchableOpacity activeOpacity={0.8} onPress={() => setHidden(!hidden)}>
              <Image source={hidden ? IMAGES.show : IMAGES.hide} style={styles.pass_icon} />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: passwordCheck.match ? '#028A0F' : '#FF0000',
              fontWeight: 'bold',
              marginTop: 5
            }}
          >
            {passwordCheck.match ? 'Passwords Matching' : 'Passwords Not Matching'}
          </Text>
        </View>

        {/* Picker */}
        <View style={styles.container_field}>
          <Text style={styles.field_text}>Enter User Role</Text>
          <View style={[styles.field_input, { height: 40, paddingHorizontal: 5, paddingBottom: 45 }]}>
            <Picker
              selectedValue={values.role}
              onValueChange={(itemValue) => changeHandler('role', itemValue)}
              style={styles.picker_input}
              dropdownIconColor="#028A0F"
            >
              <Picker.Item style={styles.picker_item} label="-- Select Role --" value="None" />
              <Picker.Item style={styles.picker_item} label="Administrator" value="Administrator" />
              <Picker.Item style={styles.picker_item} label="HealthCare Professional" value="HealthCare Professional" />
              <Picker.Item style={styles.picker_item} label="Client/User" value="User" />
            </Picker>
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btn_text}>Sign Up</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
