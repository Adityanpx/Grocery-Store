"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import GlobalApi from '../../_utils/GlobalApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function CreateAccount() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router=useRouter();

  

  const onCreateAccount = () => {
    GlobalApi.registeUser(username, email, password)
        .then(resp => {
            console.log(resp.data.user);
            console.log(resp.data.jwt);
            sessionStorage.setItem('user', JSON.stringify(resp.data.user));
            sessionStorage.setItem('jwt', resp.data.jwt);
            router.push('/');
            toast("Account has been created successfully 🎉");
        })
        .catch(error => {
            console.error("Error while creating account:", error.response.data); // Log full error response
            toast("💀 Error while creating account");
        });
};

  

  return (
    <div className='flex justify-center my-10'>
      <div className='flex flex-col items-center justify-center p-10 bg-slate-200 border border-gray-200'>
        <Image src='/grocery_logo.png' width={200} height={200} />
        <h2 className='font-bold text-3xl'>Create An Account</h2>
        <h2 className='text-gray-500'>Enter email and password to create an account</h2>
        <div className='w-full flex flex-col gap-5 mt-7'>
          <Input placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder='name@example.com' onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={onCreateAccount} className="bg-green-600" disabled={!(username && email && password)}>
            Create Account
          </Button>
          <p>Already have an account? <Link href={'/sign-in'} className='text-blue-500 hover:underline'>Click here to sign in</Link></p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
