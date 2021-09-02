//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const resultado = document.querySelector('#resultado'); //Donde se ve la info de los autos
const max = new Date().getFullYear(); //se obtiene el año actual
const min = max - 10;

//Objeto donde se almacene la seleccion del auto del usuario
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}
//Eventos
document.addEventListener("DOMContentLoaded", () => {
    mostrarAutos(autos);
    llenarSelectYear();
});

//Event listener para los select de busqueda
marca.addEventListener('change', (e) => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
})
year.addEventListener('change', (e) => {
    datosBusqueda.year = e.target.value;
    filtrarAuto();
})
minimo.addEventListener('change', (e) => {
    datosBusqueda.minimo = e.target.value;
})
maximo.addEventListener('change', (e) => {
    datosBusqueda.maximo = e.target.value;
})
puertas.addEventListener('change', (e) => {
    datosBusqueda.puertas = e.target.value;
})
transmision.addEventListener('change', (e) => {
    datosBusqueda.transmision = e.target.value;
})
color.addEventListener('change', (e) => {
    datosBusqueda.color = e.target.value;
})

//Funciones
function mostrarAutos(autos) {
    limpiarHTML(); //Elimina el HTML previo
    autos.forEach(auto => {
        const {
            marca,
            modelo,
            year,
            precio,
            puertas,
            color,
            transmision
        } = auto;
        const autoHtml = document.createElement('p');
        autoHtml.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision ${transmision} - Precio:${precio} - Color:${color} 
        `;
        resultado.appendChild(autoHtml);
    });
}

function limpiarHTML(){
    while (resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }

}

//Colocar los años en la seccion year
function llenarSelectYear() {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }

}

function filtrarAuto(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear);
    mostrarAutos(resultado);

}

function filtrarMarca(auto){
    const {marca} = datosBusqueda;
    if(marca){
        return auto.marca === datosBusqueda.marca;
    }
    return auto;

}

function filtrarYear(auto){
    const {year} = datosBusqueda;
    if(year){
        return auto.year === parseInt(year);
    }
    return auto;
}

//TODO mostrar resultado de los filtrados en HTML