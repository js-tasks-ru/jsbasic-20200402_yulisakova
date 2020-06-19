function initCarousel() {
  
  let container = document.querySelector(".container");
  let arrowRight = document.querySelector(".carousel__arrow_right");
  let arrowLeft = document.querySelector(".carousel__arrow_left");

  let slideLine = document.querySelector(".carousel__inner");
  let slideWidth = document.querySelector(".carousel__slide").offsetWidth; 
  let imageAmount = document.querySelectorAll(".carousel__slide").length - 1;

  let counter = 0;
  arrowLeft.style.display = "none";

 
  container.addEventListener("click", handler);

  function handler(event) {

    if (event.target.closest(".carousel__arrow_right")) {
      counter++;
      slideLine.style.transform = `translateX(-${slideWidth * counter}px)`;
    }
    
    if (event.target.closest(".carousel__arrow_left")) {
      counter--;
      slideLine.style.transform = `translateX(-${slideWidth * counter}px)`;
    }

    if (counter > 0) {
      arrowLeft.style.display = "";
    } else if (counter === 0) {
      arrowLeft.style.display = "none";
    } 
    
    if (counter === imageAmount) {
      arrowRight.style.display = "none";
    } else if (counter < imageAmount) {
      arrowRight.style.display = "";
    }
  }
}

initCarousel();