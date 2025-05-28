// Part sign_up


const checkbox = document.getElementById("identity-checkbox");
const wrapper = document.getElementById("identity-wrapper");

checkbox.addEventListener("change", function () {
  if (this.checked) {
    wrapper.classList.remove("max-h-0");
    wrapper.classList.add("max-h-40"); 
  } else {
    wrapper.classList.remove("max-h-40");
    wrapper.classList.add("max-h-0");
  }
});
