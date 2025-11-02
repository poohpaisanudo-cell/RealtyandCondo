import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { addProperty } from "../services/properties";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
    type: "sell",
    bedrooms: 1,
    bathrooms: 1,
    area: "",
    description: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, images: [form.image], authorId: user?.id || null };
    await addProperty(payload);
    navigate("/dashboard");
  };

  return (
    <>
      <Header />
      <main style={{ padding: 24 }}>
        <h2>สร้างประกาศใหม่</h2>
        <form onSubmit={onSubmit} style={{ maxWidth: 680, display: "grid", gap: 12, marginTop: 12 }}>
          <label>
            ชื่อประกาศ
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </label>

          <label>
            ทำเล
            <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </label>

          <label>
            ราคา
            <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </label>

          <label>
            รูปภาพ (URL)
            <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
          </label>

          <label>
            ประเภท
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="sell">ขาย</option>
              <option value="rent">เช่า</option>
            </select>
          </label>

          <div style={{ display: "flex", gap: 8 }}>
            <label style={{ flex: 1 }}>
              ห้องนอน
              <input type="number" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: Number(e.target.value) })} />
            </label>
            <label style={{ flex: 1 }}>
              ห้องน้ำ
              <input type="number" value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: Number(e.target.value) })} />
            </label>
            <label style={{ flex: 1 }}>
              พื้นที่
              <input value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} />
            </label>
          </div>

          <label>
            คำอธิบาย
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} />
          </label>

          <div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">บันทึกประกาศ</button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
