import React, { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "./SlideShow.css";
const Slideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };
  useEffect(() => {
      let intervalID = setInterval(handleNext, 2500);
      return () => {
            clearInterval(intervalID);
      }
  })
  return (
    <div className="slider">
      {/* <TransitionGroup className="image-container">
        <CSSTransition key={currentIndex} timeout={500} classNames="fade">
          <img src={images[currentIndex]} alt="Slideshow" id="slider-img" />
        </CSSTransition>
      </TransitionGroup> */}
      <img src={images[currentIndex]} alt="" id="slider-img"/>
      <div className="slider-next slider-btn home-text-center" onClick={handleNext}>
        <FaAngleRight />
      </div>

      <div className="slider-prev slider-btn home-text-center" onClick={handlePrevious}>
        <FaAngleLeft />
      </div>

      <div className="slider-text-box">
        <p>Chinh phục mọi cung đường</p>
      </div>
    </div>
  );
};

export default Slideshow;
