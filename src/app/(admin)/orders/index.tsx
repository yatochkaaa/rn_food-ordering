import { FlatList } from 'react-native';
import OrderListItem from '@components/OrderListItem';
import orders from '@/assets/data/orders';

export default function OrdersScreen() {
  return (
    <FlatList
      data={orders}
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ padding: 10, gap: 10 }}
    />
  );
}
