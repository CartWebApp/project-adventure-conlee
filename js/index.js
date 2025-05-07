
  const openBtn = document.getElementById('popup');
  const infoSection = document.querySelector('.info');
  const closeBtn = document.getElementById('x');

  openBtn.addEventListener('click', () => {
    infoSection.style.display = 'block';
  });

  closeBtn.addEventListener('click', () => {
    infoSection.style.display = 'none';
  });

