function ListingCard({ listing, onOpenGallery }) {
  const images = (listing.images && listing.images.length) ? listing.images : [listing.image || '/images/placeholder.jpg'];
  return (
    <div className="card">
      <div className="card-media">
        <img className="primary" src={images[0]} alt={listing.title} onError={(e) => e.target.src = '/images/placeholder.jpg'} />
        <div className="thumbs">
          {images.map((s, i) => (
            <img key={i} className="thumb" src={s} alt={`${listing.title} ${i + 1}`} onClick={() => onOpenGallery(images, i)} onError={(e) => e.target.src = '/images/placeholder.jpg'} />
          ))}
        </div>
      </div>
      <h3>{listing.title}</h3>
      <p>{listing.description}</p>
      <div className="price">{listing.currency} {listing.price ? listing.price.toLocaleString('th-TH') : '-'} {listing.type}</div>
    </div>
  );
}
