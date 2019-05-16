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

    // Create the blackbox to show the value of the slider
    const valueBox = document.createElement("div");
    valueBox.id = "val-box";
    valueBox.innerHTML =
      this.getAttribute("val") == null ? "50" : this.getAttribute("val");
    valueBox.style.cssText = "visibility: hidden";

    // Create slider
    const slider = document.createElement("input");
    slider.setAttribute("type", "range");
    slider.id = "lan-slider";
    slider.onmousemove = () => {
      valueBox.innerHTML = slider.value;
      valueBox.style.cssText = "visibility: visible";
    };
    slider.onmouseleave = () => (valueBox.style.cssText = "visibility: hidden");

    // Create some CSS to apply to the shadow dom
    const style = document.createElement("style");

    style.textContent = `
      #val-box {
        background: black;
        color: white;
        width: 30px;
        height: 30px;
        font-size: 20px;
        margin: auto;
      }

      #lan-slider {
        -webkit-appearance: none;
        width: 90%;
        height: 7px;
        background: #409eff;
        border-radius: 10px;
        margin: 0 5%;
      }
      
      #lan-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
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
      }

      #lan-slider::-moz-range-thumb {
        border: 2px solid #409eff;
        height: 25px;
        width: 25px;
        border-radius: 3px;
        background: #ffffff;
        cursor: pointer;
      }

      #lan-slider::-ms-thumb {
        border: 2px solid #409eff;
        height: 25px;
        width: 25px;
        border-radius: 3px;
        background: #ffffff;
        cursor: pointer;
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
    this.shadowRoot.querySelector("#lan-slider").value = this.getAttribute(
      "val"
    );
    this.shadowRoot.querySelector("#val-box").innerHTML = this.getAttribute(
      "val"
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

const updateVal = component => {
  const shadow = component.shadowRoot;
  const slider = shadow.querySelector("#lan-slider");
  slider.setAttribute("val", component.getAttribute("val"));
};

// Define the new element
customElements.define("lan-slider", LANSlider);
