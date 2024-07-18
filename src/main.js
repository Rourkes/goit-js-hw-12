import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.createElement('button');
loadMoreButton.classList.add('load-more', 'is-hidden');
loadMoreButton.textContent = 'Load more';
document.body.appendChild(loadMoreButton);

let query = '';
let page = 1;
let totalHits = 0;

const pictGallery = new simpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);

async function onSearch(evt) {
  evt.preventDefault();
  query = evt.target.elements.search.value.trim();
  page = 1;

  if (query === '') {
    clearGallery();
    return iziToast.error({
      title: 'Error',
      message: 'Search value is empty',
      position: 'topRight',
    });
  }

  clearGallery();
  loadMoreButton.classList.add('is-hidden');
  loader.style.display = 'block';

  try {
    const data = await fetchImages(query, page);
    loader.style.display = 'none';
    totalHits = data.totalHits;
    if (data.hits.length === 0) {
      throw new Error('No images found');
    }
    renderGallery(data.hits);
    pictGallery.refresh();
    if (data.totalHits > 15) {
      loadMoreButton.classList.remove('is-hidden');
    }
    form.reset();
  } catch (error) {
    loader.style.display = 'none';
    iziToast.error({
      title: 'Error',
      message: `Sorry, there are no images matching your search query. Please try again! Error: ${error.message}`,
      position: 'topRight',
      backgroundColor: '#EF4040',
    });
  }
}

async function onLoadMore() {
  page += 1;
  loader.style.display = 'block';

  try {
    const data = await fetchImages(query, page);
    loader.style.display = 'none';
    renderGallery(data.hits);
    pictGallery.refresh();
    if (data.hits.length < 15 || page * 15 >= totalHits) {
      loadMoreButton.classList.add('is-hidden');
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        backgroundColor: '#A9F5F5',
      });
    }

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    loader.style.display = 'none';
    iziToast.error({
      title: 'Error',
      message: `Error: ${error.message}`,
      position: 'topRight',
    });
  }
}
