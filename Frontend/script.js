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
    .then((data) => {
      const resultCard = document.querySelector("#result-card");
      if (!data.result) {
        resultCard.innerHTML = `
        <img id="train-img" src="images/notfound.png" alt="image de loupe">
        <hr>
        <span id="desc-trip-txt">Aucun trajet trouvé...</span>`
      } else {

        var child = resultCard.lastElementChild;
        while (child) {
          resultCard.removeChild(child);
          child = resultCard.lastElementChild;
        }
        for (let i = 0; i < data.trips.length; i++) {
          resultCard.innerHTML += `
          <div class="result-container">
            <span>${data.trips[i].departure} > ${data.trips[i].arrival}</span>
            <span>18:48</span>
            <span>${data.trips[i].price}€</span>
            <button class="book-btn">Book</button>
          </div>`;
        }
        let bookBtn = document.querySelectorAll('.book-btn');
        for (let i = 0; i < bookBtn.length; i++) {
          let departureValue = bookBtn[i].parentNode.firstElementChild.textContent.split(' ')[0];
          let arrivalValue = bookBtn[i].parentNode.firstElementChild.textContent.split(' ')[2];
          let date = document.querySelector("#calandar-input").value;
          console.log("departure : " + departureValue);
          console.log("arrival : " + arrivalValue);
          console.log("date : " + date);
          bookBtn[i].addEventListener('click', () => {
            fetch("http://localhost:3000/add-trip", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                departure: departureValue,
                arrival: arrivalValue,
                date: dateValue,
              }),
            }).then(resp => resp.json())
              .then(data => {

              })
          })
        }

      }
    });
});
