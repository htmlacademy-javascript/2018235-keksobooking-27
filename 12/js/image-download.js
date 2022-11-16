const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.user-picture-preview');

const photoChooser = document.querySelector('#images');
const photoPreviewContainer = document.querySelector('.ad-form__photo');

const typeApprove = (file) => FILE_TYPES.some((type) => file.name.toLowerCase().endsWith(type));

avatarChooser.addEventListener('change', () => {
  const avatarFile = avatarChooser.files[0];

  if (typeApprove(avatarFile)) {
    avatarPreview.src = URL.createObjectURL(avatarFile);
  }
});

photoChooser.addEventListener('change', () => {
  const photoFile = photoChooser.files[0];

  if (typeApprove(photoFile)) {
    photoPreviewContainer.innerHTML = '';
    const photoPreview = document.createElement('img');
    photoPreview.src = URL.createObjectURL(photoFile);
    photoPreview.style.maxWidth = '100%';
    photoPreview.style.maxHeight = 'auto';
    photoPreviewContainer.append(photoPreview);
  }
});

const resetImages = () => {
  photoPreviewContainer.innerHTML = '';
  avatarPreview.src = DEFAULT_AVATAR;
};

export { resetImages };


