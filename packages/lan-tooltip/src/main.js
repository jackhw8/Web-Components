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
.tooltip-arrow .tooltip-light.tooltiptext::after{
  border-color: white transparent transparent transparent;
}
.tooltip-arrow .tooltip-dark.tooltiptext::after{
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

        // Create input tooltip with default values
        let tooltipComponent = template.content;
        const text = this.innerHTML;
        this.innerHTML = "";
        tooltipComponent.querySelector('slot').innerHTML = text;

        // Get customziable attributes and add class to the tooltip 
        
        // Attach the created elements to the shadow dom
        shadow.appendChild(tooltipComponent.cloneNode(true));
        this.handleEventAttr();
        this.handleDisabled();
    }

    /**
     * attributeChangedCallback is a lifecycle method that is invoked
     * whenever attributes listed in observedAttributes static function is
     * updated.
     */
    attributeChangedCallback() {
        // update the value of the tooltip
        this.handleStyleAttr();
        this.handleEventAttr();
        this.handleDisabled();
    }

    /**
     * observedAttributes
     * @returns {list} returns a list of observed attributes
     */
    static get observedAttributes() {
        return [
            'event',
            'effect',
            'visible-arrow',
            'hide-after',
            'open-delay',
            'manual',
            'disabled'
        ];
    }
    /**
     * This method updates what style the tooltip reacts to.
     * visible-arrow -- hide the arrow of tooltip
     * effect "dark" -- Default, the color of tooltip will be black
     * effect "light"-- Tooltip will be white with black border
     */
    handleStyleAttr(){
        const shadow = this.shadowRoot;
        const tooltipComponent = shadow.querySelector("#tool");
        const tooltipText = shadow.querySelector(".tooltiptext");
        if(this.hasAttribute("visible-arrow")){
            tooltipComponent.classList.remove("tooltip-arrow");
            tooltipComponent.classList.add("tooltip");
        }

        let effect = "dark";
        if (this.hasAttribute("effect")) {
            effect = this.getAttribute("effect");
        }
        if(effect == "dark"){
            tooltipText.style.backgroundColor = "black";
            tooltipText.style.color = "white";
            tooltipText.classList.add("tooltip-dark");
        }
        else{
            tooltipText.style.backgroundColor = "white";
            tooltipText.style.color = "black";
            tooltipText.style.borderStyle = "solid";
            tooltipText.classList.add("tooltip-light");
        }
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

        // If manual attribute is true, no pointer events
        if (this.getAttribute('manual') == "true") return;

        // set the event handler
        if (event == "hover") {
            tooltipComponent.onmouseenter = () => {
                let timeOut = this.getTimeAfter(0, this.getAttribute('open-delay'));
                this.appear(timeOut);
            }
            tooltipComponent.onmouseleave = () => {
                let timeOut = this.getTimeAfter(500, this.getAttribute('hide-after'));
                this.disappear(timeOut);
            }
        } else if (event == "click") {
            tooltipText.style.setProperty('visibility', 'hidden');
            tooltipComponent.onclick = () => {
                let visibility = tooltipText.style.visibility;
                if (visibility == "hidden") {
                    let timeOut = this.getTimeAfter(0, this.getAttribute('open-delay'));
                    this.appear(timeOut)
                } else {
                    let timeOut = this.getTimeAfter(0, this.getAttribute('hide-after'));
                    this.disappear(timeOut)
                }
            }
        } else if (event == "focus") {
            tooltipComponent.onmousedown = () => {
                let timeOut = this.getTimeAfter(0, this.getAttribute('open-delay'));
                this.appear(timeOut)
            }
            tooltipComponent.onmouseup = () => {
                let timeOut = this.getTimeAfter(0, this.getAttribute('hide-after'));
                this.disappear(timeOut);
            }
        }

    }

    /**
     * Disables the tooltip if disabled attribute is true
     */
    handleDisabled() {
        const shadow = this.shadowRoot;
        const tooltipComponent = shadow.querySelector("#tool");

        // disable any previous events set
        if (this.getAttribute('disabled') == "true") {
            tooltipComponent.onmouseenter = () => { };
            tooltipComponent.onmouseleave = () => { };
            tooltipComponent.onclick = () => { };
            tooltipComponent.onmousedown = () => { };
            tooltipComponent.onmouseup = () => { };
        }
    }


    /**
     * Gets the number of seconds to wait before or after tooltip appears
     * @param {int} num the default number in milliseconds
     * @param {string} attr the desired number as a string in milliseconds
     * @return {time} in milliseconds
     */
    getTimeAfter(num, attr) {
        let timeAfter = num;
        if (attr != null) {
            let num = calculateNum(attr);
            if (num != -1 && num >= 0) {
                timeAfter = num;
            }
        }
        timeAfter = timeAfter / 1000;
        return timeAfter
    }

    /**
     * Make the tooltip appear 
     * @param {int} timeOut the number of seconds the transition takes
     */
    appear(timeOut) {
        const shadow = this.shadowRoot;
        const tooltipText = shadow.querySelector(".tooltiptext");

        tooltipText.style.setProperty('visibility', 'visible');
        tooltipText.style.setProperty('opacity', '1');
        tooltipText.style.transition = "opacity " + timeOut + "s linear";
    }

    /**
     * Make the tooltip disappear
     * @param {int} timeOut the number of seconds the transition takes
     */
    disappear(timeOut) {
        const shadow = this.shadowRoot;
        const tooltipText = shadow.querySelector(".tooltiptext");

        tooltipText.style.setProperty('visibility', 'hidden');
        tooltipText.style.setProperty('opacity', '0');
        tooltipText.style.transition = "visibility " + timeOut + "s, opacity " + timeOut + "s linear";
    }

    /**
     * Returns the button in the shadow DOM
     * @returns {tooltip text box}
     */
    getTooltipText() {
        return this.shadowRoot.querySelector('.tooltiptext');
    }


    /**
     * Returns the button in the shadow DOM
     * @returns {tooltip}
     */
    getTooltip() {
        return this.shadowRoot.querySelector('#tool');
    }
}

// Define the new element
window.customElements.define('lan-tooltip', LANTooltip);


let calculateNum = num => {
    return num ? parseInt(num) : -1;
};



