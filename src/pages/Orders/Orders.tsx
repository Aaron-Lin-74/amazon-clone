import React, { useEffect, useState } from 'react';
import { useStateValue } from '../../components/StateProvider';
import axios from '../../lib/axios';
import { OrderType } from '../../types';
import Order from './Order/Order';
import './Orders.scss';

function Orders() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [{ user }] = useStateValue();
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
      {orders && <h2>You have not placed any orders in past 3 months.</h2>}
      {orders.map((order) => (
        <Order key={order.id} orderData={order.data} />
      ))}
    </main>
  );
}

export default Orders;
