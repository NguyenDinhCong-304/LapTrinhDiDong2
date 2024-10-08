import { Image, StyleSheet, View, TextInput, Text, FlatList, Button, ScrollView } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from 'expo-router';
const DATA= [
  { id: '1',
    title: 'Lenovo',
    price: '17.990.000',
    image:require("../../assets/images/lenovo-ideapad-slim-3-15irh8-i7-83em003fvn-thumb-400x400.jpg"),
    description:'123'
  },
  { id: '2',
    title: 'Dell',
    price: '16.990.000',
    image:require("../../assets/images/Dell.jpg"),
    description:'123'
  },
  { id: '3',
    title: 'HP',
    price: '17.990.000',
    image:require("../../assets/images/HP.jpg"),
    description:'123'
  },
  { id: '4',
    title: 'Macbook',
    price: '21.990.000',
    image:require("../../assets/images/Macbook.jpg"),
    description:'123'
  },
  {
    id:'5',
    title:'Aus',
    price:'19.990.000',
    image:require("../../assets/images/asus.webp"),
    description:'123'
  },
  {
    id:'5',
    title:'MSI',
    price:'18.990.000',
    image:require("../../assets/images/MSI.jpg"),
    description:'123'
  },
]


const DetailScreen = () => {
  
  const navigation : NavigationProp<RootStackParamList> = useNavigation();
  const route : RouteProp<RootStackParamList, 'Detail'> = useRoute();
  return (
    <ScrollView style={styles.container}>
      <Image source={route.params?.image} style={styles.image} />
      <Text style={styles.title}>{route.params?.title}</Text>
      <Text style={styles.price}>Giá: {route.params?.price}VNĐ</Text>
      <Text style={styles.description}>{route.params?.description}</Text>
      <Button title="Thêm vào giỏ hàng" onPress={() => {/* Xử lý thêm vào giỏ hàng */}} />
    </ScrollView>
  );
};


const HomeScreen=(props:any) => {
  const navigation: NavigationProp<RootStackParamList>= useNavigation();
  return (
    <View style={styles.container}>
      
      <View style={styles.inputContainer}>
       
          <Image
            style={styles.imageLogo}
            source={require('../../assets/images/Logolaptopnew.jpg')}
          />
        
        <View style={styles.input}>
          <View style={styles.icons} >
              <AntDesign name="search1" size={24} color="gray" />
          </View>
          <TextInput
            style={styles.textInput}
            placeholder='Search'
          />
        </View>
        <View style={styles.icons1}>    
          <AntDesign name="bars" size={24} color="gray" />
        </View>
      </View>
      <Image 
        style={{width:'auto'}}
        source={require('../../assets/images/Slider.jpg')}
      /> 
      <Text style={{fontSize:20, fontWeight:'600', paddingTop: 10, paddingLeft:10}}>Danh mục:</Text>
      <View style={styles.borderContainer}>
        <Text style={styles.boder}>Lenovo</Text>
        <Text style={styles.boder}>Macbook</Text>
        <Text style={styles.boder}>Dell</Text>
        <Text style={styles.boder}>HP</Text>
      </View>
      <View>
        <Text style={{fontSize:20, fontWeight:'600', paddingTop: 10, paddingLeft:10}}>Sản phẩm mới:</Text>
        <FlatList
          data={DATA}
          numColumns={2}
          keyExtractor={(item)=>item.id}
          renderItem={({item})=> 
            <View style={styles.foot}>
              <TouchableOpacity onPress={()=>navigation.navigate('Detail',  item)}>
                <Image style={{width: 150, height: 100, margin: 10}} source={item.image}/>
              <View>
                <Text style={{textAlign:'center'}}>{item.title}</Text>
                <Text style={{textAlign:'center'}}>Giá:{item.price}</Text>
              </View>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'lightblue',
    flex: 1,
  },
  inputContainer:{
    flexDirection:'row',
    alignItems: 'center',
    marginVertical:20,
    marginHorizontal: 10,
    marginTop: 20,
  },
  input:{
    backgroundColor: 'white',
    flexDirection:'row',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 10,
    width: 280
  },
  icons:{
    marginHorizontal: 15,
    flexDirection:'row',
  },
  icons1:{
    marginHorizontal: 10,
    flexDirection:'row',
  },
  textInput:{
    flex: 1,
    padding: 10
  },
  imageg:{
    padding: 0,
    margin: 0,

  },
  buttonContainer:{
    flexDirection:'row',
    paddingVertical: 10,
  },
  imageLogo:{
    width: 40,
    height: 40,
  },
  boder:{
    backgroundColor: 'white',
    height: 40,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 10,
    textAlign: 'center',
    width: 100,
    marginRight: 10,
  },
  borderContainer:{
    flexDirection:'row',
    marginHorizontal: 'auto',
  },
  foot:{
    
    alignItems: 'center',
    fontSize: 60,
    margin: 'auto'
  },
  container1: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  price: {
    fontSize: 20,
    color: '#888',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginVertical: 8,
  },
});
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{title:'Chi tiết sản phẩm', headerTitleAlign:'center'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


