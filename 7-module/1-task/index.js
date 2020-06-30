import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.elem = document.createElement("div"); // корневой контейнер
    this.elem.classList.add("ribbon");
    
    this.numOfCategories = categories.length;

    this.arrowLeft = document.createElement("button");
    this.arrowLeft.className = `ribbon__arrow ribbon__arrow_left ribbon__arrow_visible`;
    this.arrowLeft.innerHTML = `<img src="/assets/images/icons/angle-icon.svg" alt="icon">`;

    this.ribbonInner = document.createElement("nav");
    this.ribbonInner.classList.add("ribbon__inner");

    for (let i = 0; i < this.numOfCategories; i++) {
      let a = document.createElement("a"); 
      a.href = "#";
      a.classList.add("ribbon__item");
      a.dataset.id = this.categories[i].id;
      a.innerHTML = `${this.categories[i].name}`;

      if (i === 0) {
        a.classList.add("ribbon__item_active");
      }

      this.ribbonInner.append(a);
    }


    this.arrowRight = document.createElement("button");
    this.arrowRight.className = `ribbon__arrow ribbon__arrow_right ribbon__arrow_visible`;
    this.arrowRight.innerHTML = `<img src="/assets/images/icons/angle-icon.svg" alt="icon">`;


    this.elem.append(this.arrowLeft);
    this.elem.append(this.ribbonInner);
    this.elem.append(this.arrowRight);

    this.elem.addEventListener("click", (event) => this.horizScroll(event));
    this.elem.addEventListener("click", (event) => this.pickCategory(event));

  }

  horizScroll(event) {

    if (this.ribbonInner.scrollLeft !== 0) {
      this.arrowLeft.classList.add("ribbon__arrow_visible");
    } else {
      this.arrowLeft.classList.remove("ribbon__arrow_visible");
    }
    
    if (this.ribbonInner.scrollWidth - this.ribbonInner.scrollLeft - this.ribbonInner.clientWidth < 350) {
      this.arrowRight.classList.remove("ribbon__arrow_visible");
    } else {
      this.arrowRight.classList.add("ribbon__arrow_visible");
    }

    if (event.target.closest(".ribbon__arrow_right")) { // вперед
      this.ribbonInner.scrollBy(350, 0);
    }

    if (event.target.closest(".ribbon__arrow_left")) { // назад
      this.ribbonInner.scrollBy(-350, 0);
    }

  }

  pickCategory(event) {
    let clickedA = event.target.closest(".ribbon__item");

    if (clickedA) {
      event.preventDefault();
      

      let allA = document.body.querySelectorAll(".ribbon__item");
      for (let anyA of allA) {
        anyA.classList.remove("ribbon__item_active");
      }
      clickedA.classList.add("ribbon__item_active");


      let category = event.target.closest(".ribbon__item").dataset;
      
      let myEvent = new CustomEvent("ribbon-select", {
        detail: category.id,
        bubbles: true
      });
      this.elem.dispatchEvent(myEvent);
  
    }
  }

} //close whole class
