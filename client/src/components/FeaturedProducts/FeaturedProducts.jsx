import React from 'react';
import Card from '../Card/Card';
import useFetch from '../../hooks/useFetch';
import "./FeaturedProducts.scss";

const FeaturedProducts = ({ type }) => {

   const { data, loading, error } = useFetch(`/products?populate=*&[filters][type][$eq]=${type}`, []);

   return (
      <div className='featured-products'>
         <div className="top">
            <h1>{type} products</h1>
            <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ipsa praesentium quae adipisci placeat illo et dolorem ducimus? Repudiandae, dolorum rem. Repudiandae ipsa alias in cum ab autem sunt sed.
            </p>
         </div>
         <div className="bottom">
            {error ? "Something went wrong!" : (loading ? "loading" : data.map(item => (
               <Card item={item} key={item.id} />
            )))}
         </div>
      </div>
   )
}

export default FeaturedProducts