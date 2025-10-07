import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Static image imports (keeps component clean and avoids reloading on each render)
const IMAGES = {
  show: require('../assets/images/show.png'),
  hide: require('../assets/images/hide.png'),
  google: require('../assets/images/google.png'),
  facebook: require('../assets/images/facebook.png'),
  github: require('../assets/images/github.png'),
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1A1A',
    margin: 25,
    padding: 25,
    borderRadius: 25,
  },
  container_field: {
    marginVertical: 5,
  },
  field_text: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 15,
    paddingVertical: 5,
  },
  field_input: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#FFFFFF',
    borderColor: '#FFFFFF',
    fontWeight: 'bold',
    width: '80%',
    borderWidth: 2.5,
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
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
    marginRight: 20,
  },
  btn_text: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  pass_icon: {
    width: 20,
    height: 20,
    position: 'relative', right: 5
  },
  signup_icons: {
    width: 50,
    height: 50,
    marginHorizontal: 25,
  },
  line: {
    height: 2.5,
    backgroundColor: '#FFFFFF',
    marginTop: 25,
    marginBottom: 20,
  },
  auth_options: {
    flexDirection: 'row',
    marginTop: 10,
  },
  center: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  forgot_text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default function Login() {
  const [hidden, setHidden] = useState(true);
  const [user, setUser] = useState('');
  const [passwd, setPasswd] = useState('');

  const navigation = useNavigation<any>();

  const togglePasswordVisibility = () => setHidden(prev => !prev);

  const handleLogin = () => {
    console.log(`Login Pressed: ${user} ${passwd}`);
    // Handle auth here
  };

  const socialLogins = [
    { icon: IMAGES.google, label: 'Google' },
    { icon: IMAGES.facebook, label: 'Facebook' },
    { icon: IMAGES.github, label: 'GitHub' },
  ];

  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#000' }}>
      <View style={styles.container}>
        {/* Username Field */}
        <View style={styles.container_field}>
          <Text style={styles.field_text}>Enter Your UserName/Email</Text>
          <TextInput
            style={styles.field_input}
            placeholder="UserName/Email"
            onChangeText={setUser}
            placeholderTextColor="#FFFFFF"
          />
        </View>

        {/* Password Field */}
        <View style={styles.container_field}>
          <Text style={styles.field_text}>Enter Your Password</Text>
          <View style={styles.field_input}>
            <TextInput
              style={styles.input_text}
              placeholder="Password"
              onChangeText={setPasswd}
              placeholderTextColor="#FFFFFF"
              secureTextEntry={hidden}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Image source={hidden ? IMAGES.show : IMAGES.hide} style={styles.pass_icon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.forgot_text}>Forgot Password?</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btn_text}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.btn_text}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.line} />

        {/* Social Auth */}
        <View style={styles.center}>
          <Text style={styles.field_text}>Sign Up With</Text>
          <View style={styles.auth_options}>
            {socialLogins.map(({ icon, label }) => (
              <TouchableOpacity
                key={label}
                onPress={() => console.log(`Sign Up with ${label}`)}
              >
                <Image source={icon} style={styles.signup_icons} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
