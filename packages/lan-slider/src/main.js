import componentStyle from './style.js';
import {
  calculateMin,
  calculateMax,
  calculateVal,
  calculateTooltipPosition,
  calculateWidth,
  onMouseOutCallback,
  onMouseMoveCallback,
  onInputCallback
} from './helper.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>${componentStyle}</style>
  <div id='lan-slider-wrapper' class="barCnt">
    <input id='lan-slider-input' type="range"/>
    <p id='lan-slider-prebar' class="preBar"></p>
    <div id='lan-slider-tooltip'></div>
  </div>
`;

/**
 * This is LANSlider widget.
 */
export default class LANSlider extends HTMLElement {
  /**
   * constructor
   */

  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Initialize val, min, max, and range
    let min = calculateMin(this.getAttribute("min"));
    let max = calculateMax(this.getAttribute("max"));
    let val = calculateVal(this.getAttribute("val"), max, min);
    let range = max - min;

    // Update the attribute of val, min, max to default
    this.setAttribute("val", val);
    this.setAttribute("min", min);
    this.setAttribute("max", max);
    
    // Clone template
    const tmpl = template.content.cloneNode(true);

    // Get the tooltip from the template
    const tooltip = tmpl.querySelector("#lan-slider-tooltip");
    tooltip.innerHTML = val;
    tooltip.style.left = `${calculateTooltipPosition(val, max, min)}%`;
    tooltip.style.opacity = '0';

    // Get the prebar from template
    const preBar = tmpl.querySelector("#lan-slider-prebar");
    preBar.style.width = calculateWidth(val, min, range) + "%";

    // Get the slider (input range) from the template
    const slider = tmpl.querySelector('#lan-slider-input');
    slider.className = slider.className.length
      ? slider.className + " colorized"
      : "colorized";
    slider.setAttribute("type", "range");
    slider.setAttribute("name", "lan-slider");
    slider.setAttribute("min", min);
    slider.setAttribute("max", max);
    slider.setAttribute("val", val);
    slider.addEventListener('mouseout', () => onMouseOutCallback(tooltip));
    slider.addEventListener('mousemove', event => onMouseMoveCallback(event, this, slider, tooltip));
    slider.addEventListener('input', () => onInputCallback(this, slider, tooltip))

    // Attach the created elements to the shadow dom
    shadow.appendChild(tmpl);
  }


  /**
   * attributeChangedCallback is a lifecycle method that is invoked
   * whenever attributes listed in observedAttributes static function is
   * updated.
   */
  attributeChangedCallback() {
    const slider = this.shadowRoot.querySelector("#lan-slider-input");
    const tooltip = this.shadowRoot.querySelector("#lan-slider-tooltip");
    const progressBar = this.shadowRoot.querySelector("#lan-slider-prebar");

    // Call the callback function onchange()
    this.onchange();

    // Calculate min, max, val
    let min = calculateMin(this.getAttribute("min"));
    let max = calculateMax(this.getAttribute("max"));
    if (min > max) {
      min = 0;
      max = 100;
    }
    let val = calculateVal(this.getAttribute("val"), max, min);
    let range = max - min;

    // Update slider value
    slider.min = min;
    slider.max = max;
    slider.value = val;

    // Update prebar length
    progressBar.style.width = calculateWidth(val, min, range) + "%";

    // Update tooltip value
    tooltip.innerHTML = val;
  }


  /**
   * observedAttributes
   * @returns {list} returns a list of observed attributes
   */
  static get observedAttributes() {
    return ["val", "max", "min"];
  }
}

// Define the new element
customElements.define("lan-slider", LANSlider);
