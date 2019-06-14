import { wrapperStyle } from "./style.js";
import { setupSetting, buildCards } from "./helper.js";

const template = document.createElement("template");
template.innerHTML = `
<style>${wrapperStyle}</style>
<div class="feed-wrapper">
  <div id="feed-setting">
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

    // Create a shadow root and clone template
    const shadow = this.attachShadow({ mode: "open" });
    const tmpl = template.content.cloneNode(true);

    // Get the feed body and set the inner text accordingly
    const feedBody = tmpl.querySelector("#feed-body");
    feedBody.innerHTML = this.innerHTML;

    // Attach the created elements to the shadow dom
    shadow.appendChild(tmpl);

    // Set the feed in settings mode if attribute 'settings' is present
    if (this.hasAttribute("settings")) setupSetting(this);
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
    // Get feed body and slider
    const shadowRoot = this.shadowRoot;
    var feedBody = shadowRoot.querySelector("#feed-body");
    var slider = shadowRoot.querySelector("#col-slider");

    switch (name) {
      case "cols":
        // Parse cols to int and assign it to slider's attribute val
        var cols = parseInt(newVal, 10);
        slider.setAttribute("val", cols);

        // Set the grid columns accordingly
        var gridTemplate = "";
        for (var i = 0; i < cols; i++) gridTemplate += "1fr ";
        feedBody.style.setProperty("--body-cols", gridTemplate);
        break;

      case "contents":
        // Build the cards
        buildCards(feedBody, JSON.parse(newVal), this.hasAttribute("bootstrap"));
        break;
    }
  }

  /**
   * observedAttributes
   * @returns {list} returns a list of observed attributes
   */
  static get observedAttributes() {
    return ["cols", "contents"];
  }
}

// Define the new element
window.customElements.define("lan-feed", LANFeed);
