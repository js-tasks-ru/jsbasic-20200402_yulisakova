/**
 * @param {string} str
 * @returns {string}
 * преобразует строки вида 'my-short-string' в 'myShortString'.
 */
"use strict";

function camelize(str) {
  /* if (str[0] === "-") {
    str = str.slice(1);
  } */
  str = str.split("-"); // разбиваю на массив 
  
  for (let i = 0; i < str.length; i++) { //заглавные буквы эл-тов массива
    str[i] = str[i][0].toUpperCase() + str[i].slice(1); 
  }

  return str = str.join("");

}
