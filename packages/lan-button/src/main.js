
// Template of the actual button
const template = document.createElement("template");
template.innerHTML = `
    <style>
    *
    {
        --bg-color: #ffffff;
        --txt-color: #606266;
        --border-color: #dcdfe6;

        --hover-bg: #EEF5FE;
        --hover-txt: #409eff;
        --hover-border: #409eff;
        
        --border-rad: 4px;

        --padding: 12px 20px;
        --txt-size: 14px;

        --pointer-events: auto;
        --opacity: 1;
    }
    .button
    {
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1;
        border: none;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: var(--txt-size);
        margin: 4px 2px;
        cursor: pointer;
        padding: var(--padding);
        border-radius: var(--border-rad);
        pointer-events: var(--pointer-events);
        opacity: var(--opacity);
    }
    .default
    {
        background-color: var(--bg-color);
        color: var(--txt-color);
        border: 1px solid var(--border-color);
    }
    .default:hover
    {
        background-color: var(--hover-bg);
        color: var(--hover-txt);
        border-color: var(--hover-border);
    }
    </style>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <button type="button" class="button default"><slot name="button-label">Button</slot></button>
`;

// dictionary containing the colors for each type
const types = {
    'default': {
        'bg-color': '#ffffff',
        'txt-color': '#606266',
        'border-color': '#dcdfe6',
        'hover-bg': '#EEF5FE',
        'hover-txt': '#409eff',
        'hover-border': '#ddecfd',

        'plain-bg-color': '#ffffff',
        'plain-txt-color': '#606266',
        'plain-border-color': '#dcdfe6',
        'plain-hover-bg': '#ffffff',
        'plain-hover-txt': '#409eff',
        'plain-hover-border': '#409eff',
    },
    'primary': {
        'bg-color': '#409eff',
        'txt-color': '#ffffff',
        'border-color': '#409eff',
        'hover-bg': '#77B4F8',
        'hover-txt': '#ffffff',
        'hover-border': '#77B4F8',

        'plain-bg-color': '#EEF5FE',
        'plain-txt-color': '#409eff',
        'plain-border-color': '#409eff',
        'plain-hover-bg': '#409eff',
        'plain-hover-txt': '#ffffff',
        'plain-hover-border': '#409eff',
    },
    'success': {
        'bg-color': '#67c23a',
        'txt-color': '#ffffff',
        'border-color': '#67c23a',
        'hover-bg': '#98C76D',
        'hover-txt': '#ffffff',
        'hover-border': '#98C76D',

        'plain-bg-color': '#f2f8ec',
        'plain-txt-color': '#67c23a',
        'plain-border-color': '#67c23a',
        'plain-hover-bg': '#67c23a',
        'plain-hover-txt': '#ffffff',
        'plain-hover-border': '#67c23a',
    },
    'info': {
        'bg-color': '#909399',
        'txt-color': '#ffffff',
        'border-color': '#909399',
        'hover-bg': '#A7A9AD',
        'hover-txt': '#ffffff',
        'hover-border': '#A7A9AD',

        'plain-bg-color': '#f4f4f5',
        'plain-txt-color': '#909399',
        'plain-border-color': '#909399',
        'pla i n-hover-bg': '#909399',
        'plain-hover-txt': '#ffffff',
        'plain-hover-border': '#909399',
    },
    'warning': {
        'bg-color': '#e6a23c',
        'txt-color': '#ffffff',
        'border-color': '#e6a23c',
        'hover-bg': '#E3B572',
        'hover-txt': '#ffffff',
        'hover-border': '#E3B572',

        'plain-bg-color': '#fcf6ed',
        'plain-txt-color': '#e6a23c',
        'plain-border-color': '#e6a23c',
        'plain-hover-bg': '#e6a23c',
        'plain-hover-txt': '#ffffff',
        'plain-hover-border': '#e6a23c',
    },
    'danger': {
        'bg-color': '#f56c6c',
        'txt-color': '#ffffff',
        'border-color': '#f56c6c',
        'hover-bg': '#E6908E',
        'hover-txt': '#ffffff',
        'hover-border': '#E6908E',

        'plain-bg-color': '#fbf1f1',
        'plain-txt-color': '#f56c6c',
        'plain-border-color': '#f56c6c',
        'plain-hover-bg': '#f56c6c',
        'plain-hover-txt': '#ffffff',
        'plain-hover-border': '#f56c6c',
    },
};

