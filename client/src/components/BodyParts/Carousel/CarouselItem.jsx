import React from "react";

export default function CarouselItem({ image, isActive }) {
  return (
    <div className={`carousel-item ${isActive ? "active" : ""}`}>
      <img className="w-100" src={image.src} alt={image.alt} />
      <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
        <div className="p-3" style={{ maxWidth: 900 }}>
          <h5 className="text-white text-uppercase">{image.captionTitle}</h5>
          <h1 className="display-2 text-white text-uppercase mb-md-4">
            {image.captionText}
          </h1>
          <a href="#" className="btn btn-primary py-md-3 px-md-5 me-3">
            Join Us
          </a>
          <a href="#" className="btn btn-light py-md-3 px-md-5">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
