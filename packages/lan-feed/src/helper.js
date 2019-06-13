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