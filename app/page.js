// app/page.js

import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Footer from "./_components/Footer";

export default async function Home() {
  try {
    const sliderList = await GlobalApi.getSliders();
    const categoryList = await GlobalApi.getCategoryList();
    const productList = await GlobalApi.getAllProducts();

    return (
      <div>
        <Slider sliderList={sliderList} />
        <CategoryList categoryList={categoryList} />
        <ProductList productList={productList} />
        <img
          src="/banner.png"
          height={300}
          width={1000}
          alt="banner"
          className="w-full h-[400px] object-contain"
        />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error (e.g., display an error message to users)
    return (
      <div>
        <h1>Error loading data. Please try again later.</h1>
      </div>
    );
  }
}
