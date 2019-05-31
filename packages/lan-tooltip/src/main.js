const template = document.createElement("template");
template.innerHTML = `
<style>
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -60px;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
<div class="tooltip">
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

        // Attach the created elements to the shadow dom
        console.log(template.content);
        shadow.appendChild(tooltipComponent.cloneNode(true));

    }

    /**
     * attributeChangedCallback is a lifecycle method that is invoked
     * whenever attributes listed in observedAttributes static function is
     * updated.
     */
    attributeChangedCallback() {
        // update the value of the buttons
        console.log("attribute changed");
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

