// Add the "use client" directive at the top
"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel"

import {Card, CardContent, CardDescription, CardFooter} from "../components/ui/card"
import React from 'react';

function Slider({sliderList}) {
  return (
    <div className=" -my-6 p-12 -mb-10 flex justify-center lg:px-24">
    <Carousel>
  <CarouselContent>
    {sliderList.map((slider,index)=>(
      <CarouselItem key={index}>
        <img src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL+slider.attributes?.Image?.data[0]?.attributes?.url}
        alt="slider"
        width={1000}
        height={400}
        className="w-full h-[250px] md:h-[400px] rounded-2xl 
         object-cover lg:h-[500px]"/>
      </CarouselItem>

    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
</div>


  );
}

export default Slider;
