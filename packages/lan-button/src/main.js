import componentStyle from "./style.js";
import { types, sizes } from "./constants.js";

// Template of the actual button
const template = document.createElement("template");
template.innerHTML = `
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <style>${componentStyle}</style>
  <button type="button" class="button default"></button>
`;

/**
 * This is the Button web component.
 */
export default class LANButton extends HTMLElement {
  /**
   * Constructor creates a default lan-button
   */
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    const buttonComponent = template.content;
    // Create input button with default values
    const text = this.innerHTML;
    buttonComponent.querySelector('button').innerHTML = text;

    // Attach the created elements to the shadow dom
    shadow.appendChild(buttonComponent.cloneNode(true));

    // check if bootstrap is enabled
    this._checkbootstrap(shadow);
  }

  /**
   * attributeChangedCallback is a lifecycle method that is invoked
   * whenever attributes listed in observedAttributes static function is
   * updated.
   */
  attributeChangedCallback() {
    // update the value of the buttons
    this.updateButtonValue();
  }

  
  /**
   * connectedCallback invoked when the element is removed, appended, edited on
   * the DOM tree.
   */
  connectedCallback() {
    const root = this.shadowRoot;
    this._checkbootstrap(root);
  }

  /**
   * observedAttributes
   * @returns {list} returns a list of observed attributes
   */
  static get observedAttributes() {
    return [
      "size",
      "type",
      "native-type",
      "plain",
      "round",
      "autofocus",
      "disabled",
      "bootstrap",
      "className"
    ];
  }

  _checkbootstrap(shadow) {
    // If bootstrap is enabled then reset the style etc.
    if(this.hasAttribute("bootstrap")) {
      // remove styles
      shadow.querySelector('style').innerHTML = "";

      // add class names to buttons
      let classNames = this.getAttribute('className');
      shadow.querySelector("button").setAttribute("class", classNames);
    } else {
      // set the class to default
      shadow.querySelector("button").setAttribute("class", "button default");

      this.updateButtonValue();
    }
  }

  /**
   * Updates the button when the attributes are changed
   */
  updateButtonValue() {
    const shadow = this.shadowRoot;
    const buttonInput = shadow.querySelector("button");

    // Set native type of button
    buttonInput.setAttribute("type", this.getAttribute("native-type") ? this.getAttribute("native-type"): "button");
    if (this.hasAttribute("autofocus")) {
      buttonInput.setAttribute("autofocus", "");
    }

    // Update button color, size and shape
    this.updateButtonColor();
    this.updateButtonShape();
    this.updateButtonSize();
    this.updateDisabled();
  }

  /**
   * Updates the size and shape of the button
   */
  updateButtonShape() {
    // get button
    const shadow = this.shadowRoot;

    // set button shape
    const buttonInput = shadow.querySelector("button");
    const elemShape = this.hasAttribute("round");
    if (elemShape) {
      buttonInput.style.setProperty("--border-rad", "24px");
    }
  }

  updateButtonSize() {
    // get button
    const shadow = this.shadowRoot;
    const buttonInput = shadow.querySelector("button");

    // set button size
    const elemSize = this.getAttribute("size");
    if (elemSize == "medium" || elemSize == "small" || elemSize == "mini") {
      buttonInput.style.setProperty("--padding", sizes[elemSize]["padding"]);
      buttonInput.style.setProperty("--txt-size", sizes[elemSize]["txt"]);
    }
  }

  /**
   * Updates the color of the button
   */
  updateButtonColor() {
    // get button
    const shadow = this.shadowRoot;
    const buttonInput = shadow.querySelector("button");

    // get the type of the element
    const elemType = this.getAttribute("type");
    const isPlain = this.hasAttribute("plain");
    var elemTypeString = elemType;
    if (
      elemType != "primary" &&
      elemType != "success" &&
      elemType != "info" &&
      elemType != "warning" &&
      elemType != "danger"
    ) {
      elemTypeString = "default";
    }

    if (!isPlain) {
      buttonInput.style.setProperty(
        "--bg-color",
        types[elemTypeString]["bg-color"]
      );
      buttonInput.style.setProperty(
        "--txt-color",
        types[elemTypeString]["txt-color"]
      );
      buttonInput.style.setProperty(
        "--border-color",
        types[elemTypeString]["border-color"]
      );
      buttonInput.style.setProperty(
        "--hover-bg",
        types[elemTypeString]["hover-bg"]
      );
      buttonInput.style.setProperty(
        "--hover-txt",
        types[elemTypeString]["hover-txt"]
      );
      buttonInput.style.setProperty(
        "--hover-border",
        types[elemTypeString]["hover-border"]
      );
    } else {
      buttonInput.style.setProperty(
        "--bg-color",
        types[elemTypeString]["plain-bg-color"]
      );
      buttonInput.style.setProperty(
        "--txt-color",
        types[elemTypeString]["plain-txt-color"]
      );
      buttonInput.style.setProperty(
        "--border-color",
        types[elemTypeString]["plain-border-color"]
      );
      buttonInput.style.setProperty(
        "--hover-bg",
        types[elemTypeString]["plain-hover-bg"]
      );
      buttonInput.style.setProperty(
        "--hover-txt",
        types[elemTypeString]["plain-hover-txt"]
      );
      buttonInput.style.setProperty(
        "--hover-border",
        types[elemTypeString]["plain-hover-border"]
      );
    }
  }

  /**
   * Updates disabled attribute
   */
  updateDisabled() {
    // get button
    const shadow = this.shadowRoot;
    const buttonInput = shadow.querySelector("button");

    // Check if button is disabled
    const isDisabled = this.hasAttribute("disabled");
    if (isDisabled) {
      buttonInput.style.setProperty("--pointer-events", "none");
      buttonInput.style.setProperty("--opacity", ".7");
      buttonInput.setAttribute("disabled", "");
    }
  }
}

// Define the new element
window.customElements.define("lan-button", LANButton);
