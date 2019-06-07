import componentStyle from './style.js';
class MessageBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isOpen = false;
    this.hasInput = false;
    this.shadowRoot.innerHTML = `
        <style>
        ${componentStyle}
        </style>
        <div id="backdrop"></div>
        <div id="MessageBox">
            <header>
                <slot name="title">Title</slot>
                <button id="cancel-icon" type="button" aria-label="Close" class="el-message-box__headerbtn"><i class="el-message-box__close el-icon-close"></i></button>
            </header>
            <div id="main">
                <slot name="text"></slot>
            </div>
            <section id="actions">
                <lan-button size="small" id="cancel-btn" type="warning">Cancel</lan-button>
                <lan-button size="small" id="confirm-btn" type="primary">OK</lan-button>
            </section>
        </div>
    `;

    const mainPart = this.shadowRoot.querySelector("#main");
    //const actionsPart = this.shadowRoot.querySelector("#actions");
    const backdrop = this.shadowRoot.querySelector('#backdrop');
    const cancelButton = this.shadowRoot.querySelector('#cancel-btn');
    const confirmButton = this.shadowRoot.querySelector('#confirm-btn');
    const cancelIcon = this.shadowRoot.querySelector("#cancel-icon");
    //actionsPart.removeChild(cancelButton);

    //deal with input and inputPlaceHolder
    if(this.hasAttribute("showInput")){
      const inputDiv= document.createElement("div");
      inputDiv.setAttribute("id","inputDiv");
      const inputBox = document.createElement("div");
      inputBox.setAttribute("id","inputBox");
      const input = document.createElement("input");
      const tip = document.createElement("p");
      tip.setAttribute("id","tip");

      inputBox.appendChild(input);
      inputDiv.appendChild(inputBox);
      inputDiv.appendChild(tip);
      
      
      mainPart.appendChild(inputDiv);
      //todo validate input
      input.addEventListener('input',this.validater.bind(this));
      this.hasInput = true;
      if(this.hasAttribute("inputPlaceholder")){
        input.value = this.getAttribute("inputPlaceholder")
      }
      this.validater();
    }

    backdrop.addEventListener('click', this._cancel.bind(this));
    cancelButton.addEventListener('click', this._cancel.bind(this));
    confirmButton.addEventListener('click', this._confirm.bind(this));
    cancelIcon.addEventListener('click',this._cancel.bind(this));


  }

  attributeChangedCallback() {
    if (this.hasAttribute('opened')) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
    if(this.hasAttribute("showInput")){
      this.hasInput = true;
    }else{
      this.hasInput = false;
    }
  }

  /**
   * open lan-messagebox
   * need to bind wanted lan-messagebox
   */
  open() {
    this.setAttribute('opened', '');
    this.isOpen = true;
    if(this.hasInput){
      this.shadowRoot.querySelector("input").value = "";
      if(this.hasAttribute("inputPlaceholder")){
        this.shadowRoot.querySelector("input").value = this.getAttribute("inputPlaceholder")
      }
    }
  }
  /**
   * hide lan-messagebox
   */
  hide() {
    if (this.hasAttribute('opened')) {
      this.removeAttribute('opened');
    }
    this.isOpen = false;
  }

  /**
   * internal function for lan-messagebox
   * @param {*} event
   * hide the messagebox and dispatch the cancel event
   * get lan-messagebox by this
   */
  _cancel(event) {
    this.hide();
    const cancelEvent = new Event('cancel', { bubbles: true, composed: true });
    event.target.dispatchEvent(cancelEvent);
  }
  /**
   * internal function for lan-messagebox
   * @param {*} event
   * hide the messagebox and dispatch the confirm event
   * need to bind lan-messagebox
   */
  _confirm() {
    if(!this.validater()){
      return;
    }
    this.hide();
    const confirmEvent = new Event('confirm');
    if(this.hasInput){
      this.dispatchEvent(confirmEvent);
    }
    else{
      this.dispatchEvent(confirmEvent);
    }
  }
  /**
   * get the vaule of input, if no value return null
   */
  getValue(){
    if(this.hasInput){
      return this.shadowRoot.querySelector("input").value;
    }
    return null;
  }
  /** todo
   * validate the input value
   */
  validater(){
    if(this.getAttribute("validator") == "email"){
      const re = /\S+@\S+\.\S+/;
      if(!re.test(String(this.getValue()).toLowerCase())){
        this.shadowRoot.querySelector("#tip").innerHTML = "invalid email";
        return false;
      }
    }
    else if(this.getAttribute("validator") == "number"){
      if(isNaN(this.getValue())){
        this.shadowRoot.querySelector("#tip").innerHTML = "invalid number";
        return false;
      }
    }
    this.shadowRoot.querySelector("#tip").innerHTML = " ";
    return true;
    
  }
}

customElements.define('lan-messagebox', MessageBox);
