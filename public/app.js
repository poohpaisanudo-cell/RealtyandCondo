async function fetchListings() {
  const q = document.getElementById('q').value;
  const type = document.getElementById('type').value;
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (type) params.set('type', type);
  const res = await fetch('/api/listings?' + params.toString());
  return res.json();
}

function currency(n) {
  if (!n) return '-';
  return n.toLocaleString('th-TH');
}

function render(listings) {
  const root = document.getElementById('listings');
  root.innerHTML = '';
  if (!listings || listings.length === 0) {
    root.innerHTML = '<p>ไม่พบรายการ</p>';
    return;
  }
  listings.forEach(l => {
    const card = document.createElement('div');
    card.className = 'card';
    // choose primary image and list of images
    const images = (l.images && l.images.length) ? l.images : [l.image || '/images/placeholder.jpg'];
    const primary = images[0];
    card.innerHTML = `
      <div class="card-media">
        <img class="primary" src="${primary}" alt="${l.title}" onerror="this.src='/images/placeholder.jpg'" />
        <div class="thumbs"></div>
      </div>
      <h3>${l.title}</h3>
      <p>${l.description}</p>
      <div class="price">${l.currency} ${currency(l.price)} ${l.type}</div>
    `;
    // append thumbnails
    const thumbs = card.querySelector('.thumbs');
    images.forEach((src, idx) => {
      const t = document.createElement('img');
      t.className = 'thumb';
      t.src = src;
      t.alt = l.title + ' - ' + (idx + 1);
      t.onerror = () => { t.src = '/images/placeholder.jpg'; };
      t.addEventListener('click', () => openGallery(images, idx));
      thumbs.appendChild(t);
    });
    root.appendChild(card);
  });
}

// gallery modal logic
const galleryModal = document.getElementById('galleryModal');
const galleryImg = document.getElementById('galleryImg');
const galleryThumbs = document.getElementById('galleryThumbs');
let galleryImages = [];
let galleryIndex = 0;

function openGallery(images, index = 0) {
  galleryImages = images.slice();
  galleryIndex = index;
  galleryImg.src = galleryImages[galleryIndex] || '/images/placeholder.jpg';
  galleryImg.alt = 'รูปที่ ' + (galleryIndex + 1);
  galleryThumbs.innerHTML = '';
  galleryImages.forEach((src, i) => {
    const t = document.createElement('img');
    t.src = src;
    t.className = 'g-thumb' + (i === galleryIndex ? ' active' : '');
    t.onerror = () => { t.src = '/images/placeholder.jpg'; };
    t.addEventListener('click', () => setGalleryIndex(i));
    galleryThumbs.appendChild(t);
  });
  galleryModal.style.display = 'block';
  galleryModal.setAttribute('aria-hidden', 'false');
}

function closeGallery() {
  galleryModal.style.display = 'none';
  galleryModal.setAttribute('aria-hidden', 'true');
}

function setGalleryIndex(i) {
  if (i < 0) i = galleryImages.length - 1;
  if (i >= galleryImages.length) i = 0;
  galleryIndex = i;
  galleryImg.src = galleryImages[galleryIndex] || '/images/placeholder.jpg';
  Array.from(galleryThumbs.children).forEach((el, idx) => el.classList.toggle('active', idx === galleryIndex));
}

document.getElementById('galleryClose').addEventListener('click', closeGallery);
document.getElementById('prevBtn').addEventListener('click', () => setGalleryIndex(galleryIndex - 1));
document.getElementById('nextBtn').addEventListener('click', () => setGalleryIndex(galleryIndex + 1));
galleryModal.addEventListener('click', (e) => { if (e.target === galleryModal) closeGallery(); });


document.getElementById('searchBtn').addEventListener('click', async () => {
  const data = await fetchListings();
  render(data);
});

// initial
fetchListings().then(render).catch(err => {
  document.getElementById('listings').innerText = 'เกิดข้อผิดพลาด';
  console.error(err);
});
