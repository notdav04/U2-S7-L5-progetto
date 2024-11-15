const url = "https://striveschool-api.herokuapp.com/api/product/";
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTY2NzhhZDEyOTAwMTU4NzZiZTEiLCJpYXQiOjE3MzE2NjM0NjMsImV4cCI6MTczMjg3MzA2M30.PkM1pH2iN5Rhc0IlOc3X5RB1NLBupyLU0GUoeBUOCbY";
const urlparams = new URLSearchParams(window.location.search);
const title = urlparams.get("title");
const id = urlparams.get("id");
const addSection = document.getElementById("add_section");
const middleSection = document.getElementById("middle_section");
const modSection = document.getElementById("mod_section");
const removeSection = document.getElementById("remove_section");
if (title === "add") {
  modSection.classList.add("d-none");
  removeSection.classList.add("d-none");
  middleSection.classList.add("d-none");
} else if (title === "middle") {
  addSection.classList.add("d-none");
  modSection.classList.add("d-none");
  removeSection.classList.add("d-none");
}

const formAdd = document.querySelector("#form_add");
formAdd.onsubmit = function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const desc = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const img = document.getElementById("img").value;
  const price = document.getElementById("price").value;
  const newProduct = {
    name: name,
    description: desc,
    brand: brand,
    imageUrl: img,
    price: price
  };
  fetch(url, {
    method: "POST",
    headers: {
      authorization: key,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newProduct) // Converti i dati in formato JSON
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`errore: ${response.statusText}`);
      }
    })
    .catch((err) => console.log(err));
  formAdd.reset();
};

const formMod = document.getElementById("form_mod");
formMod.onsubmit = function (e) {
  e.preventDefault();
  const newUrl = url + id;
  const name = document.getElementById("name_mod").value;
  const desc = document.getElementById("description_mod").value;
  const brand = document.getElementById("brand_mod").value;
  const img = document.getElementById("img_mod").value;
  const price = document.getElementById("price_mod").value;
  const newProduct = {
    name: name,
    description: desc,
    brand: brand,
    imageUrl: img,
    price: price
  };

  fetch(newUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: key
    },
    body: JSON.stringify(newProduct)
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`errore: ${response.statusText}`);
      }
    })
    .catch((err) => {
      console.error("Errore durante la PUT request:", err);
    });
  formMod.reset();

  fetch(newUrl, {
    method: "GET",
    headers: {
      authorization: key
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`errore: ${response.statusText}`);
      }
    })
    .then((responseobj) => {
      const name = document.getElementById("name_mod");
      const desc = document.getElementById("description_mod");
      const brand = document.getElementById("brand_mod");
      const img = document.getElementById("img_mod");
      const price = document.getElementById("price_mod");
      name.value = responseobj.name;
      desc.value = responseobj.description;
      brand.value = responseobj.brand;
      img.value = responseobj.imageUrl;
      price.value = responseobj.price;
    })
    .catch((err) => console.log(err));
};

const resetModBtn = document.getElementById("formModReset");
resetModBtn.onclick = function () {
  formMod.reset();
  const newUrl = url + id;
  fetch(newUrl, {
    method: "GET",
    headers: {
      authorization: key
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`errore: ${response.statusText}`);
      }
    })
    .then((responseobj) => {
      const name = document.getElementById("name_mod");
      const desc = document.getElementById("description_mod");
      const brand = document.getElementById("brand_mod");
      const img = document.getElementById("img_mod");
      const price = document.getElementById("price_mod");
      name.value = responseobj.name;
      desc.value = responseobj.description;
      brand.value = responseobj.brand;
      img.value = responseobj.imageUrl;
      price.value = responseobj.price;
    })
    .catch((err) => console.log(err));
};

const formRemove = document.getElementById("form_remove");
formRemove.onsubmit = function (e) {
  e.preventDefault();
  const conferma = document.getElementById("conferma").value;
  if (conferma == "CONFERMO") {
    const newUrl = url + id;
    fetch(newUrl, {
      method: "DELETE",
      headers: {
        authorization: key
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`errore: ${response.statusText}`);
        }
      })
      .catch((err) => console.log(err));
  } else {
    console.log(conferma);
    const alert = document.createElement("p");
    alert.innerText =
      "! riempi correttamente il campo richiesto per rimuovere l elemento";
    alert.classList.add("text-danger");
    formRemove.appendChild(alert);
  }
};

const resetAddBtn = document.getElementById("formAddReset");
resetAddBtn.onclick = function () {
  formAdd.reset();
};

const deleteBtn = document.getElementById("deleteBtn");
const modBtn = document.getElementById("modBtn");

deleteBtn.onclick = function () {
  middleSection.classList.add("d-none");
  removeSection.classList.remove("d-none");
};
modBtn.onclick = function () {
  middleSection.classList.add("d-none");
  modSection.classList.remove("d-none");
  const newUrl = url + id;
  console.log(newUrl);
  fetch(newUrl, {
    method: "GET",
    headers: {
      authorization: key
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`errore: ${response.statusText}`);
      }
    })
    .then((responseobj) => {
      const name = document.getElementById("name_mod");
      const desc = document.getElementById("description_mod");
      const brand = document.getElementById("brand_mod");
      const img = document.getElementById("img_mod");
      const price = document.getElementById("price_mod");
      name.value = responseobj.name;
      desc.value = responseobj.description;
      brand.value = responseobj.brand;
      img.value = responseobj.imageUrl;
      price.value = responseobj.price;
    })
    .catch((err) => console.log(err));
};
