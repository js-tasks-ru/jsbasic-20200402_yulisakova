/**
 * @param {string} str
 * @returns {string}
 * преобразует строки вида 'my-short-string' в 'myShortString'.
 */

function camelize(str) {

  let comaArray = str.split("-");
  
  let camelizedArray = comaArray.map(function(item) {
    return item == comaArray[0] ? item : item[0].toUpperCase() + item.slice(1);
  });

  return camelizedArray.join("");
}
