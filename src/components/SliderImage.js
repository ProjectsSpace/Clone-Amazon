import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function SliderImage({ images, configurableProps }) {
  return (
    <div className="slider__container">
      <Carousel autoPlay {...configurableProps}>
        {images.map((image) => (
          <div>
            <img className="slider__image" alt="" src={image} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default SliderImage;
