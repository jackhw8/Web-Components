/**
 * setupSetting shows the setting div of the slider.
 * 
 * @param {HTMLElement} elem 
 */
export function setupSetting(elem) {
  const slider = elem.shadowRoot.querySelector('#col-slider');
  const settingElem = elem.shadowRoot.querySelector('#feed-setting');

  settingElem.style.display = 'block';
 
  slider.change = (event) => {
    const cols = event.target.value;
    elem.setAttribute('cols', cols);
  }
}