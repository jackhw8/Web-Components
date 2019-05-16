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

    // Create the blackbox to show the value of the slider
    const valueBox = document.createElement("div");
    valueBox.id = "val-box";
    valueBox.innerHTML = val;
    valueBox.style.cssText = `
      left: ${calculatePosition(val, max, min)}%;
    `;

    // Create slider
    const slider = document.createElement("input");
    slider.setAttribute("type", "range");
    slider.setAttribute("name", "lan-slider");
    slider.setAttribute("min", min);
    slider.setAttribute("max", max);
    slider.setAttribute("value", val);
    slider.id = "lan-slider";
    slider.onmousemove = () => {
      valueBox.innerHTML = slider.value;
      valueBox.style.cssText = `
        opacity: 1;
        left: ${calculatePosition(slider.value, max, min)}%;
      `;
    };
    slider.onmouseout = () => (valueBox.style.cssText = "opacity: 0;");

    // Create some CSS to apply to the shadow dom
    const style = document.createElement("style");

    style.textContent = `
      #val-box {
        background: black;
        color: white;
        width: 30px;
        height: 25px;
        font-size: 12px;
        font-family: sans-serif;
        text-align: center;
        padding-top: 10px;
        position: absolute;
        top: 5%;
        opacity: 0;
      }

      #lan-slider {
        -webkit-appearance: none;
        width: 100%;
        height: 7px;
        background: #409eff;
        border-radius: 10px;
      }
      
      #lan-slider:focus {
        outline: none;
      }
      
      #lan-slider::-ms-track {
        width: 100%;
        cursor: pointer;
        background: transparent; 
        border-color: transparent;
        color: transparent;
      }

      #lan-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: 2px solid #409eff;
        height: 25px;
        width: 25px;
        border-radius: 100px;
        background: #ffffff;
        cursor: pointer;
        -webkit-transition: 0.2s;
      }

      #lan-slider::-moz-range-thumb {
        border: 2px solid #409eff;
        height: 25px;
        width: 25px;
        border-radius: 3px;
        background: #ffffff;
        cursor: pointer;
        -moz-transition: 0.2s;
      }

      #lan-slider::-ms-thumb {
        border: 2px solid #409eff;
        height: 25px;
        width: 25px;
        border-radius: 3px;
        background: #ffffff;
        cursor: pointer;
        transition: 0.2s;
      }

      #lan-slider::-webkit-slider-thumb:hover {
        height: 30px;
        width: 30px;
      }

      #lan-slider::-moz-range-thumb:hover {
        height: 30px;
        width: 30px;
      }

      #lan-slider::-ms-thumb:hover {
        height: 30px;
        width: 30px;
      }
    `;

    // Attach the created elements to the shadow dom
    shadow.appendChild(style);
    shadow.appendChild(slider);
    shadow.appendChild(valueBox);
  }

  /**
   * attributeChangedCallback is a lifecycle method that is invoked
   * whenever attributes listed in observedAttributes static function is
   * updated.
   */
  attributeChangedCallback() {
    // Update slider value
    this.shadowRoot.querySelector("#lan-slider").value = calculateVal(
      this.getAttribute("val"),
      this.getAttribute("max"),
      this.getAttribute("min")
    );
    this.shadowRoot.querySelector("#val-box").innerHTML = calculateVal(
      this.getAttribute("val"),
      this.getAttribute("max"),
      this.getAttribute("min")
    );
  }

  /**
   * observedAttributes
   * @returns {list} returns a list of observed attributes
   */
  static get observedAttributes() {
    return ["val", "min", "max"];
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
    : min + (max - min) / 2;
};

let calculatePosition = (val, max, min) => {
  return (val / (max - min)) * 100 / 1.02;
};

// Define the new element
customElements.define("lan-slider", LANSlider);
