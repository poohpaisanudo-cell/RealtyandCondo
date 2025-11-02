// src/components/PropertyCard.jsx
import "../styles/propertycard.css";

export default function PropertyCard({ title, price, location, image }) {
  const src = image || "/images/placeholder.jpg";
  return (
    <div className="property-card">
      <img src={src} alt={title} />
      <div className="card-body">
        <h4>{title}</h4>
        <p className="location">{location}</p>
        <p className="price">{price}</p>
        <button className="btn-primary" style={{ marginTop: 12 }}>ดูรายละเอียด</button>
      </div>
    </div>
  );
}
