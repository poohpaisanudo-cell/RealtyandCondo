const { useEffect } = React;
function ListingDetail({ listing, onClose, onOpenGallery }) {
  if (!listing) return null;
  const images = (listing.images && listing.images.length) ? listing.images : [listing.image || '/images/placeholder.jpg'];

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose && onClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // support units/floors if present
  const units = listing.units || listing.floors || [];
  const [activeUnit, setActiveUnit] = React.useState(units.length ? units[0] : null);

  return (
    <div className="detail-modal" onClick={(e) => { if (e.target.className === 'detail-modal') onClose(); }}>
      <div className="detail-panel">
        <button className="detail-close" onClick={onClose} aria-label="ปิด">✕</button>
        <div className="detail-grid">
          <div className="detail-media">
            <img src={(activeUnit && activeUnit.image) ? activeUnit.image : images[0]} alt={listing.title} onError={(e) => e.target.src = '/images/placeholder.jpg'} />
            {images.length > 1 && (
              <div className="detail-gallery-btn">
                <button onClick={() => onOpenGallery && onOpenGallery(images, 0)}>ดูรูปเพิ่มเติม</button>
              </div>
            )}
          </div>
          <div className="detail-info">
            <h2>{listing.title}</h2>
            <p className="meta">{listing.location} — {listing.bedrooms ? listing.bedrooms + ' ห้องนอน' : ''} — {listing.area ? listing.area + ' ตร.ม.' : ''}</p>
            <p className="price-large">{listing.currency} {listing.price ? listing.price.toLocaleString('th-TH') : '-'}</p>
            <p>{listing.description}</p>

            {units.length > 0 && (
              <div className="detail-units">
                <h4>ยูนิต/ชั้น</h4>
                <ul>
                  {units.map((u, i) => (
                    <li key={i} className={activeUnit === u ? 'active' : ''} onClick={() => setActiveUnit(u)}>
                      <strong>{u.name || `Unit ${i + 1}`}</strong>
                      <div className="unit-meta">{u.bedrooms ? u.bedrooms + ' ห้องนอน' : ''} {u.area ? '— ' + u.area + ' ตร.ม.' : ''}</div>
                    </li>
                  ))}
                </ul>
                {activeUnit && (
                  <div className="unit-detail">
                    <p><strong>รหัส:</strong> {activeUnit.code || '-'}</p>
                    <p><strong>ราคา:</strong> {activeUnit.price ? (activeUnit.currency || listing.currency) + ' ' + (activeUnit.price).toLocaleString('th-TH') : 'ไม่ระบุ'}</p>
                    <p>{activeUnit.description}</p>
                  </div>
                )}
              </div>
            )}

            <div className="detail-actions">
              <a className="btn primary" href={`tel:${listing.phone || ''}`}>โทร: {listing.phone || 'ไม่ระบุ'}</a>
              <a className="btn" href={`mailto:${listing.email || ''}`}>ส่งข้อความ</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export for global usage when scripts are loaded via script tags
window.ListingDetail = ListingDetail;
