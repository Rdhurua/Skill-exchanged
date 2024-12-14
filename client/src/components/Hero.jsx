import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from "../assets/banner1.jpg";
import img2 from "../assets/banner2.jpg";
import img3 from "../assets/banner3.jpg";
import img4 from "../assets/banner-4.jpg";
import img5 from "../assets/banner8.jpg";

function CustomPrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/3 transform -translate-y-1/2 bg-blue-800 text-white px-4 py-2 rounded-full hover:bg-blue-600 z-20"
    >
      &#10094;
    </button>
  );
}

function CustomNextArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/3 transform -translate-y-1/2 bg-blue-800 text-white px-4 py-2 rounded-full hover:bg-blue-600 z-20"
    >
      &#10095;
    </button>
  );
}

function Hero() {
  const images = [img1, img2, img3,img4,img5];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <section className="bg-gray-800 text-center py-3 relative" id="home">
  <div className="relative w-full overflow-hidden">
    <div className="w-full h-auto md:h-[345px] lg:h-[500px]">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  </div>
</section>

  );
};

export default Hero;
