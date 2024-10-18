import React, { useState, useEffect } from "react";
import img1 from "../assets/banner1.jpg"; // Import your images here
import img2 from "../assets/banner2.jpg"; // Import your images here
import img3 from "../assets/banner3.jpg"; // Import your images here

const Hero = () => {
  const images = [img1, img2, img3]; // Use the actual images
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds (5000ms)

    return () => {
      clearInterval(interval); // Cleanup the interval on component unmount
    };
  }, [currentIndex]); // Re-run effect when currentIndex changes

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="bg-gray-100 text-center py-10 relative">
    {/* Carousel Container */}
    <div className="relative w-full h-60 sm:h-70 md:h-96 lg:h-[500px] overflow-hidden">
      {/* Carousel Images */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        ))}
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
          Learn and Share Skills
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 text-white">
          Join our platform to connect with skilled professionals and learn something new every day.
        </p>
        <button className="bg-blue-600 text-white py-2 px-4 sm:py-2 sm:px-6 md:py-3 md:px-8 rounded-lg hover:bg-blue-700">
          Get Started
        </button>
      </div>
    </div>

    {/* Previous Button */}
    <button
      onClick={prevSlide}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-gray-600 z-20"
    >
      &#10094;
    </button>

    {/* Next Button */}
    <button
      onClick={nextSlide}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-gray-600 z-20"
    >
      &#10095;
    </button>
  </section>
  );
};

export default Hero;
