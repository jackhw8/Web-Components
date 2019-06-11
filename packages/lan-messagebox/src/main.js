import componentStyle from './style.js';

const template = document.createElement("template");
template.innerHTML = `
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
class LANMessageBox extends HTMLElement {
  constructor() {
    super();
    // Create a shadow root
    this.attachShadow({ mode: "open" });
    this.isOpen = false;
    this.hasInput = false;
    // Clone template
    const tmpl = template.content.cloneNode(true);
     // Attach the created elements to the shadow dom
    this.shadowRoot.appendChild(tmpl);

    const mainPart = this.shadowRoot.querySelector("#main");
    //get backdrop 
    const backdrop = this.shadowRoot.querySelector('#backdrop');
    //get cancel button 
    const cancelButton = this.shadowRoot.querySelector('#cancel-btn');
    const confirmButton = this.shadowRoot.querySelector('#confirm-btn');
    const cancelIcon = this.shadowRoot.querySelector("#cancel-icon");

    //deal with input and inputPlaceHolder
    //todo refactor these elements
    if(this.hasAttribute("showInput")){
      //create input div
      const inputDiv= document.createElement("div");
      inputDiv.setAttribute("id","inputDiv");
      //create input box
      const inputBox = document.createElement("div");
      inputBox.setAttribute("id","inputBox");
      //create input 
      const input = document.createElement("input");
      //create tip
      const tip = document.createElement("p");
      tip.setAttribute("id","tip");
      //append these elements
      inputBox.appendChild(input);
      inputDiv.appendChild(inputBox);
      inputDiv.appendChild(tip);
      mainPart.appendChild(inputDiv);
      //add vaildate on input
      input.addEventListener('input',this.validater.bind(this));
      this.hasInput = true;
      if(this.hasAttribute("inputPlaceholder")){
        input.value = this.getAttribute("inputPlaceholder")
      }
      this.validater();
    }
    //add event when click somewhere rather than this message box, it will trigger cancel event
    backdrop.addEventListener('click', this._cancel.bind(this));
    //add event when click cancel button, trigger cancel event
    cancelButton.addEventListener('click', this._cancel.bind(this));
    //add event when click cancel icon, trigger cancel event
    cancelIcon.addEventListener('click',this._cancel.bind(this));
    //add event when click confirm button, trigger confirm event
    confirmButton.addEventListener('click', this._confirm.bind(this));
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
        //validate the input holder
        this.validater();
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
    //hide the message box
    this.hide();
    //create cancel event by get 'cancel' defined in html
    const cancelEvent = new Event('cancel', { bubbles: true, composed: true });
    //trigger cancel event
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
    //hide message box
    this.hide();
    //create event by 'confirm' defined in html
    const confirmEvent = new Event('confirm');
    //trigger confirm event
    this.dispatchEvent(confirmEvent);
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
    //get input value type 
    if(this.getAttribute("validator") == "email"){
      //regular expression to match email address
      const re = /\S+@\S+\.\S+/;
      //get the input value 
      if(!re.test(String(this.getValue()).toLowerCase())){
        //show tip
        this.shadowRoot.querySelector("#tip").innerHTML = "invalid email";
        //return result
        return false;
      }
    }
    //get input value type
    else if(this.getAttribute("validator") == "number"){
      //get value and validate 
      if(isNaN(this.getValue())){
        //show tip
        this.shadowRoot.querySelector("#tip").innerHTML = "invalid number";
        //return result
        return false;
      }
    }

    //empty the tip
    this.shadowRoot.querySelector("#tip").innerHTML = " ";
    //return true
    return true;
  }
}

customElements.define('lan-messagebox', LANMessageBox);
