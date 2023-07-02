import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useMediaQuery } from '@mui/material';
import Cart from '../Cart/Cart';
import "./Navbar.scss"

const Navbar = () => {

    const [cartOpen, setCartOpen] = useState(false);
    const [toggle, setToggle] = useState(false);

    const products = useSelector(state => state.cart.products);

    const isNonMobile = useMediaQuery("(min-width: 880px)");

    return (
        <div className="navbar">
            <div className="wrapper">
                <ul className="left">
                    <li className="item">
                        <img src="/img/en.png" alt="Language" />
                        <KeyboardArrowDownIcon />
                    </li>
                    <li className="item">
                        <span>USD</span>
                        <KeyboardArrowDownIcon />
                    </li>
                    <li className="item">
                        <Link className="link" to="/products/1">Women</Link>
                    </li>
                    <li className="item">
                        <Link className="link" to="/products/2">Men</Link>
                    </li>
                    <li className="item">
                        <Link className="link" to="/products/3">Children</Link>
                    </li>
                </ul>
                <div className="center">
                    <Link className="link" to="/">TREEXLSTORE</Link>
                </div>
                <ul className="right" style={isNonMobile ? { display: 'flex' } : { display: 'none' }}>
                    <li className="item">
                        <Link className="link" to="/">Homepage</Link>
                    </li>
                    <li className="item">
                        <Link className="link" to="/">About</Link>
                    </li>
                    <li className="item">
                        <Link className="link" to="/">Contact</Link>
                    </li>
                    <li className="item">
                        <Link className="link" to="/">Stores</Link>
                    </li>
                    <li className="icons">
                        <SearchIcon />
                        <PersonOutlineOutlinedIcon />
                        <FavoriteBorderOutlinedIcon />
                        <div className="cart-icon" onClick={() => setCartOpen(!cartOpen)}>
                            <ShoppingCartOutlinedIcon />
                            <span>{products.length}</span>
                        </div>
                        <button type="button" className={toggle ? "icon-menu menu-open" : "icon-menu"} onClick={() => setToggle(!toggle)}><span></span></button>
                    </li>
                </ul>
                <div className="right" style={isNonMobile ? { display: 'none' } : { display: 'flex' }}>
                    <div className="icons">
                        <SearchIcon />
                        <PersonOutlineOutlinedIcon className='user-account' />
                        <FavoriteBorderOutlinedIcon className='user-wishlist' />
                        <div className="cart-icon" onClick={() => setCartOpen(!cartOpen)}>
                            <ShoppingCartOutlinedIcon />
                            <span>{products.length}</span>
                        </div>
                        <button
                            type="button"
                            className={toggle ? "icon-menu menu-open" : "icon-menu"}
                            onClick={() => setToggle(!toggle)}><span></span>
                        </button>
                    </div>
                </div>
            </div>
            {cartOpen && <Cart />}
            <div className={toggle ? "menu menu-open" : "menu"}>
                <nav className="menu__body">
                    <ul className="menu__list">
                        <li className="menu__item">
                            <img src="/img/en.png" alt="Language" />
                            <KeyboardArrowDownIcon />
                        </li>
                        <li className="menu__item">
                            <span>USD</span>
                            <KeyboardArrowDownIcon />
                        </li>
                        <li className="menu__item" style={isNonMobile ? { display: 'none' } : { display: 'block' }}>
                            <Link className="menu__link" to="/">Homepage</Link>
                        </li>
                        <li className="menu__item" style={isNonMobile ? { display: 'none' } : { display: 'block' }}>
                            <Link className="menu__link" to="/">About</Link>
                        </li>
                        <li className="menu__item" style={isNonMobile ? { display: 'none' } : { display: 'block' }}>
                            <Link className="menu__link" to="/">Contact</Link>
                        </li>
                        <li className="menu__item" style={isNonMobile ? { display: 'none' } : { display: 'block' }}>
                            <Link className="menu__link" to="/">Stores</Link>
                        </li>
                        <li className="menu__item">
                            <Link className="menu__link" to="/products/1">Women</Link>
                        </li>
                        <li className="menu__item">
                            <Link className="menu__link" to="/products/2">Men</Link>
                        </li>
                        <li className="menu__item">
                            <Link className="menu__link" to="/products/3">Children</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;