// src/components/Header.jsx
export default function Header() {
  return (
    <header className="bg-blue-900 text-white py-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold">🏠 HomeLink</h1>
        <nav className="space-x-6 text-lg">
          <a href="#" className="hover:text-blue-300">หน้าแรก</a>
          <a href="#" className="hover:text-blue-300">ซื้อ</a>
          <a href="#" className="hover:text-blue-300">เช่า</a>
          <a href="#" className="hover:text-blue-300">ลงประกาศ</a>
          <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500">
            เข้าสู่ระบบ
          </button>
        </nav>
      </div>
    </header>
  );
}
