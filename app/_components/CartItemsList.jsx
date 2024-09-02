import { TrashIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';

function CartItemsList({ cartItemsList,onDeleteItem }) { 
  

  return (
    <div>
      <div className='h-[500px] overflow-auto'>
        {cartItemsList.map((cart, index) => (
          <div className='flex justify-between items-center'>
          <div className='flex gap-6'>  {/* Add a unique key for each item */}
            <img 
              src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+cart.image}
              width={100}
              height={70}
              alt={`Cart item ${index}`}
              className='border p-2 '  // Adding alt attribute for accessibility
            />
            <div>
              <h2 className='font-bold'>{cart.name}</h2>
              <h2 className=''>{cart.quantity}</h2>

              <h2 className='text-lg font-bold'>${cart.amount}</h2>


            </div>
            
          </div>
          <TrashIcon className='cursor-pointer' onClick={()=>onDeleteItem(cart.id)}/>
          </div>
          
        ))}
      </div>
      
    </div>
  );
}

export default CartItemsList;
