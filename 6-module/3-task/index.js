import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.counter = 0;
    this.elem = document.createElement('div');
    this.elem.classList.add("carousel");
    this.elem.innerHTML = `
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left" style="display: none">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
    `;

    this.carouselInner = document.createElement('div');
    this.carouselInner.classList.add('carousel__inner');
    
    this.createSlides(slides);

    this.elem.append(this.carouselInner); // вставка в корневой эл

    this.elem.addEventListener("click", (event) => this.addProduct(event));
    this.elem.addEventListener("click", (event) => this.changeSlide(event));
  }

  createSlides(slides) {
      
    let numOfSlides = slides.length;
    
    for (let i = 0; i < numOfSlides; i++) {
      
      let foodTitle = slides[i].name;
      let imgPath = "/assets/images/carousel/" + slides[i].image;
      let price = `€${slides[i].price.toFixed(2)}`;
      let foodID = slides[i].id;
      
      // вверстку слайда сделала
      let mySlide = document.createElement("div");
      mySlide.classList.add("carousel__slide");
      mySlide.dataset.id = foodID;  
      
      mySlide.innerHTML = `
        <img src="${imgPath}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">${price}</span>
          <div class="carousel__title">${foodTitle}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      `;

      this.carouselInner.append(mySlide); // works!!!

    }
       
  }

  addProduct(event) {
    if (event.target.closest(".carousel__button")) {
      let slide = event.target.closest(".carousel__slide").dataset;
      console.log(slide); // вроде да..

      let myEvent = new CustomEvent("product-add", {
        detail: slide.id,
        bubbles: true
      });
      this.elem.dispatchEvent(myEvent);
    }
  }

  changeSlide(event) {
    
    let slidesAmount = document.querySelectorAll(".carousel__slide").length;
    let slideLine = document.querySelector(".carousel__inner");
    let slideWidth = document.querySelector(".carousel__slide").offsetWidth;
    let arrowLeft = document.querySelector(".carousel__arrow_left");
    let arrowRight = document.querySelector(".carousel__arrow_right");

    if (event.target.closest(".carousel__arrow_right")) {
      this.counter++;
      slideLine.style.transform = `translateX(-${slideWidth * this.counter}px)`;
    }

    if (event.target.closest(".carousel__arrow_left")) {
      this.counter--;
      slideLine.style.transform = `translateX(-${slideWidth * this.counter}px)`;
    }

    if (this.counter > 0) {
      arrowLeft.style.display = "";
    } else if (this.counter === 0) {
      arrowLeft.style.display = "none";
    } 

    if (this.counter === slidesAmount - 1) {
      arrowRight.style.display = "none";
    } else if (this.counter < slidesAmount - 1) {
      arrowRight.style.display = "";
    }
  }
  
}
