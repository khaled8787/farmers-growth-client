// HeroSlider.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import slider1 from './assets/pexels-kampus-7658822.jpg';
import slider2 from './assets/pexels-janetrangdoan-1132047.jpg';
import slider3 from './assets/pexels-cottonbro-9811521.jpg';

const slides = [
  {
    id: 1,
    image: slider1,
    title: "Fresh Crops Every Day",
    subtitle: "Connect with farmers and traders directly",
    cta: "Explore Crops",
  },
  {
    id: 2,
    image: slider2,
    title: "Organic & Healthy",
    subtitle: "Choose the best for your family",
    cta: "View Details",
  },
  {
    id: 3,
    image: slider3,
    title: "Quality You Can Trust",
    subtitle: "Directly from the farm to your home",
    cta: "Shop Now",
  },
];

const HeroSlider = () => {
  return (
    <div className="w-full relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="h-[400px] md:h-[600px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-4 md:px-0">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-md md:text-xl mb-6">{slide.subtitle}</p>
                <button className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-full text-white font-semibold">
                  {slide.cta}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
