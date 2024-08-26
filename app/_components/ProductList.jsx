import React from 'react'
import ProductItem from "./ProductItem"

function ProductList({productList}) {
  return (
    <div>
        <h2 className="text-green-600 text-2xl font-bold ">
        Our Fresh Products
      </h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
      gap-5'>
        {productList.map((product,index)=>(
            <ProductItem product={product} />
        ))}
      </div>
    </div>
  ) 
}

export default ProductList