// lang-switch.js
// Place at /homepage/lang-switch.js and include on every page with:
// <script src="/homepage/lang-switch.js"></script>

(function() {
  const siteBase = '/homepage'; // change this if your site base path is different
  const wrapper = document.querySelector('.lang-switch');
  if (!wrapper) return;

  // Get path relative to siteBase
  const path = window.location.pathname || '/';
  let rel = path.startsWith(siteBase + '/') ? path.slice(siteBase.length + 1) : path.slice(1);

  // Normalize directory-style URLs so index pages become index.html
  if (rel === '' || rel.endsWith('/')) rel = 'index.html';

  const isEs = rel.startsWith('es/');
  const relNoEs = isEs ? rel.slice(3) : rel;

  // Build canonical en/es URLs (use directory style for index)
  const enUrl = (relNoEs === 'index.html') ? (siteBase + '/') : (siteBase + '/' + relNoEs);
  const esUrl = (relNoEs === 'index.html') ? (siteBase + '/es/') : (siteBase + '/es/' + relNoEs);

  // Find or create links
  let enLink = wrapper.querySelector('a[hreflang="en"]');
  let esLink = wrapper.querySelector('a[hreflang="es"]');

  if (!enLink) {
    enLink = document.createElement('a');
    enLink.setAttribute('hreflang', 'en');
    enLink.textContent = 'English';
    wrapper.appendChild(enLink);
  }
  if (!esLink) {
    esLink = document.createElement('a');
    esLink.setAttribute('hreflang', 'es');
    esLink.textContent = 'Español';
    wrapper.appendChild(esLink);
  }

  // Assign hrefs (absolute so it works from any folder depth)
  enLink.href = enUrl;
  esLink.href = esUrl;

  // Mark active language
  enLink.classList.toggle('active', !isEs);
  esLink.classList.toggle('active', isEs);
})();
