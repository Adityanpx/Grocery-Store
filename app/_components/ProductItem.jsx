import React from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import ProductItemDetails from "../_components/ProductItemDetails"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

function ProductItem({ product }) {
  return (
    <div
      className="flex flex-col items-center justify-center p-2 gap-3 
    border rounded-lg hover:scale-110 cursor-pointer hover:shadow-lg transition-all
    ease-in-out  "
    >
      <img
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          product?.attributes?.image?.data[0]?.attributes?.url
        }
        width={500}
        height={200}
        className="h-[200px] w-[200px] object-contain "
        alt="products"
      />
      <h1 className="font-bold text-lg">{product.attributes.name}</h1>

      <div className="flex gap-3">
        {product.attributes.sellingPrice && (
          <h2 className="font-bold">${product.attributes.sellingPrice}</h2>
        )}
        <h1 className={` ${product.attributes.sellingPrice && "line-through"}`}>
          ${product.attributes.mrp}.00
        </h1>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-green-600 hover:text-white hover:bg-green-600"
          >
            Add To Cart
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <ProductItemDetails product={product} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductItem;
