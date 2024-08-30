// app/_components/Header.jsx

"use client";

import { Button } from "../../components/ui/button";
import { CircleUserRound, LayoutGrid, Search, ShoppingBasket } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import GlobalApi from "../_utils/GlobalApi";
import Link from "next/link";
import { UpdateCartContext } from "../_context/UpdateCartContext";

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedJwt = sessionStorage.getItem('jwt');
      const storedUser = sessionStorage.getItem('user');
      setIsLogin(!!storedJwt);
      setJwt(storedJwt);
      setUser(storedUser ? JSON.parse(storedUser) : null);
    }
  }, []);

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    if (user && jwt) {
      getCartItems();
    }
  }, [updateCart, user, jwt]);

  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp => {
      console.log("CategoryList Resp", resp.data.data);
      setCategoryList(resp.data.data);
    }).catch(error => {
      console.error("Failed to fetch category list:", error);
    });
  };

  const getCartItems = async () => {
    try {
      const cartItemsList = await GlobalApi.getCartItems(user.id, jwt);
      console.log(cartItemsList);
      setTotalCartItem(cartItemsList?.length || 0);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };

  return (
    <div className="p-5 shadow-md flex justify-between">
      <div className="flex items-center gap-8">
        <Link href={'/'}>
          <img src="/grocery_logo.png" width={150} height={100} alt="logo" />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <h2 className="hidden md:flex gap-2 items-center border rounded-full bg-slate-200 p-2 px-10 cursor-pointer">
              <LayoutGrid className="h-5 w-5" /> category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryList.map((category, index) => (
              <Link key={index} href={'/products-category/' + category.attributes.name}>
                <DropdownMenuItem className="flex gap-4 items-center cursor-pointer">
                  <img
                    src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category?.attributes?.icon?.data[0]?.attributes?.url}
                    alt="icon"
                    width={30}
                    height={30}
                  />
                  <h2 className="text-lg">{category?.attributes?.name}</h2>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="md:flex gap-3 items-center rounded-full border p-2 hidden">
          <Search />
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <h2 className="flex gap-2 text-lg items-center">
          <ShoppingBasket />
          <span className="bg-green-600 text-white rounded-full px-2">{totalCartItem}</span>
        </h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="mr-8">
              <CircleUserRound className="h-14 text-green-600" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={'/create-account'}>
              <DropdownMenuItem>Register</DropdownMenuItem>
            </Link>
            <Link href={'sign-in'}>
              <DropdownMenuItem>Sign In</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Contact Us</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Header;
