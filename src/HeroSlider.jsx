import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import slider1 from "./assets/pexels-kampus-7658822.jpg";
import slider2 from "./assets/pexels-janetrangdoan-1132047.jpg";
import slider3 from "./assets/pexels-cottonbro-9811521.jpg";
import { Link } from "react-router";


const slides = [
  {
    id: 1,
    image: slider1,
    title: "Fresh Crops Every Day",
    subtitle: "Connect with farmers and traders directly",
    cta: "Shop Now",
  },
  {
    id: 2,
    image: slider2,
    title: "Organic & Healthy",
    subtitle: "Choose the best for your family",
    cta: "Shop Now",
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
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full group perspective-1000">
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-[4000ms]"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-wide drop-shadow-lg animate-fadeUp">
                  {slide.title}
                </h2>

                <p className="text-base md:text-xl mb-6 max-w-2xl text-gray-200 animate-fadeUp delay-150">
                  {slide.subtitle}
                </p>

                <Link to={'/all-crops'} className="relative px-8 py-3 rounded-full font-semibold text-white bg-green-600 shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-green-700">
                  {slide.cta}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scroll Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm flex flex-col items-center gap-1 animate-bounce">
        <span className="opacity-80">Scroll</span>
        <span className="text-2xl">⌄</span>
      </div>
    </section>
  );
};

export default HeroSlider;
