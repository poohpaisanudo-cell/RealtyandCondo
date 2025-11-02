import React from "react";
import "../styles/propertycard.css";

function PropertyCard({ image, title, location, price }) {
  return (
    <div className="property-card">
      <img src={image} alt={title} />
      <h4>{title}</h4>
      <p className="location">{location}</p>
      <p className="price">{price}</p>
      <button>ดูรายละเอียด</button>
    </div>
  );
}

export default PropertyCard;
