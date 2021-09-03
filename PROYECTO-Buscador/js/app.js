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
    filtrarAuto();
})
maximo.addEventListener('change', (e) => {
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
})
puertas.addEventListener('change', (e) => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
})
transmision.addEventListener('change', (e) => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
})
color.addEventListener('change', (e) => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();
    console.log(datosBusqueda)
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
    limpiarHTML();
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPorPuertas).filter(filtrarPorTransmision).filter(filtrarPorColor);
    if(resultado.length){
        mostrarAutos(resultado);
    }else{
        noResultado();
    }
}
function noResultado(){
    const noResultado = document.createElement("div");
    noResultado.classList.add('alerta','error');
    noResultado.textContent='No hay resultados, intenta con ostros terminos de busqueda';
    resultado.appendChild(noResultado);
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

function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;
    if(minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;
    if(maximo) {
        return auto.precio <= maximo;
    }
    return auto;

}

function filtrarPorPuertas(auto){
    const {puertas} = datosBusqueda;
    if(puertas) {
        return auto.puertas === puertas;
    }
    return auto;

}

function filtrarPorTransmision(auto){
    const {transmision} = datosBusqueda;
    if(transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarPorColor(auto){
    const {color} = datosBusqueda;
    if(color){
        return auto.color === color;
    }
    return auto;
}