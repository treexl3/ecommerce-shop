import React from 'react';
import "./Footer.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="top">
                <div className="item">
                    <h1>Categories</h1>
                    <p>Women</p>
                    <p>Men</p>
                    <p>Shoes</p>
                    <p>Accessories</p>
                    <p>New Arrivals</p>
                </div>
                <div className="item">
                    <h2>Links</h2>
                    <p>FAQ</p>
                    <p>Pages</p>
                    <p>Stores</p>
                    <p>Compare</p>
                    <p>Cookies</p>
                </div>
                <div className="item">
                    <h3>About</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, animi at beatae consequuntur
                        dicta,
                        ducimus exercitationem expedita explicabo facere in inventore ipsam laborum natus obcaecati quas
                        quibusdam quis similique tempore?
                    </p>
                </div>
                <div className="item">
                    <h4>Contact</h4>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias aliquid atque aut consequatur
                        cumque cupiditate deleniti distinctio, earum facere fugiat itaque nulla odio quidem quo
                        repellendus rerum tenetur, totam!
                    </p>
                </div>
            </div>
            <div className="bottom">
                <div className="left">
                    <span className="logo">Treexlstore</span>
                    <div className="copyright">© Copyright 2023.All Rights Reserved</div>
                </div>
                <div className="right">
                    <img src="/img/payment.png" alt="Payment Image"/>
                </div>
            </div>
        </footer>
    );
};

export default Footer;