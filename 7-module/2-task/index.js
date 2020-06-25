import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = document.createElement("div");
    this.elem.classList.add("modal");

    this.overlay = document.createElement("div"); 
    this.overlay.classList.add("modal__overlay");

    this.modalInner = document.createElement("div"); 
    this.modalInner.classList.add("modal__inner");
    this.modalInner.innerHTML = `
      <div class="modal__header">

        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
          Вот сюда нужно добавлять заголовок
        </h3>
      </div>

      <div class="modal__body">
        A сюда нужно добавлять содержимое тела модального окна
      </div>
    `;
  
    this.elem.append(this.overlay);
    this.elem.append(this.modalInner);

    document.body.addEventListener("click", (event) => this.open(event));
    
    document.body.addEventListener("click", (event) => this.closeByX(event));
    document.body.addEventListener("keydown", (event) => this.closeByESC(event));
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add("is-modal-open");
  } 

  setTitle(title) {
    let newTitle = this.elem.querySelector(".modal__title");
    newTitle.innerHTML = title;
  }

  setBody(modalBody) {
    let myBody = this.elem.querySelector(".modal__body");
    myBody.innerHTML = "";
    myBody.append(modalBody);
  }
  
  closeByX(event) {
    if (event.target.closest(".modal__close")) {
      this.close();
    }
  }

  close() {
    this.elem.remove();
    document.body.classList.remove("is-modal-open");
  }

  closeByESC(event) {
    if (event.code === "Escape") {
      this.close();
    }
  }

}
