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
  bottom: 110%;
  left: 50%;
  margin-left: -60px;
}

.tooltip-arrow .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}


</style>
<div class="tooltip-arrow" id="tool">
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
        this.innerHTML = "";
        tooltipComponent.querySelector('slot').innerHTML = text;

        // Get customziable attributes and add class to the tooltip 
        if (this.hasAttribute("visible-arrow")) {
            tooltipComponent.querySelector('div').classList.remove("tooltip-arrow");
            tooltipComponent.querySelector('div').classList.add("tooltip");
        }

        let effect = "dark";
        if (this.hasAttribute("effect")) {
            effect = this.getAttribute("effect");
        }
        if (effect == "dark") {
            tooltipComponent.querySelector(".tooltiptext").style.backgroundColor = "black";
            tooltipComponent.querySelector(".tooltiptext").style.color = "white";
        }
        else {
            tooltipComponent.querySelector(".tooltiptext").style.backgroundColor = "white";
            tooltipComponent.querySelector(".tooltiptext").style.color = "black";
            tooltipComponent.querySelector(".tooltiptext").style.borderStyle = "solid";
        }

        // Attach the created elements to the shadow dom
        shadow.appendChild(tooltipComponent.cloneNode(true));

        this.handleEventAttr();
    }

    /**
     * attributeChangedCallback is a lifecycle method that is invoked
     * whenever attributes listed in observedAttributes static function is
     * updated.
     */
    attributeChangedCallback() {
        // update the value of the buttons
        this.handleEventAttr();
    }

    /**
     * observedAttributes
     * @returns {list} returns a list of observed attributes
     */
    static get observedAttributes() {
        return [
            'event',
            'effect',
            'visible-arrow'
        ];
    }

    /**
     * This method updates what event the tooltip reacts to.
     * Hover -- Tooltip shows when the mouse is hovering 
     *          over the button
     * Click -- Tooltip shows when the button is clicked
     *          once and disappears when clicked again
     * Focus -- Tooltip shows when the button is held down 
     *          by the mouse
     */
    handleEventAttr() {
        const shadow = this.shadowRoot;
        const tooltipComponent = shadow.querySelector("#tool");
        const tooltipText = shadow.querySelector(".tooltiptext");

        // get the current event attribute
        let event = "hover";
        if (this.hasAttribute('event')) {
            const eventAttr = this.getAttribute("event");
            if (eventAttr == "hover" || eventAttr == "click" || eventAttr == "focus") {
                event = this.getAttribute("event");
            }
        }

        // disable any previous events set
        tooltipComponent.onmouseenter = () => { };
        tooltipComponent.onmouseleave = () => { };
        tooltipComponent.onclick = () => { };
        tooltipComponent.onmousedown = () => { };
        tooltipComponent.onmouseup = () => { };

        // set the event handlers
        if (event == "hover") {
            tooltipComponent.onmouseenter = () => {
                tooltipText.style.setProperty('visibility', 'visible');
            }
            tooltipComponent.onmouseleave = () => {
                tooltipText.style.setProperty('visibility', 'hidden');
            }
        } else if (event == "click") {
            tooltipText.style.setProperty('visibility', 'hidden');
            tooltipComponent.onclick = () => {
                let visibility = tooltipText.style.visibility;
                if (visibility == "hidden") {
                    tooltipText.style.setProperty('visibility', 'visible');
                } else {
                    tooltipText.style.setProperty('visibility', 'hidden');
                }
            }
        } else if (event == "focus") {
            tooltipComponent.onmousedown = () => {
                tooltipText.style.setProperty('visibility', 'visible');
            }
            tooltipComponent.onmouseup = () => {
                tooltipText.style.setProperty('visibility', 'hidden');
            }
        }

    }
}

// Define the new element
window.customElements.define('lan-tooltip', LANTooltip);

