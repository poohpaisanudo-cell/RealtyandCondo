// src/components/PropertyCard.jsx
export default function PropertyCard({ title, price, location, image }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-500">{location}</p>
        <p className="text-blue-600 font-bold mt-2">{price}</p>
        <button className="mt-3 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700">
          ดูรายละเอียด
        </button>
      </div>
    </div>
  );
}
