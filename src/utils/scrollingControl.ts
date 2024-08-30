export const stopScrolling = () => {
  const html = document.querySelector('html');
  html.style.overflow = 'hidden';
};

export const allowScrolling = () => {
  const html = document.querySelector('html');
  html.style.overflow = 'auto';
};