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
    valueBox.style.cssText = `left: ${calculatePosition(val, max, min)}%;`;

    // Create slider and add event listeners to it
    const slider = document.createElement("input");
    slider.setAttribute("type", "range");
    slider.setAttribute("name", "lan-slider");
    slider.setAttribute("min", min);
    slider.setAttribute("max", max);
    slider.setAttribute("value", val);
    slider.id = "lan-slider";
    slider.onmousemove = () => {
      let currMin = calculateMin(this.getAttribute("min"));
      let currMax = calculateMax(this.getAttribute("max"));
      
      valueBox.innerHTML = slider.value;
      valueBox.style.cssText = `
        opacity: 1;
        left: ${calculatePosition(slider.value, currMax, currMin)}%;
      `;
    };
    slider.onmouseout = () => (valueBox.style.cssText = "opacity: 0;");

    // Create some CSS to apply to the shadow dom
    // const style = document.createElement("link");
    // style.setAttribute('rel', 'stylesheet');
    // style.setAttribute('type', 'text/css');
    // style.setAttribute('href', './style.css');
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
        border: none;
      }
      
      #lan-slider:focus {
        outline: none;
      }
      
      // #lan-slider::-ms-track {
      //   width: 100%;
      //   cursor: pointer;
      //   background: transparent; 
      //   border-color: transparent;
      //   color: transparent;
      // }
      
      // #lan-slider::-moz-range-thumb {
      //   border: 2px solid #409eff;
      //   height: 25px;
      //   width: 25px;
      //   border-radius: 3px;
      //   background: #ffffff;
      //   cursor: pointer;
      //   -moz-transition: 0.2s;
      // }
      // #lan-slider::-ms-thumb {
      //   border: 2px solid #409eff;
      //   height: 25px;
      //   width: 25px;
      //   border-radius: 3px;
      //   background: #ffffff;
      //   cursor: pointer;
      //   transition: 0.2s;
      // }
      // #lan-slider::-webkit-slider-thumb:hover {
      //   height: 30px;
      //   width: 30px;
      // }
      // #lan-slider::-moz-range-thumb:hover {
      //   height: 30px;
      //   width: 30px;
      // }
      // #lan-slider::-ms-thumb:hover {
      //   height: 30px;
      //   width: 30px;
      // }

      .barCnt {
        position: relative;
        height: 10px;
        padding: 5px 0px;
        z-index: 200;
      }
      
      .preBar{
        position: relative;
        z-index: 301;
        width: 0;
      }
      
      .barCnt .preBar {
        /* position: absolute; */
        background-color: #489fee;
        height: 7px;
        line-height: 6px;
        /* z-index: 200; */
        border-radius: 3px;
        padding: 0px;
        margin: 0px;
        pointer-events: none;
      }
      
      input[type=range].colorized {
        -webkit-appearance: none;
        width: 100%;
        height: 5px;
        position: absolute;
        padding: 0px;
        margin: 0px;
        cursor: ew-resize;
        left: 0px
      }
      
      input[type=range].colorized::-webkit-slider-runnable-track {
        height: 7px;
        background: lightgrey;
        border: none;
        border-radius: 3px;
      }
      
      input[type=range].colorized::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: 2px solid #00001E;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: white;
        border-color: #489FEE;
        margin-top: -4px;
        z-index: 400;
        position: relative;
        cursor: pointer;
        /* transition: height .01s ease-in-out; */
      }
      
      input[type=range].colorized:focus {
        outline: none;
      }
      
      input[type=range].colorized:focus::-webkit-slider-runnable-track {
        background: #ccc;
      }
      
      input[type=range].colorized::-moz-range-track {
        width: 100%;
        height: 5px;
        background: lightgray;
        border: none;
        border-radius: 3px;
      }
      
      input[type=range].colorized::-moz-range-thumb {
        border: none;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: lightgray;
        z-index: 400;
      }
      
      input[type=range].colorized::-moz-focus-outer {
        border: 0;
      }      
    `;



    var input = slider;
    var wrp = document.createElement('div'),
      preBar = document.createElement('p'),
      range = max - min,
      getVal = function () {
        var t = (1 * (parseInt(input.value, 10) - parseInt(input.min, 10)) / range);
        return t * 100;
      };
    wrp.className = 'barCnt';
    preBar.className = 'preBar';

    input.className = input.className.length ? (input.className + ' colorized') : 'colorized';
    //input.parentNode.replaceChild(wrp, input);

    wrp.appendChild(input);
    wrp.appendChild(preBar);

    //shadow.querySelector(".barCnt").appendChild(valueBox.cloneNode(true));

    preBar.style.width = getVal() + '%';

    var box = document.createElement('textarea');
    box.innerText = parseInt(input.value, 10);
    box.class = 'test';
    shadow.appendChild(box.cloneNode(true));

    // Change width of preBar depending on input
    input.addEventListener('input', function () {
      shadow.querySelector('textarea').value = shadow.querySelector('input').value;
      preBar.style.width = getVal() + '%';

      const valueBox = shadow.querySelector('#val-box');
      console.log(valueBox.innerHTML);
      console.log(shadow.querySelector('input').value);
      valueBox.innerHTML = shadow.querySelector('input').value;
      valueBox.style.cssText = `
        opacity: 1;
        left: ${calculatePosition(input.value, input.max, input.min)}%;
        border-top: -100px;
      `;
      console.log("Adad" + valueBox.innerHTML);

    });


    // Attach the created elements to the shadow dom
    shadow.appendChild(style);
    //shadow.appendChild(slider);
    shadow.appendChild(wrp);
    shadow.querySelector('.barCnt').appendChild(valueBox);
  }

  /**
   * attributeChangedCallback is a lifecycle method that is invoked
   * whenever attributes listed in observedAttributes static function is
   * updated.
   */
  attributeChangedCallback() {
    const slider = this.shadowRoot.querySelector("#lan-slider");
    const valueBox = this.shadowRoot.querySelector("#val-box");

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
  console.log(val, max, min)
  return (((val - min) / (max - min)) * 100) / 1.02;
};

// Define the new element
customElements.define("lan-slider", LANSlider);
