import React from 'react';
import NumberFormat from 'react-number-format';
import OrderItem from '../OrderItem/OrderItem';
import './Order.scss';

type OrderType = {
  amount: number;
  items: {
    quantity: number;
    id: string;
    price: string;
  }[];
  createdAt: string;
  customer: string;
};
function Order({ orderData }: { orderData: OrderType }) {
  return (
    <div className='order'>
      <div className='order__header clearfix'>
        <div className='header__left'>
          <div className='header__col1'>
            <span>ORDER PLACED</span>
            <br />
            <span>{orderData.createdAt}</span>
          </div>
          <div className='header__col2'>
            <span>TOTAL</span>
            <br />
            <span>
              <NumberFormat
                value={orderData.amount}
                thousandSeparator
                prefix='$'
                displayType='text'
                decimalScale={2}
                fixedDecimalScale
              />
            </span>
          </div>
          <div className='header__col3'>
            <span>DELIVER TO</span>
            <br />
            <span>{orderData.customer}</span>
          </div>
        </div>
        <div className='header__right'>
          <span>View order details</span>
          <span>Invoice</span>
        </div>
      </div>
      {orderData.items.map((item) => {
        return (
          <OrderItem
            key={item.id}
            id={item.id}
            quantity={item.quantity}
            date={orderData.createdAt}
          />
        );
      })}
    </div>
  );
}

export default Order;
