/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 * Функция highlight для каждой строки tr таблицы должна сделать следующее:
 */
function highlight(table) {


  for (let row of table.rows) {

    if (row.cells[3].dataset.available === "true") {
      row.classList.add("available");
    } else if (row.cells[3].dataset.available === "false") { 
      row.classList.add("unavailable");
    } else {
      row.hidden = true;
    }

    if (row.cells[2].innerHTML === "m") {
      row.classList.add("male");
    } else { 
      row.classList.add("female"); 
    }

    if (row.cells[1].innerHTML < 18) {
      row.style.textDecoration = "line-through";
    }

  }

}