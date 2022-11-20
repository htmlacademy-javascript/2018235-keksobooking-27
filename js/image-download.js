const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarChooserElement = document.querySelector('#avatar');
const avatarPreviewElement = document.querySelector('.user-picture-preview');

const photoChooserElement = document.querySelector('#images');
const photoPreviewContainerElement = document.querySelector('.ad-form__photo');

const typeApprove = (file) => FILE_TYPES.some((type) => file.name.toLowerCase().endsWith(type));

avatarChooserElement.addEventListener('change', () => {
  const avatarFile = avatarChooserElement.files[0];

  if (typeApprove(avatarFile)) {
    avatarPreviewElement.src = URL.createObjectURL(avatarFile);
  }
});

photoChooserElement.addEventListener('change', () => {
  const photoFile = photoChooserElement.files[0];

  if (typeApprove(photoFile)) {
    photoPreviewContainerElement.innerHTML = '';
    const photoPreview = document.createElement('img');
    photoPreview.src = URL.createObjectURL(photoFile);
    photoPreview.style.maxWidth = '100%';
    photoPreview.style.maxHeight = 'auto';
    photoPreviewContainerElement.append(photoPreview);
  }
});

const resetImages = () => {
  photoPreviewContainerElement.innerHTML = '';
  avatarPreviewElement.src = DEFAULT_AVATAR;
};

export { resetImages };


