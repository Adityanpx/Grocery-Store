import React from 'react'
import GlobalApi from '../../../_utils/GlobalApi'
import { log } from 'console';
import TopCategoryList from "../TopCategoryList"
import ProductList from '../../../_components/ProductList';

async function  ProductCategory({params}) {
  const productList= await GlobalApi.getProductsByCategory(params.categoryName);
  console.log(productList,'productlist');
  

  
  const categoryList = await GlobalApi.getCategoryList();
  console.log(categoryList,'categoryList');

  return (
    <div>
      <h2 className='p-4 bg-green-600 text-white
      text-3xl'>{params.categoryName}</h2>

      <TopCategoryList categoryList={categoryList}
      selectedCategory={params.categoryName} />

<div className='p-5 md:p-10'>
      <ProductList productList={productList} />
      </div>
      
    </div>
  )
}

export default ProductCategory