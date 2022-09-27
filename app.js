//*=========================================================
//*                     FLAG-APP
//*=========================================================

let bigData = [];

fetch("https://restcountries.com/v3.1/all")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data); //? 1 tane liste içerisinde 250 adet object var
    bigData = data;
    selectOptionInput(data);
  });

const options = document.querySelector(".form-select");

const selectOptionInput = (data) => {
  data.forEach((country) => {
    const {
      name: { common },
    } = country;
    options.innerHTML += `<option value="${common}">${common}</option>`;
  });
};

options.addEventListener("change", () => {
  console.log(options.value);
  fetchCountryByName(options.value);
});

const fetchCountryByName = (name) => {
  const countryDiv = document.querySelector(".countries");

  bigData.forEach((country) => {
    const {
      capital,
      currencies,
      flags: { svg },
      languages,
      name: { common },
      region,
      maps: { googleMaps },
    } = country;

    if (common == options.value) {
      countryDiv.innerHTML = `
    <div class="card mx-auto m-3 shadow-lg" style="width: 18rem;">
      <img src="${svg}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${common}</h5>
        <p class="card-text">${region}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <i class="fas fa-lg fa-landmark"></i> ${capital}
        </li>
        <li class="list-group-item">
          <i class="fas fa-lg fa-comments"></i> ${Object.values(languages)}
        </li>
        <li class="list-group-item">
          <i class="fas fa-lg fa-money-bill-wave"></i>
          ${Object.values(currencies).map((item) => Object.values(item) + " ")}
       </li>
      </ul>
      <div class="card-body">
        <a href="${googleMaps}" target="_blank" class="card-link">Location on Map</a>
      </div>
    </div>`;
    }
  });
};