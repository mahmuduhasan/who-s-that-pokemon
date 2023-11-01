const pokeGenerator = document.getElementById("generate-button");
const pokeImg = document.getElementById("pokemon-img");
const hp = document.getElementById("pokemon-hp");
const type = document.getElementById("type");
const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  fairy: "#FF0069",
  electric: "#fed330",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EEB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  rock: "#2d3436",
  water: "#0190FF",
};

function createPokemon(pokeData) {
  // console.log(pokeData);
  pokeImg.src = pokeData.sprites.other.dream_world.front_default;
  hp.textContent = pokeData.stats[0].base_stat;
  pokeData.types.forEach((types) => {
    const p = document.createElement("p");
    type.innerHTML = "";
    p.textContent =
      types.type.name[0].toUpperCase() +
      types.type.name.slice(1, types.type.name.length);
    type.appendChild(p);
  });
  document.getElementById("pokemon-name").textContent =
    pokeData.name[0].toUpperCase() +
    pokeData.name.slice(1, pokeData.name.length);
  document.querySelectorAll("#abilities div").forEach((elem) => {
    elem.style.backgroundColor = typeColor[`${pokeData.types[0].type.name}`];
  });
  document.getElementById("hp").style.backgroundColor =
    typeColor[`${pokeData.types[0].type.name}`];
  document.getElementById("generate-button").style.backgroundColor =
    typeColor[`${pokeData.types[0].type.name}`];
  document.getElementById("attack").textContent = pokeData.stats[1].base_stat;
  document.getElementById("defense").textContent = pokeData.stats[2].base_stat;
  document.getElementById("speed").textContent = pokeData.stats[5].base_stat;
}

function pokemon(endpoint) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("get", endpoint);
    xhr.onreadystatechange = function () {
      // console.log(this.readyState, this.status);
      if (this.status === 200) {
        if (this.readyState === 4) {
          resolve(JSON.parse(this.responseText));
          // console.log(this.responseText);
        }
      } else {
        reject("Error : Something went wrong!");
      }
    };
    xhr.send();
  });
}

function getPokemon() {
  const url = "https://pokeapi.co/api/v2/pokemon/";
  const randomNumber = Math.floor(Math.random() * 150 + 1);
  const finalUrl = url + randomNumber;
  //console.log(randomNumber, finalUrl);
  const pokemonData = pokemon(finalUrl);
  pokemonData
    .then((data) => {
      createPokemon(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

pokeGenerator.addEventListener("click", getPokemon);
document.addEventListener("DOMContentLoaded", getPokemon);
