const showroom = require('showroom/puppeteer')();
//const assert = require('assert');
let chai = require('chai');

const TESTER = "ShowroomTester";
var expect = chai.expect;

describe('hello-world', () => {
  // before testing hello-world
  before( async () => {
    // start the Puppeteer
    await showroom.start()
  })

  after( async () => {
    // end Puppeteer process
    await showroom.stop()
  })

  // beforeEach runs before it function (see below) runs.
  beforeEach( async () => {
    await showroom.setTestSubject('hello-world')
  });

  // it -> pretty fancy function name huh
  // basically run the async function defined, if fails: return error with the
  // test context 'Should have component rendered'. else, test passed.
  it('Should have component rendered', async () => {
    await showroom.setAttribute('username', TESTER)
    const paragraph = await showroom.find('// p');
    const text = await showroom.getTextContent(paragraph);

    //assert.equal(text, `Hello ${TESTER}!`);
    //done();
    expect(text).to.equal(`Hello ${TESTER}!`);
  })

  // add more it(s) function(s) here!!
  // it("blablabla", async() => { // beautiful testing code below})
})