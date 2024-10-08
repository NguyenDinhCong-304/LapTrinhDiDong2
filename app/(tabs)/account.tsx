import * as React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const LoginScreen = (props: any) =>{
    const {navigation}=props;
    const [text, onChangeText]= React.useState('')
    const [password, setPassword] = React.useState('')
  
    const handleChangeText = (text: string | any[]) => {
      // Tạo một chuỗi mới với độ dài bằng với text, chỉ chứa các dấu *
      const maskedPassword = '*'.repeat(text.length);
      setPassword(maskedPassword);
    };
    return (
       <View style ={{backgroundColor: 'lightblue',flex: 1}}>
        <View style={{marginHorizontal:25, marginVertical:'auto',alignItems:'center'}}>
          <TextInput 
            style = {styles.textInput} 
            onChangeText={onChangeText} 
            value={text}
            placeholder="Tên đăng nhập"/>
          <TextInput 
            style = {styles.textInput} 
            secureTextEntry 
            onChangeText={handleChangeText} 
            value={password} 
            placeholder="Mật khẩu"/>
  
          <Button title='Đăng nhập'/>
          <Text style = {styles.text} >Bạn chưa có tài khoản?
            <Text style={{color:'red'}} onPress= {()=> navigation.navigate("Register")}>Đăng ký</Text>
          </Text>
        </View>
      </View>
    );
  }
  const styles = StyleSheet.create({
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

const RegisterScreen = () =>{
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const [text, onChangeText]= React.useState('')
    const [password, setPassword]= React.useState('')
    const [password2, setPassword2]= React.useState('')
    const handleChangeText = (text: string | any[])=> {
      const maskedPassword = '*'.repeat(text.length);
      setPassword(maskedPassword);
    }
    const handleChangeText1 = (text: string | any[])=> {
      const maskedPassword = '*'.repeat(text.length);
      setPassword2(maskedPassword);
    }
  
    return (
        <View style ={{backgroundColor: 'lightblue',flex: 1}}>
            <View style={{margin:'auto', alignItems:'center'}}>
                <TextInput 
                style={styles.textInput}
                onChangeText={onChangeText} 
                value={text}
                placeholder='Tên đăng nhập'/>
                <TextInput 
                style={styles.textInput}
                onChangeText={handleChangeText} 
                value={password}
                placeholder='Nhập mật khẩu'/>
                <TextInput 
                style={styles.textInput}
                onChangeText={handleChangeText1} 
                value={password2}
                placeholder='Nhập lại mật khẩu'/>
                <Button 
                title='Đăng ký'/>
                <Text style={styles.text}>Bạn đã có tài khoản? 
                    <Text style={{color:'red'}} onPress= {()=> navigation.navigate('Login')}>Đăng nhập</Text>
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