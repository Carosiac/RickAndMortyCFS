const root = document.getElementById("root");
const totalPersonajes = document.getElementById("total-personajes");
let pagina = 1;
let total = 0;

const paginaActual = document.getElementById("pagina-actual");
const nextPage = document.getElementById("next-page");
const prevPage = document.getElementById("prev-page");
const totalPaginas = document.getElementById("total-paginas");
const firstPage = document.getElementById("first-page");
const lastPage = document.getElementById("last-page");

const getData = async () => {
    const URL = `https://rickandmortyapi.com/api/character?page=${pagina}`;
    const response = await fetch(URL);
    const json = await response.json();

    total = json.info.pages;

    paginaActual.innerHTML = pagina;
    totalPaginas.innerHTML = total;  
    printData(json.results);


    data = json;
    return json;
};

getData(pagina);
let data = {};

const printData = (arr) => {
    
    let card = "";
    totalPersonajes.innerHTML = arr.length;
    arr.forEach((personaje) => {
        
        card = card + 
        `
        <div>
        <div class="card">
            <div class="card-image">
                <img src="${personaje.image}" alt="">
            </div>
            <div class="card-content">
                <p>Nombre: ${personaje.name}</p>
                <p>Genero: ${personaje.gender}</p>
                <p>Especie: ${personaje.species}</p>
                <p>Estatus: ${personaje.status}</p>
                <p>Origen: ${personaje.origin.name}</p>
                <p>Ubicación: ${personaje.location.name}</p>
            </div>
            <div class="link">
            <a href="https://rickandmortyapi.com/api/character/${personaje.id}" target="_blank"> Ver más...</a>
            </div>
        </div>
    </div>
    `;    
    });
    root.innerHTML = card;
};

const pagination = async (prom) => {
  const result = await prom;
  console.log(result);
  nextPage.addEventListener("click", () => {
    pagina += 1;
    getData();

  });

  prevPage.addEventListener("click", () => {
    if (pagina >= 1) {
    pagina -= 1;
    getData();
    
    }
  });

  firstPage.addEventListener("click", () => {
    if (pagina >= 2) {
      pagina = 1;
      getData();
     
    }
  });
  lastPage.addEventListener("click", () => {
    if (pagina < result.info.pages) {
      pagina = result.info.pages;
      getData();
      
    }
  });
};
 const updatePagination = () => {
  if (pagina <= 1) {
    prevPage.disabled = true;
    firstPage.disabled = true;
  } else {
    prevPage.disabled = false;
    firstPage.disabled = false;
  }

  if (pagina === total) {
    lastPage.disabled = true;
    nextPage.disabled = true;
  } else {
    lastPage.disabled = false;
    nextPage.disabled = false;
  }
}; 

const todos = document.getElementById("todos");
const mujeres = document.getElementById("mujeres");
const hombres = document.getElementById("hombres");
const sinGenero = document.getElementById("sinGenero");
const noSeSabe = document.getElementById("noSeSabe");

mujeres.addEventListener("click", () => {
    const arr = data.results;
    const arrMujeres = [];
  
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].gender === "Female") {
        arrMujeres.push(arr[i]);
      }
    }
  
    printData(arrMujeres);
  });
  
hombres.addEventListener("click", () => {
    const arr = data.results;
    const arrHombres = [];
  
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].gender === "Male") {
        arrHombres.push(arr[i]);
      }
    }
    printData(arrHombres);
  });
 
sinGenero.addEventListener("click", () => {
    const arr = data.results;
    const arrSinGenero = [];
  
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].gender === "Genderless") {
        arrSinGenero.push(arr[i]);
      }
    }
    printData(arrSinGenero);
  });
  
noSeSabe.addEventListener("click", () => {
    const arr = data.results;
    const arrNoSeSabe = [];
  
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].gender === "unknown") {
        arrNoSeSabe.push(arr[i]);
      }
    }
    printData(arrNoSeSabe);
  });
  
todos.addEventListener("click", () => {
    const arr = data.results;
    printData(arr);
  });
  
  pagination(getData());

  