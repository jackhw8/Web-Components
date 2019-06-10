export const wrapperStyle = `
  .feed-wrapper {
    max-width: var(--wrapper-max-width, 700px);
    max-height: var(--wrapper-max-height, 1000px);
    overflow: scroll;
    margin: auto;
    padding: 20px;
  }

  .feed-body {
    display: grid;
    grid-template-columns: var(--body-cols, 1fr);
  }
`;