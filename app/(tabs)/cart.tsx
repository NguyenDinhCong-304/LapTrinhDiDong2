import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

const CartScreen = () => {
  interface CartItem {
    id: string;
    title: string;
    price: number;
    image: any;
    selected: boolean;
    quantity: number; // Thêm thuộc tính số lượng
  }

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      title: 'Lenovo',
      price: 17990000,
      image: require("../../assets/images/lenovo-ideapad-slim-3-15irh8-i7-83em003fvn-thumb-400x400.jpg"),
      selected: false,
      quantity: 1, // Khởi tạo số lượng
    },
    {
      id: '2',
      title: 'Dell',
      price: 16990000,
      image: require("../../assets/images/Dell.jpg"),
      selected: false,
      quantity: 1,
    },
    {
      id: '3',
      title: 'HP',
      price: 17990000,
      image: require("../../assets/images/HP.jpg"),
      selected: false,
      quantity: 1,
    },
  ]);

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
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.title}</Text>
        <Text style={styles.itemPrice}>{item.price}VNĐ</Text>
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
      <TouchableOpacity onPress={() => toggleSelect(item.id)} style={styles.selectButton}>
        <Text style={styles.buttonText}>{item.selected ? 'Bỏ Chọn' : 'Chọn'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
        <Text style={styles.buttonText}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );

  const handleCheckout = () => {
    const selectedItems = cartItems.filter(item => item.selected);
    console.log("Sản phẩm chọn để thanh toán:", selectedItems);
    // Thêm mã xử lý thanh toán ở đây
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ Hàng</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Text style={styles.total}>Tổng: {totalPrice}VNĐ</Text>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
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
    backgroundColor: '#007bff',
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