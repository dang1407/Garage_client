import React, { useEffect } from 'react';
import { useState } from 'react';
import './Home.css';
import sliderImg1 from '../../assets/images/slideImage.png';
import sliderImg2 from '../../assets/images/slideImage (1).png';
import sliderImg3 from '../../assets/images/slideImage (2).png';
import Slideshow from '../../components/SlideShow/SlideShow';
import Production from '../../components/Production/Production';
import Header from '../../components/Header/Header';
const sliderImages = [sliderImg1, sliderImg2, sliderImg3];

const Home = () => {

  return (
    <div className='home-container'>
      {/* Begin Header */}
        < Header / >
      {/* End Header */}

      {/* Begin Slider */}
      <Slideshow images={sliderImages} />
      {/* End Slider */}

      {/* Begin Production */}
      < Production />
      {/* End Production */}
    </div>
  )
}

export default Home