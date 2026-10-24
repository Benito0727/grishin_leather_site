let currentSlide = 0;
let galleryImages = [];

document.addEventListener('DOMContentLoaded', function() {
  initializeModal();
  initializeFilters();
});

function initializeModal() {
  const modal = document.getElementById('productModal');
  if (!modal) return;

  document.addEventListener('click', function(e) {
    const card = e.target.closest('.card');
    if (!card) return;
    if (e.target.closest('.actions')) return;

    const productId = card.getAttribute('data-id');
    if (productId) openModal(productId);
  });

  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') changeSlide(-1);
    if (e.key === 'ArrowRight') changeSlide(1);
  });

  const prevBtn = modal.querySelector('.gallery-nav.prev');
  const nextBtn = modal.querySelector('.gallery-nav.next');

  if (prevBtn) {
    prevBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      changeSlide(-1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      changeSlide(1);
    });
  }
}

function openModal(productId) {
  const card = document.querySelector('.card[data-id="' + productId + '"]');
  if (!card) return;

  const data = JSON.parse(card.getAttribute('data-product'));

  galleryImages = [];
  if (data.mainImageUrl) galleryImages.push(data.mainImageUrl);
  if (data.gallery && data.gallery.length > 0) {
    data.gallery.forEach(function(img) {
      if (img.url) galleryImages.push(img.url);
    });
  }

  currentSlide = 0;
  renderGallery();

  const modal = document.getElementById('productModal');
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const modal = document.getElementById('productModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
  galleryImages = [];
}

function renderGallery() {
  const galleryContainer = document.getElementById('modalGallery');
  const dotsContainer = document.getElementById('galleryDots');

  if (!galleryContainer || !dotsContainer) return;

  galleryContainer.innerHTML = '';
  dotsContainer.innerHTML = '';

  if (galleryImages.length === 0) return;

  galleryImages.forEach(function(url, index) {
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Фото товара';
    img.className = 'gallery-image';

    if (index === currentSlide) {
      img.style.display = 'block';
    } else {
      img.style.display = 'none';
    }

    galleryContainer.appendChild(img);

    const dot = document.createElement('span');
    dot.className = 'dot';
    if (index === currentSlide) dot.classList.add('active');
    dot.addEventListener('click', function(e) {
      e.stopPropagation();
      goToSlide(index);
    });
    dotsContainer.appendChild(dot);
  });

  const navButtons = document.querySelectorAll('.gallery-nav');
  navButtons.forEach(function(btn) {
    btn.style.display = galleryImages.length > 1 ? 'block' : 'none';
  });
}

function changeSlide(direction) {
  if (galleryImages.length <= 1) return;
  currentSlide = (currentSlide + direction + galleryImages.length) % galleryImages.length;
  updateGallery();
}

function goToSlide(index) {
  if (index < 0 || index >= galleryImages.length) return;
  currentSlide = index;
  updateGallery();
}

function updateGallery() {
  const images = document.querySelectorAll('.gallery-image');
  const dots = document.querySelectorAll('.dot');

  images.forEach(function(img, i) {
    if (i === currentSlide) {
      img.style.display = 'block';
    } else {
      img.style.display = 'none';
    }
  });

  dots.forEach(function(dot, i) {
    if (i === currentSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function initializeFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.card');

  filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const selectedCategory = this.getAttribute('data-category');

      filterButtons.forEach(function(btn) {
        btn.classList.remove('active');
      });
      this.classList.add('active');

      productCards.forEach(function(card) {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}