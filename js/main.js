function opdnHamburgerMenu() {
  const navBar = document.querySelector('.nav-bar');
  navBar.classList.add('active');
}

function closeHamburgerMenu() {
  const navBar = document.querySelector('.nav-bar');
  navBar.classList.remove('active');
}

// Run the code if the user is on 'education-skill.html' page
if (window.location.pathname === '/education-skills.html') {
  fetch('dynamic_blocks_skills.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('skills-container');
    
    // Iterate over each section in the JSON object
    for (const section in data) {
      // Create section wrapper
      const sectionDiv = document.createElement('div');
      sectionDiv.classList.add('skills-section');

      // Create header for section
      const header = document.createElement('h3');
      header.textContent = section;
      sectionDiv.appendChild(header);

      // Create container for tiles
      const tilesDiv = document.createElement('div');
      tilesDiv.classList.add('tiles');

      // Iterate over the skills in the section
      data[section].forEach(skill => {
        // Create tile
        const tileDiv = document.createElement('div');
        tileDiv.classList.add('tile');

        // Create and append the icon
        const img = document.createElement('img');
        img.src = skill.icon || '../images/placeholder/question_cube.png';
        img.alt = skill.name;
        tileDiv.appendChild(img);

        // Create the tile content
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('tile-content');

        // Skill name
        const nameHeading = document.createElement('h4');
        nameHeading.textContent = skill.name;
        contentDiv.appendChild(nameHeading);

        // Skill description
        const descriptionPara = document.createElement('p');
        descriptionPara.textContent = skill.description;
        contentDiv.appendChild(descriptionPara);

        // Append the content to the tile
        tileDiv.appendChild(contentDiv);
        tilesDiv.appendChild(tileDiv);
      });

      // Append the tiles container to the section and the section to the main container
      sectionDiv.appendChild(tilesDiv);
      container.appendChild(sectionDiv);
    }
  })
  .catch(error => {
    console.error('Error fetching skills data:', error);
  });
}

// Google Analytics Cookie Consent with 5-minute re-ask on decline
// Google Analytics Cookie Consent with 5-minute re-ask on decline

function acceptCookies() {
  localStorage.setItem('cookieConsent', 'accepted');
  localStorage.removeItem('cookieDeclinedAt');
  document.getElementById('cookie-consent-banner').style.display = 'none';
  loadAnalytics();
}

function declineCookies() {
  localStorage.setItem('cookieConsent', 'declined');
  localStorage.setItem('cookieDeclinedAt', Date.now());
  document.getElementById('cookie-consent-banner').style.display = 'none';
}

function loadAnalytics() {
  const script = document.createElement('script');
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-03ZXKCCJLR"; // Replace with your ID
  script.async = true;
  document.head.appendChild(script);

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-03ZXKCCJLR'); // Same ID here too
  };
}

window.onload = () => {
  const consent = localStorage.getItem('cookieConsent');
  const declinedAt = localStorage.getItem('cookieDeclinedAt');
  const banner = document.getElementById('cookie-consent-banner');
  if (!banner) return;

  const now = Date.now();
  const minutesPassed = declinedAt ? (now - parseInt(declinedAt, 10)) / 1000 / 60 : null;

  if (consent === 'accepted') {
    loadAnalytics();
    banner.style.display = 'none';
  } else if (consent === 'declined' && minutesPassed !== null && minutesPassed < 5) {
    // Don't show banner if decline was less than 5 minutes ago
    banner.style.display = 'none';
  } else {
    // Show banner if no decision or 5 minutes have passed since decline
    banner.style.display = 'flex';
  }

  // Attach event listeners
  const acceptBtn = document.querySelector('#cookie-consent-banner button:nth-child(1)');
  const declineBtn = document.querySelector('#cookie-consent-banner button:nth-child(2)');
  if (acceptBtn) acceptBtn.onclick = acceptCookies;
  if (declineBtn) declineBtn.onclick = declineCookies;
};



// Toggles between accepted/declined state and (un)loads analytics
function toggleCookieConsent() {
  const consent = localStorage.getItem('cookieConsent');

  if (consent === 'accepted') {
    // Switch to declined
    localStorage.setItem('cookieConsent', 'declined');
    localStorage.setItem('cookieDeclinedAt', Date.now());
    removeAnalyticsScript();
    alert("Cookie consent set to “declined”. Analytics will not load.");
  } else {
    // Switch to accepted
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.removeItem('cookieDeclinedAt');
    loadAnalytics();
    alert("Cookie consent set to “accepted”. Analytics will load.");
  }
}

// Helper: dynamically load GA script
function loadAnalytics() {
  // Avoid double-loading
  if (document.querySelector('script[src*="gtag/js"]')) return;

  const script = document.createElement('script');
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-03ZXKCCJLR";
  script.async = true;
  document.head.appendChild(script);

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-03ZXKCCJLR');
  };
}

// Helper: remove GA script and clear dataLayer
function removeAnalyticsScript() {
  const gaScript = document.querySelector('script[src*="gtag/js"]');
  if (gaScript) gaScript.remove();
  delete window.dataLayer;
}

// On page load, respect existing consent or show banner logic…
window.addEventListener('load', () => {
  const consent = localStorage.getItem('cookieConsent');
  const declinedAt = parseInt(localStorage.getItem('cookieDeclinedAt'), 10);
  const fiveMinutes = 5 * 60 * 1000;
  const now = Date.now();

  if (consent === 'accepted') {
    loadAnalytics();
  } else if (consent === 'declined' && (now - declinedAt) < fiveMinutes) {
    // still within 5-minute “lockout”
  } else {
    // show your banner here if you have one
    // e.g. document.getElementById('cookie-banner').style.display = 'flex';
  }
});

//Deletes all cookies, local/sessionStorage, and Cache Storage entries
function deleteAllCookiesAndCache() {
  // Delete cookies
  document.cookie.split(";").forEach(cookie => {
    const name = cookie.split("=")[0].trim();
    document.cookie = name +
      "=;expires=" + new Date(0).toUTCString() +
      ";path=/;SameSite=Lax";
  });

  // Clear storage
  localStorage.clear();
  sessionStorage.clear();

  // Clear Cache Storage (e.g. for PWAs)
  if ('caches' in window) {
    caches.keys().then(keys =>
      keys.forEach(key => caches.delete(key))
    );
  }

  alert("All cookies, storage, and cache storage cleared.");
}

function updateConsentStatusDisplay() {
  const statusEl = document.querySelector('p.current-cookie-consent-status');
  if (!statusEl) return;

  const consent = localStorage.getItem('cookieConsent');
  let text;
  switch (consent) {
    case 'accepted':
      text = 'You are currently accepting cookies 🍪';
      break;
    case 'declined':
      text = 'You are currently declining cookies 🚫🍪';
      break;
    default:
      text = 'You have not set you cookie consent yet.';
  }

  statusEl.textContent = text;
  statusEl.style.display = 'block';  // or remove any 'hidden' class
}

// Call on page load
window.addEventListener('load', updateConsentStatusDisplay);