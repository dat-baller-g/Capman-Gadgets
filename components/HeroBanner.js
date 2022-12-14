import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { urlFor } from '../lib/client'

const HeroBanner = ({heroBanner}) => {
    
    const [imageIndex, setImageIndex] = useState(0)
   
    useEffect(
        function () {
                    
           var timeout = setTimeout(function () {
              const index = imageIndex < heroBanner.image.length - 1 ? imageIndex + 1 : 0;
              setImageIndex(index);
            }, 6000);
          
          return function () {
            clearTimeout(timeout);
          };
        },
        [imageIndex]
      );

  return (
    <div className='hero-banner-container'>
        <p className='beats-solo'> {heroBanner.smallText} </p>
        <h3> {heroBanner.midText} </h3>
        <h1> {heroBanner.largeText1} </h1>
        <h2> {heroBanner.largeText2} </h2>
        <img src={urlFor(heroBanner.image[imageIndex])} alt="herobanner" className='hero-banner-image fade-in-image' />

        <div>
            <Link href={`/product/${heroBanner.product}`}>
                <button type='button' className='btn-banner'> {heroBanner.buttonText} </button>
            </Link>
            <div className='desc'>
                <p>Description</p>
                <h5>{heroBanner.desc}</h5>
            </div>
        </div>

    </div>
  )
}

export default HeroBanner