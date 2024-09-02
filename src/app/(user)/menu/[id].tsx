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

      <Text>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable key={size} onPress={() => setSelectedSize(size)}>
            <View
              style={[
                styles.size,
                { backgroundColor: selectedSize === size ? 'gainsboro' : 'white' },
              ]}
            >
              <Text style={[styles.sizeText, { color: selectedSize === size ? 'black' : 'gray' }]}>
                {size}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${product.price}</Text>
      <Button text="Add to cart" onPress={addToCart} />
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
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 'auto',
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  size: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
  },
});
