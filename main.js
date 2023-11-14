// variables generales//
const pokemonContainer$$ = document.querySelector(".container-main-gallery");
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
const pokeId = 151;

//fetch y filtros//
let pokeList = [];
const getPokemon = async (url) => {
    try {
        // let pokeList = [];
        for (let i = 1; i < pokeId; i++) {
            let response = await fetch(url + i);
            let data = await response.json();
            pokeList.push(data);
        }
        // let pokeMaped = pokeMap(pokeList);
        return pokeList;
    } catch (error) {
        console.error("Ha habido un error en la descarga de pokemon", error);
    }
}
console.log(pokeList);


//Funcion de pintado general//
const paintPokemons = (pokemons) => {
    for (const pokemon of pokemons) {
        const pokemonContainer$$ = document.querySelector('.container-main-gallery');
        const flipCard$$ = document.createElement("div");
        flipCard$$.setAttribute('class' ,'container-main-gallery-flip-card');
        pokemonContainer$$.appendChild(flipCard$$);
    
        const flipCardFront$$ = document.createElement("div");
        flipCardFront$$.setAttribute('class','container-main-gallery-flip-card-front');
        flipCard$$.appendChild(flipCardFront$$);

        const flipCardFrontImg$$ = document.createElement("img");
        flipCardFrontImg$$.setAttribute('class','container-main-gallery-flip-card-front-img');
        flipCardFrontImg$$.src = pokemon.sprites.other['official-artwork'].front_default;
        flipCardFrontImg$$.alt = pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1);
        flipCardFront$$.appendChild(flipCardFrontImg$$);

        const flipCardFrontName$$ = document.createElement("h2");
        flipCardFrontName$$.setAttribute('class','container-main-gallery-flip-card-front-name');
        flipCardFrontName$$.textContent = pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1);
        flipCardFront$$.appendChild(flipCardFrontName$$);

        const flipCardBack$$ = document.createElement("div");
        flipCardBack$$.setAttribute('class','container-main-gallery-flip-card-back');

        flipCard$$.appendChild(flipCardBack$$);

        const flipCardBackStatsName$$ = document.createElement("H2");
        flipCardBackStatsName$$.setAttribute('class','container-main-gallery-flip-card-back-stats-name');
        flipCardBackStatsName$$.textContent = "STATS";
        flipCardBack$$.appendChild(flipCardBackStatsName$$);
        
        const stats = pokemon.stats;
        for (let stat of stats) {
            const flipCardBackStats$$ = document.createElement("span");
            flipCardBackStats$$.setAttribute('class','container-main-gallery-flip-card-back-stats-content');
            flipCardBackStats$$.textContent = stat.base_stat;
            flipCardBack$$.appendChild(flipCardBackStats$$);
        }

        const flipCardBackTypesName$$ = document.createElement("H2");
        flipCardBackTypesName$$.setAttribute('class','container-main-gallery-flip-card-back-types-name');
        flipCardBackTypesName$$.textContent = "TYPES";
        flipCardBack$$.appendChild(flipCardBackTypesName$$);

        const types = pokemon.types;
        for (let type of types) {
            const flipCardBackTypes$$ = document.createElement("p");
            flipCardBackTypes$$.setAttribute('class','container-main-gallery-flip-card-back-types-content');
            flipCardBackTypes$$.textContent = type.type.name.charAt(0).toUpperCase()+type.type.name.slice(1);
            flipCardBack$$.appendChild(flipCardBackTypes$$);}
        }
}

//Funcion de Mapeo//
const mapData = (notMapData) => {
    let pokemon = notMapData.map((elem) => {
        return {
        name: elem.name,
        image: elem.sprites.other.home["front_default"],
        type: elem.types.map((type) => type.type.name),
        id: elem.id,
        baseStat: elem.stats.map((stat) => stat.base_stat),
        };
    });
    return pokemon;
}

//funcion de control de pagina
const init = async () => {
    let pokemonData = await getPokemon(baseUrl);
    paintPokemons(pokemonData)
    let pokemonMapped = mapData(pokemonData);
    console.log(pokemonData);
    return pokemonMapped;
    
}

//Busqueda Individual//
const button$$ = document.querySelector('.container-nav-search-button');
button$$.addEventListener('click', clickBtn);
 