// dictionary containing different size paddings
const sizes = {
    'medium': {
        'padding': '10px 20px',
        'txt': '14px',
    },
    'small': {
        'padding': '9px 15px',
        'txt': '12px'
    },
    'mini': {
        'padding': '7px 15px',
        'txt': '12px'
    },
}

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
        const shadow = this.attachShadow({ mode: 'open' });

        // Create input button with default values
        const buttonComponent = template.content;
        const text = this.innerHTML;
        buttonComponent.querySelector('slot').innerHTML = text;

        // Attach the created elements to the shadow dom
        shadow.appendChild(buttonComponent.cloneNode(true));

        // set the class to default
        shadow.querySelector('button').setAttribute('class', 'button default');

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
            'size',
            'type',
            'native-type',
            'plain',
            'round',
            'circle',
            'disabled',
        ];
    }

    /**
     * Updates the button when the attributes are changed
     */
    updateButtonValue() {
        const shadow = this.shadowRoot;
        const buttonInput = shadow.querySelector('button');

        // Set native type of button
        buttonInput.setAttribute('type', this.getAttribute('native-type'));
        if (this.hasAttribute('autofocus')) {
            buttonInput.setAttribute('autofocus', '');
        }

        // Update button color, size and shape
        this.updateButtonColor();
        this.updateButtonShape();
        this.updateButtonSize();
        this.updateDisabled();


        // Integrate with bootstrap
        if (this.hasAttribute('class')) {
            if (this.getAttribute('class').includes('btn')) {
                buttonInput.setAttribute('class', buttonInput.getAttribute('class') + " " + this.getAttribute('class'));
                this.setAttribute('class', '');
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
        const buttonInput = shadow.querySelector('button');
        const elemShape = this.hasAttribute('round');
        if (elemShape) {
            buttonInput.style.setProperty('--border-rad', '24px');
        }


    }

    updateButtonSize() {
        // get button
        const shadow = this.shadowRoot;
        const buttonInput = shadow.querySelector('button');

        // set button size
        const elemSize = this.getAttribute('size');
        if (elemSize == 'medium' || elemSize == 'small' || elemSize == 'mini') {
            buttonInput.style.setProperty('--padding', sizes[elemSize]['padding']);
            buttonInput.style.setProperty('--txt-size', sizes[elemSize]['txt']);
        }
    }



    /**
     * Updates the color of the button
     */
    updateButtonColor() {
        // get button
        const shadow = this.shadowRoot;
        const buttonInput = shadow.querySelector('button');

        // get the type of the element
        const elemType = this.getAttribute('type');
        const isPlain = this.hasAttribute('plain');
        var elemTypeString = elemType;
        if (elemType != 'primary' && elemType != 'success' && elemType != 'info' &&
            elemType != 'warning' && elemType != 'danger') {
            elemTypeString = 'default';
        }

        if (!isPlain) {
            buttonInput.style.setProperty('--bg-color', types[elemTypeString]['bg-color']);
            buttonInput.style.setProperty('--txt-color', types[elemTypeString]['txt-color']);
            buttonInput.style.setProperty('--border-color', types[elemTypeString]['border-color']);
            buttonInput.style.setProperty('--hover-bg', types[elemTypeString]['hover-bg']);
            buttonInput.style.setProperty('--hover-txt', types[elemTypeString]['hover-txt']);
            buttonInput.style.setProperty('--hover-border', types[elemTypeString]['hover-border']);
        } else {
            buttonInput.style.setProperty('--bg-color', types[elemTypeString]['plain-bg-color']);
            buttonInput.style.setProperty('--txt-color', types[elemTypeString]['plain-txt-color']);
            buttonInput.style.setProperty('--border-color', types[elemTypeString]['plain-border-color']);
            buttonInput.style.setProperty('--hover-bg', types[elemTypeString]['plain-hover-bg']);
            buttonInput.style.setProperty('--hover-txt', types[elemTypeString]['plain-hover-txt']);
            buttonInput.style.setProperty('--hover-border', types[elemTypeString]['plain-hover-border']);
        }


    }

    /**
     * Updates disabled attribute
     */
    updateDisabled() {
        // get button
        const shadow = this.shadowRoot;
        const buttonInput = shadow.querySelector('button');

        // Check if button is disabled
        const isDisabled = this.hasAttribute('disabled');
        if (isDisabled) {
            buttonInput.style.setProperty('--pointer-events', 'none');
            buttonInput.style.setProperty('--opacity', '.7');
            buttonInput.setAttribute('disabled', '');
        }
    }

    /**
     * Returns the button in the shadow DOM
     * @returns {button}
     */
    get() {
        return this.shadowRoot.querySelector('button');
    }
}

// Define the new element
window.customElements.define('lan-button', LANButton);

