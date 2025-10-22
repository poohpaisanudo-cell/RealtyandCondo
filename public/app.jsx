// bootstrap entry: App is built by combining components loaded via separate script tags
const { useState } = React;
function AppRoot() {
  const [galleryState, setGalleryState] = useState({ images: [], index: 0, open: false });
  function openGallery(images, index) {
    setGalleryState({ images, index, open: true });
  }
  function closeGallery() {
    setGalleryState({ images: [], index: 0, open: false });
  }
  return (
    <div>
      <header className="site-header">
        <div className="container">
          <h1>homelink</h1>
          <p className="tag">ซื้อ • เช่า • ปล่อยเช่า • ปล่อยขาย</p>
        </div>
      </header>

      {/* Home component relies on ListingCard being available globally */}
      <Home onOpenGallery={openGallery} />

      <footer className="site-footer">
        <div className="container">© homelink 2025 —</div>
      </footer>

      {galleryState.open && (
        <GalleryModal images={galleryState.images} index={galleryState.index} onClose={closeGallery} />
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(AppRoot));
