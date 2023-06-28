fetch('http://localhost:3000/users/trips')
  .then(response => response.json())
  .then(data => {
    const cardContainer = document.querySelector('#cartsContainer');
    if (data.trips.length === 0) {
      cardContainer.innerHTML =
        `<div id="carts-card-nb">
          <span class="nobooking-txt">No booking yet</span>
          <span class="nobooking-txt">Why not plan a trip ?</span>
        </div>`;
    } else {
      cardContainer.innerHTML =
        `<div id="carts-card">
          <h3 id="cart-title">My cart</h3>
        </div>
        <div id="total-field">
        <span id="total-txt"></span>
        <button id="purchase-btn">Purchase</button>
        </div>`;
      let total = 0;
      for (let i = 0; i < data.trips.length; i++) {
        data.trips[i].date = data.trips[i].date.replace('T00:00', 'T' + data.trips[i].hour)
      }
      data.trips.sort((x, y) => {
        x = new Date(x.date),
          y = new Date(y.date);
        return x - y;
      });
      for (let i = 0; i < data.trips.length; i++) {
        console.log("Dates du trajet : " + data.trips[i].date)
        total += data.trips[i].price;
        document.querySelector('#carts-card').innerHTML +=
          `<div class="carttrip-container">
            <span class="trip-column">${data.trips[i].departure} > ${data.trips[i].arrival}</span>
            <span class="hour-column">${data.trips[i].hour}</span>
            <span class="price-column">${data.trips[i].price}€</span>
            <button class="delete-trip-btn">X</button>
            <span class="trip-id">${data.trips[i]._id}</span>
          </div>`
      }
      document.querySelector('#total-txt').textContent = "Total : " + total + " €"

      let deleteBtn = document.querySelectorAll('.delete-trip-btn');
      for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', () => {
          let _id = deleteBtn[i].parentNode.lastElementChild.textContent;
          console.log("Id relevé : " + _id)
          fetch(`http://localhost:3000/users/trips`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              _id
            })
          }).then(resp => resp.json())
            .then(() => {
              deleteBtn[i].parentNode.remove();
              let actualPrice = deleteBtn[i].parentNode.firstElementChild.nextElementSibling.nextElementSibling.textContent.slice(0, -1);
              total -= actualPrice;
              document.querySelector('#total-txt').textContent = "Total : " + total + " €"
              let container = document.querySelectorAll('#carttrip-container');
              if (container.length === 0) {
                cardContainer.innerHTML =
                  `<div id="carts-card-nb">
                    <span class="nobooking-txt">No booking yet</span>
                    <span class="nobooking-txt">Why not plan a trip ?</span>
                  </div>`;
              }
            })
        })
      }
      document.querySelector('#purchase-btn').addEventListener('click', () => {
        fetch('http://localhost:3000/users/trips', {
          method: "PATCH",
          headers: { "Content-Type": "application/json" }
        }).then(resp => resp.json())
          .then(() => window.location.assign('/Frontend/bookings.html'))
      })
    }
  })