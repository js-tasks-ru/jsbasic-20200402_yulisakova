/**
 * Проверяем объект obj на пустоту
 * @param {Object} obj
 * @returns {Boolean}
 */
function isEmpty(obj) {
  for (let prop in obj) {
    return prop in obj ? false : true;
  }
  return true;
}
