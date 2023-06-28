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
        <span id="total-txt">Total : 230 €</span>
        <button id="purchase-btn">Purchase</button>
        </div>`;
      for (let i = 0; i < data.trips.length; i++) {
        document.querySelector('#carts-card').innerHTML +=
          `<div class="carttrip-container">
            <span>${data.trips[i].departure} > ${data.trips[i].arrival}</span>
            <span>${data.trips[i].hour}</span>
            <span>${data.trips[i].price}€</span>
            <button class="delete-trip-btn">X</button>
          </div>`
      }
      let deleteBtn = document.querySelectorAll('.delete-trip-btn');
      for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', () => {
          // Faire la route pour delete un trajet en BDD
        })
      }
    }
  })