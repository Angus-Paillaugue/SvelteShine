/**
 * Initializes the image zoom plugin.
 */
export default function imageZoomPlugin() {
  const allImages = document.querySelectorAll('img.page-image');

  allImages.forEach((image) => {
    // On image click, create a new div with the image and append it to the body
    image.addEventListener('click', onImageClick);
    image.addEventListener('keydown', (e) => {
      if(e.key === 'Enter') {
        onImageClick(e);
      }
    });
  })
}


/**
 * Handles the click event on an image to create an image zoom container.
 * @param {Event} e - The click event object.
 */
function onImageClick(e) {
  // If there is already an image zoom container, return
  if (document.querySelector('.zoom-container'))
    return;
  // Create a new div with the image
  const imageZoomContainer = document.createElement('div');
  // Clone the original image
  const imageZoomImage = e.target.cloneNode();
  // Add the classes to the new div
  imageZoomImage.classList = 'w-full h-full zoom-container object-contain';
  imageZoomContainer.classList.add(
    ...'inset-0 fixed z-50 bg-neutral-300/50 dark:bg-neutral-800/50 transition-all duration-300 scale-0 flex-col items-center justify-center cursor-zoom-out'.split(
      ' '
    )
  );
  // Append the image to the new div
  imageZoomContainer.appendChild(imageZoomImage);

  // For animation to work, we need to wait for the next frame
  setTimeout(() => {
    imageZoomContainer.classList.remove(...'scale-0'.split(" "));
    imageZoomContainer.classList.add(...'scale-100 flex'.split(' '));
  }, 0)

  // On click, remove the image zoom container
  imageZoomContainer.addEventListener('click', () => {
    imageZoomContainer.classList.remove(...'scale-100 flex'.split(' '));
    imageZoomContainer.classList.add(...'scale-0'.split(' '));
    setTimeout(() => {
      imageZoomContainer.remove();
    }, 300);
  });

  document.body.appendChild(imageZoomContainer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      imageZoomContainer.click();
    }
  });
}
