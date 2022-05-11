import React, { useEffect, useState, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../../components/StateProvider';
import axios from '../../lib/axios';
import { OrderType } from '../../types';
import Order from './Order/Order';
import './Orders.scss';

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [orderYear, setOrderYear] = useState<string>('');
  const [{ user }] = useStateValue();
  useEffect(() => {
    // Default behavior, fetch orders in the past three months
    const fetchOrders = async () => {
      setLoading(true);
      if (user) {
        try {
          const response = await axios({
            url: `/orders?userId=${user.uid}`,
          });
          setOrders(response.data);
          setLoading(false);
        } catch (err) {
          if (err instanceof Error) {
            toast.error(err.message);
          } else {
            toast.error(String(err));
          }
        }
      }
    };
    fetchOrders();
  }, [user]);

  const fetchOrdersWithYear = async (year: string) => {
    setOrderYear(year);
    if (user) {
      setLoading(true);
      let url;
      if (year === 'past 3 months') {
        url = `/orders?userId=${user.uid}`;
      } else {
        url = `/orders?userId=${user.uid}&year=${year}`;
      }
      const response = await axios({
        url,
      });
      setOrders(response.data);
      setLoading(false);
    } else {
      navigate('/signin');
    }
  };

  // generate the option with the value of last N years, by default 8 years
  const listLastNYears = (n: number = 8): ReactNode => {
    const currentYear = new Date().getFullYear();
    const optionElements: JSX.Element[] = [];
    for (let offset = 0; offset < n; offset += 1) {
      const previousYear = currentYear - offset;
      optionElements.push(<option value={previousYear}>{previousYear}</option>);
    }
    return optionElements;
  };

  return (
    <main className='orders'>
      <div className='orders__row'>
        <div className='orders__heading'>
          <h1>Your Orders</h1>
        </div>
        {!loading && (
          <div className='ordersControl__container'>
            <div className='ordersYear__container'>
              <span>
                {orders &&
                  (orders.length > 1
                    ? `${orders.length} orders `
                    : `${orders.length} order `)}
              </span>
              placed in{' '}
              <select
                className='ordersYear__select'
                tabIndex={0}
                value={orderYear}
                onChange={(e) => fetchOrdersWithYear(e.target.value)}
              >
                <option value='past 3 months'>past 3 months</option>
                {listLastNYears(8)}
              </select>{' '}
            </div>
          </div>
        )}
      </div>
      {loading && (
        <img
          src={`${process.env.PUBLIC_URL}/loading.gif`}
          alt=''
          className='loading__img'
        />
      )}
      {!loading &&
        orders &&
        (orders.length === 0 ? (
          <h2>You have not placed any orders in {orderYear}.</h2>
        ) : (
          orders.map((order) => <Order key={order.id} orderData={order.data} />)
        ))}
    </main>
  );
}

export default Orders;
