export const wrapperStyle = `
  .feed-wrapper {
    font-family: "Helvetica Neue", "Helvetica";
    width: calc(100vw - 500px);
    overflow-x: hidden;
    overflow-y: scroll;
    margin: 50px auto;
    padding: 40px;
  }
  
  #feed-setting {
    display: none;
    text-align: center;
    max-width: var(--wrapper-max-width, 700px);
    margin: auto;
    padding-bottom: 30px;
  }

  .feed-body {
    display: grid;
    grid-template-columns: var(--body-cols, 1fr);
  }
`;