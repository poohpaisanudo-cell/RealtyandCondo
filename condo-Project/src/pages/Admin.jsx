import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Admin() {
  return (
    <>
      <Header />
      <main style={{ padding: 24 }}>
        <h2>Admin (ตัวอย่าง)</h2>
        <p>หน้าสำหรับแสดงข้อมูลผู้ดูแลระบบ ตัวอย่าง read-only สำหรับส่งงาน</p>
      </main>
      <Footer />
    </>
  );
}
