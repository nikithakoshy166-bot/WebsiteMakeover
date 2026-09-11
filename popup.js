
let currentWebsite = "";


// ===============================
// DEFAULT SETTINGS
// ===============================

const defaultSettings = {
  backgroundColor: "#ffffff",
  textColor: "#222222",
  font: "Arial",
  textSize: 100,
  roundness: 0,
  hideImages: false,
  readingMode: false,
  blurImages: false
};


// ===============================
// RUN MAKEOVER
// ===============================

function runMakeover(settings) {

  chrome.tabs.query(
    { active: true, currentWindow: true },
    (tabs) => {

      if (!tabs[0]) return;

      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: makeoverWebsite,
        args: [settings]
      });

    }
  );

}


// ===============================
// WEBSITE MAKEOVER FUNCTION
// ===============================

function makeoverWebsite(settings) {

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


  // RESET
  if (settings.reset) {
    return;
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
  // CREATE STYLE
  // ===============================

  const style =
    document.createElement("style");

  style.id =
    "website-makeover-style";

  style.textContent =
    css;

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


// ===============================
// RANGE VALUES
// ===============================

const textSize =
  document.getElementById("textSize");

const sizeValue =
  document.getElementById("sizeValue");

textSize.addEventListener("input", () => {

  sizeValue.textContent =
    textSize.value + "%";

});


const roundness =
  document.getElementById("roundness");

const roundValue =
  document.getElementById("roundValue");

roundness.addEventListener("input", () => {

  roundValue.textContent =
    roundness.value + "px";

});


// ===============================
// QUICK THEMES
// ===============================

const themes = {

  dark: {
    backgroundColor: "#121212",
    textColor: "#eeeeee",
    font: "Arial",
    textSize: 100,
    roundness: 8,
    hideImages: false,
    readingMode: false,
    blurImages: false
  },

  pastel: {
    backgroundColor: "#fff0f6",
    textColor: "#594052",
    font: "Arial",
    textSize: 100,
    roundness: 15,
    hideImages: false,
    readingMode: false,
    blurImages: false
  },

  cyberpunk: {
    backgroundColor: "#090014",
    textColor: "#00ffff",
    font: "Courier New",
    textSize: 100,
    roundness: 4,
    hideImages: false,
    readingMode: false,
    blurImages: false
  },

  retro: {
    backgroundColor: "#f4e8c1",
    textColor: "#3b2f2f",
    font: "Georgia",
    textSize: 105,
    roundness: 3,
    hideImages: false,
    readingMode: false,
    blurImages: false
  }

};


// ===============================
// LOAD SAVED SETTINGS
// ===============================

chrome.tabs.query(
  { active: true, currentWindow: true },
  (tabs) => {

    if (!tabs[0] || !tabs[0].url) {
      return;
    }

    currentWebsite =
      new URL(tabs[0].url).hostname;

    chrome.storage.local.get(
      ["websiteMakeoverSettings"],
      (result) => {

        const allSettings =
          result.websiteMakeoverSettings || {};

        const settings =
          allSettings[currentWebsite] || defaultSettings;

        document.getElementById("backgroundColor").value =
          settings.backgroundColor;

        document.getElementById("textColor").value =
          settings.textColor;

        document.getElementById("font").value =
          settings.font;

        document.getElementById("textSize").value =
          settings.textSize;

        document.getElementById("roundness").value =
          settings.roundness;

        document.getElementById("hideImages").checked =
          settings.hideImages;

        document.getElementById("readingMode").checked =
          settings.readingMode;

        document.getElementById("blurImages").checked =
          settings.blurImages;

        sizeValue.textContent =
          settings.textSize + "%";

        roundValue.textContent =
          settings.roundness + "px";

      }
    );

  }
);


// ===============================
// THEME BUTTONS
// ===============================

document.querySelectorAll(".theme")
  .forEach(button => {

    button.addEventListener("click", () => {

      const themeName =
        button.dataset.theme;

      const theme =
        themes[themeName];


      // Update controls only
      document.getElementById("backgroundColor").value =
        theme.backgroundColor;

      document.getElementById("textColor").value =
        theme.textColor;

      document.getElementById("font").value =
        theme.font;

      document.getElementById("textSize").value =
        theme.textSize;

      document.getElementById("roundness").value =
        theme.roundness;

      document.getElementById("hideImages").checked =
        theme.hideImages;

      document.getElementById("readingMode").checked =
        theme.readingMode;

      document.getElementById("blurImages").checked =
        theme.blurImages;

      sizeValue.textContent =
        theme.textSize + "%";

      roundValue.textContent =
        theme.roundness + "px";

    });

  });


// ===============================
// APPLY BUTTON
// ===============================

document.getElementById("apply")
  .addEventListener("click", () => {

    const settings = {

      backgroundColor:
        document.getElementById("backgroundColor").value,

      textColor:
        document.getElementById("textColor").value,

      font:
        document.getElementById("font").value,

      textSize:
        document.getElementById("textSize").value,

      roundness:
        document.getElementById("roundness").value,

      hideImages:
        document.getElementById("hideImages").checked,

      readingMode:
        document.getElementById("readingMode").checked,

      blurImages:
        document.getElementById("blurImages").checked

    };


    // Save settings for current website
    chrome.storage.local.get(
      ["websiteMakeoverSettings"],
      (result) => {

        const allSettings =
          result.websiteMakeoverSettings || {};

        allSettings[currentWebsite] =
          settings;

        chrome.storage.local.set({
          websiteMakeoverSettings:
            allSettings
        });

      }
    );


    // Apply settings
    runMakeover(settings);

  });


// ===============================
// RESET BUTTON
// ===============================

document.getElementById("reset")
  .addEventListener("click", () => {


    // Remove settings only for current website
    chrome.storage.local.get(
      ["websiteMakeoverSettings"],
      (result) => {

        const allSettings =
          result.websiteMakeoverSettings || {};

        delete allSettings[currentWebsite];

        chrome.storage.local.set({
          websiteMakeoverSettings:
            allSettings
        });

      }
    );


    // Reset website
    runMakeover({
      reset: true
    });


    // Reset popup controls
    document.getElementById("backgroundColor").value =
      defaultSettings.backgroundColor;

    document.getElementById("textColor").value =
      defaultSettings.textColor;

    document.getElementById("font").value =
      defaultSettings.font;

    document.getElementById("textSize").value =
      defaultSettings.textSize;

    document.getElementById("roundness").value =
      defaultSettings.roundness;

    document.getElementById("hideImages").checked =
      false;

    document.getElementById("readingMode").checked =
      false;

    document.getElementById("blurImages").checked =
      false;

    sizeValue.textContent =
      "100%";

    roundValue.textContent =
      "0px";

  });
