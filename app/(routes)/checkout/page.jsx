"use client";
import React, { useEffect, useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import GlobalApi from '../../_utils/GlobalApi'; // Import Global API
import { Input } from '../../components/ui/input';

function CheckOut() {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [subtotal, setSubTotal] = useState(0); 
  const [totalAmount, setTotalAmount] = useState(0); 

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [address, setAddress] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = sessionStorage.getItem('user');
      const storedJwt = sessionStorage.getItem('jwt');
      setUser(storedUser ? JSON.parse(storedUser) : null);
      setJwt(storedJwt);
    }
  }, []);

  useEffect(() => {
    if (user && jwt) {
      getCartItems();
    }
  }, [user, jwt]);

  const getCartItems = async () => {
    if (!user || !user.id || !jwt) {
      console.warn("User or JWT is not set, skipping cart fetch.");
      return;
    }

    try {
      const cartItems = await GlobalApi.getCartItems(user.id, jwt);
      setTotalCartItem(Array.isArray(cartItems) ? cartItems.length : 0);
      setCartItemList(cartItems || []);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((item) => {
      total += item.amount;
    });
    
    const calculatedTotal = (total * 0.9) + 15;
    setTotalAmount(calculatedTotal.toFixed(2));
    setSubTotal(total.toFixed(2));
  }, [cartItemList]);

  return (
    <div>
      <h2 className='p-3 bg-green-600 text-xl font-bold text-center text-white'>Checkout</h2>
      <div className='p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8'>
        <div className='md:col-span-2 mx-20'>
          <h2 className='font-bold text-3xl'>Billing Details</h2>
          <div className='grid grid-cols-2 gap-3 mt-3'>
            <Input placeholder='Name' onChange={(e) => setUsername(e.target.value)} />
            <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='grid grid-cols-2 gap-3 mt-3'>
            <Input placeholder='Phone' onChange={(e) => setPhone(e.target.value)} />
            <Input placeholder='Zip' onChange={(e) => setZip(e.target.value)} />
          </div>
          <div className='mt-3'>
            <Input placeholder='Address' onChange={(e) => setAddress(e.target.value)} />
          </div>
        </div>
        <div className=' mt-4  border mx-10'>
          <h2 className='p-3 bg-gray-200 font-bold text-center'>
            Total Cart ({totalCartItem})
          </h2>
          <div className='p-4 flex flex-col gap-4'>
            <h2>SubTotal: <span>${subtotal}</span></h2>
            <hr />
            <h2 className='flex justify-between'>Delivery: <span>$15.00</span></h2>
            <h2 className='flex justify-between'>Tax (9%): <span>${(subtotal * 0.9).toFixed(2)}</span></h2>
            <hr />
            <h2 className='font-bold flex justify-between'>Total: <span>${totalAmount}</span></h2>
            <PayPalButtons 
              style={{ layout: "horizontal" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: totalAmount,
                        currency_code: "USD"
                      }
                    }
                  ]
                });
              }} 
              onApprove={async (data, actions) => {
                await actions.order.capture();
                // Handle successful payment here
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
