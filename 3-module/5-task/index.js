/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные 
 * '1, -5.8 или 10, хотя 34 + -5.3 и 73'
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  str = str.split(",");
  str = str.join(" ");
  str = str.split(" ");
  
  let arrayOfNumbers = [];
  for (let i = 0; i < str.length; i++) {
    if (parseInt(str[i])) {
      arrayOfNumbers.push(+str[i]);
    } else if (parseFloat(str[i])) {
      arrayOfNumbers.push(+str[i]);
    }
  }

  let maxOfArray = arrayOfNumbers.reduce(function(max, currentItem) {
    return max > currentItem ? max : currentItem;  
  });

  let minOfArray = arrayOfNumbers.reduce(function(min, currentItem) {
    return min < currentItem ? min : currentItem;
  });

  let result = {  
    min: minOfArray,
    max: maxOfArray,
  };
  
  return result;

}
