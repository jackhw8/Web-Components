const showroom = require("showroom/puppeteer")();
let chai = require("chai");
var expect = chai.expect;

const TEST_VAL = "40";
const TEST_MIN = "0";
const TEST_MAX = "97";

const getSliderValue = () => {
  return "value";
};

describe("lan-slider", () => {
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
    await showroom.setTestSubject("lan-slider");
  });

  // basically runs the async function defined, if failed: return error with the
  // test context 'Should have component rendered'. else, test passed.
  it("renders lan-slider with the corresponding val, min, max", async () => {
    await showroom.setAttribute("val", TEST_VAL);
    await showroom.setAttribute("min", TEST_MIN);
    await showroom.setAttribute("max", TEST_MAX);

    const val = await showroom.getAttribute("val");
    const min = await showroom.getAttribute("min");
    const max = await showroom.getAttribute("max");

    expect(val).to.equal(TEST_VAL);
    expect(min).to.equal(TEST_MIN);
    expect(max).to.equal(TEST_MAX);
  });
});
