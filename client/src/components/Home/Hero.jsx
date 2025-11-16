import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from "../../assets/banner1.jpg";
import img2 from "../../assets/banner2.jpg";
import img3 from "../../assets/banner3.jpg";
import img4 from "../../assets/banner-4.jpg";
import img5 from "../../assets/banner8.jpg";


function Hero() {
  const images = [img1, img2, img3,img4,img5];

  

  return (
    <section className="bg-gray-800 text-center py-3 relative" id="home">
  <div className="relative w-full overflow-hidden">
    <div className="w-full h-auto md:h-[345px] lg:h-[500px]">
            <img
              src={img1}
              alt="banner"
            />
        
    </div>
  </div>
</section>

  );
};

export default Hero;
