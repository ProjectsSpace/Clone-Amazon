import React from "react";
import "./Home.css";
import Product from "./Product";
import header_bg from "../assets/images/home_bg.jpg";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <div className="home__image">
          <img src={header_bg} alt="Home bg" />
        </div>
        <div className="home__row">
          <Product
            id="123423"
            title="ASUS ROG Strix GA35 GA35DX-XB999 (AMD Ryzen 9 5900X, 128GB RAM, 4TB WD NVMe SSD + 2TB HDD, RTX 3090 24GB"
            image="https://m.media-amazon.com/images/I/71B5JmLHAdS._AC_UY327_FMwebp_QL65_.jpg"
            price={5814.99}
            rating={4}
          />
          <Product
            id="134523"
            title="MSI Stealth 15M Gaming Laptop: 15.6 144Hz FHD 1080p Display, Intel Core i7-11375H, NVIDIA GeForce RTX 3060, 16GB, 512GB SSD"
            image="https://m.media-amazon.com/images/I/71p3Ygm14wL._AC_UY327_FMwebp_QL65_.jpg"
            price={1399.99}
            rating={4}
          />
        </div>

        <div className="home__row">
          <Product
            id="137623"
            title="Dell U-Series 38 Inch Screen LED-Lit Monitor (U3818DW), Blackz"
            image="https://m.media-amazon.com/images/I/71IjK1dq-OL._AC_UY327_FMwebp_QL65_.jpg"
            price={10359.99}
            rating={5}
          />
          <Product
            id="134983"
            title="SAMSUNG Odyssey G5 Series 32-Inch WQHD (2560x1440) Gaming Monitor, 144Hz, Curved, 1ms"
            image="https://m.media-amazon.com/images/I/61Lb5JbFxML._AC_UY327_FMwebp_QL65_.jpg"
            price={349.99}
            rating={4}
          />
          <Product
            id="153523"
            title="ASUS ROG Strix XG32VC 31.5” Curved Gaming Monitor, 1440P WQHD (2560 x 1440), 170Hz, 1ms"
            image="https://m.media-amazon.com/images/I/81PiiZcOrcL._AC_UY327_FMwebp_QL65_.jpg"
            price={499.99}
            rating={4}
          />
        </div>

        <div className="home__row">
          <Product
            id="130923"
            title="NETGEAR Nighthawk Pro Gaming XR700 WiFi Router with 6 Ethernet Ports and Wireless Speeds Up to 7.2 Gbps"
            image="https://m.media-amazon.com/images/I/510tPf7LeoL._AC_UY327_FMwebp_QL65_.jpg"
            price={499.99}
            rating={4}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
