async function fetchListings() {
  const q = (document.getElementById('searchInput') || {}).value || '';
  const type = (document.getElementById('filterType') || {}).value || '';
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
  // If listings is empty and there are already sample/static cards in the DOM,
  // don't wipe them out. Only replace when we have data to render.
  if (!listings || listings.length === 0) {
    if (!root || root.children.length === 0) {
      if (root) root.innerHTML = '<p>ไม่พบรายการ</p>';
    }
    return;
  }
  root.innerHTML = '';
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
    // clicking primary image opens listing detail
    const primImg = card.querySelector('.primary');
    primImg.style.cursor = 'pointer';
    primImg.addEventListener('click', () => openDetail(l));
    root.appendChild(card);
  });
}

// Listing detail modal logic (vanilla)
const detailModal = document.getElementById('detailModal');
const detailImg = document.getElementById('detailImg');
const detailTitle = document.getElementById('detailTitle');
const detailMeta = document.getElementById('detailMeta');
const detailPrice = document.getElementById('detailPrice');
const detailDesc = document.getElementById('detailDesc');
const detailPhone = document.getElementById('detailPhone');
const detailEmail = document.getElementById('detailEmail');
const detailViewGallery = document.getElementById('detailViewGallery');
const detailUnits = document.getElementById('detailUnits');
const detailUnitDetail = document.getElementById('detailUnitDetail');
let currentDetailListing = null;

function openDetail(listing) {
  currentDetailListing = listing;
  const images = (listing.images && listing.images.length) ? listing.images : [listing.image || '/images/placeholder.jpg'];
  // base info
  if (detailImg) detailImg.src = images[0] || '/images/placeholder.jpg';
  if (detailImg) detailImg.alt = listing.title || '';
  if (detailTitle) detailTitle.innerText = listing.title || '';
  if (detailMeta) detailMeta.innerText = `${listing.location || ''} ${listing.bedrooms ? '— ' + listing.bedrooms + ' ห้องนอน' : ''} ${listing.area ? '— ' + listing.area + ' ตร.ม.' : ''}`;
  if (detailPrice) detailPrice.innerText = `${listing.currency || ''} ${currency(listing.price)} ${listing.type || ''}`;
  if (detailDesc) detailDesc.innerText = listing.description || '';
  if (detailPhone) { detailPhone.href = `tel:${listing.phone || ''}`; detailPhone.innerText = `โทร: ${listing.phone || 'ไม่ระบุ'}`; }
  if (detailEmail) { detailEmail.href = `mailto:${listing.email || ''}`; detailEmail.innerText = `ส่งข้อความ`; }
  if (detailViewGallery) detailViewGallery.onclick = () => openGallery(images, 0);

  // Units / floors support (vanilla)
  const units = listing.units || listing.floors || null;
  if (detailUnits) detailUnits.innerHTML = '';
  if (detailUnitDetail) detailUnitDetail.innerHTML = '';
  if (units && Array.isArray(units) && units.length > 0) {
    // create list items
    units.forEach((u, idx) => {
      const li = document.createElement('li');
      li.className = 'detail-unit';
      li.tabIndex = 0;
      li.setAttribute('role', 'button');
      li.innerText = u.name || u.code || `Unit ${idx + 1}`;
      li.addEventListener('click', () => selectUnit(idx));
      li.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectUnit(idx); } });
      if (detailUnits) detailUnits.appendChild(li);
    });

    // select first unit by default
    function selectUnit(i) {
      const unit = units[i];
      // highlight active
      if (detailUnits) Array.from(detailUnits.children).forEach((c, ci) => c.classList.toggle('active', ci === i));
      // show unit-specific image if provided
      if (unit.image && detailImg) {
        detailImg.src = unit.image;
        detailImg.alt = unit.name || unit.code || listing.title || '';
      }
      // update unit detail panel
      if (detailUnitDetail) {
        detailUnitDetail.innerHTML = `
          <h4>${unit.name || unit.code || 'Unit'}</h4>
          <p class="price-small">${unit.currency || listing.currency || ''} ${currency(unit.price || unit.listPrice || listing.price)}</p>
          <p class="meta">${unit.bedrooms ? unit.bedrooms + ' ห้องนอน' : ''} ${unit.area ? '— ' + unit.area + ' ตร.ม.' : ''}</p>
          <p>${unit.description || ''}</p>
        `;
      }
    }

    selectUnit(0);
  }

  // show modal
  if (detailModal) { detailModal.style.display = 'flex'; detailModal.setAttribute('aria-hidden', 'false'); }
}

function closeDetail() {
  detailModal.style.display = 'none';
  detailModal.setAttribute('aria-hidden', 'true');
  currentDetailListing = null;
}

const _detailClose = document.getElementById('detailClose');
if (_detailClose) _detailClose.addEventListener('click', closeDetail);
if (detailModal) detailModal.addEventListener('click', (e) => { if (e.target === detailModal) closeDetail(); });


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

const _galleryClose = document.getElementById('galleryClose');
if (_galleryClose) _galleryClose.addEventListener('click', closeGallery);
const _prevBtn = document.getElementById('prevBtn');
if (_prevBtn) _prevBtn.addEventListener('click', () => setGalleryIndex(galleryIndex - 1));
const _nextBtn = document.getElementById('nextBtn');
if (_nextBtn) _nextBtn.addEventListener('click', () => setGalleryIndex(galleryIndex + 1));
if (galleryModal) galleryModal.addEventListener('click', (e) => { if (e.target === galleryModal) closeGallery(); });


const _searchBtn = document.getElementById('searchBtn');
if (_searchBtn) _searchBtn.addEventListener('click', async () => {
  try {
    const data = await fetchListings();
    render(data);
  } catch (err) {
    console.error('Search failed', err);
  }
});

// initial: try to fetch listings but don't clobber existing static sample cards when the API fails
(async function initialFetch() {
  try {
    const data = await fetchListings();
    render(data);
  } catch (err) {
    console.error('Initial fetch failed - keeping static content if present', err);
  }
})();
