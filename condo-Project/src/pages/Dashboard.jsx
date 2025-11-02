import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { getProperties } from "../services/properties";
import PropertyCard from "../components/PropertyCard";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const [myProperties, setMyProperties] = useState([]);

  useEffect(() => {
    let mounted = true;
    getProperties().then((all) => {
      if (!mounted) return;
      if (!user) {
        setMyProperties([]);
      } else {
        setMyProperties((all || []).filter((p) => Number(p.authorId) === Number(user.id)));
      }
    });
    return () => (mounted = false);
  }, [user]);

  return (
    <>
      <Header />
      <main style={{ padding: 24 }}>
        <h2>แดชบอร์ด</h2>
        {user ? (
          <section style={{ marginTop: 12 }}>
            <p>
              สวัสดี, <strong>{user.name}</strong> ({user.email})
            </p>

            <div style={{ marginTop: 20 }}>
              <h3>ประกาศของฉัน</h3>
              <div style={{ marginTop: 8 }}>
                <Link to="/create" className="bg-blue-600 text-white px-3 py-2 rounded-md">
                  สร้างประกาศใหม่
                </Link>
              </div>
              {myProperties.length === 0 ? (
                <div>
                  <p>ยังไม่มีประกาศของคุณ</p>
                  <Link to="/listings" className="bg-blue-600 text-white px-3 py-2 rounded-md">
                    ดูประกาศอื่นๆ
                  </Link>
                </div>
              ) : (
                <div className="property-grid" style={{ marginTop: 12 }}>
                  {myProperties.map((p) => (
                    <Link key={p.id} to={`/property/${p.id}`} style={{ textDecoration: "none" }}>
                      <PropertyCard {...p} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        ) : (
          <p>กรุณาเข้าสู่ระบบเพื่อดูแดชบอร์ดของคุณ</p>
        )}
      </main>
      <Footer />
    </>
  );
}
