const mainContainer = document.querySelector('.main-container')

const modalHeader = document.createElement('h2')
modalHeader.classList.add('modal-header')

const modalWindow = document.createElement('div')
modalWindow.classList.add('modal-window')

const modalContent = document.createElement('p')
modalContent.classList.add('modal-content')

export const createModal = (header, message) => {
  modalHeader.innerText = header
  modalContent.innerText = message
  modalWindow.appendChild(modalHeader)
  modalWindow.appendChild(modalContent)
  mainContainer.appendChild(modalWindow)
}
