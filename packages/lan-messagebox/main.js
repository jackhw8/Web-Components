class MessageBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isOpen = false;
    this.hasInput = false;
    this.shadowRoot.innerHTML = `
        <style>
            #backdrop {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100vh;
              background: rgba(0,0,0,0.75);
              z-index: 350;
              opacity: 0;
              pointer-events: none;
            }

            :host([opened]) #backdrop,
            :host([opened]) #MessageBox {
              opacity: 1;
              pointer-events: all;
            }

            :host([opened]) #MessageBox {
              top: 30vh;
            }

            #MessageBox {
              position: fixed;
              top: 5vh;
              left: 33%;
              width: 33%;
              z-index: 351;
              background: white;
              border-radius: 3px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.26);
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              opacity: 0;
              pointer-events: none;
              transition: all 0.3s ease-out;
            }

            header {
              position: relative;
              padding: 15px 15px 10px;
            }

            ::slotted(span) {
              font-size: 18px;
              line-height: 1;
              color: #303133;
            }

            ::slotted(p){
              color: #606266;
              font-size: 14px;
              margin: 0;
            }

            #main {
              padding: 10px 15px;
            }

            #actions {
              padding: 5px 15px 0;
              display: block;
              text-align: right;
            }

            #actions button {
              margin: 0 0.25rem;
            }
            input{
              width: 100%;
            }

            .el-message-box__headerbtn {
              position: absolute;
              top: 15px;
              right: 15px;
              padding: 0;
              border: none;
              outline: none;
              background: transparent;
              font-size: 16px;
              cursor: pointer;
            }
            .el-message-box__headerbtn .el-message-box__close {
              color: #909399;
            }
            [class*=" el-icon-"], [class^=el-icon-] {
              font-family: element-icons!important;
              speak: none;
              font-style: normal;
              font-weight: 400;
              font-variant: normal;
              text-transform: none;
              line-height: 1;
              vertical-align: baseline;
              display: inline-block;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            .el-icon-close:before {
              content: "x";
            }
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


    const backdrop = this.shadowRoot.querySelector('#backdrop');
    const cancelButton = this.shadowRoot.querySelector('#cancel-btn');
    const confirmButton = this.shadowRoot.querySelector('#confirm-btn');
    const cancelIcon = this.shadowRoot.querySelector("#cancel-icon");
    
    if(this.hasAttribute("showInput")){
      const input = document.createElement("input");
      const mainPart = this.shadowRoot.querySelector("#main");
      this.hasInput = true;
      mainPart.appendChild(input);
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
  }

  /**
   * open lan-messagebox
   * need to bind wanted lan-messagebox
   */
  open() {
    this.setAttribute('opened', '');
    this.isOpen = true;
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
    this.hide();
    const confirmEvent = new Event('confirm');
    if(this.hasInput){
      const input = this.shadowRoot.querySelector("input");
      this.value = input.value;
      this.dispatchEvent(confirmEvent);
    }
    else{
      this.dispatchEvent(confirmEvent);
    }
  }

  getValue(){
    if(this.hasInput){
      return this.value;
    }
    return null;
  }
}

customElements.define('lan-messagebox', MessageBox);
