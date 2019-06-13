import componentStyle from "./style.js";
import {
  calculateMin,
  calculateMax,
  calculateVal,
  calculateThumbPosition,
  calculateTooltipPosition,
  calculatePositionOnMouseEvents
} from "./helper.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>${componentStyle}</style>
  <div id='container'>
    <div id="track"></div>
    <div id="prebar"></div>
    <div id="thumb" draggable="true"></div>
    <div id="tooltip">
      <div id="tooltip-content"></div>
      <div id="popper-arrow"></div>
    </div>
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

    // Set the prebar width and thumb position accordingly
    prebar.style.width = `${this.position}%`;
    thumb.style.left = `${this.position}%`;

    // Attach the created elements to the shadow dom
    shadow.appendChild(tmpl);

    // Bind mouse events functions to this class
    this.onClickCallback = this.onClickCallback.bind(this);
    this.onMouseOutCallback = this.onMouseOutCallback.bind(this);
    this.onHoverCallback = this.onHoverCallback.bind(this);
    this.onDragCallback = this.onDragCallback.bind(this);
    this.onDragStartCallback = this.onDragStartCallback.bind(this);
    this.onDragEndCallback = this.onDragEndCallback.bind(this);
  }

  /**
   * connectedCallback is a lifecycle method that is invoked whenever
   * the component is attached to a document-connected element.
   */
  connectedCallback() {
    // Set the values of attributes of min, max, val according to the class variables
    this.setAttribute('max', this.max);
    this.setAttribute('min', this.min);
    this.setAttribute('val', this.val);

    // Get the track and tooltip
    const track = this.shadowRoot.querySelector("#track");
    const thumb = this.shadowRoot.querySelector("#thumb");
    const tooltip = this.shadowRoot.querySelector("#tooltip");
    const tooltipContent = this.shadowRoot.querySelector("#tooltip-content");

    // Set the text and position of tooltip
    tooltipContent.innerHTML = this.val;
    tooltip.style.opacity = '0';
    tooltip.style.left = `${calculateTooltipPosition(this.position, track.offsetWidth, 4)}px`;

    // Add event listeners to the track and thumb
    track.addEventListener("mousedown", event => this.onClickCallback(event));
    thumb.addEventListener("mouseout", () => this.onMouseOutCallback());
    thumb.addEventListener("mouseover", () => this.onHoverCallback());
    thumb.addEventListener("drag", event => this.onDragCallback(event));
    thumb.addEventListener("dragstart", event => this.onDragStartCallback(event));
    thumb.addEventListener("dragend", () => this.onDragEndCallback());
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
    const tooltipContent = this.shadowRoot.querySelector("#tooltip-content");

    // Get the attributes of min, max, val
    this.min = calculateMin(this.getAttribute("min"));
    this.max = calculateMax(this.getAttribute("max"));
    if (this.min > this.max) {
      this.min = 0;
      this.max = 100;
      this.val = 50;
      this.setAttribute('min', 0);
      this.setAttribute('max', 100);
      this.setAttribute('val', 50);
    }
    this.val = calculateVal(this.getAttribute("val"), this.max, this.min);
    this.range = this.max - this.min;

    // Update attributes if they are different from those that are stored in the class variables
    if (this.min != this.getAttribute('min')) this.setAttribute('min', this.min);
    if (this.max != this.getAttribute('max')) this.setAttribute('max', this.max);
    if (this.val != this.getAttribute('val')) this.setAttribute('val', this.val);

    // Update prebar width, thumb position, tooltip value and position
    this.position = calculateThumbPosition(this.val, this.max, this.min);
    prebar.style.width = `${this.position}%`;
    thumb.style.left = `${this.position}%`;
    tooltipContent.innerHTML = this.val;
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
   * onClickCallback is a callback function that should be fired
   * whenever the pointer clicks the track.
   */
  onClickCallback(event) {
    // Get track
    const track = this.shadowRoot.querySelector("#track");

    // Calculate new position and val, then update attribute val
    this.position = calculatePositionOnMouseEvents(event.clientX, track.getBoundingClientRect().left, track.offsetWidth, 10);
    this.val = parseInt(this.position * this.range / 100) + this.min;
    this.setAttribute("val", this.val);

    // Fire onchange if present
    if (this.onchange) this.onchange(event);
  }

  /**
   * onMouseOutCallback is a callback function that should be fired
   * whenever the pointer is out of the thumb.
   */
  onMouseOutCallback() {
    // Get thumb and tooltip
    const thumb = this.shadowRoot.querySelector("#thumb");
    const tooltip = this.shadowRoot.querySelector("#tooltip");

    // Revert the size of thumb and hide tooltip
    thumb.style.cssText = `height: 16px; width: 16px; margin-top: -14px; margin-left: -10px; left: ${this.position}%`;
    tooltip.style.opacity = '0';
  }

  /**
   * onHoverCallback is a callback function that should be fired
   * whenever the pointer is on top of the thumb.
   */
  onHoverCallback() {
    // Get thumb and tooltip
    const thumb = this.shadowRoot.querySelector("#thumb");
    const tooltip = this.shadowRoot.querySelector("#tooltip");

    // Enlarge the thumb and show tooltip
    thumb.style.cssText = `height: 20px; width: 20px; margin-top: -16px; margin-left: -12px; left: ${this.position}%`;
    tooltip.style.opacity = '1';
  }

  /**
   * onDragCallback is a callback function that should be fired
   * whenever the pointer is dragging of the thumb.
   */
  onDragCallback(event) {
    // Get track, thumb, and tooltip
    const track = this.shadowRoot.querySelector("#track");
    const thumb = this.shadowRoot.querySelector("#thumb");
    const tooltip = this.shadowRoot.querySelector("#tooltip");

    // Guard condition
    if (event.clientX < track.getBoundingClientRect().left || event.clientX > track.getBoundingClientRect().right) {
      return;
    }

    // Enlarge the thumb and show tooltip
    thumb.style.cssText = `height: 20px; width: 20px; margin-top: -16px; margin-left: -12px;`;
    tooltip.style.opacity = '1';

    // Calculate new position and val, then update attribute val
    this.position = calculatePositionOnMouseEvents(event.clientX, track.getBoundingClientRect().left, track.offsetWidth, 10);
    this.val = parseInt(this.position * this.range / 100) + this.min;
    this.setAttribute("val", this.val);

    // Fire onchange if present
    if (this.onchange) this.onchange(event);
  }

  /**
   * onDragStartCallback is a callback function that should be fired
   * whenever the pointer is about to start dragging the thumb.
   */
  onDragStartCallback(event){
    event.dataTransfer.setDragImage(new Image(), 0, 0);
  }

  /**
   * onDragEndCallback is a callback function that should be fired
   * whenever the pointer is about to end dragging the thumb.
   */
  onDragEndCallback() {
    // Get thumb and tooltip
    const thumb = this.shadowRoot.querySelector("#thumb");
    const tooltip = this.shadowRoot.querySelector("#tooltip");

    // Revert thumb size and hide tooltip
    thumb.style.cssText = `height: 16px; width: 16px; margin-top: -14px; margin-left: -10px; left: ${this.position}%`;
    tooltip.style.opacity = '0';
  }
}

// Define the new element
customElements.define("lan-slider", LANSlider);
