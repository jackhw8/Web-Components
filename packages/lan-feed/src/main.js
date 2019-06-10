import { wrapperStyle } from './style.js';
import { setupSetting } from './helper.js';

const template = document.createElement("template");
template.innerHTML = `
<style>${wrapperStyle}</style>
<div class="feed-wrapper">
  <div id="feed-setting" style='display:none;'>
      <p id='column-label'>Slide to change the column size</p>
      <lan-slider id='col-slider' min=1 max=5></lan-slider>
  </div>
  <div id="feed-body" class="feed-body"></div>
</div>
`;

/**
 * LANFeed
 */
export default class LANFeed extends HTMLElement {
  /**
   * Constructor creates a default lan-feed
   */
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Clone template
    const tmpl = template.content.cloneNode(true);

    // Clone the elements inside the shadow root to the template
    const feedBody = tmpl.querySelector("#feed-body");

    // Set the text body accordingly
    feedBody.innerHTML = this.innerHTML;

    // Attach the created elements to the shadow dom
    shadow.appendChild(tmpl);
    
    // initial setup of the attributes
    if(this.hasAttribute('settings')) setupSetting(this);
  }

  /**
   * attributeChangedCallback is a lifecycle method that is invoked
   * whenever attributes listed in observedAttributes static function is
   * updated.
   * @param {string} name the changed attribute
   * @param {string} oldVal old value of the attribute
   * @param {string} newVal new value of the attribute
   */
  attributeChangedCallback(name, oldVal, newVal) {
    const shadowRoot = this.shadowRoot;
    switch(name){
      case "cols":
        var feedBody = shadowRoot.getElementById('feed-body');
        var cols = parseInt(newVal, 10);

        var gridTemplate = "";
        for(var i=0; i<cols; i++) gridTemplate += "1fr ";
        feedBody.style.setProperty('--body-cols', gridTemplate);
        break;
    }
  }

  /**
   * observedAttributes
   * @returns {list} returns a list of observed attributes
   */
  static get observedAttributes() {
    return ["settings","cols"];
  }
}

// Define the new element
window.customElements.define("lan-feed", LANFeed);