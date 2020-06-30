
export default class UserTable {
  
  constructor(array) {
    
    this.elem = document.createElement("table");
    
    this.thead = document.createElement("thead");
    this.elem.append(this.thead);

    this.tbody = document.createElement("tbody");
    this.elem.append(this.tbody);

    let headers = [];//массив названий ENG заголовков
    for (let prop in array[0]) {
      headers.push(prop);
    }
    this.headers = headers;
    
    let rusHeaders = []; //массив названий RUS заголовков
    for (let prop in array[0]) {
      switch (prop) {
      case "name":
        prop = "Имя";
        break;
      case "age":
        prop = "Возраст";
        break;
      case "salary":
        prop = "Зарплата";
        break;
      case "city":
        prop = "Город";
        break;
      }
      rusHeaders.push(prop);
    }
    this.rusHeaders = rusHeaders;

    this.columnsNumber = headers.length + 1; // +1 на крестик удалить
    this.rowsNumber = array.length;
    
    this.createHeaders();
    this.createTableBody(array);
    
    this.elem.addEventListener("click", this.ifClicked);

  }    
  
  // метод создаю строку заголовков
  createHeaders() {
    let headersRow = document.createElement("tr");
    for (let k = 0; k < this.columnsNumber - 1; k++) {
      let td = document.createElement('td');
      td.innerHTML = this.rusHeaders[k];
      headersRow.append(td);
    }
    
    let lastTD = document.createElement("td");
    headersRow.append(lastTD);
    
    this.thead.append(headersRow);
  }
    
  //метод создаю тело таблицы
  createTableBody(array) {
    for (let i = 0; i < this.rowsNumber; i++) {
      let tr = document.createElement("tr");
      this.tbody.append(tr);
        
      let currentObj = array[i]; // из какого объекта вставлять в строку

      for (let j = 0; j < this.columnsNumber; j++) {
        let td = document.createElement("td");
        let header = this.headers[j]; 
        td.innerHTML = currentObj[header];
        tr.append(td);

        if (j === (this.columnsNumber - 1)) { // засунуть крестик в последний столбик
          td.innerHTML = "<button class='pressed'> X </button>";
        }
      }
    }
  }
 
  ifClicked(event) {
    if (event.target.classList.contains("pressed")) {
      event.target.closest("tr").remove();
    }
  }

}

