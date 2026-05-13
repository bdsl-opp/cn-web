(function () {
  const body = document.body;
  const logo = document.querySelector('[data-logo]');
  const menuPanel = document.querySelector('[data-menu-panel]');
  const cartPanel = document.querySelector('[data-cart-panel]');
  const productModal = document.querySelector('[data-product-modal]');
  const cartCount = document.querySelector('[data-cart-count]');
  let count = 0;

  function setPanel(panel, open) {
    if (!panel) return;
    panel.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    body.classList.toggle('is-locked', open);
  }

  function closeAll() {
    setPanel(menuPanel, false);
    setPanel(cartPanel, false);
    setPanel(productModal, false);
  }

  function fadeLogo() {
    if (!logo) return;
    const limit = window.innerHeight * 0.75;
    const progress = Math.min(window.scrollY / limit, 1);
    logo.style.opacity = String(1 - progress);
    logo.style.transform = 'translate(calc(-50% - ' + progress * 26 + 'px))';
  }

  function revealSections() {
    document.querySelectorAll('.reveal-section').forEach(function (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.84) {
        section.classList.add('is-visible');
      }
    });
  }

  document.querySelectorAll('[data-menu-button]').forEach(function (button) {
    button.addEventListener('click', function () { setPanel(menuPanel, true); });
  });

  document.querySelectorAll('[data-menu-close]').forEach(function (button) {
    button.addEventListener('click', function () { setPanel(menuPanel, false); });
  });

  document.querySelectorAll('[data-cart-button]').forEach(function (button) {
    button.addEventListener('click', function () { setPanel(cartPanel, true); });
  });

  document.querySelectorAll('[data-cart-close]').forEach(function (button) {
    button.addEventListener('click', function () { setPanel(cartPanel, false); });
  });

  document.querySelectorAll('[data-open-product]').forEach(function (row) {
    row.addEventListener('click', function (event) {
      if (event.target.closest('[data-add-cart]')) return;
      setPanel(productModal, true);
    });
  });

  document.querySelectorAll('[data-product-close]').forEach(function (button) {
    button.addEventListener('click', function () { setPanel(productModal, false); });
  });

  document.querySelectorAll('[data-add-cart]').forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.stopPropagation();
      count += 1;
      if (cartCount) cartCount.textContent = '(' + count + ')';
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeAll();
  });

  window.addEventListener('scroll', function () {
    fadeLogo();
    revealSections();
  }, { passive: true });

  fadeLogo();
  revealSections();
})();
