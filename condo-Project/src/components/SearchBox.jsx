// src/components/SearchBox.jsx
export default function SearchBox() {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto -mt-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="ทำเล เช่น กรุงเทพฯ"
          className="border border-gray-300 p-3 rounded-lg w-full"
        />
        <select className="border border-gray-300 p-3 rounded-lg">
          <option>ขาย</option>
          <option>เช่า</option>
        </select>
        <button className="bg-blue-600 text-white rounded-lg px-4 py-3 hover:bg-blue-500">
          🔍 ค้นหาเลย
        </button>
      </div>
    </div>
  );
}
