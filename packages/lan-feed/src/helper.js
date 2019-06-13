/**
 * setupSetting shows the setting div of the slider.
 * 
 * @param {HTMLElement} elem 
 */
export function setupSetting(elem) {
  const slider = elem.shadowRoot.querySelector('#col-slider');
  const settingElem = elem.shadowRoot.querySelector('#feed-setting');

  settingElem.style.display = 'block';
 
  slider.onchange = () => {
    const cols = slider.getAttribute('val');
    elem.setAttribute('cols', cols);
  }
}

/**
 * buildCards creates lan-card elements and append them to the feed body.
 * 
 * @param {HTMLElement} feedBody 
 * @param {Array} contents 
 * @param {Boolean} bootstrap 
 */
export function buildCards(feedBody, contents, bootstrap) {
  for (var content of contents) {
    var card = document.createElement("lan-card");
    card.setAttribute("shadow", "hover");
    card.setAttribute("body-style", "{ height: 350px }")
    card.setAttribute("header", content.header);
    if (bootstrap) card.setAttribute("bootstrap", "");
    card.style.margin = '10px';
    card.innerHTML = content.body;
    feedBody.appendChild(card);
  }
}
