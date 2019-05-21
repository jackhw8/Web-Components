const showroom = require("showroom/puppeteer")();
let chai = require("chai");
var expect = chai.expect;

const TEST_SIZE = "medium";
const TEST_SHAPE = "round";
const TEST_TYPE = "info";

describe("lan-button", () => {
  // before testing lan-slider
  before(async () => {
    // start the Puppeteer
    await showroom.start();
  });

  after(async () => {
    // end Puppeteer process
    await showroom.stop();
  });

  // beforeEach runs before it function (see below) runs.
  beforeEach(async () => {
    await showroom.setTestSubject("lan-button");
  });

  it("renders lan-button with the correct button text", async () => {
    // button name was set in .showroom/lan-button.showroom.js
    const innerButtonComponent = await showroom.find("// button");
    const buttonText = await showroom.getTextContent(innerButtonComponent);
    expect(buttonText).to.equal("Button");
  });

  // basically runs the async function defined, if failed: return error with the
  // test context 'Should have component rendered'. else, test passed.
  it("renders lan-button with the correct class", async () => {
    await showroom.setAttribute("size", TEST_SIZE);
    await showroom.setAttribute(TEST_SHAPE);
    await showroom.setAttribute("type", TEST_TYPE);

    const buttonClass = `button.button, button.${TEST_TYPE}, button.${TEST_SHAPE}, button.${TEST_SIZE}`;
    const buttonComponent = await showroom.find(`// ${buttonClass}`);
    expect(buttonComponent).to.not.null;  // if null, it means that there's element with such classes.
  });
});
