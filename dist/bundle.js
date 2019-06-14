var LannisterComponents=function(){'use strict';/**
   * This is HelloWorld widget.
   */var c=Number.isInteger;/**
   * setupSetting shows the setting div of the slider.
   * 
   * @param {HTMLElement} elem 
   */function a(a){const b=a.shadowRoot.querySelector("#col-slider"),c=a.shadowRoot.querySelector("#feed-setting");c.style.display="block",b.onchange=()=>{const c=b.getAttribute("val");a.setAttribute("cols",c)}}/**
   * buildCards creates lan-card elements and append them to the feed body.
   * 
   * @param {HTMLElement} feedBody 
   * @param {Array} contents 
   * @param {Boolean} bootstrap 
   */function b(a,b,c){for(var d of b){var e=document.createElement("lan-card");e.setAttribute("shadow","hover"),e.setAttribute("body-style","{ height: 350px }"),e.setAttribute("header",d.header),c&&e.setAttribute("bootstrap",""),e.style.margin="10px",e.innerHTML=d.body,a.appendChild(e)}}class d extends HTMLElement{/**
     * constructor
     */constructor(){super();// Create a shadow root
const a=this.attachShadow({mode:"open"}),b=document.createElement("p");// Create spans
b.setAttribute("class","paragraph"),b.innerText=`Hello ${this.getAttribute("username")}!`;// Create some CSS to apply to the shadow dom
const c=document.createElement("style");// Attach the created elements to the shadow dom
c.textContent=`
      .paragraph {
        color: red;
        font-size: xx-large;
      }
    `,a.appendChild(c),a.appendChild(b)}/**
     * connectedCallback invoked when the element is removed, appended, edited on
     * the DOM tree.
     */connectedCallback(){}// Nothing to do when the component is removed, appended, or edited
/**
     * attributeChangedCallback is a lifecycle method that is invoked
     * whenever attributes listed in observedAttributes static function is
     * updated.
     */attributeChangedCallback(){// update the content of the paragraph inside the customElements
this.shadowRoot.querySelector("p").innerText=`Hello ${this.getAttribute("username")}!`}/**
     * observedAttributes
     * @returns {list} returns a list of observed attributes
     */static get observedAttributes(){return["username"]}}// Define the new element
customElements.define("lan-core-hello",d);const e={default:{"bg-color":"#ffffff","txt-color":"#606266","border-color":"#dcdfe6","hover-bg":"#EEF5FE","hover-txt":"#409eff","hover-border":"#ddecfd","plain-bg-color":"#ffffff","plain-txt-color":"#606266","plain-border-color":"#dcdfe6","plain-hover-bg":"#ffffff","plain-hover-txt":"#409eff","plain-hover-border":"#409eff"},primary:{"bg-color":"#409eff","txt-color":"#ffffff","border-color":"#409eff","hover-bg":"#77B4F8","hover-txt":"#ffffff","hover-border":"#77B4F8","plain-bg-color":"#EEF5FE","plain-txt-color":"#409eff","plain-border-color":"#409eff","plain-hover-bg":"#409eff","plain-hover-txt":"#ffffff","plain-hover-border":"#409eff"},success:{"bg-color":"#67c23a","txt-color":"#ffffff","border-color":"#67c23a","hover-bg":"#98C76D","hover-txt":"#ffffff","hover-border":"#98C76D","plain-bg-color":"#f2f8ec","plain-txt-color":"#67c23a","plain-border-color":"#67c23a","plain-hover-bg":"#67c23a","plain-hover-txt":"#ffffff","plain-hover-border":"#67c23a"},info:{"bg-color":"#909399","txt-color":"#ffffff","border-color":"#909399","hover-bg":"#A7A9AD","hover-txt":"#ffffff","hover-border":"#A7A9AD","plain-bg-color":"#f4f4f5","plain-txt-color":"#909399","plain-border-color":"#909399","pla i n-hover-bg":"#909399","plain-hover-txt":"#ffffff","plain-hover-border":"#909399"},warning:{"bg-color":"#e6a23c","txt-color":"#ffffff","border-color":"#e6a23c","hover-bg":"#E3B572","hover-txt":"#ffffff","hover-border":"#E3B572","plain-bg-color":"#fcf6ed","plain-txt-color":"#e6a23c","plain-border-color":"#e6a23c","plain-hover-bg":"#e6a23c","plain-hover-txt":"#ffffff","plain-hover-border":"#e6a23c"},danger:{"bg-color":"#f56c6c","txt-color":"#ffffff","border-color":"#f56c6c","hover-bg":"#E6908E","hover-txt":"#ffffff","hover-border":"#E6908E","plain-bg-color":"#fbf1f1","plain-txt-color":"#f56c6c","plain-border-color":"#f56c6c","plain-hover-bg":"#f56c6c","plain-hover-txt":"#ffffff","plain-hover-border":"#f56c6c"}},f={medium:{padding:"10px 20px",txt:"14px"},small:{padding:"9px 15px",txt:"12px"},mini:{padding:"7px 15px",txt:"12px"}},g=document.createElement("template");// dictionary containing the colors for each type
g.innerHTML=`
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <style>${"\n* {\n  --bg-color: #ffffff;\n  --txt-color: #606266;\n  --border-color: #dcdfe6;\n\n  --hover-bg: #EEF5FE;\n  --hover-txt: #409eff;\n  --hover-border: #409eff;\n  \n  --border-rad: 4px;\n\n  --padding: 12px 20px;\n  --txt-size: 14px;\n\n  --pointer-events: auto;\n  --opacity: 1;\n}\n.button\n{\n  font-family: Arial, Helvetica, sans-serif;\n  line-height: 1;\n  border: none;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  font-size: var(--txt-size);\n  margin: 4px 2px;\n  cursor: pointer;\n  padding: var(--padding);\n  border-radius: var(--border-rad);\n  pointer-events: var(--pointer-events);\n  opacity: var(--opacity);\n}\n.default\n{\n  background-color: var(--bg-color);\n  color: var(--txt-color);\n  border: 1px solid var(--border-color);\n}\n.default:hover\n{\n  background-color: var(--hover-bg);\n  color: var(--hover-txt);\n  border-color: var(--hover-border);\n}\n"}</style>
  <button type="button" class="button default"></button>
`;/**
   * This is the Button web component.
   */class h extends HTMLElement{/**
     * Constructor creates a default lan-button
     */constructor(){super();// Create a shadow root
const a=this.attachShadow({mode:"open"}),b=g.content,c=this.innerHTML;// Attach the created elements to the shadow dom
// check if bootstrap is enabled
b.querySelector("button").innerHTML=c,a.appendChild(b.cloneNode(!0)),this._checkbootstrap(a)}/**
     * connectedCallback invoked when the element is removed, appended, edited on
     * the DOM tree.
     */connectedCallback(){const a=this.shadowRoot;this._checkbootstrap(a)}/**
     * attributeChangedCallback is a lifecycle method that is invoked
     * whenever attributes listed in observedAttributes static function is
     * updated.
     */attributeChangedCallback(){this._checkbootstrap(this.shadowRoot),this.updateButtonValue()}/**
     * observedAttributes
     * @returns {list} returns a list of observed attributes
     */static get observedAttributes(){return["size","type","native-type","plain","round","autofocus","disabled","bootstrap","className"]}_checkbootstrap(a){// If bootstrap is enabled then reset the style etc.
if(this.hasAttribute("bootstrap")){a.querySelector("style").innerHTML="";// add class names to buttons
let b=this.getAttribute("className");a.querySelector("button").setAttribute("class",b)}else// set the class to default
a.querySelector("button").setAttribute("class","button default"),this.updateButtonValue()}/**
     * Updates the button when the attributes are changed
     */updateButtonValue(){const a=this.shadowRoot,b=a.querySelector("button");// Set native type of button
// Update button color, size and shape
b.setAttribute("type",this.getAttribute("native-type")?this.getAttribute("native-type"):"button"),this.hasAttribute("autofocus")&&b.setAttribute("autofocus",""),this.updateButtonColor(),this.updateButtonShape(),this.updateButtonSize(),this.updateDisabled()}/**
     * Updates the size and shape of the button
     */updateButtonShape(){// get button
const a=this.shadowRoot,b=a.querySelector("button"),c=this.hasAttribute("round");// set button shape
c&&b.style.setProperty("--border-rad","24px")}updateButtonSize(){// get button
const a=this.shadowRoot,b=a.querySelector("button"),c=this.getAttribute("size");("medium"==c||"small"==c||"mini"==c)&&(b.style.setProperty("--padding",f[c].padding),b.style.setProperty("--txt-size",f[c].txt))}/**
     * Updates the color of the button
     */updateButtonColor(){// get button
const a=this.shadowRoot,b=a.querySelector("button"),c=this.getAttribute("type"),d=this.hasAttribute("plain");var f=c;"primary"!=c&&"success"!=c&&"info"!=c&&"warning"!=c&&"danger"!=c&&(f="default"),d?(b.style.setProperty("--bg-color",e[f]["plain-bg-color"]),b.style.setProperty("--txt-color",e[f]["plain-txt-color"]),b.style.setProperty("--border-color",e[f]["plain-border-color"]),b.style.setProperty("--hover-bg",e[f]["plain-hover-bg"]),b.style.setProperty("--hover-txt",e[f]["plain-hover-txt"]),b.style.setProperty("--hover-border",e[f]["plain-hover-border"])):(b.style.setProperty("--bg-color",e[f]["bg-color"]),b.style.setProperty("--txt-color",e[f]["txt-color"]),b.style.setProperty("--border-color",e[f]["border-color"]),b.style.setProperty("--hover-bg",e[f]["hover-bg"]),b.style.setProperty("--hover-txt",e[f]["hover-txt"]),b.style.setProperty("--hover-border",e[f]["hover-border"]))}/**
     * Updates disabled attribute
     */updateDisabled(){// get button
const a=this.shadowRoot,b=a.querySelector("button"),c=this.hasAttribute("disabled");c&&(b.style.setProperty("--pointer-events","none"),b.style.setProperty("--opacity",".7"),b.setAttribute("disabled",""))}}// Define the new element
window.customElements.define("lan-button",h);const i=document.createElement("template");i.innerHTML=`
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<style id="component-style">${"\n  * {\n    font-family: \"Helvetica Neue\", \"Helvetica\";\n    color: #303133;\n    font-weight: 400;\n  }\n\n  #card-header {\n    font-size: 18px;\n    padding: 18px 20px;\n    border-bottom: 1px solid #ebeef5;\n    box-sizing: border-box;\n  }\n\n  #card-body {\n    padding: 20px;\n  }\n"}</style>
<style id="wrapper-style">${`
  #card-wrapper {
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
    transition: .3s;
  }

  #card-wrapper:hover { box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
