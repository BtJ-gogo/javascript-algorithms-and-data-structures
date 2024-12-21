const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weightEl = document.getElementById("weight");
const heightEl = document.getElementById("height");
const typesEl = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack")
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const imgWrapper = document.getElementById("img-wrapper");

const fetchData = async () => {
  try {
    let typeString = "";
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput.value.toLowerCase()}`);
    const data = await res.json();
    const {height, id, sprites, name, stats, types, weight} = data;
    imgWrapper.innerHTML = `<img id="sprite" src="${sprites["front_default"]}" />`;
    pokemonName.textContent = name.toUpperCase();
    pokemonId.textContent = "#" + id;
    weightEl.textContent = "Weight: " + weight;
    heightEl.textContent = "Height: " + height;
    for (const type of types) {
      typeString += `<span id="${type["type"]["name"]}">${type["type"]["name"].toUpperCase()}</span>`;
    }
    typesEl.innerHTML = "Type: " + typeString;

    hp.textContent = stats[0]["base_stat"];
    attack.textContent = stats[1]["base_stat"];
    defense.textContent = stats[2]["base_stat"];
    specialAttack.textContent = stats[3]["base_stat"];
    specialDefense.textContent = stats[4]["base_stat"];
    speed.textContent = stats[5]["base_stat"];
  } catch (err) {
    alert("Pokémon not found");
  }
};

searchBtn.addEventListener("click", fetchData);