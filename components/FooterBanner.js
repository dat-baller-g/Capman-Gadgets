import React from 'react';
import Link from "next/link";

import { urlFor } from '../lib/client';

const FooterBanner = ({footerBanner:{footerTitle, footerDiscount,footerLargeText, footerSmallText, footerDescription, smallText, midText, desc, buttonText, image, footerProduct}}) => {
  //console.log(product)
  return (
   
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className='left'>
          <p>{footerDiscount}</p>
          <h3 className='footer-title'>{footerTitle}</h3>
          <h3></h3>
          {/* <p>{saleTime}</p> */}
        </div>

        <div className='right'>
          <p>{footerSmallText}</p>
          <h3>{footerLargeText}</h3>
          <p>{footerDescription}</p>
          <Link href={`/product/${footerProduct}`}>
            <button type='button' className='btn-banner'>{buttonText}</button>
          </Link>
          {/* <Link href={`/product/${heroBanner.product}`}>
                <button type='button'>{heroBanner.buttonText}</button>
            </Link> */}
        </div>

        <img 
          src={urlFor(image[1])}
          className='footer-banner-image' 
        />
       
      </div>      

    </div>
  )
}

export default FooterBanner