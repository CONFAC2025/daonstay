import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import SwiperType from 'swiper';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import { GALLERY_IMAGES } from "./constant";
import useTypingEffect from "../../hooks/useTypingEffect.tsx";

const GallerySection = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <section className="py-16 md:py-24 bg-v4-bg">
      <div className="max-w-container mx-auto px-6 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-v4-text mb-4 animate-typing">
            {useTypingEffect("꿈꾸던 공간,", 50)}<br /> <span className="text-v4-gold">{useTypingEffect("다온스테이 갤러리", 50)}</span>
          </h2>
          <p className="text-lg md:text-xl text-v4-text-muted animate-typing">
            {useTypingEffect("최고급 자재와 감각적인 디자인으로 완성된 공간을 만나보세요.", 30)}
          </p>
        </div>

        <div className="relative mb-4 md:mb-6 border-2 border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-xl">
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[Navigation, Thumbs, Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="aspect-video"
            effect="fade"
          >
            {GALLERY_IMAGES.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`gallery-main-${idx}`}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-110"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="px-0">
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[Navigation, Thumbs]}
            className="gallery-thumbs"
            breakpoints={{
              640: {
                slidesPerView: 6,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 8,
                spaceBetween: 20,
              },
            }}
          >
            {GALLERY_IMAGES.map((img, idx) => (
              <SwiperSlide key={idx} className="rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-v4-gold transition-all duration-200">
                <img
                  src={img}
                  alt={`gallery-thumb-${idx}`}
                  className="w-full h-full object-cover aspect-square transition-transform duration-500 hover:scale-105"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
