const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" type="text/css" href="style.css">
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
    <div style="display:inline-block;">
        <button type="submit" class="button default"><slot name="button-label"></slot></button>
    </div>
    <style>
    .button
{
    /*background-color: #4CAF50; */
    /* border: none; */
    /*color: white; */
    line-height: 1;
    border: none;
    padding: 12px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
}

.default
{
    background-color: #ffffff;
    color: black;
    border: 1px solid #dcdfe6;
}

.default:hover
{
    background-color: #EEF5FE;
    color: #409eff;
    border-color: #409eff;
}

.default.plain:hover
{
    background-color: #ffffff;
}

.primary
{
    background-color: #409eff;
    color: #ffffff;
    border-color: #409eff;
}

.primary:hover
{
    background-color: #77B4F8;
}

.primary.plain 
{
    background-color: #EEF5FE;
    color: #409eff;
    border: 1px solid #409eff;
}

.primary.plain:hover
{
    background-color: #409eff;
    color: #ffffff;
}

.success
{
    background-color: #67c23a;
    color: #ffffff;
    border-color: #67c23a;
}

.success:hover
{
    background-color: #98C76D
}

.success.plain 
{
    background-color: #f2f8ec;
    color: #67c23a;
    border: 1px solid #67c23a;
}

.success.plain:hover
{
    background-color: #67c23a;
    color: #ffffff;
}

.info
{
    background-color: #909399;
    color: #ffffff;
    border-color: #909399;
}

.info:hover
{
    background-color: #A7A9AD;
}

.info.plain 
{
    background-color: #f4f4f5;
    color: #909399;
    border: 1px solid #909399;
}

.info.plain:hover
{
    background-color: #909399;
    color: #ffffff;
}

.warning
{
    background-color: #e6a23c;
    color: #ffffff;
    border-color: #e6a23c;
}

.warning:hover
{
    background-color: #E3B572
}

.warning.plain 
{
    background-color: #fcf6ed;
    color: #e6a23c;
    border: 1px solid #e6a23c;
}

.warning.plain:hover
{
    background-color: #e6a23c;
    color: #ffffff;
}

.danger
{
    background-color: #f56c6c;
    color: #ffffff;
    border-color: #f56c6c;
} 

.danger:hover
{
    background-color: #E6908E;
}

.danger.plain 
{
    background-color: #fbf1f1;
    color: #f56c6c;
    border: 1px solid #f56c6c;
}

.danger.plain:hover
{
    background-color: #f56c6c;
    color: #ffffff;
}

.round
{
    border-radius: 24px;
}

.medium
{
    padding: 10px 20px;
}

.small
{
    padding: 9px 15px;
}

.mini
{
    padding: 7px 15px;
}

.loading 
{
    opacity: 80;
}

.disabled
{
    pointer-events: none;
    opacity:.5;
}
    </style>
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
