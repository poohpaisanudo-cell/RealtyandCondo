// src/services/properties.js
// Mock property data and simple async fetch helpers
const properties = [
  {
    id: 1,
    title: "คอนโดใจกลางกรุงเทพฯ",
    location: "สุขุมวิท, กรุงเทพฯ",
    price: "฿3,200,000",
    images: ["/images/condo1.jpg"],
    description: "คอนโดสวย ใกล้ BTS เหมาะสำหรับทำเลการลงทุนและอยู่อาศัย",
    type: "sell",
    bedrooms: 2,
    bathrooms: 1,
    area: "55 ตร.ม.",
    authorId: 1,
  },
  {
    id: 2,
    title: "บ้านเดี่ยวพร้อมสวน",
    location: "เชียงใหม่",
    price: "฿6,500,000",
    images: ["/images/house1.jpg"],
    description: "บ้านพร้อมสวน บรรยากาศสงบ เหมาะสำหรับครอบครัว",
    type: "sell",
    bedrooms: 3,
    bathrooms: 2,
    area: "180 ตร.ม.",
    authorId: 2,
  },
  {
    id: 3,
    title: "อพาร์ตเมนต์ให้เช่า",
    location: "หาดใหญ่",
    price: "฿15,000 / เดือน",
    images: ["/images/apartment1.jpg"],
    description: "อพาร์ตเมนต์ใกล้มหาวิทยาลัย เหมาะสำหรับนักศึกษา",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    area: "30 ตร.ม.",
    authorId: 3,
  },
];

export function getProperties() {
  return Promise.resolve(properties);
}

export function getPropertyById(id) {
  const p = properties.find((x) => Number(x.id) === Number(id));
  return Promise.resolve(p || null);
}

export function searchProperties(query = "", { type } = {}) {
  const q = String(query).toLowerCase().trim();
  const result = properties.filter((p) => {
    const matchesQ = !q || p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
    const matchesType = !type || p.type === type;
    return matchesQ && matchesType;
  });
  return Promise.resolve(result);
}

export function addProperty(data = {}) {
  const newProp = {
    id: Date.now(),
    title: data.title || "Untitled",
    location: data.location || "",
    price: data.price || "",
    images: data.images && data.images.length ? data.images : [data.image || "/images/placeholder.jpg"],
    description: data.description || "",
    type: data.type || "sell",
    bedrooms: data.bedrooms || 0,
    bathrooms: data.bathrooms || 0,
    area: data.area || "",
    authorId: data.authorId || null,
  };
  properties.unshift(newProp);
  return Promise.resolve(newProp);
}

export default { getProperties, getPropertyById, searchProperties };
