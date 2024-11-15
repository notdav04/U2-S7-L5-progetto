const url = "https://striveschool-api.herokuapp.com/api/product/";

const createCard = function () {
  fetch(url, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTY2NzhhZDEyOTAwMTU4NzZiZTEiLCJpYXQiOjE3MzE2NjM0NjMsImV4cCI6MTczMjg3MzA2M30.PkM1pH2iN5Rhc0IlOc3X5RB1NLBupyLU0GUoeBUOCbY"
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          `non siamo riusciti a completare la richiesta. Dettagli: ${response.statusText}`
        );
      }
    })
    .then((responseObj) => {
      const spinner = document.getElementById("spinner");
      spinner.classList.add("d-none");
      const cardContainer = document.getElementById("cardContainer");
      cardContainer.innerHTML = "";
      responseObj.forEach((element) => {
        const name = element.name;
        const desc = element.description;
        const brand = element.brand;
        const imgUrl = element.imageUrl;
        const price = element.price;
        const id = element._id;
        const div = document.createElement("div");
        div.classList.add("col-xl-3");
        div.classList.add("col-lg-4");
        div.classList.add("col-sm-6");
        div.classList.add("col-xs-12");
        div.innerHTML = `
            <div class="card mb-4 shadow-sm">
            
                      
                      
              <a href="details.html?name=${name}&desc=${desc}&brand=${brand}&img=${imgUrl}&price=${price}"
              >
                <img
                  src=${imgUrl}
                  class="bd-placeholder-img card-img-top w-100 "
                  style="height:15rem"
                />
              </a
             >
              
              <div class="card-body">
              

                <h5 class="card-title">${name}</h5>
                <h6>${brand}</h6>
                
                <p class="card-text">
                  ${desc}
                </p>
                <div
                  class="d-flex justify-content-between align-items-center"
                >
                  
                    <button
                      id="modBtn"
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                    >
                      Modifica
                    </button>
                    
                  
                  <small class="text-muted">${price}€</small>
                </div>
                <a class="text-decoration-none" href="details.html?name=${name}&desc=${desc}&brand=${brand}&img=${imgUrl}&price=${price}">Scopri di più</a>
              </div>
            </div>
          `;
        cardContainer.appendChild(div);
        const modBtn = div.querySelector("#modBtn");
        modBtn.addEventListener("click", function () {
          window.location.href = `backoffice.html?title=middle&id=${id}&name=${name}&desc=${desc}&brand=${brand}&img=${imgUrl}&price=${price}`;
        });
      });
    });
};

createCard();
