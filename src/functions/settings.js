/* Format Options Setting */

export default function settings() {
  const formatOptions = document.getElementsByName("format");
  const formatOptionsSetting = document.querySelector("#format-button-area");
  // if setting is stored in localStorage, make frontend match setting
  if (localStorage.formatOptions) {
    const format = localStorage.formatOptions;

    for (let i = 0; i < formatOptions.length; i++) {
      if (format === formatOptions[i].value) {
        formatOptions[i].checked = true;
      }
    }
  } else {
    for (let i = 0; i < formatOptions.length; i++) {
      if (formatOptions[i].checked) {
        localStorage.formatOptions = formatOptions[i].value;
      }
    }
  }
  // when setting is changed, change it in localStorage
  formatOptionsSetting.addEventListener("click", () => {
    localStorage.formatOptions = getFormatValue();
  });
  /* Translation Setting */
  const isAllTranslationsSetting = document.querySelector("#all-translations");
  // if setting is stored in localStorage, make frontend match setting
  if (localStorage.isAllTranslations) {
    isAllTranslationsSetting.checked = JSON.parse(localStorage.isAllTranslations);
  } else {
    isAllTranslationsSetting.checked = false;
    localStorage.isAllTranslations = false;
  }
  // when setting is changed, change it in localStorage
  isAllTranslationsSetting.addEventListener("click", () => {
    localStorage.isAllTranslations = isAllTranslationsSetting.checked;
  });
  /* New Tab Setting */
  const isNewTabSetting = document.querySelector("#new-tab");
  // if setting is stored in localStorage, make frontend match setting
  if (localStorage.isNewTab) {
    isNewTabSetting.checked = JSON.parse(localStorage.isNewTab);
  } else {
    isNewTabSetting.checked = false;
    localStorage.isNewTab = false;
  }
  // when setting is changed, change it in localStorage
  isNewTabSetting.addEventListener("click", () => {
    localStorage.isNewTab = isNewTabSetting.checked;
  });

  function getFormatValue() {
    let format = "";
    // const formatOptions = document.getElementsByName("format");
    for (let i = 0; i < formatOptions.length; i++) {
      if (formatOptions[i].checked) {
        format = formatOptions[i].value;
      }
    }
    return format;
  }
}
