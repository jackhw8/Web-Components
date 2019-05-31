import { Selector } from 'testcafe'; // first import testcafe selectors

// eslint-disable-next-line no-undef
fixture `Getting Started`// declare the fixture
    .page `../index.html`;  // specify the start page

//then create a test and place your code there
test('Should slide', async t => {

   // This test will work fine as shadow DOM is already in the viewport
   const slider = await Selector('lan-slider');
   
   const sliderThumb = await Selector(() => document.querySelector('lan-slider').shadowRoot.querySelector('input').querySelector('#slider-thumb'));

   await t
     .click(sliderThumb)
     .expect(slider.value).eql('0');
});