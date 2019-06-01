/**
 * calculateMin is a helper function to calculate the proper value of
 * attribute min
 * 
 * @param {number} min 
 * 
 * @return {number} the proper value of attribute min
 */
export let calculateMin = min => {
  return min ? parseInt(min) : 0;
};


/**
 * calculateMax is a helper function to calculate the proper value of
 * attribute max
 * 
 * @param {number} max 
 * 
 * @return {number} the proper value of attribute max
 */
export let calculateMax = max => {
  return max ? parseInt(max) : 100;
};


/**
 * calculateVal is a helper function to calculate the proper value of
 * attribute val
 * 
 * @param {number} val 
 * @param {number} max 
 * @param {number} min 
 * 
 * @return {number} the proper value of attribute val
 */
export let calculateVal = (val, max, min) => {
  return val && val <= calculateMax(max) && val >= calculateMin(min)
    ? parseInt(val)
    : calculateMin(min) + (calculateMax(max) - calculateMin(min)) / 2;
};


/**
 * calculateThumbPosition is a helper function to calculate the horizontal position
 * of the tooltip
 * 
 * @param {number} val 
 * @param {number} max 
 * @param {number} min 
 * 
 * @return {number} the left position percentage for the slider thumb
 */
export let calculateThumbPosition = (val, max, min) => {
  const THUMB_SIZE = 20
  const range = max - min;
  return (val / range - THUMB_SIZE / window.innerWidth) * 100;
};


/**
 * calculateTooltipPosition is a helper function to calculate the horizontal position
 * of the tooltip
 * 
 * @param {number} val 
 * @param {number} max 
 * @param {number} min 
 * 
 * @return {number} the left position percentage for the tooltip
 */
export let calculateTooltipPosition = (val, max, min) => {
  var range = max - min;
  var offset = 1 - (range - parseInt(val, 10))/range;
  var position = ((1 * (parseInt(val, 10) - parseInt(min, 10))) - offset)/ range;
  return position * 100;
};


/**
 * calculateWidth is a helper function to calculates the width of 
 * the width of the progress bar.
 * 
 * @param {number} val 
 * @param {number} min 
 * @param {number} range 
 * 
 * @return {number} the percentage for the progress bar width
 */
export let calculateWidth = (val, min, range) => {
  var offset = ((parseInt(val, 10) - range)*0.5)/range;
  var width = (1 * (parseInt(val, 10) - parseInt(min, 10)) - offset) / range;
  return width * 100;
}


/**
 * onMouseOutCallback is a callback function that should be called
 * whenever the mouse is out of the slider.
 * 
 * @param {object} tooltipObject
 */
export let onMouseOutCallback = tooltipObject => tooltipObject.style.opacity = '0';


/**
 * onMouseMoveCallback is a callback function that should be called
 * whenever the mouse is hovering of the slider.
 * 
 * @param {event} event
 * @param {class} lanSliderClass
 * @param {object} inputSliderObject
 * @param {object} tooltipObject
 */
export let onMouseMoveCallback = (event, lanSliderClass, inputSliderObject, tooltipObject) => {
  const currMin = calculateMin(lanSliderClass.getAttribute("min"));
  const currMax = calculateMax(lanSliderClass.getAttribute("max"));
  const thumbOffset = -2;
  const thumbSize = 20;
  const thumbPosition = calculateThumbPosition(inputSliderObject.value, currMax, currMin) * window.innerWidth / 100;
  const thumbLeftBound = thumbPosition - thumbOffset;
  const thumbRightBound = thumbPosition - thumbOffset + thumbSize;
  const dragOffset = 30;
  tooltipObject.style.opacity = '1';
  if (event.clientX < (thumbLeftBound - dragOffset) || event.clientX > (thumbRightBound + dragOffset)) {
    tooltipObject.style.opacity = '0';
  } 
};


/**
 * onInputCallback is a callback function that should be called
 * whenever the slider receives input, which in this context is when
 * slider's value changes.
 * 
 * @param {class} lanSliderClass
 * @param {object} inputSliderObject
 * @param {object} tooltipObject
 */
export let onInputCallback = (lanSliderClass, inputSliderObject, tooltipObject) => {
  // Update the attribute val
  lanSliderClass.setAttribute("val", inputSliderObject.value);

  // Update the inner HTML of the tooltip accordingly, and show it
  const currMin = calculateMin(lanSliderClass.getAttribute("min"));
  const currMax = calculateMax(lanSliderClass.getAttribute("max"));
  tooltipObject.style.opacity = '1';
  tooltipObject.style.left = `${calculateTooltipPosition(inputSliderObject.value, currMax, currMin)}%`;
};
