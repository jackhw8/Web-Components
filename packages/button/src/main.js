const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" type="text/css" href="style.css">
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
    <div style="display:inline-block;">
        <button type="submit" class="button default"><slot name="button-label"></slot></button>
    </div>
`;

/**
 * This is Button widget.
 */
class LANButton extends HTMLElement {
    /**
     * constructor
     */
    constructor() {
        // Always call super first in constructor
        super();

        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Create input button with default values
        const buttonComponent = template.content;
        const text = this.innerHTML;
        buttonComponent.querySelector('slot').innerHTML = text;
        //console.log(text);
        // Attach the created elements to the shadow dom
        shadow.appendChild(buttonComponent.cloneNode(true));
    }

    /**
     * attributeChangedCallback is a lifecycle method that is invoked
     * whenever attributes listed in observedAttributes static function is
     * updated.
     */
    attributeChangedCallback() {
        // update the value of the button
        // eslint-disable-next-line no-console
        //console.log('Custom square element added to page.');
        updateButtonValue(this);
    }

    /**
     * observedAttributes
     * @returns {list} returns a list of observed attributes
     */
    static get observedAttributes() {
        return [
            'size',
            'type',
            'native-type',
            'plain',
            'round',
            'circle',
            'disabled',
            'loading'
        ];
    }
}

// Define the new element
window.customElements.define('lan-button', LANButton);

// updateButtonValue
function updateButtonValue(elem) {
    const shadow = elem.shadowRoot;
    const buttonInput = shadow.querySelector('button');

    // Set native type of button
    buttonInput.setAttribute('type', elem.getAttribute('native-type'));
    if (elem.hasAttribute('autofocus')) {
        buttonInput.setAttribute('autofocus', '');
    }

    // Set size of button
    const elemSize = elem.getAttribute('size');
    var size = "";
    if (elemSize == "medium" || elemSize == "small" || elemSize == "mini") {
        size = elemSize;
    }

    // Set type of button
    const elemType = elem.getAttribute('type');
    var type = 'default';
    if (elemType == 'primary' || elemType == 'success' || elemType == 'warning'
        || elemType == 'danger' || elemType == 'info' || elemType == 'text') {
        type = elemType;
    }


    // Set button shape (plain, round, circle)
    var shape = '';
    if (elem.hasAttribute('round')) {
        shape = 'round';
    } else if (elem.hasAttribute('circle')) {
        shape = 'circle';
    } else if (elem.hasAttribute('plain')) {
        shape = 'plain';
    }

    var elemClass = 'button ' + type + ' ' + shape + ' ' + size;
    // Check if button is disabled
    if (elem.hasAttribute('disabled')) {
        elemClass += 'disabled';
    }

    if (elem.getAttribute('loading') == 'true') {
        elemClass += 'loading';
        const text = '<i class="fa fa-refresh fa-spin"></i>Loading';
        buttonInput.querySelector('slot').innerHTML = text;
    } else {
        /*const text = this.innerHTML;
        buttonComponent.querySelector('slot').innerHTML = text;*/
    }

    // Set class
    buttonInput.setAttribute('class', elemClass);

    //console.log("Class: " + buttonInput.getAttribute('class'));
    //console.log("Native-type: " + buttonInput.getAttribute("type"));
    //if (buttonInput.hasAttribute('autofocus')) console.log('autofocus');
}
