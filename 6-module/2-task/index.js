import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.elem = document.createElement("div");
    this.elem.classList.add("card");

    this.product = product;
    this.imgPath = "/assets/images/products/" + product.image;
    this.price = `€${product.price.toFixed(2)}`;

    let cardTop = document.createElement("div");
    cardTop.classList.add("card__top");
    cardTop.innerHTML = `
      <img src="${this.imgPath}" class="card__image" alt="product">
      <span class="card__price">${this.price}</span>
    `;

    let cardBody = document.createElement("div");
    cardBody.classList.add("card__body");
    cardBody.innerHTML = `
      <div class="card__title">${product.name}</div>
      <button type="button" class="card__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    `;
    
    this.elem.append(cardTop);
    this.elem.append(cardBody);

    this.elem.addEventListener("click", (event) => this.ifClicked(event));
  }

  ifClicked(event) {
    
    if (event.target.closest(".card__button")) {
      
      let button = document.querySelector(".card__button");

      let myEvent = new CustomEvent("product-add", {
        detail: this.product.id,
        bubbles: true
      });
      
      button.dispatchEvent(myEvent);
    }

  }


}

