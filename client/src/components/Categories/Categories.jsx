import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import "./Categories.scss";

const Categories = () => {
   const { data, loading, error } = useFetch(`/categories?populate=*`, []);

   const renderMarkup = () => {
      return data.map((item, index) => (
         <div className="col" key={index}>
            <img src={import.meta.env.VITE_APP_UPLOAD_URL + item.attributes?.img?.data?.attributes?.url} alt={item?.attributes.title} />
            <button>
               <Link className='link' to={`/products/${item.id}`}>{item?.attributes.title}</Link>
            </button>
         </div>
      ));
   };

   return (
      <div className='categories'>
         {renderMarkup()}
      </div>
   );
};

export default Categories;
