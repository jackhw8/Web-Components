const componentStyle = `
  #container {
    position: relative;
    height: 10px;
    padding: 5px 10px;
    z-index: 200;
  }

  #track {
    -webkit-appearance: none;
    width: calc(100% - 20px);
    height: 7px;
    background: lightgrey;
    border: none;
    border-radius: 3px;
    position: absolute;
    margin: auto;
    cursor: ew-resize;
  }
  
  #track:focus {
    outline: none;
  }
  
  #track:hover {
    cursor: pointer;
  }

  #prebar {
    position: relative;
    z-index: 301;
    width: 0;
    background-color: #489fee;
    height: 7px;
    line-height: 6px;
    border-radius: 3px;
    padding: 0px;
    margin: 0px;
    pointer-events: none;
  }

  #tooltip {
    margin-top: -14px;
    margin-left: -10px;
  }

  #thumb {
    -webkit-appearance: none;
    background: white;
    border: 2px solid #00001E;
    border-radius: 20px;
    border-color: #489FEE;
    height: 16px;
    width: 16px;
    margin-top: -14px;
    margin-left: -10px;
    z-index: 400;
    position: relative;
    cursor: grab;
    transition: 0.2s;
    -webkit-transition: 0.2s;
    -moz-transition: 0.2s;
    -o-transition: 0.2s;
  }

  #tooltip {
    display: inline-block;
    background: #303133;
    color: white;
    z-index: 400;
    position: absolute;
    top: -30px;
    border-radius: 4px;
    min-width: 10px;
    line-height: 1.2;
    padding: 10px;
    font-family: "Helvetica Neue", "Helvetica";
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    word-wrap: break-word;
  }

  #popper-arrow {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-top-color: #303133;
    border-style: solid;
    border-width: 6px;
    border-bottom-width: 0px;
    bottom: -6px;
  }
`;

export default componentStyle;