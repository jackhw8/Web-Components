import { componentStyle, wrapperStyle } from "./style.js";

const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<style id="component-style">${componentStyle}</style>
<style id="wrapper-style">${wrapperStyle}</style>
<div id="card-wrapper">
  <h1 id="card-header"></h1>
  <p id="card-body"></p>
</div>
`;

/**
 * LANCard
 */
export default class LANCard extends HTMLElement {
  /**
   * Constructor creates a default lan-card
   */
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Clone template
    const tmpl = template.content.cloneNode(true);

    // Clone the elements inside the shadow root to the template
    const cardBody = tmpl.querySelector("#card-body");

    // Set the text body accordingly
    cardBody.innerHTML = this.innerHTML;

    // Attach the created elements to the shadow dom
    shadow.appendChild(tmpl);
    this._checkbootstrap(shadow);
  }

  /**
   * connectedCallback is a lifecycle method that is invoked whenever
   * the lan-card component is attached to a document-connected element.
   */
  connectedCallback() {
    // Clone the elements inside the shadow root to the template
    const cardBody = this.shadowRoot.querySelector("#card-body");

    // Set the text body accordingly
    cardBody.innerHTML = this.innerHTML;

    // Update everything according to the attributes
    this.handleHeaderAttribute();
    this.handleBodyStyleAttribute();
    this.handleShadowAttribute();

    this._checkbootstrap(this.shadowRoot);
  }

  /**
   * attributeChangedCallback is a lifecycle method that is invoked
   * whenever attributes listed in observedAttributes static function is
   * updated.
   */
  attributeChangedCallback() {
    // Update everything according to the attributes
    this.handleHeaderAttribute();
    this.handleBodyStyleAttribute();
    this.handleShadowAttribute();

    this._checkbootstrap(this.shadowRoot);
  }

  _checkbootstrap(shadow) {
    // If bootstrap is enabled then reset the style etc.
    if(this.hasAttribute("bootstrap")) {
      // remove styles
      shadow.querySelector('#wrapper-style').innerHTML = "";
      shadow.querySelector('#component-style').innerHTML = "";

      // add class names to card-wrapper
      shadow.querySelector("#card-wrapper").setAttribute("class", "card");
      shadow.querySelector("#card-header").setAttribute("class", "card-header");
      shadow.querySelector("#card-body").setAttribute("class", "card-body");

      // change h1 to div
      const header = shadow.querySelector("#card-header");
      header.outerHTML = header.outerHTML.replace(/h1/g,"div");
    }
  }

  /**
   * observedAttributes
   * @returns {list} returns a list of observed attributes
   */
  static get observedAttributes() {
    return ["header", "body-style", "shadow", "bootstrap"];
  }

  /**
   * handleHeaderAttribute
   * Takes care of the header attribute of the lan-card component
   */
  handleHeaderAttribute() {
    const shadow = this.shadowRoot;
    let headerComponent = shadow.querySelector("#card-header");
    if (headerComponent) {
      if (this.hasAttribute("header")) {
        headerComponent.innerHTML = this.getAttribute("header");
      } else {
        headerComponent.outerHTML = "";
      }
    } else {
      if (this.hasAttribute("header")) {
        // Get the wrapper component
        const wrapperComponent = shadow.querySelector("#card-wrapper");

        // Re-create <h1> element
        let newHeaderComponent = document.createElement("h1");
        newHeaderComponent.id = "card-header";
        newHeaderComponent.innerHTML = this.getAttribute("header");
        wrapperComponent.insertBefore(
          newHeaderComponent,
          wrapperComponent.childNodes[0]
        );
      }
    }
  }

  /**
   * handleBodyStyleAttribute
   * Takes care of the body-style attribute of the lan-card component
   */
  handleBodyStyleAttribute() {
    const shadow = this.shadowRoot;
    // Get the body style for this component, if any
    let styleComponent = shadow.querySelector("style#component-style");
    if (this.hasAttribute("body-style")) {
      styleComponent.innerHTML += `#card-body ${this.getAttribute(
        "body-style"
      )}`;
    }
  }

  /**
   * handleShadowAttribute
   * Takes care of the shadow attribute of the lan-card component
   */
  handleShadowAttribute() {
    const shadow = this.shadowRoot;
    // Get the shadow event for this component, if any
    let wrapperStyleComponent = shadow.querySelector("style#wrapper-style");
    if (this.hasAttribute("shadow")) {
      const shadowAttr = this.getAttribute("shadow");
      if (shadowAttr == "hover") {
        const wrapperStyles = wrapperStyleComponent.innerHTML.split(" { box-shadow:");
        wrapperStyleComponent.innerHTML = `${wrapperStyles[0]}:hover { box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }`;
      } else if (shadowAttr == "never") {
        // Remove box-shadow from the styles
        const wrapperStyles = wrapperStyleComponent.innerHTML.split("box-shadow:");
        wrapperStyleComponent.innerHTML = `${wrapperStyles[0]}}`;
      } else {
        // Treat everything else as "always"
        // Remove hover from the styles
        wrapperStyleComponent.innerHTML = wrapperStyleComponent.innerHTML
          .split(":hover")
          .join("");
      }
    } else {
      // Since default value of shadow is "always", treat it as how it is supposed to be
      // Remove hover from the styles
      wrapperStyleComponent.innerHTML = wrapperStyleComponent.innerHTML
        .split(":hover")
        .join("");
    }
  }
}

// Define the new element
window.customElements.define("lan-card", LANCard);
