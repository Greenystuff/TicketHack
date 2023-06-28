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
  fetch("https://tickethack-backend-henna.vercel.app/trip-search", {
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
          let hour = data.trips[i].date.split('T')[1].slice(0, 5);
          resultCard.innerHTML += `
          <div class="result-container">
            <span>${data.trips[i].departure} > ${data.trips[i].arrival}</span>
            <span>${hour}</span>
            <span>${data.trips[i].price}€</span>
            <button class="book-btn">Book</button>
          </div>`;
        }
        let bookBtn = document.querySelectorAll('.book-btn');
        for (let i = 0; i < bookBtn.length; i++) {
          let departureValue = bookBtn[i].parentNode.firstElementChild.textContent.split(' ')[0];
          let arrivalValue = bookBtn[i].parentNode.firstElementChild.textContent.split(' ')[2];
          let dateValue = document.querySelector("#calandar-input").value;
          let hourValue = bookBtn[i].parentNode.firstElementChild.nextElementSibling.textContent;
          let priceValue = bookBtn[i].parentNode.firstElementChild.nextElementSibling.nextElementSibling.textContent.slice(0, -1);


          // console.log("Departure : " + departureValue);
          // console.log("Arrival : " + arrivalValue);
          // console.log("Date : " + date);
          // console.log("Heure : " + hourValue);
          // console.log("Prix : " + priceValue);
          bookBtn[i].addEventListener('click', () => {
            fetch("https://tickethack-backend-henna.vercel.app/users/add-trip", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                departure: departureValue,
                arrival: arrivalValue,
                date: dateValue,
                hour: hourValue,
                price: priceValue,
                paid: false
              }),
            }).then(resp => resp.json())
              .then(() => {
                window.location.assign('/Frontend/carts.html')
              })
          })
        }

      }
    });
});
