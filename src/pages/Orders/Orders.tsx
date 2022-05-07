import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../../components/StateProvider';
import axios from '../../lib/axios';
import Order from './Order/Order';
import './Orders.scss';

export type OrderType = {
  id: string;
  data: {
    amount: number;
    items: {
      quantity: number;
      id: string;
      price: string;
    }[];
    createdAt: string;
    customer: string;
  };
};
function Orders() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [{ user }] = useStateValue();
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const response = await axios({
          url: `/orders?userId=${user.uid}`,
        });
        setOrders(response.data);
      }
    };
    fetchOrders();
  }, [user]);
  return (
    <main className='orders'>
      <div className='orders__row'>
        <div className='orders__heading'>
          <h1>Your Orders</h1>
        </div>
      </div>

      {orders.map((order) => (
        <Order key={order.id} orderData={order.data} />
      ))}
    </main>
  );
}

export default Orders;
