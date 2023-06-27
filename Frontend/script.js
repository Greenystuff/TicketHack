Date.prototype.toDateInputValue = function () {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};

const todayDate = new Date("dd/mm/yyyy");
document.querySelector("#calandar-input").value = new Date().toDateInputValue();

document.querySelector("#search-btn").addEventListener("click", () => {
  let departureValue = document.querySelector("#departure-input").value;
  let arrivalValue = document.querySelector("#arrival-input").value;
  let dateValue = document.querySelector("#calandar-input").value;
  fetch("http://localhost:3000/trip-search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      departure: departureValue,
      arrival: arrivalValue,
      date: dateValue,
    }),
  })
    .then((data) => data.json())
    .then((trips) => {
      if (!trips.result) {
        document.querySelector("#train-img").src = "images/notfound.png";
        document.querySelector("#desc-trip-txt").textContent =
          "Aucun trajet trouvé...";
      } else {
        document.querySelector("#result-container").innerHTML += `
          <span>Paris > Lyon</span>
          <span>18:48</span>
          <span>53€</span>
          <button class="book-btn">Book</button>`;
      }
    });
});
