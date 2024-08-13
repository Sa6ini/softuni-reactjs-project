import React, { useState } from "react";
import CarouselItem from "./CarouselItem";
import CarouselControls from "./CarouselControls";

const carouselImages = [
  {
    src: "img/carousel-1.jpg",
    alt: "Image 1",
    captionTitle: "Best Gym Center",
    captionText: "Build Your Body Strong With Gymster",
  },
  {
    src: "img/carousel-2.jpg",
    alt: "Image 2",
    captionTitle: "Best Gym Center",
    captionText: "Grow Your Strength With Our Trainers",
  },
  // Add more items as needed
];

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="container-fluid p-0 mb-5">
      <div id="header-carousel" className="carousel slide">
        <div className="carousel-inner">
          {carouselImages.map((image, index) => (
            <CarouselItem
              key={index}
              image={image}
              isActive={index === activeIndex}
            />
          ))}
        </div>
        <CarouselControls onPrev={handlePrev} onNext={handleNext} />
      </div>
    </div>
  );
}
