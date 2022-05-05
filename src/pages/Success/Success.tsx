import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useStateValue } from '../../components/StateProvider';
import axios from '../../lib/axios';
import { CartActions } from '../../store/types';
import './Success.scss';

function Success() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState<string>('');
  const [verify, setVerify] = useState<boolean>(false);
  const [, dispatch] = useStateValue();
  useEffect(() => {
    const getOrderInfo = async () => {
      try {
        const response = await axios({
          url: `/order/success?session_id=${sessionId}`,
        });
        setCustomerName(response.data.customer.name);
        setVerify(true);
        dispatch({ type: CartActions.EMPTY_CART });
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error(String(err));
        }
        navigate('/error');
      }
    };
    getOrderInfo();
  }, [sessionId, navigate, dispatch]);

  if (!verify) {
    return (
      <div className='loading'>
        <h1 className='loading__text'>
          Processing... Please don&apos;t close the window
        </h1>
        <img
          src={`${process.env.PUBLIC_URL}/loading.gif`}
          alt=''
          className='loading__img'
        />
      </div>
    );
  }
  return (
    <main className='success'>
      <div className='success__container'>
        <h1>Thanks for your payment {customerName}!</h1>
        <h2>Amazon Clone Project</h2>
        <h3>This is for demonstration purpose only!</h3>
        <p>
          This full-stack e-commerce Amazon Clone Project is used to demonstrate
          my front-end and back-end development capbility. The main focus for
          this project is to implement the core functionalities of the
          E-commerce web application.
        </p>
        <div className='successBtn__container'>
          <Link to='/order'>
            <button type='button' className='success__btn'>
              View order
            </button>
          </Link>
          <Link to='/'>
            <button type='button' className='success__btn'>
              Home
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Success;
