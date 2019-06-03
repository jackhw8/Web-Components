const template = document.createElement("template");
template.innerHTML = `
<style>
[class^="tooltip"] {
  position: relative;
  display: inline-block;
}

[class^="tooltip"] .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
}

[class^="tooltip-arrow"] .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;

}
.tooltip-arrow .tooltip-light.tooltiptext::after{
  border-color: black transparent transparent transparent;
}
.tooltip-arrow .tooltip-dark.tooltiptext::after{
  border-color: white transparent transparent transparent;
}

[class^="tooltip"]:hover .tooltiptext {
  visibility: visible;
}



</style>
<div class = "tooltip-arrow">
    <slot id="content"></slot>
    <span class="tooltiptext">Tooltip text</span>
</div>
`;

export default class LANTooltip extends HTMLElement {
    /**
     * Constructor creates a default lan-button
     */
    constructor() {
        // Always call super first in constructor
        super();

        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Create input button with default values
        let tooltipComponent = template.content;
        const text = this.innerHTML;
        tooltipComponent.querySelector('slot').innerHTML = text;

        // Get customziable attributes and add class to the tooltip 
        if(this.hasAttribute("visible-arrow")){
          tooltipComponent.querySelector('div').classList.remove("tooltip-arrow");
          tooltipComponent.querySelector('div').classList.add("tooltip");
        }
        
        let effect = "dark";
        if(this.hasAttribute("effect")){
          effect = this.getAttribute("effect");
        }
        if(effect == "dark"){
          tooltipComponent.querySelector(".tooltiptext").style.backgroundColor = "black";
          tooltipComponent.querySelector(".tooltiptext").style.color = "white";
          tooltipComponent.querySelector(".tooltiptext").classList.add("tooltip-dark");
        }
        else{
          tooltipComponent.querySelector(".tooltiptext").style.backgroundColor = "white";
          tooltipComponent.querySelector(".tooltiptext").style.color = "black";
          tooltipComponent.querySelector(".tooltiptext").style.borderStyle = "solid";
          tooltipComponent.querySelector(".tooltiptext").classList.add("tooltip-light");
        }
        // Attach the created elements to the shadow dom
        shadow.appendChild(tooltipComponent.cloneNode(true));
        
    }

    /**
     * attributeChangedCallback is a lifecycle method that is invoked
     * whenever attributes listed in observedAttributes static function is
     * updated.
     */
    attributeChangedCallback() {
        // update the value of the buttons
       
    }

    /**
     * observedAttributes
     * @returns {list} returns a list of observed attributes
     */
    static get observedAttributes() {
        return [
            'size',
        ];
    }

}

// Define the new element
window.customElements.define('lan-tooltip', LANTooltip);

