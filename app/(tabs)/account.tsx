import * as React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '.';

const LoginScreen = (props: any) =>{
    const {navigation}=props;
    const [text, onChangeText]= React.useState('')
    const [password, setPassword] = React.useState('')
  
    return (
       <View style ={{backgroundColor: 'lightblue',flex: 1}}>
        <View style={styles.image}>
            <Image style={styles.logo} source = {require('../../assets/images/Logolaptopnew.jpg')}/>
        </View>
        <View style={{marginTop:30, alignItems:'center'}}>
          <TextInput 
            style = {styles.textInput} 
            onChangeText={onChangeText} 
            value={text}
            placeholder="Tên đăng nhập"/>
          <TextInput 
            style = {styles.textInput} 
            secureTextEntry 
            onChangeText={setPassword} 
            value={password} 
            placeholder="Mật khẩu"/>
  
          <Button title='Đăng nhập'/>
          <Text style = {styles.text} >Bạn chưa có tài khoản?
            <Text style={{color:'red'}} onPress= {()=> navigation.navigate("Register")}> Đăng ký</Text>
          </Text>
        </View>
      </View>
    );
  }

const RegisterScreen = () =>{
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const [text, onChangeText]= React.useState('')
    const [password, setPassword]= React.useState('')
    const [password2, setPassword2]= React.useState('')
  
    return (
        <View style ={{backgroundColor: 'lightblue',flex: 1}}>
            <View style={styles.image}>
            <Image style={styles.logo} source = {require('../../assets/images/Logolaptopnew.jpg')}/>
        </View>
        <View style={{marginTop:30, alignItems:'center'}}>
                <TextInput 
                style={styles.textInput}
                onChangeText={onChangeText} 
                value={text}
                placeholder='Tên đăng nhập'/>
                <TextInput 
                style={styles.textInput}
                secureTextEntry
                onChangeText={setPassword} 
                value={password}
                placeholder='Nhập mật khẩu'/>
                <TextInput 
                style={styles.textInput}
                secureTextEntry
                onChangeText={setPassword2} 
                value={password2}
                placeholder='Nhập lại mật khẩu'/>
                <Button 
                title='Đăng ký'/>
                <Text style={styles.text}>Bạn đã có tài khoản? 
                    <Text style={{color:'red'}} onPress= {()=> navigation.navigate('Login')}> Đăng nhập</Text>
                </Text>
            </View>
       </View>
    );
  }
  const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>     
        <Stack.Screen name="Login" component={LoginScreen} options={{title:'Đăng nhập' ,headerTitleAlign:'center'}} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{title:'Đăng ký' ,headerTitleAlign:'center'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  image:{
    alignItems:'center',
    justifyContent:'center',
    marginTop: 150,
     
  },
  logo:{
      width: 100,
      height: 100,
  },
    textInput:{
      height:50,
      width:300,
      borderWidth:1,
      margin:10,
      padding:20,
      backgroundColor:'white',
      borderColor:"#ccc"
    },
    text:{
      textAlign: 'center',
      padding: 10 
    },
    container:{
      flex: 1
      
    }
});