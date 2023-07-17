let pop = document.getElementById("pop");
let tableBody = document.querySelector("tbody");
let tableRow = tableBody.querySelectorAll("tr");
let tableData = tableBody.querySelectorAll("td");
let closeBtn = document.querySelector(".fa-xmark");

tableData.forEach((el) => {
  el.addEventListener("click", () => {
    pop.classList.add("on");
  });
});

closeBtn.addEventListener("click", () => {
  pop.classList.remove("on");
});