async function clickBtn () {
    try {
        const input$$ = document.querySelector('input')
        const value = input$$.value
        const response = await fetch(baseUrl + value);
        const json = await response.json();
        console.log(json);
        individualPaint(json)
    }
    catch (error) {
        alert("No se encuentra el pokemon", error);
        init();
      }
}
 
const individualPaint = (data) => {
    const pokemonContainer$$ = document.querySelector(".container-main-gallery");
    pokemonContainer$$.innerHTML = "";  
    const flipCard$$ = document.createElement("div");
    flipCard$$.setAttribute('class' ,'container-main-gallery-flip-card');
    pokemonContainer$$.appendChild(flipCard$$);

    const flipCardFront$$ = document.createElement("div");
    flipCardFront$$.setAttribute('class','container-main-gallery-flip-card-front');
    flipCard$$.appendChild(flipCardFront$$);

    const flipCardFrontImg$$ = document.createElement("img");
    flipCardFrontImg$$.setAttribute('class','container-main-gallery-flip-card-front-img');
    flipCardFrontImg$$.src = data.sprites.other['official-artwork'].front_default;
    flipCardFrontImg$$.alt = data.name.charAt(0).toUpperCase()+data.name.slice(1);
    flipCardFront$$.appendChild(flipCardFrontImg$$);

    const flipCardFrontName$$ = document.createElement("h2");
    flipCardFrontName$$.setAttribute('class','container-main-gallery-flip-card-front-name');
    flipCardFrontName$$.textContent = data.name.charAt(0).toUpperCase()+data.name.slice(1);
    flipCardFront$$.appendChild(flipCardFrontName$$);

    const flipCardBack$$ = document.createElement("div");
    flipCardBack$$.setAttribute('class','container-main-gallery-flip-card-back');

    flipCard$$.appendChild(flipCardBack$$);

    const flipCardBackStatsName$$ = document.createElement("H2");
    flipCardBackStatsName$$.setAttribute('class','container-main-gallery-flip-card-back-stats-name');
    flipCardBackStatsName$$.textContent = "STATS";
    flipCardBack$$.appendChild(flipCardBackStatsName$$);
        
    const stats = data.stats;
    for (let stat of stats) {
        const flipCardBackStats$$ = document.createElement("p");
        flipCardBackStats$$.setAttribute('class','container-main-gallery-flip-card-back-stats-content');
        flipCardBackStats$$.textContent = stat.base_stat;
        flipCardBack$$.appendChild(flipCardBackStats$$);
    }

    const flipCardBackTypesName$$ = document.createElement("H2");
    flipCardBackTypesName$$.setAttribute('class','container-main-gallery-flip-card-back-types-name');
    flipCardBackTypesName$$.textContent = "TYPES";
    flipCardBack$$.appendChild(flipCardBackTypesName$$);

    const types = data.types;
    for (let type of types) {
        const flipCardBackTypes$$ = document.createElement("p");
        flipCardBackTypes$$.setAttribute('class','container-main-gallery-flip-card-back-types-content');
        flipCardBackTypes$$.textContent = type.type.name.charAt(0).toUpperCase()+type.type.name.slice(1);
        flipCardBack$$.appendChild(flipCardBackTypes$$);}
}
init()

//Eventos botones Filtros Typo y funcion busqueda//

const bug = "bug";

const lookForTypes = () => {
    let pokemons = document.querySelectorAll('p');
    let searchType = buttonBug$$.getAttribute("id");
    for (const pokemon of pokemons) {
        // pokemon.parentNode.classList.remove("hidden");
        // const typeFilter = pokemon.children;
        if (pokemons !== searchType){
            
            console.log(u$);
            // u$.classList.add("hidden");
        }
        console.log("fallo")
        // if (this.innerHTML === "all") {
        //     pokemon.parentNode.classList.remove("hidden");
        // }
    }
}

// const buttonBug$$ = document.querySelector("#bug");
// buttonBug$$.addEventListener('click', lookForTypes);

// const buttonBug$$ = document.querySelector("#bug");
// buttonBug$$.addEventListener('click', lookForTypes(pokeList));
// const buttonDark$$ = document.querySelector('.container-item-filter-btn-dark');
// button$$.addEventListener('click', lookForTypes);
// const buttonFairy$$ = document.querySelector('.container-item-filter-btn-fairy');
// button$$.addEventListener('click', lookForTypes);
// const buttonFighting$$ = document.querySelector('.container-item-filter-btn-fighting');
// button$$.addEventListener('click', lookForTypes);





