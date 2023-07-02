import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, resetCart } from '../../redux/cartReducer';

import { Button } from '@mui/material';
import DeleteOulinedIcon from "@mui/icons-material/DeleteOutlined";
import "./Cart.scss";

const Cart = () => {

   const products = useSelector(state => state.cart.products);

   const dispatch = useDispatch();

   const totalPrice = () => {
      let total = 0;
      products.forEach(product => total += product.quantity * product.price);
      return total.toFixed(2);
   };

   return (
      <div className='cart'>
         <h2>Products in your cart</h2>
         {products?.map(item => (
            <div className="item" key={item.id}>
               <img src={item.img} alt="" />
               <div className="details">
                  <h3>{item.title}</h3>
                  <p>{item.desc?.substring(0, 100)}</p>
                  <div className="price">{item.quantity} x ${item.price}</div>
               </div>
               <DeleteOulinedIcon className='delete' onClick={() => dispatch(removeItem(item.id))} />
            </div>
         ))}
         {products && products.length > 0 ? (
            <>
               <div className="total">
                  <span>SUBTOTAL</span>
                  <span>${totalPrice()}</span>
               </div>
               <Button
                  fullWidth
                  type='submit'
                  color='primary'
                  variant='contained'
                  href='/checkout'
                  sx={{
                     backgroundColor: '#2879fe',
                     boxShadow: 'none',
                     fontSize: '16px',
                     fontWeight: '500',
                     color: 'white',
                     borderRadius: '5px',
                     padding: '7px',
                     display: 'flex',
                     mb: '20px',
                  }}
               >PROCEED TO CHECKOUT</Button>
               <span className="reset" onClick={() => dispatch(resetCart())}>Reset Cart</span>
            </>
         ) : (
            <p>Your cart is empty</p>
         )}
      </div>
   )
}

export default Cart