const buttons = document.querySelectorAll('button[data-index]');
const modals = document.querySelectorAll('dialog');
buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    modals[index].showModal();
  });
});

window.addEventListener('click', event => {
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.close();
    }
  });
});
