import componentStyle from "./style.js";
import { types, sizes } from "./constants.js";

// Template of the actual button
const template = document.createElement("template");
template.innerHTML = `
    <style>${componentStyle}</style>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <button type="button" class="button default"><slot name="button-label">Button</slot></button>
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

    // Create input button with default values
    const buttonComponent = template.content;
    const text = this.innerHTML;
    buttonComponent.querySelector("slot").innerHTML = text;

    // Attach the created elements to the shadow dom
    shadow.appendChild(buttonComponent.cloneNode(true));

    // set the class to default
    shadow.querySelector("button").setAttribute("class", "button default");

    this.updateButtonValue();
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
      "circle",
      "disabled"
    ];
  }

  /**
   * Updates the button when the attributes are changed
   */
  updateButtonValue() {
    const shadow = this.shadowRoot;
    const buttonInput = shadow.querySelector("button");

    // Set native type of button
    buttonInput.setAttribute("type", this.getAttribute("native-type"));
    if (this.hasAttribute("autofocus")) {
      buttonInput.setAttribute("autofocus", "");
    }

    // Update button color, size and shape
    this.updateButtonColor();
    this.updateButtonShape();
    this.updateButtonSize();
    this.updateDisabled();

    // Integrate with bootstrap
    if (this.hasAttribute("class")) {
      if (this.getAttribute("class").includes("btn")) {
        buttonInput.setAttribute(
          "class",
          buttonInput.getAttribute("class") + " " + this.getAttribute("class")
        );
        this.setAttribute("class", "");
      }
    }
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
