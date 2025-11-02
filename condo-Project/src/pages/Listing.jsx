import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import { getProperties, searchProperties } from "../services/properties";
import "../styles/home.css";
import { Link } from "react-router-dom";

export default function Listing() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProperties().then((res) => {
      setProperties(res || []);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Header />
      <main className="property-section">
        <h3>ผลการค้นหา</h3>
        {loading ? (
          <p>กำลังโหลด...</p>
        ) : properties.length === 0 ? (
          <p>ไม่พบรายการตามคำค้น</p>
        ) : (
          <div className="property-grid">
            {properties.map((p) => (
              <Link key={p.id} to={`/property/${p.id}`} style={{ textDecoration: "none" }}>
                <PropertyCard {...p} />
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
