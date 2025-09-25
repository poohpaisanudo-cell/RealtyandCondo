function toggleMenu() {
  document.getElementById('menu').classList.toggle('active');
}

// wiring menu toggle
document.addEventListener('DOMContentLoaded', function(){
  var btn = document.getElementById('menuToggle');
  var menu = document.getElementById('menu');
  if(btn && menu){
    btn.addEventListener('click', function(){
      menu.classList.toggle('active');
    });
  }

  // simple search filter
  var form = document.getElementById('searchForm');
  var input = document.getElementById('searchInput');
  var filterType = document.getElementById('filterType');
  var cards = document.getElementById('cards');

  function applyFilter(q, type){
    var items = cards.querySelectorAll('.card');
    q = (q||'').trim().toLowerCase();
    items.forEach(function(it){
      var text = it.innerText.toLowerCase();
      var matchesQuery = q === '' || text.indexOf(q) !== -1;
      var matchesType = !type || it.dataset.type === type;
      it.style.display = (matchesQuery && matchesType) ? '' : 'none';
    });
  }

  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      applyFilter(input.value, filterType.value);
    });
  }
});