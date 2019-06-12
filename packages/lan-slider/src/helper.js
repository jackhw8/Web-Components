/**
 * calculateMin is a helper function to calculate the proper value of
 * attribute min
 *
 * @param {number} min
 *
 * @return {number} the proper value of attribute min
 */
export let calculateMin = min => {
  const intMin = parseInt(min);
  if (Number.isInteger(intMin)) {
    return intMin < 0 ? 0 : intMin;
  } else {
    return 0;
  }
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
  const intMax = parseInt(max);
  if (Number.isInteger(intMax)) {
    return intMax <= 0 ? 100 : intMax;
  } else {
    return 0;
  }
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
  const intVal = parseInt(val);
  if (Number.isInteger(intVal)) {
    return intVal < 0 ||
      intVal > calculateMax(max) ||
      intVal < calculateMin(min)
      ? calculateMin(min) + (calculateMax(max) - calculateMin(min)) / 2
      : intVal;
  } else {
    return calculateMin(min) + (calculateMax(max) - calculateMin(min)) / 2;
  }
};

/**
 * calculateThumbPosition is a helper function to calculate the horizontal position
 * of the thumb and the width of prebar
 *
 * @param {number} val
 * @param {number} max
 * @param {number} min
 *
 * @return {number} the left position percentage for the slider thumb
 */
export let calculateThumbPosition = (val, max, min) => {
  const range = max - min;
  return (val / range) * 100;
};

/**
 * calculateTooltipPosition is a helper function to calculate the horizontal position
 * of the tooltip
 *
 * @param {number} thumbPosition
 * @param {number} trackWidth
 * @param {number} offset
 *
 * @return {number} the left position (in pixel, not percentage) for the tooltip
 */
export let calculateTooltipPosition = (thumbPosition, trackWidth, offset) => {
  return thumbPosition * trackWidth / 100 + offset;
};
