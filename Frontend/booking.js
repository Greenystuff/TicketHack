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
      }
      data.trips.sort((x, y) => {
        x = new Date(x.date),
          y = new Date(y.date);
        return x - y;
      });
      console.log(data.trips);
      for (let i = 0; i < data.trips.length; i++) {
        const nowDate = new Date();
        let tripDate = new Date(data.trips[i].date);
        tripDate.setHours(tripDate.getHours() - 2);
        if (tripDate <= nowDate) {
          tripsContainer.innerHTML +=
            `<div class="booktrip-container">
              <span class="trip-column">${data.trips[i].departure} > ${data.trips[i].arrival}</span>
              <span class="time-column">${data.trips[i].hour}</span>
              <span class="price-column">${data.trips[i].price}€</span>
              <span class="delai-column">Travel passed</span>
            </div>`
        } else {

          let delai = new Date(tripDate - nowDate);
          tripsContainer.innerHTML +=
            `<div class="booktrip-container">
              <span class="trip-column">${data.trips[i].departure} > ${data.trips[i].arrival}</span>
              <span class="time-column">${data.trips[i].hour}</span>
              <span class="price-column">${data.trips[i].price}€</span>
              <span class="delai-column">Departure in ${delai.getHours()} hours</span>
            </div>`
        }
      }
      tripsContainer.innerHTML += `
      <hr>
      <p>Enjoy yout travel with TicketHack</p>`
    }
  })