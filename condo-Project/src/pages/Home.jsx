import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import "../styles/home.css";

function Home() {
  const properties = [
    {
      id: 1,
      title: "คอนโดใจกลางกรุงเทพฯ",
      location: "สุขุมวิท, กรุงเทพฯ",
      price: "฿3,200,000",
      image: "/images/condo1.jpg",
    },
    {
      id: 2,
      title: "บ้านเดี่ยวพร้อมสวน",
      location: "เชียงใหม่",
      price: "฿6,500,000",
      image: "/images/house1.jpg",
    },
    {
      id: 3,
      title: "อพาร์ตเมนต์ให้เช่า",
      location: "หาดใหญ่",
      price: "฿15,000 / เดือน",
      image: "/images/apartment1.jpg",
    },
  ];

  return (
    <>
      <Header />
      <section className="hero">
        <div className="overlay">
          <h2>ค้นหาอสังหาริมทรัพย์ในฝันของคุณ</h2>
          <p>บ้าน คอนโด และอพาร์ตเมนต์ทั่วประเทศไทย</p>
          <div className="search-bar">
            <input type="text" placeholder="เช่น กรุงเทพ, เชียงใหม่..." />
            <select>
              <option>ขาย</option>
              <option>เช่า</option>
            </select>
            <button>ค้นหาเลย 🔍</button>
          </div>
        </div>
      </section>

      <section className="property-section">
        <h3>อสังหาฯ แนะนำ</h3>
        <div className="property-grid">
          {properties.map((item) => (
            <PropertyCard key={item.id} {...item} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
