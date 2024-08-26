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
    <div className="w-full p-10 flex justify-center">
    <Carousel>
  <CarouselContent>
    {sliderList.map((slider,index)=>(
      <CarouselItem key={index}>
        <img src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL+slider.attributes?.Image?.data[0]?.attributes?.url}
        alt="slider"
        className="w-full h-64 object-cover"/>
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
