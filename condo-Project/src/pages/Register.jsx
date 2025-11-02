import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    await register(form);
    navigate("/dashboard");
  };

  return (
    <>
      <Header />
      <main style={{ padding: 24 }}>
        <h2>สมัครสมาชิก</h2>
        <form onSubmit={onSubmit} style={{ maxWidth: 420, marginTop: 12 }}>
          <label>
            ชื่อ
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label>
            อีเมล
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label>
            รหัสผ่าน
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </label>
          <button type="submit">ลงทะเบียน</button>
        </form>
      </main>
      <Footer />
    </>
  );
}
