import React, {createContext, useContext, useState, useEffect} from 'react';
import toast from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({children}) => {

    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);
    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        console.log(product)
        const checkProductInCart = cartItems.find((item)=>(item._id === product._id))
        setTotalPrice((prevPrice)=> prevPrice + product.price * quantity)
        setTotalQuantities((prevQuantities)=> prevQuantities + quantity);

        if(checkProductInCart){
            const updatedCartItems = cartItems.map((itemInCart)=>{
                if(itemInCart._id === product._id) return {
                    ...itemInCart,
                    quantity: itemInCart.quantity + quantity
                }
            })
            setCartItems(updatedCartItems)
        }else{
            product.quantity = quantity;
            console.log(quantity)
            setCartItems([...cartItems, {...product}])
            console.log(cartItems)
        }
        toast.success(`${qty} ${product.name} has been added to cart.`);
    };

    const onRemove = (id) => {
        foundProduct = cartItems.find((cartItem)=> cartItem._id === id);
        index = cartItems.findIndex((cartItem)=> cartItem._id === id)
        const updatedCartItems = cartItems.filter((cartItem)=>{ cartItem._id !== id});
        setCartItems(updatedCartItems)
        setTotalPrice((prevTotalPrice)=>prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities((prevTotalQty) => prevTotalQty - foundProduct.quantity);

    }

    const toggleCartItemQuantity = (id, value) =>{
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((item) => item._id === id);
        const newCartItems = cartItems.filter((cartItem)=> cartItem._id !== id)
        if(value === "inc"){
            setCartItems([{...foundProduct, quantity: foundProduct.quantity + 1}, ...newCartItems])
            setTotalPrice((prevTotalPrice)=> prevTotalPrice + foundProduct.price)
            setTotalQuantities((prevQty)=> prevQty + 1)
        }else if(value === "dec"){
            if(foundProduct.quantity > 1){
                setCartItems([{...foundProduct, quantity: foundProduct.quantity - 1}, ...newCartItems])
                setTotalPrice((prevTotalPrice)=>prevTotalPrice - foundProduct.price);
                setTotalQuantities((prevTotalQty)=>prevTotalQty - 1)
            }
            
        }
    }

    const incQty = () =>{
        setQty((prevQty)=>( prevQty + 1 ))
    }

    const decQty = () =>{
        setQty((prevQty)=>{
            if(prevQty - 1 < 1) return 1;
            return prevQty -1
            
            })
    }


  return (
   
    <Context.Provider value={
            {
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                setShowCart,
                toggleCartItemQuantity,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQuantities
            }

    }>

    {children} </Context.Provider>

    
  )
}

export const useStateContext = ()=> useContext(Context);