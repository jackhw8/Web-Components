import componentStyle from './style.js';

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
    const valueBox = tmpl.querySelector("#lan-slider-tooltip");
    valueBox.innerHTML = val;

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
    slider.onmousemove = () => {
      // Cal =l the callback function onchange()
      this.onchange();

      // Update the attribute val
      this.setAttribute("val", slider.value);

      // Update the inner HTML of the tooltip accordingly, and show it
      let currMin = calculateMin(this.getAttribute("min"));
      let currMax = calculateMax(this.getAttribute("max"));
      valueBox.innerHTML = slider.value;
      valueBox.style.cssText = `
        opacity: 1;
        left: ${calculatePosition(slider.value, currMax, currMin)}%;
      `;
    };
    slider.onmouseout = () => {
      // Hide tooltip
      let currMin = calculateMin(this.getAttribute("min"));
      let currMax = calculateMax(this.getAttribute("max"));
      valueBox.style.cssText = `
        opacity: 0;
        left: ${calculatePosition(slider.value, currMax, currMin)}%;
      `;
    };

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
    const valueBox = this.shadowRoot.querySelector("#lan-slider-tooltip");
    const progressBar = this.shadowRoot.querySelector("#lan-slider-prebar");

    // Calculate min, max, val
    let min = calculateMin(this.getAttribute("min"));
    let max = calculateMax(this.getAttribute("max"));
    if (min > max) {
      min = 0;
      max = 100;
    }
    let val = calculateVal(this.getAttribute("val"), max, min);

    // Update slider value
    slider.min = min;
    slider.max = max;
    slider.value = val;

    // Update prebar length
    let range = max - min;
    progressBar.style.width = calculateWidth(val, min, range) + "%";

    // Update blackbox value and position
    valueBox.innerHTML = val;
    valueBox.style.cssText = `left: ${calculatePosition(val, max, min)}%;`;
  }


  /**
   * observedAttributes
   * @returns {list} returns a list of observed attributes
   */
  static get observedAttributes() {
    return ["val", "max", "min"];
  }
}


/**
 * calculateMin is a helper function to calculate the proper value of
 * attribute min
 * 
 * @param {number} min 
 * 
 * @return {number} the proper value of attribute min
 */
let calculateMin = min => {
  return min ? parseInt(min) : 0;
};


/**
 * calculateMax is a helper function to calculate the proper value of
 * attribute max
 * 
 * @param {number} max 
 * 
 * @return {number} the proper value of attribute max
 */
let calculateMax = max => {
  return max ? parseInt(max) : 100;
};


/**
 * calculateVal is a helper function to calculate the proper value of
 * attribute val
 * 
 * @param {number} val 
 * @param {number} max 
 * @param {number} min 
 * 
 * @return {number} the proper value of attribute val
 */
let calculateVal = (val, max, min) => {
  return val && val <= calculateMax(max) && val >= calculateMin(min)
    ? parseInt(val)
    : calculateMin(min) + (calculateMax(max) - calculateMin(min)) / 2;
};


/**
 * calculatePosition is a helper function to calculate the horizontal position
 * of the tooltip
 * 
 * @param {number} val 
 * @param {number} max 
 * @param {number} min 
 * 
 * @return {number} the left horizontal percentage for the tooltip
 */
let calculatePosition = (val, max, min) => {
  var range = max - min;
  var x = 1 - (range - parseInt(val, 10))/range;
  var t = ((1 * (parseInt(val, 10) - parseInt(min, 10))) - x)/ range;
  return t * 100;
};


/**
 * calculateWidth is a helper function to calculates the width of 
 * the width of the progress bar.
 * 
 * @param {number} val 
 * @param {number} max 
 * @param {number} min 
 * 
 * @return {number} the left horizontal percentage for the tooltip
 */
let calculateWidth = (val, min, range) => {
  var x = ((parseInt(val, 10) - range)*0.5)/range;
  var t = (1 * (parseInt(val, 10) - parseInt(min, 10)) - x) / range;
  return t * 100;
}


// Define the new element
customElements.define("lan-slider", LANSlider);
