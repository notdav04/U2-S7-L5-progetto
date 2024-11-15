const urlparams = new URLSearchParams(window.location.search);
const name = urlparams.get("name");
const desc = urlparams.get("desc");
const brand = urlparams.get("brand");
const img = urlparams.get("img");
const price = urlparams.get("price");

const nameField = document.getElementById("name");
const descField = document.getElementById("description");
const brandField = document.getElementById("brand");
const imgField = document.getElementById("imgWrapper");
const priceField = document.getElementById("price");

descField.innerText = desc;
imgField.innerHTML = `<img class="w-100" src="${img}" alt="">`;
brandField.innerText = brand;
priceField.innerText = price + "€";
nameField.innerText = name;
