import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert, Button } from 'react-native';

const CartScreen = () => {
  interface CartItem {
    id: string;
    title: string;
    price: number;
    image: any;
    selected: boolean;
    quantity: number;
  }

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartResponse = await fetch('https://fakestoreapi.com/carts/1');
        const cartData = await cartResponse.json();

        const productPromises = cartData.products.map(async (product: { productId: number, quantity: number }) => {
          const productResponse = await fetch(`https://fakestoreapi.com/products/${product.productId}`);
          const productData = await productResponse.json();

          return {
            id: productData.id.toString(),
            title: productData.title,
            price: productData.price,
            image: productData.image,
            selected: false,
            quantity: product.quantity,
          };
        });

        const products = await Promise.all(productPromises);
        setCartItems(products);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);
  if (loading){
    return <Text style={{textAlign:'center', fontSize: 30,paddingTop:400 }}>Loading...</Text>;
  }

  const totalPrice = cartItems.reduce((total, item) =>
    item.selected ? total + item.price * item.quantity : total, 0);

  const handleDelete = (id: string) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const toggleSelect = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const increaseQuantity = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => toggleSelect(item.id)} style={styles.selectButton}>
        <MaterialIcons 
          name={item.selected ? 'check-box' : 'check-box-outline-blank'} 
          size={24} 
          color={item.selected ? 'gray' : 'black'} 
        />
      </TouchableOpacity>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.title}</Text>
        <Text style={styles.itemPrice}>{item.price}$</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.quantityButton}>
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.quantityButton}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
        <Text style={styles.buttonText}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );

  const handlePay = () => {
    const selectedItems = cartItems.filter(item => item.selected);
    if (selectedItems.length > 0) {
      Alert.alert(
        'Chọn Phương Thức Thanh Toán',
        'Vui lòng chọn phương thức thanh toán của bạn',
        [
          {
            text: 'Thanh toán qua thẻ',
            onPress: () => {
              Alert.alert('Thanh toán thành công');
              setCartItems(prevItems => prevItems.filter(item => !item.selected));
            },
          },
          {
            text: 'Thanh toán khi nhận hàng',
            onPress: () => {
              Alert.alert('Đặt hàng thành công', 'Bạn sẽ thanh toán khi nhận hàng!');
              setCartItems(prevItems => prevItems.filter(item => !item.selected));
            },
          },
          {
            text: 'Hủy',
            style: 'cancel',
          },
        ]
      );
    } else {
      Alert.alert('Thông báo', 'Chọn ít nhất một sản phẩm để thanh toán.');
    }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ Hàng</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Text style={styles.total}>Tổng: {totalPrice}$</Text>
      <TouchableOpacity onPress={handlePay} style={styles.checkoutButton} >
        <Text style={styles.buttonText}>Thanh Toán</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign:'center'
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  itemImage: {
    width: 100,
    height: 100,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 18,
    color: '#888',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    alignContent:'center'
  },
  quantityButton: {
    backgroundColor: '#ccc',
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  quantityText: {
    fontSize: 18,
    width: 20,
    textAlign:'center'
  },
  selectButton: {
    padding: 8,
    borderRadius: 5,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 8,
    borderRadius: 5,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'right',
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 5,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CartScreen;