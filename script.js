const accessKey = '-9_QAH2jZLPC4F9_CyQWQ-IihnKaQr4k5uCTWFLib2s'; // Replace with your API key
const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('loadMore');

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
    gallery.appendChild(img);
  });
}

loadMoreBtn.addEventListener('click', fetchPhotos);

// Initial load
fetchPhotos();
