"use client"
import React, { useContext, useState } from "react";
import { Button } from "../../components/ui/button";
import { LoaderCircle, ShoppingBasket } from "lucide-react";
import { useRouter } from "next/navigation";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";
import {UpdateCartContext} from "../_context/UpdateCartContext"

function ProductItemDetails({ product }) {

  const jwt=sessionStorage.getItem('jwt');
  const user=JSON.parse(sessionStorage.getItem('user'));
  const router=useRouter();
  const [quantity,setQuantity]=useState(1);
  const [loading,setLoading]=useState();
  const {updateCart,setUpdateCart}=useContext(UpdateCartContext);

  


  const addToCart=()=>{
    setLoading(true)
    if(!jwt){
      router.push('/sign-in');
      setLoading(false)
      return;
    }
    const data={
      data:{
        quantity:quantity,
      amount:(quantity*productTotalPrice).toFixed(2),
      products:product.id,
      users_permissions_users:user.id,
      userId:user.id

      }
      
    }
    console.log(data);
    
    GlobalApi.addToCart(data,jwt).then(resp=>{
      console.log(resp);
      toast('Added to Cart')
      setUpdateCart(!upadateCart);
      setLoading(false)
      
    },(e)=>{
      toast('Error while adding to Cart')
    } )

  }

    const [productTotalPrice,setProductTotalPrice]=useState(
        product.attributes.sellingPrice?
        product.attributes.sellingPrice:
        product.attributes.mrp
    )

    
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 text-black bg-white">
      <img
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          product?.attributes?.image?.data[0]?.attributes?.url
        }
        width={300}
        className=" p-5 w-[300px] h-[320px] object-contain
          rounded-lg"
      />
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold">{product.attributes.name}</h2>
        <h2 className="">Fuzzy kittens whisper secrets to ancient trees, while rusty bicycles whisper sweet nothings to forgotten streets, amidst a symphony of creaking wooden signs.”</h2>
        <div className="flex gap-3 text-3xl">
          {product.attributes.sellingPrice && (
            <h2 className="font-bold text-3xl">${product.attributes.sellingPrice}</h2>
          )}
          <h1
            className={` ${product.attributes.sellingPrice && "line-through"}`}
          >
            ${product.attributes.mrp}.00
          </h1>
        </div>
        <h2 className="font-medium text-lg">Quantity ({product.attributes.itemQuantityType})</h2>
        <div className="flex flex-col items-baseline  gap-3">
            <div className="flex items-center gap-3">
            <div className="p-2 border flex items-center gap-10 px-5">
                <button disabled={quantity==1} onClick={()=>setQuantity(quantity-1)}>-</button>
                <h2>1</h2>
                <button  onClick={()=>setQuantity(quantity+1)}>+</button>
            </div>
            <h2 className="text-3xl font-bold">= ${quantity*productTotalPrice}.00</h2>
            </div>
            <Button variant="outline" onClick={(addToCart)} 
            className="flex gap-3 text-green-600 hover:text-white
             hover:bg-green-600"
             disabled={loading}>
             
                <ShoppingBasket/>
                {loading?<LoaderCircle className="animate-spin"/> :'Add to Cart'}
                
            </Button>
        </div>
        <h2><span className="font-bold ">Category:</span> {product.attributes.
        categories.data[0].attributes.name}</h2>
      </div>
    </div>
  );
}

export default ProductItemDetails;
