const componentStyle = `#backdrop {
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
  #tip{
    font-size:14px;
    color:red;
    margin:0;
  }

  #actions {
    padding: 5px 15px 0;
    display: block;
    text-align: right;
  }

  #actions button {
    margin: 0 0.25rem;
  }
  #inputDiv{
    padding-top: 15px;
  }
  div[id^="inputBox"]{
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
  }
  input{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
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
  `;

export default componentStyle;