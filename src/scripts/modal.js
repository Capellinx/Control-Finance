const button = document.querySelector('.header__button--addValue')
const modalContainer = document.querySelector('.modal__controller');
const buttonClose = document.querySelectorAll('.modal__close');
const openModal = document.querySelector('.valueCards__content--empty');

const handleModal = () => {
  button.addEventListener('click', () => {
    modalContainer.showModal();
    closeModal();
  });
};

const closeModal = () => {
  buttonClose.forEach((Element) => {
    Element.addEventListener('click', () => {
      modalContainer.close()
    });
  });
};

openModal.addEventListener('click', () => {
  modalContainer.showModal();
  closeModal();
})

export {
  handleModal,
  modalContainer,
  openModal
}