"use client"
import { Button } from "../../components/ui/button";
import { LayoutGrid, Search, ShoppingBag } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"

import GlobalApi from "../_utils/GlobalApi";
import Link from "next/link";

function Header() {

  const isLogin=sessionStorage.getItem('jwt')?true:false

  const [categoryList,setCategoryList]=useState([]);

  useEffect(()=>{
    getCategoryList();

  },[])

  const getCategoryList=()=>{
    GlobalApi.getCategory().then(resp=>{
      console.log("CategotyList Resp",resp.data.data);
      setCategoryList(resp.data.data)
      
    })
  }



  return (
    <div className="p-5 shadow-md flex justify-between">
      <div className="flex items-center gap-8">
        <img src="/grocery_logo.png" width={150} height={100} />

        
        <DropdownMenu>
          <DropdownMenuTrigger>
          <h2
          className="hidden md:flex gap-2 items-center
           border rounded-full bg-slate-200 p-2 px-10 cursor-pointer ">
          <LayoutGrid className="h-5 w-5 " /> category
        </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryList.map((category,index)=>(
              <Link key={index}
              href={'/products-category/'+category.attributes.name}>
            <DropdownMenuItem className="flex gap-4 items-center cursor-pointer">
              <img src={

                process.env.NEXT_PUBLIC_BACKEND_BASE_URL+
                category?.attributes?.icon?.data[0]?.attributes?.url}
              
              alt="icon"
              width={30}
              height={30}/>
              <h2 className="text-lg">{category?.attributes?.name}</h2>
              
            </DropdownMenuItem>
            </Link>
          ))}
            
          </DropdownMenuContent>
        </DropdownMenu>

        <div
          className=" md:flex gap-3 items-center rounded-full
         border p-2 hidden"
        >
          <Search />
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <h2 className="flex gap-2 items-center">
          <ShoppingBag />0
        </h2>
        {!isLogin&& 
        <Link href={'/sign-in'}>  <Button>Login</Button></Link>
        }
      </div>
    </div>
  );
}

export default Header;
