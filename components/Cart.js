
import React, { useRef } from 'react';
import {AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping} from "react-icons/ai"
import {TiDeleteOutline} from "react-icons/ti";
import toast from "react-hot-toast";

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import Link from 'next/link';
import getStripe from '../lib/getStripe';
import PaystackHookExample from '../pages/api/paystack';
import { PaystackButton } from 'react-paystack';

const config = {
    reference: (new Date()).getTime().toString(),
    email: "mobolajiajakaiye@gmail.com",
    amount: 20000,
    publicKey: "pk_test_597dc15acdd3cf3b4fe71e7e03655bab7409e653",
  };


const Cart = () => {
    const cartRef = useRef();
    const {totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove} = useStateContext();

    const handlePaystackSuccessAction = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        console.log(reference);
      };
    
      // you can call this function anything
      const handlePaystackCloseAction = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
      }
    
      const componentProps = {
          ...config , amount: totalPrice * 72000,
          text: 'PAY WITH PAYSTACK',
          onSuccess: (reference) => handlePaystackSuccessAction(reference),
          onClose: handlePaystackCloseAction,
      };

    const handleCheckout = async () => {
        const stripe = await getStripe();
    
        //make api call to the backend
        const response = await fetch("/api/stripe", {
          method: "POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify(cartItems)
        })
    
        if(response.statusCode === 500) return;
        const data = await response.json();
        toast.loading("Redirecting...");
        stripe.redirectToCheckout({sessionId: data.id})
      }

  return (
    <div className='cart-wrapper' ref={cartRef}>
        <div className='cart-container' >
          <button type='button' className='cart-heading' onClick={()=>(setShowCart(false))}>
            <AiOutlineLeft />
            <span className='cart-heading'>Your Cart</span>
            <span className='cart-num-items'>({totalQuantities} items)</span>

          </button>

          {cartItems.length < 1 && (
            <div className='empty-cart'>
              <AiOutlineShopping size={150} />
              <h3>Your shopping bag is empty</h3>
              <Link href="/">
                <button className='btn' type='button' onClick={()=>setShowCart(false)}> Continue shopping</button>

              </Link>
             
              </div>
          )}

          <div className='product-container'>
            {cartItems.length >= 1 && cartItems.map((item) => (
                <div className='product' key={item._id}>
                  <img src={urlFor(item?.image[0])} className="cart-product-image" />
                  <div className='item-desc'>
                    <div className='flex-top'>
                      <h5>{item.name}</h5>
                      <h4>{item.price}</h4>
                      <h4 style={{float:"right"}}>{item.price * item.quantity}</h4>
                      <div className='flex bottom'>
                       
                        <div className='quantity'>
                      
                          <div className='quantity-desc'>
                              <span className='minus' onClick={()=>{toggleCartItemQuantity(item._id, "dec")}}>
                                  <AiOutlineMinus />
                              </span>
                              <span className='num'>
                                  {item.quantity}
                              </span>
                              <span className='plus' onClick={()=>{toggleCartItemQuantity(item._id, "inc")}}>
                                  <AiOutlinePlus />
                              </span>

                          </div>
                        </div>
                        <button className='remove-item' type='buttton' onClick={()=> onRemove(item._id)}><TiDeleteOutline /></button>
                      </div>
                        

                    </div>
                    
                  </div>
                
                </div>
            
          )) }                
          
      </div>

       {/* to implement the Subtotal feature*/}
       {cartItems.length >= 1 && (
        <div className='cart-bottom'>
          <div className='total'>
            <h3>Subtotal:</h3>
            <h3>${totalPrice}</h3>
          </div>
          
          <div className="btn-container">
            <PaystackButton {...componentProps} className="btn" />
            <button type='button' className='btn' onClick={handleCheckout}>Pay with stripe</button>
            
            
            
             </div>
          </div>
      )}


        </div>
        
    
    </div>
  )
}

export default Cart