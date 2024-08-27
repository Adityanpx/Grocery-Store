"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import GlobalApi from '../../_utils/GlobalApi'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router=useRouter();

  useEffect(()=>{
    const jwt=sessionStorage.getItem('jwt');
    if(jwt){
      router.push('/')
    }

  },[])

  const onSignIn=()=>{
    GlobalApi.signIn(email,password).then(resp=>{
      console.log(resp.data.user)
      console.log(resp.data.jwt)
      sessionStorage.setItem('user', JSON.stringify(resp.data.user));
            sessionStorage.setItem('jwt', resp.data.jwt);
            router.push('/');
            toast("SignIn successfully!!");
    },(e)=>{
      console.log(e);
      toast("Unexpected Error ");
      
    })
    
  }
  return (
    <div className='flex justify-center my-10'>
    <div className='flex flex-col items-center justify-center p-10 bg-slate-200 border border-gray-200'>
      <Image src='/grocery_logo.png' width={200} height={200} />
      <h2 className='font-bold text-3xl'>Sign In Account</h2>
      <h2 className='text-gray-500'>Enter email and password to Sign In</h2>
      <div className='w-full flex flex-col gap-5 mt-7'>
        <Input placeholder='name@example.com' onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={onSignIn} className="bg-green-600" disabled={(!email && password)}>
          Sign In
        </Button>
        <p>Not have an account? <Link href={'/create-account'} className='text-blue-500 hover:underline'>Click here to create</Link></p>
      </div>
    </div>
  </div>
  )
}

export default SignIn