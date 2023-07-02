import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartReducer';
import ReactImageZoom from 'react-image-zoom';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'

import { Button } from '@mui/material';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import './Product.scss';

const Product = () => {

    const id = parseInt(useParams().id);
    const [selectedImage, setSelectedImage] = useState("img");
    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();
    const { data, loading, error } = useFetch(
        `/products/${id}?populate=*`, null
    );

    // const props = { width: 400, height: 250, zoomWidth: 500, img: images[selectedImage] };

    const Product = () => {
        return (
            <div className="product">
                {loading ? (
                    "loading"
                ) : (
                    <>
                        <div className="left">
                            <div className="images">
                                {
                                    data?.attributes?.img2?.data?.attributes?.url &&
                                    <>
                                        <img src={import.meta.env.VITE_APP_UPLOAD_URL + data?.attributes?.img?.data?.attributes?.url} alt="Image" onClick={e => setSelectedImage("img")} />
                                        <img src={import.meta.env.VITE_APP_UPLOAD_URL + data?.attributes?.img2?.data?.attributes?.url} alt="Image" onClick={e => setSelectedImage("img2")} />
                                    </>
                                }
                            </div>
                            <div className="main-image">
                                <img src={import.meta.env.VITE_APP_UPLOAD_URL + data?.attributes[selectedImage]?.data?.attributes?.url} alt="Main Image" />
                            </div>
                        </div>
                        <div className="right">
                            <h1>{data?.attributes?.title}</h1>
                            <span className='price'>${data?.attributes?.price}</span>
                            <p>{data?.attributes?.desc}</p>
                            <div className="quantity">
                                <button onClick={() => setQuantity(prev => prev === 1 ? 1 : prev - 1)}>-</button>
                                {quantity}
                                <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
                            </div>
                            <Button
                                type='submit'
                                color='primary'
                                variant='contained'
                                onClick={() => dispatch(addToCart({
                                    id: data.id,
                                    title: data.attributes.title,
                                    desc: data.attributes.desc,
                                    price: data.attributes.price,
                                    img: import.meta.env.VITE_APP_UPLOAD_URL + data?.attributes?.img?.data?.attributes?.url,
                                    quantity,
                                }))}
                                sx={{
                                    width: '250px',
                                    backgroundColor: '#2879fe',
                                    boxShadow: 'none',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    color: 'white',
                                    borderRadius: '5px',
                                    padding: '10px',
                                    display: 'flex',
                                    gap: '10px'
                                }}
                            ><AddShoppingCartIcon />ADD TO CART</Button>
                            <div className="links">
                                <Link className="item">
                                    <FavoriteBorderIcon /> ADD TO WISH LIST
                                </Link>
                                <Link className="item">
                                    <BalanceIcon /> ADD TO COMPARE
                                </Link>
                            </div>
                            <div className="info">
                                <span>Vendor: Polo</span>
                                <span style={{ textTransform: "capitalize" }}>
                                    Product Type: {data?.attributes?.sub_categories?.data.attributes?.title}
                                </span>
                                <span style={{ textTransform: "capitalize" }}>
                                    Tag: {data?.attributes?.sub_categories?.data[0]?.attributes?.title
                                        ? `${data?.attributes?.sub_categories?.data[0]?.attributes?.title},`
                                        : ''} { }
                                    {data?.attributes?.categories?.data[0]?.attributes?.title
                                        ? `${data?.attributes?.categories?.data[0]?.attributes?.title},` : ''} Top
                                </span>
                                <span style={{ textTransform: "capitalize" }}>Type: {data?.attributes?.type}</span>
                            </div>
                            <hr />
                            <div className="details">
                                <Link>DESCRIPTION</Link>
                                <hr />
                                <Link>ADDITIONAL INFORMATION</Link>
                                <hr />
                                <Link>FAQ</Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        )
    }

    return (
        <div className="wrapper">
            <Product />
            <FeaturedProducts type="similar" />
        </div>
    );
};

export default Product;