//Variables
const resultado = document.querySelector('#resultado');
const year = document.querySelector('#year');
const max = new Date().getFullYear();
const min = max - 10;

//Eventos
document.addEventListener("DOMContentLoaded", () => {
    mostrarAutos();
    llenarSelectYear();
});


//Funciones
function mostrarAutos() {
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

function llenarSelectYear() {

    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }

}