import { Image, StyleSheet, View, TextInput, Text, FlatList, Button, ScrollView } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';

const HomeScreen=(props:any) => {
  const navigation: NavigationProp<RootStackParamList>= useNavigation();
  interface Product {
    id: string,
    title: string,
    price: number,
    image: any,
    description: string,
    category: string,
    rating:{
      rate: number,
      count: number
    }
  };
  //Làm tên sản phẩm ngắn lại: 
  const shortTitle = (title: string) => {
    const maxLength = 20;
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  const [isLoading, setIsLoading] = useState(true)

  const [posts, setPost] = useState<Product[]>([])

  useEffect(()=>{
    const fetchPosst = async ()=>{
      setIsLoading(true)
      const response = await fetch ('https://fakestoreapi.com/products');
      const posts = (await response.json()) as Product[];
      setPost (posts)
      setIsLoading(false)
    };
    fetchPosst();
  }, []);

  if (isLoading){
    return <Text style={{textAlign:'center', fontSize: 30,paddingTop:400 }}>Loading...</Text>;
  }

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
        <ScrollView horizontal={true} style={styles.borderContainer}>
          <TouchableOpacity style={styles.boder}>Lenovo</TouchableOpacity>
          <TouchableOpacity style={styles.boder}>Macbook</TouchableOpacity>
          <TouchableOpacity style={styles.boder}>Dell</TouchableOpacity>
          <TouchableOpacity style={styles.boder}>HP</TouchableOpacity>
        </ScrollView>
        <Text style={{fontSize:20, fontWeight:'600', paddingTop: 10, paddingLeft:10, paddingBottom:10}}>Danh sách sản phẩm:</Text>
        <FlatList
          data={posts}
          numColumns={2}
          keyExtractor={({id})=>id}
          renderItem={({item})=> 
            <View style={styles.product}>
              <TouchableOpacity onPress={()=>navigation.navigate('Detail',  item)}>
                <Image style={{width: 150, height: 130, margin: 10}} source={item.image}/>
              <View>
                <Text style={{textAlign:'center',borderTopWidth:1 ,borderTopColor:'#ccc'}}>{shortTitle(item.title)}</Text>
                <Text style={{textAlign:'center', paddingBottom:10}}>Giá: {item.price}$</Text>
              </View>
              </TouchableOpacity>
            </View>
          }
        />
    </View>
  );
}

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
      <Text style={styles.textDetail}>Sản phẩm liên quan: </Text>
    </ScrollView>
  );
};

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
    height: 35,
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
    height:200,
  },
  product:{
    borderWidth:1,
    alignItems: 'center',
    fontSize: 60,
    margin: 'auto',
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: '#ccc'
  },
  container1: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 400,
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
  textDetail: {
    fontWeight:600,
    fontSize: 20,
    marginTop: 20,
    padding: 10,
    color: 'gray'
  }
});

const Stack = createNativeStackNavigator<RootStackParamList>();

function Home() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{title:'Chi tiết sản phẩm', headerTitleAlign:'center'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Home;


