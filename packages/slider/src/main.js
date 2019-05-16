const template = document.createElement("template");
template.innerHTML = `
  <link rel="stylesheet" type="text/css" href="style.css">
  <div style="width:300px">
  <input type="range" min="0" max="100" value="50" id="range2"/>
  </div>
`;

/**
 * This is Slider widget.
 */
class LANSlider extends HTMLElement {
  /**
   * constructor
   */
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });

    // Create input slider with default values
    const sliderComponent = template.content;
    sliderComponent.querySelector('input').id = 'range2';

    // Create some CSS to apply to the shadow dom
    //const style = document.createElement('style');

    // Append clone of slider to shadow DOM
    shadow.appendChild(sliderComponent.cloneNode(true));

    // Update values of input in template
    updateSliderValue(this);

    // Set initial value of slider
    var input = shadow.querySelector('input');
    var min = parseInt(this.getAttribute('min'));
    var max = parseInt(this.getAttribute('max'));
    input.value = ((max - min) / 2) + min;

    // preBar stuff
    var wrp = document.createElement('div'),
      preBar = document.createElement('p'),
      range = max - min,
      getVal = function () {
        var t = (1 * (parseInt(input.value, 10) - parseInt(input.min, 10)) / range);
        return t * 100;
      };
    wrp.className = 'barCnt';
    preBar.className = 'preBar';

    input.className = input.className.length ? (input.className + ' colorized') : 'colorized';
    input.parentNode.replaceChild(wrp, input);

    wrp.appendChild(input);
    wrp.appendChild(preBar);

    // Initially set width of preBar
    preBar.style.width = getVal() + '%';

    var box = document.createElement('textarea');
    box.innerText = parseInt(input.value, 10);
    box.class = 'test';
    shadow.appendChild(box.cloneNode(true));

    // Change width of preBar depending on input
    input.addEventListener('input', function () {
      shadow.querySelector('textarea').value = shadow.querySelector('input').value;
      preBar.style.width = getVal() + '%';
    });

  }

  /**
   * attributeChangedCallback is a lifecycle method that is invoked
   * whenever attributes listed in observedAttributes static function is
   * updated.
   */
  attributeChangedCallback() {
    // update the value of the slider
    // eslint-disable-next-line no-console
    console.log('Custom square element added to page.');
    updateSliderValue(this);

  }



  /**
   * observedAttributes
   * @returns {list} returns a list of observed attributes
   */
  static get observedAttributes() {
    return [
      'value',
      'min',
      'max',
      'disabled'
    ];
  }


}

// Define the new element
window.customElements.define('lan-slider', LANSlider);

function updateSliderValue(elem) {
  const shadow = elem.shadowRoot;
  const sliderInput = shadow.querySelector('input');

  sliderInput.setAttribute('value', elem.getAttribute('value'));
  sliderInput.setAttribute('min', elem.getAttribute('min'));
  sliderInput.setAttribute('max', elem.getAttribute('max'));
}

