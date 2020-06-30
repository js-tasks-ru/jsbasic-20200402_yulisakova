export default class StepSlider {
  constructor({ steps, value = 2 }) {
    this.steps = steps;
    this.value = value;
    this.elem = document.createElement("div"); //корневой
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
    this.elem.addEventListener("pointerdown", (event) => this.changeWithDragNDrop(event));
    this.elem.addEventListener("click", (event) => this.changeValue(event));
  }

  changeWithDragNDrop (event) {
    this.elem.addEventListener("dragstart", () => false);
    if (!event.target.closest(".slider__thumb")) {
      return;
    }
    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.style.zIndex = 1000;
    
    this._finishMove = (event) => this.finishMove(event);
    document.addEventListener("pointerup", this._finishMove);
    
    this._mouseMove = (event) => this.mouseMove(event);
    document.addEventListener("pointermove", this._mouseMove);
  }

  mouseMove(event) {
    this.elem.classList.add("slider_dragging");
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    if (leftRelative < 0) {
      leftRelative = 0;
    }
    if (leftRelative > 1) {
      leftRelative = 0;
    }
    let leftPercents = leftRelative * 100; // получила сдвиг в %
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
    this.value = Math.round(leftRelative * (this.steps - 1));
    document.querySelector(".slider__value").innerHTML = this.value;
    // оформляю штришки
    let allSpans = this.elem.querySelectorAll('span[data-id]');
    for (let span of allSpans) {
      span.classList.remove("slider__step-active");
    }
    let spanToChange = allSpans[this.value];
    spanToChange.classList.add("slider__step-active");

  }
  finishMove(event) {

    document.removeEventListener("pointermove", this._mouseMove);
    document.removeEventListener("pointerup", this._finishMove);
    this.elem.classList.remove("slider_dragging");
    
    let myEvent = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(myEvent);
    
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

}