`}</style>
<div id="card-wrapper">
  <h1 id="card-header"></h1>
  <p id="card-body"></p>
</div>
`;/**
   * LANCard
   */class j extends HTMLElement{/**
     * Constructor creates a default lan-card
     */constructor(){super();// Create a shadow root
const a=this.attachShadow({mode:"open"}),b=i.content.cloneNode(!0),c=b.querySelector("#card-body");// Clone template
// Set the text body accordingly
// Attach the created elements to the shadow dom
c.innerHTML=this.innerHTML,a.appendChild(b),this._checkbootstrap(a)}/**
     * connectedCallback is a lifecycle method that is invoked whenever
     * the lan-card component is attached to a document-connected element.
     */connectedCallback(){// Clone the elements inside the shadow root to the template
const a=this.shadowRoot.querySelector("#card-body");// Set the text body accordingly
// Update everything according to the attributes
a.innerHTML=this.innerHTML,this.handleHeaderAttribute(),this.handleBodyStyleAttribute(),this.handleShadowAttribute(),this._checkbootstrap(this.shadowRoot)}/**
     * attributeChangedCallback is a lifecycle method that is invoked
     * whenever attributes listed in observedAttributes static function is
     * updated.
     */attributeChangedCallback(){// Update everything according to the attributes
this.handleHeaderAttribute(),this.handleBodyStyleAttribute(),this.handleShadowAttribute(),this._checkbootstrap(this.shadowRoot)}_checkbootstrap(a){// If bootstrap is enabled then reset the style etc.
if(this.hasAttribute("bootstrap")){a.querySelector("#wrapper-style").innerHTML="",a.querySelector("#component-style").innerHTML="",a.querySelector("#card-wrapper").setAttribute("class","card"),a.querySelector("#card-header").setAttribute("class","card-header"),a.querySelector("#card-body").setAttribute("class","card-body");// change h1 to div
const b=a.querySelector("#card-header");b.outerHTML=b.outerHTML.replace(/h1/g,"div")}}/**
     * observedAttributes
     * @returns {list} returns a list of observed attributes
     */static get observedAttributes(){return["header","body-style","shadow","bootstrap"]}/**
     * handleHeaderAttribute
     * Takes care of the header attribute of the lan-card component
     */handleHeaderAttribute(){const a=this.shadowRoot;let b=a.querySelector("#card-header");if(b)this.hasAttribute("header")?b.innerHTML=this.getAttribute("header"):b.outerHTML="";else if(this.hasAttribute("header")){// Get the wrapper component
const b=a.querySelector("#card-wrapper");// Re-create <h1> element
let c=document.createElement("h1");c.id="card-header",c.innerHTML=this.getAttribute("header"),b.insertBefore(c,b.childNodes[0])}}/**
     * handleBodyStyleAttribute
     * Takes care of the body-style attribute of the lan-card component
     */handleBodyStyleAttribute(){const a=this.shadowRoot;// Get the body style for this component, if any
let b=a.querySelector("style#component-style");this.hasAttribute("body-style")&&(b.innerHTML+=`#card-body ${this.getAttribute("body-style")}`)}/**
     * handleShadowAttribute
     * Takes care of the shadow attribute of the lan-card component
     */handleShadowAttribute(){const a=this.shadowRoot;// Get the shadow event for this component, if any
let b=a.querySelector("style#wrapper-style");if(this.hasAttribute("shadow")){const a=this.getAttribute("shadow");if("hover"==a){const a=b.innerHTML.split(" { box-shadow:");b.innerHTML=`${a[0]}:hover { box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }`}else if("never"==a){// Remove box-shadow from the styles
const a=b.innerHTML.split("box-shadow:");b.innerHTML=`${a[0]}}`}else// Treat everything else as "always"
// Remove hover from the styles
b.innerHTML=b.innerHTML.split(":hover").join("")}else// Since default value of shadow is "always", treat it as how it is supposed to be
// Remove hover from the styles
b.innerHTML=b.innerHTML.split(":hover").join("")}}// Define the new element
window.customElements.define("lan-card",j);/**
   * calculateMin is a helper function to calculate the proper value of
   * attribute min
   *
   * @param {number} min
   *
   * @return {number} the proper value of attribute min
   */let k=a=>{const b=parseInt(a);return c(b)?0>b?0:b:0},l=a=>{const b=parseInt(a);return c(b)?0>=b?100:b:0},m=(a,b,d)=>{const e=parseInt(a);return c(e)?0>e||e>l(b)||e<k(d)?k(d)+(l(b)-k(d))/2:e:k(d)+(l(b)-k(d))/2},n=(a,b,c)=>{return 100*((a-c)/(b-c))},o=(a,b,c)=>a*b/100+c,p=(a,b,c,d)=>parseInt(100*((a-b+d)/c));/**
   * calculateMax is a helper function to calculate the proper value of
   * attribute max
   *
   * @param {number} max
   *
   * @return {number} the proper value of attribute max
   */const q=document.createElement("template");q.innerHTML=`
  <style>${"\n  #container {\n    position: relative;\n    height: 10px;\n    padding: 5px 10px;\n    z-index: 200;\n  }\n\n  #track {\n    -webkit-appearance: none;\n    width: calc(100% - 20px);\n    height: 7px;\n    background: lightgrey;\n    border: none;\n    border-radius: 3px;\n    position: absolute;\n    margin: auto;\n    cursor: ew-resize;\n  }\n  \n  #track:focus {\n    outline: none;\n  }\n  \n  #track:hover {\n    cursor: pointer;\n  }\n\n  #prebar {\n    position: relative;\n    z-index: 301;\n    width: 0;\n    background-color: #489fee;\n    height: 7px;\n    line-height: 6px;\n    border-radius: 3px;\n    padding: 0px;\n    margin: 0px;\n    pointer-events: none;\n  }\n\n  #tooltip {\n    margin-top: -14px;\n    margin-left: -10px;\n  }\n\n  #thumb {\n    -webkit-appearance: none;\n    background: white;\n    border: 2px solid #00001E;\n    border-radius: 20px;\n    border-color: #489FEE;\n    height: 16px;\n    width: 16px;\n    margin-top: -14px;\n    margin-left: -10px;\n    z-index: 400;\n    position: relative;\n    cursor: grab;\n    transition: 0.2s;\n    -webkit-transition: 0.2s;\n    -moz-transition: 0.2s;\n    -o-transition: 0.2s;\n  }\n\n  #tooltip {\n    display: inline-block;\n    background: #303133;\n    color: white;\n    z-index: 400;\n    position: absolute;\n    top: -30px;\n    border-radius: 4px;\n    min-width: 10px;\n    line-height: 1.2;\n    padding: 10px;\n    font-family: \"Helvetica Neue\", \"Helvetica\";\n    text-align: center;\n    font-size: 12px;\n    font-weight: 400;\n    word-wrap: break-word;\n  }\n\n  #popper-arrow {\n    position: absolute;\n    display: block;\n    width: 0;\n    height: 0;\n    border-top-color: #303133;\n    border-style: solid;\n    border-width: 6px;\n    border-bottom-width: 0px;\n    bottom: -6px;\n  }\n"}</style>
  <div id='container'>
    <div id="track"></div>
    <div id="prebar"></div>
    <div id="thumb" draggable="true"></div>
    <div id="tooltip">
      <div id="tooltip-content"></div>
      <div id="popper-arrow"></div>
    </div>
  </div>
`;/**
   * This is LANSlider widget.
   */class r extends HTMLElement{/**
     * constructor
     */constructor(){super();// Create a shadow root
const a=this.attachShadow({mode:"open"}),b=q.content.cloneNode(!0);// Clone template
this.min=0,this.max=100,this.val=50,this.range=this.max-this.min,this.position=n(this.val,this.max,this.min);// Get all elements
const c=b.querySelector("#prebar"),d=b.querySelector("#thumb");// Set the prebar width and thumb position accordingly
// Attach the created elements to the shadow dom
// Bind mouse events functions to this class
c.style.width=`${this.position}%`,d.style.left=`${this.position}%`,a.appendChild(b),this.onClickCallback=this.onClickCallback.bind(this),this.onMouseOutCallback=this.onMouseOutCallback.bind(this),this.onHoverCallback=this.onHoverCallback.bind(this),this.onDragCallback=this.onDragCallback.bind(this),this.onDragStartCallback=this.onDragStartCallback.bind(this),this.onDragEndCallback=this.onDragEndCallback.bind(this)}/**
     * connectedCallback is a lifecycle method that is invoked whenever
     * the component is attached to a document-connected element.
     */connectedCallback(){this.setAttribute("max",this.max),this.setAttribute("min",this.min),this.setAttribute("val",this.val);// Get the track and tooltip
const a=this.shadowRoot.querySelector("#track"),b=this.shadowRoot.querySelector("#thumb"),c=this.shadowRoot.querySelector("#tooltip"),d=this.shadowRoot.querySelector("#tooltip-content");// Set the text and position of tooltip
// Add event listeners to the track and thumb
d.innerHTML=this.val,c.style.opacity="0",c.style.left=`${o(this.position,a.offsetWidth,4)}px`,a.addEventListener("mousedown",a=>this.onClickCallback(a)),b.addEventListener("mouseout",()=>this.onMouseOutCallback()),b.addEventListener("mouseover",()=>this.onHoverCallback()),b.addEventListener("drag",a=>this.onDragCallback(a)),b.addEventListener("dragstart",a=>this.onDragStartCallback(a)),b.addEventListener("dragend",()=>this.onDragEndCallback())}/**
     * attributeChangedCallback is a lifecycle method that is invoked
     * whenever attributes listed in observedAttributes static function is
     * updated.
     */attributeChangedCallback(){// Get track, prebar, thumb and tooltip
const a=this.shadowRoot.querySelector("#track"),b=this.shadowRoot.querySelector("#prebar"),c=this.shadowRoot.querySelector("#thumb"),d=this.shadowRoot.querySelector("#tooltip"),e=this.shadowRoot.querySelector("#tooltip-content");// Get the attributes of min, max, val
// Update prebar width, thumb position, tooltip value and position
this.min=k(this.getAttribute("min")),this.max=l(this.getAttribute("max")),this.min>this.max&&(this.min=0,this.max=100,this.val=50,this.setAttribute("min",0),this.setAttribute("max",100),this.setAttribute("val",50)),this.val=m(this.getAttribute("val"),this.max,this.min),this.range=this.max-this.min,this.min!=this.getAttribute("min")&&this.setAttribute("min",this.min),this.max!=this.getAttribute("max")&&this.setAttribute("max",this.max),this.val!=this.getAttribute("val")&&this.setAttribute("val",this.val),this.position=n(this.val,this.max,this.min),b.style.width=`${this.position}%`,c.style.left=`${this.position}%`,e.innerHTML=this.val,d.style.left=`${o(this.position,a.offsetWidth,4)}px`}/**
     * observedAttributes
     * @returns {list} returns a list of observed attributes
     */static get observedAttributes(){return["val","max","min"]}/**
     * onClickCallback is a callback function that should be fired
     * whenever the pointer clicks the track.
     */onClickCallback(a){// Get track
const b=this.shadowRoot.querySelector("#track");// Calculate new position and val, then update attribute val
this.position=p(a.clientX,b.getBoundingClientRect().left,b.offsetWidth,10),this.val=parseInt(this.position*this.range/100)+this.min,this.setAttribute("val",this.val),this.onchange&&this.onchange(a)}/**
     * onMouseOutCallback is a callback function that should be fired
     * whenever the pointer is out of the thumb.
     */onMouseOutCallback(){// Get thumb and tooltip
const a=this.shadowRoot.querySelector("#thumb"),b=this.shadowRoot.querySelector("#tooltip");// Revert the size of thumb and hide tooltip
a.style.cssText=`height: 16px; width: 16px; margin-top: -14px; margin-left: -10px; left: ${this.position}%`,b.style.opacity="0"}/**
     * onHoverCallback is a callback function that should be fired
     * whenever the pointer is on top of the thumb.
     */onHoverCallback(){// Get thumb and tooltip
const a=this.shadowRoot.querySelector("#thumb"),b=this.shadowRoot.querySelector("#tooltip");// Enlarge the thumb and show tooltip
a.style.cssText=`height: 20px; width: 20px; margin-top: -16px; margin-left: -12px; left: ${this.position}%`,b.style.opacity="1"}/**
     * onDragCallback is a callback function that should be fired
     * whenever the pointer is dragging of the thumb.
     */onDragCallback(a){// Get track, thumb, and tooltip
const b=this.shadowRoot.querySelector("#track"),c=this.shadowRoot.querySelector("#thumb"),d=this.shadowRoot.querySelector("#tooltip");// Guard condition
a.clientX<b.getBoundingClientRect().left||a.clientX>b.getBoundingClientRect().right||(// Enlarge the thumb and show tooltip
// Calculate new position and val, then update attribute val
c.style.cssText=`height: 20px; width: 20px; margin-top: -16px; margin-left: -12px;`,d.style.opacity="1",this.position=p(a.clientX,b.getBoundingClientRect().left,b.offsetWidth,10),this.val=parseInt(this.position*this.range/100)+this.min,this.setAttribute("val",this.val),this.onchange&&this.onchange(a))}/**
     * onDragStartCallback is a callback function that should be fired
     * whenever the pointer is about to start dragging the thumb.
     */onDragStartCallback(a){a.dataTransfer.setDragImage(new Image,0,0)}/**
     * onDragEndCallback is a callback function that should be fired
     * whenever the pointer is about to end dragging the thumb.
     */onDragEndCallback(){// Get thumb and tooltip
const a=this.shadowRoot.querySelector("#thumb"),b=this.shadowRoot.querySelector("#tooltip");// Revert thumb size and hide tooltip
a.style.cssText=`height: 16px; width: 16px; margin-top: -14px; margin-left: -10px; left: ${this.position}%`,b.style.opacity="0"}}// Define the new element
customElements.define("lan-slider",r);/**
   * convertNumToInt is a helper function to convert
   * the parameter num to an int.
   * 
   * @param {string} num
   * 
   * @return {number} the int value of the corresponding param.
   */let s=a=>a?parseInt(a):0;const t=document.createElement("template");t.innerHTML=`
<style>${"\n  .tooltip-left {\n      position: relative;\n      display: inline-block;\n  }\n\n  .tooltip-left .tooltiptext {\n      visibility: hidden;\n      width: 120px;\n      background-color: black;\n      color: #fff;\n      text-align: center;\n      border: 1px solid black;\n      border-radius: 6px;\n      padding: 5px 0;\n      position: absolute;\n      z-index: 1;\n      top: 5px;\n      right: 110%;\n\n  }\n\n  .arrow-left .tooltiptext::after {\n      content: \"\";\n      position: absolute;\n      top: 50%;\n      left: 100%;\n      margin-top: -5px;\n      border-width: 5px;\n      border-style: solid;\n      border-color: transparent transparent transparent black;\n  }\n\n  .tooltip-right {\n      position: relative;\n      display: inline-block;\n  }\n\n  .tooltip-right .tooltiptext {\n      visibility: hidden;\n      width: 120px;\n      background-color: black;\n      color: #fff;\n      text-align: center;\n      border: 1px solid black;\n      border-radius: 6px;\n      padding: 5px 0;\n      position: absolute;\n      z-index: 1;\n      top: 5px;\n      left: 110%;\n\n  }\n\n  .arrow-right .tooltiptext::after {\n      content: \"\";\n      position: absolute;\n      top: 50%;\n      right: 100%;\n      margin-top: -5px;\n      border-width: 5px;\n      border-style: solid;\n      border-color: transparent black transparent transparent;\n  }\n\n  .tooltip-top {\n      position: relative;\n      display: inline-block;\n  }\n\n  .tooltip-top .tooltiptext {\n      visibility: hidden;\n      width: 120px;\n      background-color: black;\n      color: #fff;\n      text-align: center;\n      border: 1px solid black;\n      border-radius: 6px;\n      padding: 5px 0;\n      position: absolute;\n      z-index: 1;\n      bottom: 125%;\n      left: 50%;\n      margin-left: -60px;\n  }\n\n  .arrow-top .tooltiptext::after {\n      content: \"\";\n      position: absolute;\n      top: 100%;\n      left: 50%;\n      margin-left: -5px;\n      border-width: 5px;\n      border-style: solid;\n      border-color: black transparent transparent transparent;\n  }\n\n  .tooltip-bottom {\n      position: relative;\n      display: inline-block;\n  }\n\n  .tooltip-bottom .tooltiptext {\n      visibility: hidden;\n      width: 120px;\n      background-color: black;\n      color: #fff;\n      text-align: center;\n      border: 1px solid black;\n      border-radius: 6px;\n      padding: 5px 0;\n      position: absolute;\n      z-index: 1;\n      top: 125%;\n      left: 50%;\n      margin-left: -60px;\n  }\n\n  .arrow-bottom .tooltiptext::after {\n      content: \"\";\n      position: absolute;\n      bottom: 100%;\n      left: 50%;\n      margin-left: -5px;\n      border-width: 5px;\n      border-style: solid;\n      border-color: transparent transparent black transparent;\n  }\n"}</style>
<div class="tooltip-bottom arrow-bottom" id="tool">
    <slot id="content"></slot>
    <span class="tooltiptext">Tooltip text</span>
</div>
`;class u extends HTMLElement{/**
     * Constructor creates a default lan-button
     */constructor(){super();// Create a shadow root
const a=this.attachShadow({mode:"open"});// Create input tooltip with default values
let b=t.content;// Attach the created elements to the shadow dom
b.querySelector("slot").innerHTML=this.innerHTML,this.innerHTML="",a.appendChild(b.cloneNode(!0)),null!=this.getAttribute("content")&&(a.querySelector(".tooltiptext").innerHTML=this.getAttribute("content")),this.attributeChangedCallback()}/**
     * connectedCallback invoked when the element is removed, appended, edited on
     * the DOM tree.
     */connectedCallback(){}// Nothing to do when the component is removed, appended, or edited
/**
     * attributeChangedCallback is a lifecycle method that is invoked
     * whenever attributes listed in observedAttributes static function is
     * updated.
     */attributeChangedCallback(){// update the value of the tooltip
this.handleContent(),this.handlePlacementAttr(),this.handleArrowAttr(),this.handleOffsetAttr(),this.handleEffectAttr(),this.handleEventAttr(),this.handleDisabled()}/**
     * observedAttributes
     * @returns {list} returns a list of observed attributes
     */static get observedAttributes(){return["placement","event","effect","visible-arrow","hide-after","open-delay","manual","disabled","content","offset"]}/**
     * This method updates what style the tooltip reacts to.
     * visible-arrow -- hide the arrow of tooltip
     * effect "dark" -- Default, the color of tooltip will be black
     * effect "light"-- Tooltip will be white with black border
     */handleStyleAttr(){const a=this.shadowRoot,b=a.querySelector("#tool"),c=a.querySelector(".tooltiptext");this.hasAttribute("visible-arrow")&&(b.classList.remove("tooltip-arrow"),b.classList.add("tooltip"));let d="dark";this.hasAttribute("effect")&&(d=this.getAttribute("effect")),"dark"==d?(c.style.backgroundColor="black",c.style.color="white",c.classList.add("tooltip-dark")):(c.style.backgroundColor="white",c.style.color="black",c.style.borderStyle="solid",c.classList.add("tooltip-light"))}/**
     * This method updates the content of the tooltip
     */handleContent(){this.hasAttribute("content")&&(this.shadowRoot.querySelector(".tooltiptext").innerHTML=this.getAttribute("content"))}/**
     * This method handles the placement of the tooltip
     */handlePlacementAttr(){const a=this.shadowRoot,b=a.querySelector("#tool");let c="bottom",d=this.getAttribute("placement");("top"==d||"left"==d||"right"==d)&&(c=d),"bottom"==c?b.setAttribute("class","tooltip-bottom"):"top"==c?b.setAttribute("class","tooltip-top"):"right"==c?b.setAttribute("class","tooltip-right"):"left"==c&&b.setAttribute("class","tooltip-left")}/**
     * This method updates the tooltip arrow
     */handleArrowAttr(){const a=this.shadowRoot,b=a.querySelector("#tool");"false"==this.getAttribute("visible-arrow")?b.classList.contains("arrow-top")?b.classList.remove("arrow-top"):b.classList.contains("arrow-bottom")?b.classList.remove("arrow-bottom"):b.classList.contains("arrow-right")?b.classList.remove("arrow-right"):b.classList.contains("arrow-left")&&b.classList.remove("arrow-left"):b.classList.contains("tooltip-top")?b.setAttribute("class","tooltip-top arrow-top"):b.classList.contains("tooltip-bottom")?b.setAttribute("class","tooltip-bottom arrow-bottom"):b.classList.contains("tooltip-right")?b.setAttribute("class","tooltip-right arrow-right"):b.classList.contains("tooltip-left")&&b.setAttribute("class","tooltip-left arrow-left")}/**
     * This method updates the offset of the tooltip as a percentage
     * of the div
     */handleOffsetAttr(){const a=this.shadowRoot,b=a.querySelector("#tool"),c=a.querySelector(".tooltiptext");let d=50;(0<=parseInt(this.getAttribute("offset"))||100>=parseInt(this.getAttribute("offset")))&&(d=this.getAttribute("offset")),(b.classList.contains("tooltip-top")||b.classList.contains("tooltip-bottom"))&&(c.style.left=d+"%")}/**
     * This method updates the look of the tooltip
     * Either dark or light
     */handleEffectAttr(){const a=this.shadowRoot,b=a.querySelector(".tooltiptext");// get the current effect attribute
let c="dark";if(this.hasAttribute("effect")){const a=this.getAttribute("effect");("dark"==a||"light"==a)&&(c=a)}"dark"==c?(b.style.backgroundColor="black",b.style.color="white"):"light"==c&&(b.style.backgroundColor="white",b.style.color="black")}/**
     * This method updates what event the tooltip reacts to.
     * Hover -- Tooltip shows when the mouse is hovering
     *          over the button
     * Click -- Tooltip shows when the button is clicked
     *          once and disappears when clicked again
     * Focus -- Tooltip shows when the button is held down
     *          by the mouse
     */handleEventAttr(){const a=this.shadowRoot;let b=a.querySelector("#tool");"false"===this.getAttribute("enterable")&&(b=b.querySelector("slot"));const c=a.querySelector(".tooltiptext");// get the current event attribute
let d="hover";if(this.hasAttribute("event")){const a=this.getAttribute("event");("hover"==a||"click"==a||"focus"==a)&&(d=this.getAttribute("event"))}// disable any previous events set
b.onmouseenter=()=>{},b.onmouseleave=()=>{},b.onclick=()=>{},b.onmousedown=()=>{},b.onmouseup=()=>{};// If manual attribute is true, no pointer events
"true"==this.getAttribute("manual")||("hover"==d?(b.onmouseenter=()=>{let a=this.getTimeAfter(0,this.getAttribute("open-delay"));this.appear(a)},b.onmouseleave=()=>{let a=this.getTimeAfter(250,this.getAttribute("hide-after"));this.disappear(a)}):"click"==d?(c.style.setProperty("visibility","hidden"),b.onclick=()=>{let a=c.style.visibility;if("hidden"==a){let a=this.getTimeAfter(0,this.getAttribute("open-delay"));this.appear(a)}else{let a=this.getTimeAfter(0,this.getAttribute("hide-after"));this.disappear(a)}}):"focus"==d&&(b.onmousedown=()=>{let a=this.getTimeAfter(0,this.getAttribute("open-delay"));this.appear(a)},b.onmouseup=()=>{let a=this.getTimeAfter(0,this.getAttribute("hide-after"));this.disappear(a)},b.onmouseleave=()=>{let a=this.getTimeAfter(250,this.getAttribute("hide-after"));this.disappear(a)}));// set the event handler
}/**
     * Disables the tooltip if disabled attribute is true
     */handleDisabled(){const a=this.shadowRoot,b=a.querySelector("#tool");"true"==this.getAttribute("disabled")&&(b.onmouseenter=()=>{},b.onmouseleave=()=>{},b.onclick=()=>{},b.onmousedown=()=>{},b.onmouseup=()=>{})}/**
     * Gets the number of seconds to wait before or after tooltip appears
     * @param {int} num the default number in milliseconds
     * @param {string} attr the desired number as a string in milliseconds
     * @return {time} in milliseconds
     */getTimeAfter(a,b){let c=a;if(null!=b){let a=s(b);-1!=a&&0<=a&&(c=a)}return c}/**
     * Make the tooltip appear
     * @param {int} timeOut the number of milliseconds the transition takes
     */appear(a){const b=this.shadowRoot,c=b.querySelector(".tooltiptext");a/=1e3,0>a&&(a=0),c.style.setProperty("visibility","visible"),c.style.setProperty("opacity","1"),c.style.transition="opacity "+a+"s linear"}/**
     * Make the tooltip disappear
     * @param {int} timeOut the number of milliseconds the transition takes
     */disappear(a){const b=this.shadowRoot,c=b.querySelector(".tooltiptext");a/=1e3,0>a&&(a=0),c.style.setProperty("visibility","hidden"),c.style.setProperty("opacity","0"),c.style.transition="visibility "+a+"s, opacity "+a+"s linear"}}// Define the new element
