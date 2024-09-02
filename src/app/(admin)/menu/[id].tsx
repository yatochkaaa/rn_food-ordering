import { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@components/ProductListItem';
import Button from '@components/Button';
import { useAppDispatch } from '@/store/hooks';
import { onAddItem } from '@/store/slices/productsSlice';
import { PizzaSize } from '@/types';

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
  const product = products.find((p) => p.id.toString() === id);
  const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];
  const addToCart = () => {
    if (!product) return;
    dispatch(onAddItem({ product, size: selectedSize }));
    router.push('/cart');
  };

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />

      <Text style={styles.title}>${product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
