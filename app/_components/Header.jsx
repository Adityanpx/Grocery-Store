"use client";

import { Button } from "../../components/ui/button";
import { CircleUserRound, LayoutGrid, Link2, Search, ShoppingBasket, ShoppingCart } from "lucide-react";
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
import CartItemsList from "../_components/CartItemsList";
import { UpdateCartContext } from "../_context/UpdateCartContext";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../app/components/ui/sheet";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // Import useRouter for programmatic navigation

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  const [cartItemList, setCartItemList] = useState([]);
  const [subtotal, setSubTotal] = useState();
  const router = useRouter(); // Initialize the router

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
    if (!user || !user.id || !jwt) {
      console.warn("User or JWT is not set, skipping cart fetch.");
      return;
    }
    
    try {
      console.log("Fetching cart items for user:", user.id);
      const cartItems = await GlobalApi.getCartItems(user.id, jwt);
      console.log("Cart items fetched:", cartItems);

      // Set the total number of items in the cart
      setTotalCartItem(Array.isArray(cartItems) ? cartItems.length : 0);
      
      // Set the cart item list
      setCartItemList(cartItems || []);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };

  const onDeleteItem = (id) => {
    GlobalApi.deleteCartItem(id, jwt).then(resp => {
      toast('Item removed !');
      getCartItems();
    });
  };

  useEffect(() => {
    let total = 0;
    cartItemList.forEach(element => {
      total += element.amount;
    });
    setSubTotal(total.toFixed(2));
  }, [cartItemList]);

  // Function to handle checkout button click
  const handleCheckoutClick = () => {
    router.push("/checkout");
    // Optionally, you can also close the cart sheet if you want
    // but it's already handled by the router push
  };

  return (
    <div className="p-5 shadow-md flex justify-between">
      <div className="flex items-center gap-8">
        <Link href={'/'}>
          <img src="/grocery_logo.png" width={200} height={100} alt="logo" />
        </Link>

      
        

        
      </div>
      <div className="flex items-center">
      <Link href="/#"><Button className=" hidden md:flex hover:text-green-600 " variant="link">Home</Button></Link>
      <Link href="/aboutUs"><Button className="hidden md:flex hover:text-green-600 " variant="link">About</Button></Link>
      <Button className="hidden md:flex hover:text-green-600 " variant="link">Shop</Button>
      <Button className=" hidden md:flex hover:text-green-600 " variant="link">Contact</Button>
      <DropdownMenu>
          <DropdownMenuTrigger>
            <h2 className="hidden md:flex gap-2 items-center  hover:text-green-600   p-2 cursor-pointer">
            category<LayoutGrid className="h-5 w-5" /> 
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

      </div>
      <div className="flex gap-5 items-center">
        <Sheet>
          <SheetTrigger>
            <h2 className="flex text-lg items-center">
              <ShoppingCart className="" />
              <div className="mb-8 mr">
              <span className="   text-red-500 rounded-full text-xs">{totalCartItem}</span>
              </div>
            </h2>

          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="bg-green-600 mt-6 text-white font-bold p-2 text-lg">My Cart</SheetTitle>
              <SheetDescription>
                <CartItemsList cartItemsList={cartItemList} onDeleteItem={onDeleteItem} />
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <div className='absolute w-[90%] flex flex-col bottom-6'>
                <h2 className='flex justify-between text-lg font-bold'>SubTotal
                  <span>$ {subtotal}</span></h2>
                <Button className='bg-green-600' onClick={handleCheckoutClick}>Checkout</Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>

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
            <Link href={'/sign-in'}>
              <DropdownMenuItem>Sign In</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Header;
