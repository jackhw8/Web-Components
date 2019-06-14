/**
 * This is HelloWorld widget.
 */
export default class LANCoreHello extends HTMLElement {
  /**
   * constructor
   */ 
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'});

    // Create spans
    const paragraph = document.createElement('p');
    paragraph.setAttribute('class', 'paragraph');
    paragraph.innerText = `Hello ${this.getAttribute("username")}!`;

    // Create some CSS to apply to the shadow dom
    const style = document.createElement('style');

    style.textContent = `
      .paragraph {
        color: red;
        font-size: xx-large;
      }
    `;

    // Attach the created elements to the shadow dom
    shadow.appendChild(style);
    shadow.appendChild(paragraph);
  }

  /**
   * connectedCallback invoked when the element is removed, appended, edited on
   * the DOM tree.
   */
  connectedCallback() {
    // Nothing to do when the component is removed, appended, or edited
  }

  /**
   * attributeChangedCallback is a lifecycle method that is invoked
   * whenever attributes listed in observedAttributes static function is
   * updated.
   */
  attributeChangedCallback() {
    // update the content of the paragraph inside the customElements
    this.shadowRoot.querySelector('p').innerText = `Hello ${this.getAttribute('username')}!`;
  }

  /**
   * observedAttributes
   * @returns {list} returns a list of observed attributes
   */
  static get observedAttributes () {
    return ['username'];
  }
}

// Define the new element
customElements.define('lan-core-hello', LANCoreHello);
