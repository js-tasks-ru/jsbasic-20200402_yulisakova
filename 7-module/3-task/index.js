export default class StepSlider {
  constructor({ steps, value = 2 }) {
    this.steps = steps;
    this.value = value;

    this.elem = document.createElement("div");
    this.elem.classList.add("slider");
    this.elem.innerHTML = `
      <div class="slider__thumb" style="left: 50%;">
        <span class="slider__value">${this.value}</span>
      </div>

      <div class="slider__progress" style="width: 50%;"></div>
    `;
    
    this.sliderSteps = document.createElement("div");
    this.sliderSteps.classList.add("slider__steps");

    for (let i = 0; i < steps; i++) {
      let span = document.createElement("span");
      span.dataset.id = `${i}`;
      if (i === 0) {
        span.classList.add("slider__step-active");
      }
      this.sliderSteps.append(span);
    }

    this.elem.append(this.sliderSteps);
    
    // ПОЧЕМУ ОНИ НЕ РАБОТАЮТ????
    //let sliderClientWidth = this.elem.offsetWidth;
    //console.log(sliderClientWidth);

    //let sliderWidth = this.sliderSteps.offsetWidth;
    //console.log(sliderWidth);

    //let coords = this.elem.getBoundingClientRect().left;
    //console.log(coords);
    
    this.elem.addEventListener("click", (event) => this.changeValue(event));

  } 

  changeValue(event) {

    let distance = event.clientX - this.sliderSteps.getBoundingClientRect().left;
    let shareOfDictance = distance / this.sliderSteps.offsetWidth; // % от всего бара

    this.value = Math.round(shareOfDictance * (this.steps - 1)); // % от числа(4) в численном
   
    let myEvent = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(myEvent);

    // изменяю внешний вид слайдера по новому значению
    document.querySelector(".slider__value").innerHTML = this.value; 

    let allSpans = this.elem.querySelectorAll('span[data-id]');
    
    for (let span of allSpans) {
      span.classList.remove("slider__step-active");
    }

    let spanToChange = allSpans[this.value];
    spanToChange.classList.add("slider__step-active");

 
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    let leftPercents = this.value / (this.steps - 1) * 100;
    
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
  }

} 
