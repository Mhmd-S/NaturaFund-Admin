const updateHeight = () => {
  document.querySelectorAll('.transition-container').forEach(container => {
    if (container.classList.contains('expanded')) {
      container.style.setProperty('--content-height', `${container.scrollHeight}px`);
    }
  });
};

export default updateHeight;