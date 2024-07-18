function showImgResult(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="gallery-list">
          <a class="gallery-large" href="${largeImageURL}">
            <img class="gallery-web" src="${webformatURL}" alt="${tags}" width="360" height="152" />
            <ul class="comments-strage">
              <li class="comments-strage-list">
                <span class="windows">Likes </span>${likes}
              </li>
              <li class="comments-strage-list">
                <span class="windows">Views </span>${views}
              </li>
              <li class="comments-strage-list">
                <span class="windows">Comments </span>${comments}
              </li>
              <li class="comments-strage-list">
                <span class="windows">Downloads </span>${downloads}
              </li>
            </ul>
          </a>
        </li>
      `
    )
    .join('');
}

function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = showImgResult(images);
  gallery.insertAdjacentHTML('beforeend', markup);
}

function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

export { renderGallery, clearGallery };
