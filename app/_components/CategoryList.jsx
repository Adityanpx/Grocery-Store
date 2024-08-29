import { Cat } from "lucide-react";
import Link from "next/link";
import React from "react";

function CategoryList({ categoryList }) {
  return (
    <div className=" p-3">
      <h2 className="text-green-600 text-2xl font-bold ">
        Shop By Categories
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-6 
      sm:grid-cols-4 lg:grid-cols-7 gap-5 mt-2">
        {categoryList.map((category, index) => (
          <Link href={'/products-category/'+category.attributes.name} className="flex flex-col bg-green-50 
          items-center gap-2 p-4 rounded-lg group cursor-pointer
          hover:bg-green-600">
            <img
              src={
                process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                category?.attributes?.icon?.data[0]?.attributes?.url
              }
              width={50}
              height={50}
              alt="category"
              className="group-hover:scale-125 transition-all ease-in-out"
            />
            <h2 className="text-green-800">{category.attributes.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
