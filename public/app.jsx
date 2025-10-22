// bootstrap entry: App is built by combining components loaded via separate script tags
const { useState } = React;
function AppRoot() {
  const [galleryState, setGalleryState] = useState({ images: [], index: 0, open: false });
  const [detailListing, setDetailListing] = useState(null);
  function openGallery(images, index) {
    setGalleryState({ images, index, open: true });
  }
  function closeGallery() {
    setGalleryState({ images: [], index: 0, open: false });
  }
  function openDetail(listing) {
    setDetailListing(listing);
  }
  function closeDetail() {
    setDetailListing(null);
  }
  return (
    <div>
      <header className="site-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h1>HomeLink</h1>
              <p className="tag">Your Trusted Real Estate Partner</p>
            </div>
            <nav className="main-nav">
              <ul>
                <li><a href="#home">หน้าแรก</a></li>
                <li><a href="#projects">โครงการ</a></li>
                <li><a href="#search">ค้นหา</a></li>
                <li><a href="#contact">ติดต่อเรา</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

  {/* Home component relies on ListingCard being available globally */}
  <Home onOpenGallery={openGallery} onOpenDetail={openDetail} />

      <footer className="site-footer">
        <div className="container">
          <p>© HomeLink 2025 — เชื่อมต่อคุณกับบ้านในฝัน</p>
          <div className="footer-links">
            <a href="#about">เกี่ยวกับเรา</a>
            <a href="#terms">ข้อตกลงการใช้งาน</a>
            <a href="#privacy">นโยบายความเป็นส่วนตัว</a>
            <a href="#contact">ติดต่อเรา</a>
          </div>
        </div>
      </footer>

      {galleryState.open && (
        <GalleryModal images={galleryState.images} index={galleryState.index} onClose={closeGallery} />
      )}

      {detailListing && (
        <ListingDetail listing={detailListing} onClose={closeDetail} onOpenGallery={openGallery} />
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(AppRoot));
