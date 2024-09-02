import { CartItem, PizzaSize, Product } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { randomUUID } from 'expo-crypto';
import { RootState } from '@/store';

interface AddItemPayload {
  product: Product;
  size: PizzaSize;
}

interface UpdateQuantityPayload {
  itemId: string;
  amount: -1 | 1;
}

interface ProductsState {
  items: CartItem[];
}

const initialState: ProductsState = {
  items: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    onAddItem: (state, action: PayloadAction<AddItemPayload>) => {
      const { product, size } = action.payload;

      const existingItem = state.items.find(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingItem) {
        existingItem.quantity += 1;
        return;
      }

      const newCartItem: CartItem = {
        id: randomUUID(),
        product_id: product.id,
        product,
        size,
        quantity: 1,
      };

      state.items = [...state.items, newCartItem];
    },
    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const { amount, itemId } = action.payload;
      state.items = state.items
        .map((item) => (item.id === itemId ? { ...item, quantity: item.quantity + amount } : item))
        .filter((item) => item.quantity > 0);
    },
  },
});

// Action creators are generated for each case reducer function
export const { onAddItem, updateQuantity } = productsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTotal = (state: RootState) =>
  state.products.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

export default productsSlice.reducer;
