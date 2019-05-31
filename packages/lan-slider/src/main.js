import componentStyle from './style.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>${componentStyle}</style>
  <div id='lan-slider-wrapper'>
    <input id='lan-slider' type="range"/>
    <p id='lan-slider-prebar'></p>
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
    
    const tmpl = template.content.cloneNode(true);

    // Update the attribute of val, min, max to default
    this.setAttribute("val", val);
    this.setAttribute("min", min);
    this.setAttribute("max", max);

    // Create the blackbox to show the value of the slider
    const valueBox = tmpl.querySelector("#val-box");
    valueBox.id = "val-box";
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
    var wrp = tmpl.querySelector("#lan-slider-wrapper"),
      preBar = tmpl.querySelector("#lan-slider-prebar"),
      range = max - min,
      getVal = function() {
        var t =
          (1 * (parseInt(input.value, 10) - parseInt(input.min, 10))) / range;
        return t * 100;
      };
    wrp.className = "barCnt";
    preBar.className = "preBar";

    input.className = input.className.length
      ? input.className + " colorized"
      : "colorized";
    //input.parentNode.replaceChild(wrp, input);

    //shadow.querySelector(".barCnt").appendChild(valueBox.cloneNode(true));

    preBar.style.width = getVal() + "%";

    // Change width of preBar depending on input
    input.addEventListener("input", function() {
      preBar.style.width = getVal() + "%";
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
    let getVal = function() {
      var t = (1 * (parseInt(val, 10) - parseInt(min, 10))) / range;
      return t * 100;
    };

    progressBar.style.width = getVal() + "%";

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

let calculatePosition = (val, max, min) => {
  return (((val - min) / (max - min)) * 100) / 1.02;
};

// Define the new element
customElements.define("lan-slider", LANSlider);
