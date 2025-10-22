const { useState, useEffect } = React;
function GalleryModal({ images = [], index = 0, onClose }) {
  const [idx, setIdx] = useState(index);
  useEffect(() => setIdx(index), [index]);
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setIdx(i => (i - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setIdx(i => (i + 1) % images.length);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [images.length, onClose]);

  if (!images || images.length === 0) return null;

  return (
    <div className="gallery-modal" onClick={(e) => { if (e.target.className === 'gallery-modal') onClose(); }}>
      <button className="gallery-close" onClick={onClose}>✕</button>
      <div className="gallery-content">
        <button className="gallery-nav" onClick={() => setIdx((idx - 1 + images.length) % images.length)}>◀</button>
        <img src={images[idx]} alt={`รูปที่ ${idx + 1}`} onError={(e) => e.target.src = '/images/placeholder.jpg'} />
        <button className="gallery-nav" onClick={() => setIdx((idx + 1) % images.length)}>▶</button>
      </div>
      <div className="gallery-thumbs">
        {images.map((s, i) => (
          <img key={i} src={s} className={i === idx ? 'active' : ''} onClick={() => setIdx(i)} onError={(e) => e.target.src = '/images/placeholder.jpg'} />
        ))}
      </div>
    </div>
  );
}
