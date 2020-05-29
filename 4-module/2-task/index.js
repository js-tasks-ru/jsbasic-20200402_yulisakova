/**
 * @param {HTMLTableElement} table
 * @return {void}
 */
function makeDiagonalRed(table) {
     
    let rowNumber = table.rows.length;

    for (let i = 0; i < rowNumber; i++) {
        table.rows[i].cells[i].style.backgroundColor = "red";
    }
}
