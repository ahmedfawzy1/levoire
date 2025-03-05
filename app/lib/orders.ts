import axios from 'axios';

export async function getOrders() {
  try {
    const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/orders`);
    const orders = res.data;
    return orders;
  } catch (error) {
    console.error('Error fetching orders', error);
    return [];
  }
}

export async function getOrderByuserId(userId: number) {
  try {
    const res = await axios.get(`/api/orders/${userId}`);
    const orders = res.data;
    return orders;
  } catch (error) {
    console.error('Error fetching orders', error);
    return [];
  }
}
