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
        <lan-button size="small" id="cancel-btn" type="danger">Cancel</lan-button>
        <lan-button size="small" id="confirm-btn" type="primary">OK</lan-button>
    </section>
</div>
`;
export default class LANMessageBox extends HTMLElement {
  constructor() {
    super();
    this.inputPlaceholder = "";
    // Create a shadow root
    this.attachShadow({ mode: "open" });
    // Clone template
    const tmpl = template.content.cloneNode(true);
     // Attach the created elements to the shadow dom
    this.shadowRoot.appendChild(tmpl);

    //add event when click backdrop rather than message box,trigger cancel event
    this.shadowRoot.querySelector('#backdrop').addEventListener('click', this._cancel.bind(this));
    //add event when click cancel button, trigger cancel event
    this.shadowRoot.querySelector('#cancel-btn').addEventListener('click', this._cancel.bind(this));
    //add event when click cancel icon, trigger cancel event
    this.shadowRoot.querySelector("#cancel-icon").addEventListener('click',this._cancel.bind(this));
    //add event when click confirm button, trigger confirm event
    this.shadowRoot.querySelector('#confirm-btn').addEventListener('click', this._confirm.bind(this));

    //deal with input and inputPlaceHolder
    this.handleInputAttribute();
  }
  

  /**
   * attributeChangedCallback is a lifecycle method that is invoked
   * whenever attributes listed in observedAttributes static function is
   * updated.
   */
  attributeChangedCallback() {
    // console.log("att changed!");
    // this.handleInputAttribute();
  }

  /**
   * open lan-messagebox
   * need to bind wanted lan-messagebox
   */
  open() {
    this.setAttribute('opened', '');
    if(this.hasAttribute("showInput")){
      this.shadowRoot.querySelector("input").value = "";
      if(this.hasAttribute("inputPlaceholder")){
        this.shadowRoot.querySelector("input").placeholder = this.getAttribute("inputPlaceholder")
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
      return null;
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
    if(this.hasAttribute("showInput")){
      return this.shadowRoot.querySelector("input").value;
    }
    return null;
  }
  /** 
   * validate the input value
   */
  validater(){
    //get input value type 
    if(!this.hasAttribute("showInput")){
      return true;
    }
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
    if(this.shadowRoot.querySelector("#tip") !== null){
       //empty the tip
      this.shadowRoot.querySelector("#tip").innerHTML = " ";
    }
    //return true
    return true;
  }

  handleInputAttribute(){
    const mainPart = this.shadowRoot.querySelector("#main");
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
      //attach input to input box 
      inputBox.appendChild(input);
      //attach input box and tip to input div
      inputDiv.appendChild(inputBox);
      inputDiv.appendChild(tip);
      //attach this input and tip to main div
      mainPart.appendChild(inputDiv);
      //add vaildator on input
      input.addEventListener('input',this.validater.bind(this));
      //change the value to input place holder 
      if(this.hasAttribute("inputPlaceholder")){
        input.value = this.getAttribute("inputPlaceholder")
        //validate input place holder
      }
      this.validater();
    }
    else{
      if (mainPart.querySelector("#inputDiv")){
        mainPart.querySelector("#inputDiv").remove();
      }
    }
  }

  // static get observedAttributes(){
  //   return ["inputPlaceholder"];
  // }
}

customElements.define('lan-messagebox', LANMessageBox);
