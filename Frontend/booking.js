fetch('http://localhost:3000/users/trips-purchased')
  .then(resp => resp.json())
  .then(data => {
    const tripsContainer = document.querySelector('#bookings-card');
    if (data.trips.length === 0) {
      tripsContainer.innerHTML =
        `<h3 id="book-title">No booking yet</h3>`;
    } else {
      tripsContainer.innerHTML = `
      <h3 id="book-title">My Bookings</h3>`
      for (let i = 0; i < data.trips.length; i++) {
        data.trips[i].date = data.trips[i].date.replace('T00:00', 'T' + data.trips[i].hour)
        const nowDate = new Date();
        let tripDate = new Date(data.trips[i].date);
        tripDate.setHours(tripDate.getHours() - 2);
        let delai = new Date(tripDate - nowDate);
        tripsContainer.innerHTML +=
          `<div class="booktrip-container">
            <span>${data.trips[i].departure} > ${data.trips[i].arrival}</span>
            <span>${data.trips[i].hour}</span>
            <span>${data.trips[i].price}€</span>
            <span>Departure in ${delai.getHours()} hours</span>
          </div>`
      }
      tripsContainer.innerHTML += `
      <hr>
      <p>Enjoy yout travel with TicketHack</p>`
    }
  })