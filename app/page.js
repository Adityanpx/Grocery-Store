import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList"
import ProductList from "./_components/ProductList"
import { log } from "console";
import Footer from "./_components/Footer"

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();
  console.log(sliderList,'list');

  const categoryList = await GlobalApi.getCategoryList();
  console.log(categoryList,'categoryList');

  const productList = await GlobalApi.getAllProducts();
  console.log(productList,'productList');
  
  
  return (
    <div>
      <Slider sliderList={sliderList} />
      <CategoryList categoryList={categoryList} />
      <ProductList productList={productList}/>
      <img src="/banner.png" height={300} width={1000} alt="banner"
      className="w-full h-[400px] object-contain"/>
      <Footer />
    </div>
  );
}
