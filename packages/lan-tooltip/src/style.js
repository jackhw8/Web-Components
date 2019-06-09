const componentStyle = `
  .tooltip-left {
      position: relative;
      display: inline-block;
  }

  .tooltip-left .tooltiptext {
      visibility: hidden;
      width: 120px;
      background-color: black;
      color: #fff;
      text-align: center;
      border: 1px solid black;
      border-radius: 6px;
      padding: 5px 0;
      position: absolute;
      z-index: 1;
      top: 5px;
      right: 110%;

  }

  .arrow-left .tooltiptext::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 100%;
      margin-top: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent transparent black;
  }

  .tooltip-right {
      position: relative;
      display: inline-block;
  }

  .tooltip-right .tooltiptext {
      visibility: hidden;
      width: 120px;
      background-color: black;
      color: #fff;
      text-align: center;
      border: 1px solid black;
      border-radius: 6px;
      padding: 5px 0;
      position: absolute;
      z-index: 1;
      top: 5px;
      left: 110%;

  }

  .arrow-right .tooltiptext::after {
      content: "";
      position: absolute;
      top: 50%;
      right: 100%;
      margin-top: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent black transparent transparent;
  }

  .tooltip-top {
      position: relative;
      display: inline-block;
  }

  .tooltip-top .tooltiptext {
      visibility: hidden;
      width: 120px;
      background-color: black;
      color: #fff;
      text-align: center;
      border: 1px solid black;
      border-radius: 6px;
      padding: 5px 0;
      position: absolute;
      z-index: 1;
      bottom: 125%;
      left: 50%;
      margin-left: -60px;
  }

  .arrow-top .tooltiptext::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: black transparent transparent transparent;
  }

  .tooltip-bottom {
      position: relative;
      display: inline-block;
  }

  .tooltip-bottom .tooltiptext {
      visibility: hidden;
      width: 120px;
      background-color: black;
      color: #fff;
      text-align: center;
      border: 1px solid black;
      border-radius: 6px;
      padding: 5px 0;
      position: absolute;
      z-index: 1;
      top: 125%;
      left: 50%;
      margin-left: -60px;
  }

  .arrow-bottom .tooltiptext::after {
      content: "";
      position: absolute;
      bottom: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent black transparent;
  }
`;

export default componentStyle;