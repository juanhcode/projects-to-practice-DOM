//Variables
const resultado = document.querySelector('#resultado');

//Eventos
document.addEventListener("DOMContentLoaded",() =>{
    mostrarAutos();
});


//Funciones
function mostrarAutos() {
    autos.forEach(auto =>{
        const {marca,modelo,year,precio,puertas,color,transmision} = auto;
        const autoHtml = document.createElement('p');
        autoHtml.textContent=`
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision ${transmision} - Precio:${precio} - Color:${color} 
        `;
        resultado.appendChild(autoHtml);
    });
}