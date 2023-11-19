// variables generales//
const pokemonContainer$$ = document.querySelector(".container-main-gallery");
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
const pokeId = 1017;
let urlTypes = "https://pokeapi.co/api/v2/type/";


//fetch y filtros//
let pokeList = [];
const getPokemon = async (url) => {
    try {
        for (let i = 1; i < pokeId; i++) {
            let response = await fetch(url + i);
            let data = await response.json();
            pokeList.push(data);
        }
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


//funcion de control de pagina
const init = async () => {
    let global$$ = document.getElementById('container-global');
    let loadingSet$$ = document.getElementById('loading');
    setTimeout(function() {
    console.log('loading');
    loadingSet$$.classList.add('hidden');
    global$$.classList.remove('hidden');
    }, 2000)
    let pokemonData = await getPokemon(baseUrl);
    paintPokemons(pokemonData)
    console.log(pokemonData);
    return pokemonData;
    
}


//Busqueda Individual//
const button$$ = document.querySelector('.container-nav-search-button');
button$$.addEventListener('click', clickBtn);
 

async function clickBtn () {
    //Busqueda por Nombre exacto//
    try {
        const input$$ = document.querySelector('input')
        const value = input$$.value.toLowerCase();
        const response = await fetch(baseUrl + value);
        const json = await response.json();
        console.log(json);
        // if
        individualPaint(json)
        }
    catch (error) {
        //Busqueda por número de Pokemon//
        try {

            const input$$ = document.querySelector('input')
            const value = input$$.value
            const response = await fetch(urlTypes + value);
            const json = await response.json();
            individualPaint(json)
        }
        catch (error) {
            noPokemon()
            }
        }
    }

const noPokemon = () => {
    const input$$ = document.querySelector('input')
    const value = input$$.value.toLowerCase();
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
    flipCardFrontImg$$.src = "/POKEAPI/ASSETS/nopokemon.png";
    flipCardFrontImg$$.style = "width:100px; height:100px;";
    flipCardFront$$.appendChild(flipCardFrontImg$$);

    const flipCardFrontName$$ = document.createElement("h2");
    flipCardFrontName$$.setAttribute('class','container-main-gallery-flip-card-front-name');
    flipCardFrontName$$.textContent = `The pokemon "${value}" hasn't been born`;
    flipCardFrontName$$.style.fontSize = "20px";
    flipCardFront$$.appendChild(flipCardFrontName$$);

    const flipCardBack$$ = document.createElement("div");
    flipCardBack$$.setAttribute('class','container-main-gallery-flip-card-back');

    flipCard$$.appendChild(flipCardBack$$);

    const flipCardBackStatsName$$ = document.createElement("H2");
    flipCardBackStatsName$$.setAttribute('class','container-main-gallery-flip-card-back-stats-name');
    flipCardBackStatsName$$.textContent = "STATS";
    flipCardBack$$.appendChild(flipCardBackStatsName$$);
        
    const flipCardBackStats$$ = document.createElement("p");
    flipCardBackStats$$.setAttribute('class','container-main-gallery-flip-card-back-stats-content');
    flipCardBackStats$$.textContent = 'Egg Powers'
    flipCardBack$$.appendChild(flipCardBackStats$$);

    const flipCardBackTypesName$$ = document.createElement("H2");
    flipCardBackTypesName$$.setAttribute('class','container-main-gallery-flip-card-back-types-name');
    flipCardBackTypesName$$.textContent = "TYPES";
    flipCardBack$$.appendChild(flipCardBackTypesName$$);

    const flipCardBackTypes$$ = document.createElement("p");
    flipCardBackTypes$$.setAttribute('class','container-main-gallery-flip-card-back-types-content');
    flipCardBackTypes$$.textContent = 'Egg';
    flipCardBack$$.appendChild(flipCardBackTypes$$);
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

    //select//
window.addEventListener('load', function() {
    // Obtener select
    let sel = document.querySelector('#exampleFormControlSelect1');
    // Crear lista y agregar clase
    let ul = document.createElement('ul');
    ul.className = 'ul-sel';
    // Recorrer opciones del select
    for(let i = 0; i < sel.options.length; i++) {
        // Crear elemento de lista y agregar clase
        let li = document.createElement('li');
        li.className = 'li-option';
        // ¿La opción actual está seleccionada? Aplicar al elemento de lista
        if(sel.options[i].selected) {
            li.classList.add('selected');
        }
        // Agregar contenido y estilo desde opción
        li.innerText = sel.options[i].innerText;
        li.style = sel.options[i].dataset.style;
        // Actualizar valor del select al hacer clic en elemento de lista
        li.addEventListener('click', function() {
            // Remover clase seleccionada de opción anterior
            ul.querySelector('.selected').classList.remove('selected');
            // Seleccionar opción actual
            this.classList.add('selected');
            // Actualizar valor del select
            sel.value = this.innerText;
        });
        // Agregar elemento a lista
        ul.appendChild(li);
    }
    // Agregar lista, justo después del select
    sel.parentNode.insertBefore(ul, sel.nextSibling);
    // Posicionar lista sobre el select
    ul.style.top = sel.offsetTop + 'px';
    ul.style.left = sel.offsetLeft + 'px';
    // Ocultar select
    sel.style.display = 'none';
});

  //Prueba filtro boton, no consigo que pinte la ficha//
async function lookForTypesBug () {
    try {
        const response = await fetch(baseUrl + "?limit=30");
        const json = await response.json();
        console.log(json);
        individualPaint(json)
    }
    catch (error) {
        alert("No se encuentra el pokemon", error);
        init();
      }
}

//Boton Reinicio//
const reloaded = document.querySelector(".container-nav-pokeIcon");
reloaded.addEventListener('click',init);