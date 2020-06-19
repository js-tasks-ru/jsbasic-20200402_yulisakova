function toggleText() {
  let button = document.querySelector(".toggle-text-button");

  button.addEventListener("click", function() {
    let text = document.getElementById("text");
    text.hidden = !text.hidden;
  });
}
