"use client"
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { ShoppingBasket } from "lucide-react";

function ProductItemDetails({ product }) {

    const [productTotalPrice,setProductTotalPrice]=useState(
        product.attributes.sellingPrice?
        product.attributes.sellingPrice:
        product.attributes.mrp
    )

    const [quantity,setQuantity]=useState(1);
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
            <Button variant="outline" className="flex gap-3 text-green-600 hover:text-white hover:bg-green-600">
                <ShoppingBasket/>
                Add to Cart
            </Button>
        </div>
        <h2><span className="font-bold ">Category:</span> {product.attributes.
        categories.data[0].attributes.name}</h2>
      </div>
    </div>
  );
}

export default ProductItemDetails;
