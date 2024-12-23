const accessKey = '-9_QAH2jZLPC4F9_CyQWQ-IihnKaQr4k5uCTWFLib2s'; // Replace with your API key
const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('loadMore');

// Modal elements
const modal = document.createElement('div');
modal.id = 'modal';
modal.innerHTML = `
  <span id="closeModal">&times;</span>
  <img id="modalImage" src="" alt="Photo Preview">
`;
document.body.appendChild(modal);

let page = 1;

async function fetchPhotos() {
  const url = `https://api.unsplash.com/photos/?client_id=${accessKey}&page=${page}&per_page=12`;
  try {
    const response = await fetch(url);
    const photos = await response.json();
    displayPhotos(photos);
    page++;
  } catch (error) {
    console.error('Error fetching photos:', error);
  }
}

function displayPhotos(photos) {
  photos.forEach(photo => {
    const img = document.createElement('img');
    img.src = photo.urls.small;
    img.alt = photo.alt_description || 'Unsplash Photo';
    img.setAttribute('data-large', photo.urls.full); // Store the large image URL
    img.addEventListener('click', previewPhoto);
    gallery.appendChild(img);
  });
}

function previewPhoto(event) {
  const largeImageURL = event.target.getAttribute('data-large');
  const modalImage = document.getElementById('modalImage');
  modalImage.src = largeImageURL;
  modal.style.display = 'block';
}

// Close modal
modal.addEventListener('click', (event) => {
  if (event.target.id === 'modal' || event.target.id === 'closeModal') {
    modal.style.display = 'none';
  }
});

loadMoreBtn.addEventListener('click', fetchPhotos);

// Initial load
fetchPhotos();
