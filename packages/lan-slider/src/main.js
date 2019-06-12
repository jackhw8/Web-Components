import componentStyle from "./style.js";
import {
  calculateMin,
  calculateMax,
  calculateVal,
  calculateThumbPosition,
  calculateTooltipPosition
} from "./helper.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>${componentStyle}</style>
  <div id='container'>
    <div id="track"></div>
    <div id="prebar"></div>
    <div id="thumb"></div>
    <div id="tooltip"></div>
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

    // Clone template
    const tmpl = template.content.cloneNode(true);

    // Set the default values of min, max, val, position
    this.min = 0;
    this.max = 100;
    this.val = 50;
    this.range = this.max - this.min;
    this.position = calculateThumbPosition(this.val, this.max, this.min);
    
    // Get all elements
    const prebar = tmpl.querySelector("#prebar");
    const thumb = tmpl.querySelector("#thumb");

    thumb.addEventListener("mouseout", () => this.onMouseOutCallback());
    thumb.addEventListener("mouseover", () => this.onHoverCallback());
    thumb.addEventListener("drag", event => this.onDragCallback(event));
    thumb.addEventListener("dragend", () => this.onDragEndCallback());

    // Set the prebar width and thumb position accordingly
    prebar.style.width = `${this.position}%`;
    thumb.style.left = `${this.position}%`;

    // Attach the created elements to the shadow dom
    shadow.appendChild(tmpl);
  }

  /**
   * connectedCallback is a lifecycle method that is invoked whenever
   * the component is attached to a document-connected element.
   */
  connectedCallback() {
    // Get the track and tooltip
    const track = this.shadowRoot.querySelector("#track");
    const tooltip = this.shadowRoot.querySelector("#tooltip");

    // Set the text and position of tooltip
    tooltip.innerHTML = this.val;
    tooltip.style.opacity = '0';
    tooltip.style.left = `${calculateTooltipPosition(this.position, track.offsetWidth, 4)}px`;
  }

  /**
   * attributeChangedCallback is a lifecycle method that is invoked
   * whenever attributes listed in observedAttributes static function is
   * updated.
   */
  attributeChangedCallback() {
    // Get track, prebar, thumb and tooltip
    const track = this.shadowRoot.querySelector("#track");
    const prebar = this.shadowRoot.querySelector("#prebar");
    const thumb = this.shadowRoot.querySelector("#thumb");
    const tooltip = this.shadowRoot.querySelector("#tooltip");

    // Get the attributes of min, max, val
    this.min = calculateMin(this.getAttribute("min"));
    this.max = calculateMax(this.getAttribute("max"));
    if (this.min > this.max) {
      this.min = 0;
      this.max = 100;
    }
    this.val = calculateVal(this.getAttribute("val"), this.max, this.min);
    this.range = this.max - this.min;

    // Update prebar width, thumb position, tooltip value and position
    this.position = calculateThumbPosition(this.val, this.max, this.min);
    prebar.style.width = `${this.position}%`;
    thumb.style.left = `${this.position}%`;
    tooltip.innerHTML = this.val;
    tooltip.style.left = `${calculateTooltipPosition(this.position, track.offsetWidth, 4)}px`;
  }

  /**
   * observedAttributes
   * @returns {list} returns a list of observed attributes
   */
  static get observedAttributes() {
    return ["val", "max", "min"];
  }

  /**
   * onMouseOutCallback is a callback function that should be fired
   * whenever the pointer is out of the thumb.
   */
  onMouseOutCallback() {
    // Get prebar, thumb, and tooltip
    const prebar = this.shadowRoot.querySelector("#prebar");
    const thumb = this.shadowRoot.querySelector("#thumb");
    const tooltip = this.shadowRoot.querySelector("#tooltip");

    // Revert the size of thumb
    thumb.style.cssText = `height: 16px; width: 16px; margin-top: -14px; margin-left: -10px;`;

    // Maintain prebar width and thumb position, hide tooltip
    prebar.style.width = `${this.position}%`;
    thumb.style.left = `${this.position}%`;
    tooltip.style.opacity = '0';
  }

  /**
   * onHoverCallback is a callback function that should be fired
   * whenever the pointer is on top of the thumb.
   */
  onHoverCallback() {
    // Get prebar, thumb and tooltip
    const prebar = this.shadowRoot.querySelector("#prebar");
    const thumb = this.shadowRoot.querySelector("#thumb");
    const tooltip = this.shadowRoot.querySelector("#tooltip");

    // Enlarge the thumb
    thumb.style.cssText = `height: 20px; width: 20px; margin-top: -16px; margin-left: -12px;`;

    // Maintain prebar width and thumb position, show tooltip
    prebar.style.width = `${this.position}%`;
    thumb.style.left = `${this.position}%`;
    tooltip.style.opacity = '1';
  }

  /**
   * onDragCallback is a callback function that should be fired
   * whenever the pointer is dragging of the thumb.
   */
  onDragCallback(event) {
    // Guard condition: revert thumb size and hide tooltip
    if (event.clientX <= 0) return;

    // Get track, thumb, prebar, and tooltip
    const track = this.shadowRoot.querySelector("#track");
    const prebar = this.shadowRoot.querySelector("#prebar");
    const thumb = this.shadowRoot.querySelector("#thumb");
    const tooltip = this.shadowRoot.querySelector("#tooltip");

    // Enlarge the thumb
    thumb.style.cssText = `height: 20px; width: 20px; margin-top: -16px; margin-left: -12px;`;

    // Calculate new position, update prebar width, thumb position, tooltip position, and show it.
    this.position = parseInt(event.clientX / track.offsetWidth * 100);
    this.position = this.position > 100 ? 100 : this.position;
    prebar.style.width = `${this.position}%`;
    thumb.style.left = `${this.position}%`;
    tooltip.style.left = `${calculateTooltipPosition(this.position, track.offsetWidth, 4)}px`;
    tooltip.style.opacity = '1';

    // Update val and tooltip value
    this.val = this.position * this.range / 100;
    this.setAttribute("val", this.val);
    tooltip.innerHTML = this.val;

    if (this.onchange) this.onchange();
  }

  /**
   * onDragEndCallback is a callback function that should be fired
   * whenever the pointer is about to end dragging of thumb.
   */
  onDragEndCallback() {
    // Get prebar, thumb and tooltip
    const prebar = this.shadowRoot.querySelector("#prebar");
    const thumb = this.shadowRoot.querySelector("#thumb");

    // Revert thumb size
    thumb.style.cssText = `height: 16px; width: 16px; margin-top: -14px; margin-left: -10px;`;

    // Maintain prebar width and thumb position
    prebar.style.width = `${this.position}%`;
    thumb.style.left = `${this.position}%`;
  }
}

// Define the new element
customElements.define("lan-slider", LANSlider);
