const template = document.createElement("template");
template.innerHTML = `
<style>
    .tooltip-left {
        position: relative;
        display: inline-block;
    }

    .tooltip-left .tooltiptext {
        visibility: hidden;
        width: 120px;
        background-color: black;
        color: #fff;
        text-align: center;
        border: 1px solid black;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1;
        top: 5px;
        right: 110%;

    }

    .arrow-left .tooltiptext::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 100%;
        margin-top: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent transparent black;
    }

    .tooltip-right {
        position: relative;
        display: inline-block;
    }

    .tooltip-right .tooltiptext {
        visibility: hidden;
        width: 120px;
        background-color: black;
        color: #fff;
        text-align: center;
        border: 1px solid black;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1;
        top: 5px;
        left: 110%;

    }

    .arrow-right .tooltiptext::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 100%;
        margin-top: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent black transparent transparent;
    }

    .tooltip-top {
        position: relative;
        display: inline-block;
    }

    .tooltip-top .tooltiptext {
        visibility: hidden;
        width: 120px;
        background-color: black;
        color: #fff;
        text-align: center;
        border: 1px solid black;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1;
        bottom: 125%;
        left: 50%;
        margin-left: -60px;
    }

    .arrow-top .tooltiptext::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: black transparent transparent transparent;
    }

    .tooltip-bottom {
        position: relative;
        display: inline-block;
    }

    .tooltip-bottom .tooltiptext {
        visibility: hidden;
        width: 120px;
        background-color: black;
        color: #fff;
        text-align: center;
        border: 1px solid black;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1;
        top: 125%;
        left: 50%;
        margin-left: -60px;
    }

    .arrow-bottom .tooltiptext::after {
        content: "";
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent black transparent;
    }
</style>
<div class="tooltip-bottom arrow-bottom" id="tool">
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
        tooltipComponent.querySelector('slot').innerHTML = this.innerHTML;
        this.innerHTML = "";

        // Attach the created elements to the shadow dom
        shadow.appendChild(tooltipComponent.cloneNode(true));

        // Set tooltip text
        if (this.getAttribute('content') != null) {
            shadow.querySelector('.tooltiptext').innerHTML = this.getAttribute('content');
        }

        this.attributeChangedCallback();
    }

    /**
     * attributeChangedCallback is a lifecycle method that is invoked
     * whenever attributes listed in observedAttributes static function is
     * updated.
     */
    attributeChangedCallback() {
        // update the value of the tooltip
        this.handleContent();
        this.handlePlacementAttr();
        this.handleArrowAttr();
        this.handleEffectAttr();
        this.handleEventAttr();
        this.handleDisabled();
    }

    /**
     * observedAttributes
     * @returns {list} returns a list of observed attributes
     */
    static get observedAttributes() {
        return [
            'placement',
            'event',
            'effect',
            'visible-arrow',
            'hide-after',
            'open-delay',
            'manual',
            'disabled',
            'content'
        ];
    }

    /**
     * This method updates the content of the tooltip
     */
    handleContent() {
        if (this.hasAttribute('content')) {
            this.shadowRoot.querySelector('.tooltiptext').innerHTML = this.getAttribute('content');
        }
    }

    /**
    * This method handles the placement of the tooltip
    */
    handlePlacementAttr() {
        const shadow = this.shadowRoot;
        const tooltipComponent = shadow.querySelector("#tool");

        let placement = "bottom"
        let placeAttr = this.getAttribute('placement');
        if (placeAttr == "top" || placeAttr == "left" || placeAttr == "right") {
            placement = placeAttr;
        }

        if (placement == "bottom") {
            tooltipComponent.setAttribute('class', 'tooltip-bottom');
        } else if (placement == "top") {
            tooltipComponent.setAttribute('class', 'tooltip-top');
        } else if (placement == "right") {
            tooltipComponent.setAttribute('class', 'tooltip-right');
        } else if (placement == "left") {
            tooltipComponent.setAttribute('class', 'tooltip-left');
        }
    }

    /**
     * This method updates the tooltip arrow
     */
    handleArrowAttr() {
        const shadow = this.shadowRoot;
        const tooltipComponent = shadow.querySelector("#tool");

        if (this.getAttribute('visible-arrow') == "false") {
            if (tooltipComponent.classList.contains('arrow-top')) {
                tooltipComponent.classList.remove("arrow-top");
            } else if (tooltipComponent.classList.contains('arrow-bottom')) {
                tooltipComponent.classList.remove("arrow-bottom");
            } else if (tooltipComponent.classList.contains('arrow-right')) {
                tooltipComponent.classList.remove("arrow-right");
            } else if (tooltipComponent.classList.contains('arrow-left')) {
                tooltipComponent.classList.remove("arrow-left");
            }
        } else {
            if (tooltipComponent.classList.contains('tooltip-top')) {
                tooltipComponent.setAttribute('class', 'tooltip-top arrow-top');
            } else if (tooltipComponent.classList.contains('tooltip-bottom')) {
                tooltipComponent.setAttribute('class', 'tooltip-bottom arrow-bottom');
            } else if (tooltipComponent.classList.contains('tooltip-right')) {
                tooltipComponent.setAttribute('class', 'tooltip-right arrow-right');
            } else if (tooltipComponent.classList.contains('tooltip-left')) {
                tooltipComponent.setAttribute('class', 'tooltip-left arrow-left');
            }
        }
    }

    /**
     * This method updates the look of the tooltip
     * Either dark or light
     */
    handleEffectAttr() {
        const shadow = this.shadowRoot;
        const tooltipText = shadow.querySelector(".tooltiptext");

        // get the current effect attribute
        let effect = "dark";
        if (this.hasAttribute('effect')) {
            const effectAttr = this.getAttribute("effect");
            if (effectAttr == "dark" || effectAttr == "light") {
                effect = effectAttr;
            }
        }

        if (effect == "dark") {
            tooltipText.style.backgroundColor = "black";
            tooltipText.style.color = "white";
        }
        else if (effect == "light") {
            tooltipText.style.backgroundColor = "white";
            tooltipText.style.color = "black";
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
                let timeOut = this.getTimeAfter(250, this.getAttribute('hide-after'));
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
        return timeAfter
    }

    /**
     * Make the tooltip appear 
     * @param {int} timeOut the number of milliseconds the transition takes
     */
    appear(timeOut) {
        const shadow = this.shadowRoot;
        const tooltipText = shadow.querySelector(".tooltiptext");

        timeOut = timeOut / 1000;

        if (timeOut < 0) timeOut = 0;

        tooltipText.style.setProperty('visibility', 'visible');
        tooltipText.style.setProperty('opacity', '1');
        tooltipText.style.transition = "opacity " + timeOut + "s linear";
    }

    /**
     * Make the tooltip disappear
     * @param {int} timeOut the number of milliseconds the transition takes
     */
    disappear(timeOut) {
        const shadow = this.shadowRoot;
        const tooltipText = shadow.querySelector(".tooltiptext");

        timeOut = timeOut / 1000;

        if (timeOut < 0) timeOut = 0;

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
    return num ? parseInt(num) : 0;
};