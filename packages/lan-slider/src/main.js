import componentStyle from "./style.js";
import {
  calculateMin,
  calculateMax,
  calculateVal,
  calculateThumbPosition,
  calculateTooltipPosition,
  calculateWidth
} from "./helper.js";

const template = document.createElement("template");
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
    tooltip.style.opacity = "0";

    // Get the prebar from template
    const preBar = tmpl.querySelector("#lan-slider-prebar");
    preBar.style.width = calculateWidth(val, min, range) + "%";

    // Get the slider (input range) from the template
    const slider = tmpl.querySelector("#lan-slider-input");
    slider.className = slider.className.length
      ? slider.className + " colorized"
      : "colorized";
    slider.setAttribute("type", "range");
    slider.setAttribute("name", "lan-slider");
    slider.setAttribute("min", min);
    slider.setAttribute("max", max);
    slider.setAttribute("val", val);

    slider.addEventListener("mouseout", () => this.onMouseOutCallback());
    slider.addEventListener("mousemove", event => this.onMouseMoveCallback(event));
    slider.addEventListener("input", () => this.onInputCallback());

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
    if(this.onchange) this.onchange();

    // Calculate min, max, val
    let min = calculateMin(this.getAttribute("min"));
    let max = calculateMax(this.getAttribute("max"));
    if (min > max || min < 0 || max < 0) {
      min = 0;
      max = 100;
      this.setAttribute("min", min);
      this.setAttribute("max", max);
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

  /**
   * onMouseOutCallback is a callback function that should be called
   * whenever the mouse is out of the slider.
   */
  onMouseOutCallback() {
    const tooltip = this.shadowRoot.querySelector("#lan-slider-tooltip");

    // Hide tooltip
    tooltip.style.opacity = "0";
  }


  /**
   * onMouseMoveCallback is a callback function that should be called
   * whenever the mouse is hovering of the slider.
   */
  onMouseMoveCallback(event) {
    const slider = this.shadowRoot.querySelector("#lan-slider-input");
    const tooltip = this.shadowRoot.querySelector("#lan-slider-tooltip");

    // Calculate whatever's necessary
    const currMin = calculateMin(this.getAttribute("min"));
    const currMax = calculateMax(this.getAttribute("max"));
    const thumbOffset = -2;
    const thumbSize = 20;
    const thumbPosition = calculateThumbPosition(slider.value, currMax, currMin) * window.innerWidth / 100;
    const thumbLeftBound = thumbPosition - thumbOffset;
    const thumbRightBound = thumbPosition - thumbOffset + thumbSize;
    const dragOffset = 10;

    // Show/hide tooltip accordingly
    tooltip.style.opacity = '1';
    if (event.clientX < (thumbLeftBound - dragOffset) || event.clientX > (thumbRightBound + dragOffset)) {
      tooltip.style.opacity = '0';
    } 
  }


  /**
   * onInputCallback is a callback function that should be called
   * whenever the slider receives input, which in this context is when
   * slider's value changes.
   */
  onInputCallback() {
    const slider = this.shadowRoot.querySelector("#lan-slider-input");
    const tooltip = this.shadowRoot.querySelector("#lan-slider-tooltip");

    // Update the attribute val
    this.setAttribute("val", slider.value);
  
    // Update the inner HTML of the tooltip accordingly, and show it
    const currMin = calculateMin(this.getAttribute("min"));
    const currMax = calculateMax(this.getAttribute("max"));
    tooltip.style.opacity = '1';
    tooltip.style.left = `${calculateTooltipPosition(slider.value, currMax, currMin)}%`;
  }
}

// Define the new element
customElements.define("lan-slider", LANSlider);
