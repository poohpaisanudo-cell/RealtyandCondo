// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="header">
      <div className="container header-inner">
        <h1 className="site-title">
          <Link to="/">🏠 HomeLink</Link>
        </h1>
        <nav className="site-nav">
          <Link to="/">หน้าแรก</Link>
          <Link to="/listings">ประกาศ</Link>
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={logout} className="btn-primary">ออกจากระบบ</button>
            </>
          ) : (
            <>
              <Link to="/login">เข้าสู่ระบบ</Link>
              <Link to="/register" className="btn-primary">ลงทะเบียน</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
