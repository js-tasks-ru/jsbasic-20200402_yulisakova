/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  str = str.toUpperCase();
  return (str.includes("1XBET") || str.includes("XXX")) ? true : false;
}