window.customElements.define("lan-tooltip",u);const v=document.createElement("template");v.innerHTML=`
<style>
${"#backdrop {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100vh;\n    background: rgba(0,0,0,0.75);\n    z-index: 350;\n    opacity: 0;\n    pointer-events: none;\n  }\n\n  :host([opened]) #backdrop,\n  :host([opened]) #MessageBox {\n    opacity: 1;\n    pointer-events: all;\n  }\n\n  :host([opened]) #MessageBox {\n    top: 30vh;\n  }\n\n  #MessageBox {\n    font-family: Arial, Helvetica, sans-serif;\n    position: fixed;\n    top: 5vh;\n    left: 33%;\n    width: 33%;\n    z-index: 351;\n    background: white;\n    border-radius: 3px;\n    box-shadow: 0 2px 8px rgba(0,0,0,0.26);\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    opacity: 0;\n    pointer-events: none;\n    transition: all 0.3s ease-out;\n  }\n\n  header {\n    position: relative;\n    padding: 15px 15px 10px;\n  }\n\n  ::slotted(span) {\n    font-size: 18px;\n    line-height: 1;\n    color: #303133;\n  }\n\n  ::slotted(p){\n    color: #606266;\n    font-size: 14px;\n    margin: 0;\n  }\n\n  #main {\n    padding: 10px 15px;\n  }\n  #tip{\n    font-size:14px;\n    color:red;\n    margin:0;\n  }\n\n  #actions {\n    padding: 5px 15px 0;\n    display: block;\n    text-align: right;\n  }\n\n  #actions button {\n    margin: 0 0.25rem;\n  }\n  #inputDiv{\n    padding-top: 15px;\n  }\n  div[id^=\"inputBox\"]{\n    position: relative;\n    font-size: 14px;\n    display: inline-block;\n    width: 100%;\n  }\n  input{\n    -webkit-appearance: none;\n    background-color: #fff;\n    background-image: none;\n    border-radius: 4px;\n    border: 1px solid #dcdfe6;\n    box-sizing: border-box;\n    color: #606266;\n    display: inline-block;\n    font-size: inherit;\n    height: 40px;\n    line-height: 40px;\n    outline: none;\n    padding: 0 15px;\n    transition: border-color .2s cubic-bezier(.645,.045,.355,1);\n    width: 100%;\n  }\n\n  .el-message-box__headerbtn {\n    position: absolute;\n    top: 15px;\n    right: 15px;\n    padding: 0;\n    border: none;\n    outline: none;\n    background: transparent;\n    font-size: 16px;\n    cursor: pointer;\n  }\n  .el-message-box__headerbtn .el-message-box__close {\n    color: #909399;\n  }\n  [class*=\" el-icon-\"], [class^=el-icon-] {\n    font-family: element-icons!important;\n    speak: none;\n    font-style: normal;\n    font-weight: 400;\n    font-variant: normal;\n    text-transform: none;\n    line-height: 1;\n    vertical-align: baseline;\n    display: inline-block;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n  .el-icon-close:before {\n    font-family: Arial, Helvetica, sans-serif;\n    content: \"x\";\n  }\n  "}
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
`;class w extends HTMLElement{constructor(){super(),this.inputPlaceholder="",this.attachShadow({mode:"open"});// Clone template
const a=v.content.cloneNode(!0);// Attach the created elements to the shadow dom
//add event when click backdrop rather than message box,trigger cancel event
//add event when click cancel button, trigger cancel event
//add event when click cancel icon, trigger cancel event
//add event when click confirm button, trigger confirm event
//deal with input and inputPlaceHolder
this.shadowRoot.appendChild(a),this.shadowRoot.querySelector("#backdrop").addEventListener("click",this._cancel.bind(this)),this.shadowRoot.querySelector("#cancel-btn").addEventListener("click",this._cancel.bind(this)),this.shadowRoot.querySelector("#cancel-icon").addEventListener("click",this._cancel.bind(this)),this.shadowRoot.querySelector("#confirm-btn").addEventListener("click",this._confirm.bind(this)),this.handleInputAttribute()}/**
     * attributeChangedCallback is a lifecycle method that is invoked
     * whenever attributes listed in observedAttributes static function is
     * updated.
     */attributeChangedCallback(){}// console.log("att changed!");
// this.handleInputAttribute();
/**
     * open lan-messagebox
     * need to bind wanted lan-messagebox
     */open(){this.setAttribute("opened",""),this.hasAttribute("showInput")&&(this.shadowRoot.querySelector("input").value="",this.hasAttribute("inputPlaceholder")&&(this.shadowRoot.querySelector("input").placeholder=this.getAttribute("inputPlaceholder"),this.validater()))}/**
     * hide lan-messagebox
     */hide(){this.hasAttribute("opened")&&this.removeAttribute("opened")}/**
     * internal function for lan-messagebox
     * @param {*} event
     * hide the messagebox and dispatch the cancel event
     * get lan-messagebox by this
     */_cancel(a){this.hide();//create cancel event by get 'cancel' defined in html
const b=new Event("cancel",{bubbles:!0,composed:!0});//trigger cancel event
a.target.dispatchEvent(b)}/**
     * internal function for lan-messagebox
     * @param {*} event
     * hide the messagebox and dispatch the confirm event
     * need to bind lan-messagebox
     */_confirm(){if(!this.validater())return null;//hide message box
this.hide();//create event by 'confirm' defined in html
const a=new Event("confirm");//trigger confirm event
this.dispatchEvent(a)}/**
     * get the vaule of input, if no value return null
     */getValue(){return this.hasAttribute("showInput")?this.shadowRoot.querySelector("input").value:null}/** 
     * validate the input value
     */validater(){//get input value type 
if(!this.hasAttribute("showInput"))return!0;if("email"==this.getAttribute("validator")){//regular expression to match email address
const a=/\S+@\S+\.\S+/;//get the input value 
if(!a.test((this.getValue()+"").toLowerCase()))//return result
return this.shadowRoot.querySelector("#tip").innerHTML="invalid email",!1}//get input value type
else if("number"==this.getAttribute("validator")&&isNaN(this.getValue()))//return result
//get value and validate 
return this.shadowRoot.querySelector("#tip").innerHTML="invalid number",!1;//return true
return null!==this.shadowRoot.querySelector("#tip")&&(this.shadowRoot.querySelector("#tip").innerHTML=" "),!0}handleInputAttribute(){const a=this.shadowRoot.querySelector("#main");if(this.hasAttribute("showInput")){//create input div
const b=document.createElement("div");b.setAttribute("id","inputDiv");//create input box
const c=document.createElement("div");c.setAttribute("id","inputBox");//create input 
const d=document.createElement("input"),e=document.createElement("p");//create tip
//attach input to input box 
//attach input box and tip to input div
//attach this input and tip to main div
//add vaildator on input
e.setAttribute("id","tip"),c.appendChild(d),b.appendChild(c),b.appendChild(e),a.appendChild(b),d.addEventListener("input",this.validater.bind(this)),this.hasAttribute("inputPlaceholder")&&(d.value=this.getAttribute("inputPlaceholder")),this.validater()}else a.querySelector("#inputDiv")&&a.querySelector("#inputDiv").remove()}// static get observedAttributes(){
//   return ["inputPlaceholder"];
// }
}customElements.define("lan-messagebox",w);const x=document.createElement("template");x.innerHTML=`
<style>${"\n  .feed-wrapper {\n    font-family: \"Helvetica Neue\", \"Helvetica\";\n    width: calc(100vw - 500px);\n    overflow-x: hidden;\n    overflow-y: scroll;\n    margin: 50px auto;\n    padding: 40px;\n  }\n  \n  #feed-setting {\n    display: none;\n    text-align: center;\n    max-width: var(--wrapper-max-width, 700px);\n    margin: auto;\n    padding-bottom: 30px;\n  }\n\n  .feed-body {\n    display: grid;\n    grid-template-columns: var(--body-cols, 1fr);\n  }\n"}</style>
<div class="feed-wrapper">
  <div id="feed-setting">
      <p id='column-label'>Slide to change the column size</p>
      <lan-slider id='col-slider' min=1 max=5></lan-slider>
  </div>
  <div id="feed-body" class="feed-body"></div>
</div>
`;/**
   * LANFeed
   */class y extends HTMLElement{/**
     * Constructor creates a default lan-feed
     */constructor(){super();// Create a shadow root and clone template
const b=this.attachShadow({mode:"open"}),c=x.content.cloneNode(!0),d=c.querySelector("#feed-body");// Attach the created elements to the shadow dom
d.innerHTML=this.innerHTML,b.appendChild(c),this.hasAttribute("settings")&&a(this)}/**
     * connectedCallback invoked when the element is removed, appended, edited on
     * the DOM tree.
     */connectedCallback(){}// Nothing to do when the component is removed, appended, or edited
/**
     * attributeChangedCallback is a lifecycle method that is invoked
     * whenever attributes listed in observedAttributes static function is
     * updated.
     * @param {string} name the changed attribute
     * @param {string} oldVal old value of the attribute
     * @param {string} newVal new value of the attribute
     */attributeChangedCallback(a,c,d){// Get feed body and slider
const e=this.shadowRoot;var f=e.querySelector("#feed-body"),g=e.querySelector("#col-slider");switch(a){case"cols":// Parse cols to int and assign it to slider's attribute val
var h=parseInt(d,10);g.setAttribute("val",h);for(var j="",k=0;k<h;k++)j+="1fr ";f.style.setProperty("--body-cols",j);break;case"contents":b(f,JSON.parse(d),this.hasAttribute("bootstrap"));}}/**
     * observedAttributes
     * @returns {list} returns a list of observed attributes
     */static get observedAttributes(){return["cols","contents"]}}// Define the new element
window.customElements.define("lan-feed",y);return{LANCoreHello:d,LANButton:h,LANCard:j,LANSlider:r,LANTooltip:u,LANMessageBox:w,LANFeed:y}}();
