import componentStyle from './style.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>${componentStyle}</style>
  <div id='lan-slider-wrapper' class="barCnt">
    <input id='lan-slider' type="range"/>
    <p id='lan-slider-prebar' class="preBar"></p>
    <div id='val-box'></div>
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

    // Initialize val, min, max
    let min = calculateMin(this.getAttribute("min"));
    let max = calculateMax(this.getAttribute("max"));
    if (min > max) {
      min = 0;
      max = 100;
    }
    let val = calculateVal(this.getAttribute("val"), max, min);

    // Update the attribute of val, min, max to default
    this.setAttribute("val", val);
    this.setAttribute("min", min);
    this.setAttribute("max", max);
    
    const tmpl = template.content.cloneNode(true);

    // Create the blackbox to show the value of the slider
    const valueBox = tmpl.querySelector("#val-box");
    valueBox.innerHTML = val;

    // Create slider and add event listeners to it
    const slider = tmpl.querySelector('#lan-slider');
    slider.setAttribute("type", "range");
    slider.setAttribute("name", "lan-slider");
    slider.setAttribute("min", min);
    slider.setAttribute("max", max);
    slider.setAttribute("val", val);
    slider.id = "lan-slider";
    slider.onmousemove = () => {
      let currMin = calculateMin(this.getAttribute("min"));
      let currMax = calculateMax(this.getAttribute("max"));

      this.onchange();

      this.setAttribute("val", slider.value);

      valueBox.innerHTML = slider.value;
      valueBox.style.cssText = `
        opacity: 1;
        left: ${calculatePosition(slider.value, currMax, currMin)}%;
      `;
    };
    slider.onmouseout = () => {
      let currMin = calculateMin(this.getAttribute("min"));
      let currMax = calculateMax(this.getAttribute("max"));

      valueBox.style.cssText = `
        opacity: 0;
        left: ${calculatePosition(slider.value, currMax, currMin)}%;
      `;
    };

    var input = slider;
    var preBar = tmpl.querySelector("#lan-slider-prebar"),
      range = max - min;

    input.className = input.className.length
      ? input.className + " colorized"
      : "colorized";

    preBar.style.width = calcWidth(val, min, range) + "%";

    // Change width of preBar depending on input
    input.addEventListener("input", function() {
      preBar.style.width = calcWidth(val, min, range) + "%";
    });

    // Attach the created elements to the shadow dom
    shadow.appendChild(tmpl);
  }

  /**
   * attributeChangedCallback is a lifecycle method that is invoked
   * whenever attributes listed in observedAttributes static function is
   * updated.
   */
  attributeChangedCallback() {
    const slider = this.shadowRoot.querySelector("#lan-slider");
    const valueBox = this.shadowRoot.querySelector("#val-box");
    const progressBar = this.shadowRoot.querySelector(".preBar");

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

    var range = max - min;

    progressBar.style.width = calcWidth(val, min, range) + "%";

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
 * calcWidth is a helper function to calculates the width of 
 * the width of the progress bar.
 * 
 * @param {number} val 
 * @param {number} max 
 * @param {number} min 
 * 
 * @return {number} the left horizontal percentage for the tooltip
 */
let calcWidth = (val, min, range) => {
  var x = ((parseInt(val, 10) - range)*0.5)/range;
  var t = (1 * (parseInt(val, 10) - parseInt(min, 10)) - x) / range;
  return t * 100;
}

let calculateMin = min => {
  return min ? parseInt(min) : 0;
};

let calculateMax = max => {
  return max ? parseInt(max) : 100;
};

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

// Define the new element
customElements.define("lan-slider", LANSlider);
