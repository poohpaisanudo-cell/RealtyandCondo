import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/propertycard.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getPropertyById } from "../services/properties";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    getPropertyById(id).then((p) => setProperty(p));
  }, [id]);

  if (!property) {
    return (
      <>
        <Header />
        <main style={{ padding: 24 }}>
          <p>กำลังโหลดหรือไม่พบประกาศนี้</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="property-section" style={{ padding: 24 }}>
        <div className="property-card">
          <img src={property.images?.[0] || property.image} alt={property.title} />
          <h2 style={{ margin: 16 }}>{property.title}</h2>
          <p className="location">{property.location}</p>
          <p className="price">{property.price}</p>
          <p style={{ margin: "12px 16px" }}>{property.description}</p>
          <div style={{ margin: "12px 16px" }}>
            <strong>พื้นที่:</strong> {property.area} • <strong>ห้องนอน:</strong> {property.bedrooms} •{' '}
            <strong>ห้องน้ำ:</strong> {property.bathrooms}
          </div>
          <button style={{ margin: 16 }} className="mt-3 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700">
            ติดต่อเจ้าของ
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
