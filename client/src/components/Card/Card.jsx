import React from 'react';
import { Link } from 'react-router-dom';
import "./Card.scss";

const Card = ({ item }) => {
   return (
      <Link to={`/product/${item.id}`} className='link'>
         <div className='card'>
            <div className="image">
               {item?.attributes.isNew && <span>New Season</span>}
               <img src={import.meta.env.VITE_APP_UPLOAD_URL + item.attributes?.img?.data?.attributes?.url} alt="Main image" className="main-image" />
               {
                  item.attributes?.img2?.data?.attributes?.url &&
                  <img src={import.meta.env.VITE_APP_UPLOAD_URL + item.attributes?.img2?.data?.attributes?.url} alt="" className="second-image" />
               }
            </div>
            <h2>{item?.attributes.title}</h2>
            <div className="prices">
               <p>${(item.oldPrice || item?.attributes.price + 20).toFixed(2)}</p>
               <p>${(item?.attributes.price).toFixed(2)}</p>
            </div>
         </div>
      </Link>
   )
}

export default Card