// ===============================
// LOAD SAVED SETTINGS
// ===============================

const website = window.location.hostname;

chrome.storage.local.get(
  ["websiteMakeoverSettings"],
  (result) => {

    const allSettings =
      result.websiteMakeoverSettings || {};

    const settings =
      allSettings[website];

    if (!settings) {
      return;
    }

    applyMakeover(settings);

  }
);


// ===============================
// APPLY MAKEOVER
// ===============================

function applyMakeover(settings) {

  // Remove old makeover if it exists
  const oldStyle =
    document.getElementById("website-makeover-style");

  if (oldStyle) {
    oldStyle.remove();
  }

  const oldReading =
    document.getElementById("website-makeover-reading");

  if (oldReading) {
    oldReading.remove();
  }


  // ===============================
  // NORMAL CUSTOMIZATION
  // ===============================

  let css = `
    body {
      background-color: ${settings.backgroundColor} !important;
      color: ${settings.textColor} !important;
      font-family: "${settings.font}" !important;
      font-size: ${settings.textSize}% !important;
    }

    body * {
      font-family: "${settings.font}" !important;
    }

    button,
    input,
    textarea,
    select {
      border-radius: ${settings.roundness}px !important;
    }

    article,
    section,
    div {
      border-radius: ${settings.roundness}px;
    }
  `;


  // ===============================
  // HIDE IMAGES
  // ===============================

  if (settings.hideImages) {

    css += `
      img,
      video,
      iframe {
        display: none !important;
      }
    `;

  }


  // ===============================
  // BLUR IMAGES
  // ===============================

  if (settings.blurImages) {

    css += `
      img {
        filter: blur(12px) !important;
        transition: filter 0.3s ease !important;
      }

      img:hover {
        filter: blur(0) !important;
      }
    `;

  }


  // ===============================
  // READING MODE
  // ===============================

  if (settings.readingMode) {

    css += `
      body {
        background: #f7f3eb !important;
        color: #222 !important;
        font-family: Georgia, serif !important;
        line-height: 1.8 !important;
      }

      body * {
        font-family: Georgia, serif !important;
      }

      header,
      nav,
      footer,
      aside,
      [role="navigation"],
      [role="banner"],
      [role="complementary"],
      .sidebar,
      .advertisement,
      .ads,
      .ad,
      .popup,
      .modal {
        display: none !important;
      }

      main,
      article {
        max-width: 800px !important;
        margin: 30px auto !important;
        padding: 30px !important;
        background: #ffffff !important;
        color: #222 !important;
      }

      p {
        max-width: 750px !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }

      img {
        max-width: 100% !important;
      }
    `;

  }


  // ===============================
  // ADD STYLE
  // ===============================

  const style =
    document.createElement("style");

  style.id =
    "website-makeover-style";

  style.textContent = css;

  document.head.appendChild(style);


  // ===============================
  // READING MODE LABEL
  // ===============================

  if (settings.readingMode) {

    const readingBar =
      document.createElement("div");

    readingBar.id =
      "website-makeover-reading";

    readingBar.textContent =
      "📖 Reading Mode";

    readingBar.style.position = "fixed";
    readingBar.style.top = "10px";
    readingBar.style.right = "10px";
    readingBar.style.zIndex = "999999";
    readingBar.style.padding = "8px 12px";
    readingBar.style.background = "#222";
    readingBar.style.color = "white";
    readingBar.style.borderRadius = "20px";
    readingBar.style.fontSize = "12px";
    readingBar.style.fontFamily = "Arial";

    document.body.appendChild(readingBar);

  }

}