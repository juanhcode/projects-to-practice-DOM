//Constructores
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
//Hace la cotizacion
Seguro.prototype.cotizarSeguro = function () {
    /*
    1 =  Americano 1.15
    2 =  Asiatico 1.05
    3 =  Europeo 1.35
    */
    let cantidad;
    let base = 2000;
    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }
    //leer año
    const diferencia = new Date().getFullYear() - this.year;
    //Cada año que la diferencia es mayor , el costo va reducirse un 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100;
    console.log(cantidad);

    if (this.tipo === 'basico') {
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }

    return cantidad
}

function UI() {}

//Lena las opciones de los años
UI.prototype.llenarOpciones = () => {
    const yearMaximo = new Date().getFullYear();
    const yearMinimo = yearMaximo - 20;
    const year = document.querySelector('#year');
    for (let i = yearMaximo; i > yearMinimo; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }
}

UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement("div");
    if (tipo === 'error') {
        div.classList.add("error");
    } else {
        div.classList.add("correcto");
    }
    div.classList.add("mensaje", 'mt-10');
    div.textContent = mensaje;
    //insertar en el html
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector("#resultado"));
    setTimeout(() => {
        div.remove();
    }, 3000)
}

UI.prototype.mostrarResultado = (seguro, total) => {

    //crear el resultados
    const div = document.createElement("div");
    div.classList.add('mt-10');

    const {
        marca,
        year,
        tipo
    } = seguro;
    console.log(marca)
    let texto;
    switch (marca) {
        case '1':
            texto = 'Americano'
            break;
        case '2':
            texto = 'Asiatico'
            break;
        case '3':
            texto = 'Europeo'
            break;
        default:
            break;
    }

    div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Marca:${texto} </p>
        <p class="font-bold">Año:${year} </p>
        <p class="font-bold">Tipo:${tipo} </p>
        <p class="font-bold">Total:$${total} </p>

    `;
    const resultado = document.querySelector('#resultado');
    //mostrar el spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';
        resultado.appendChild(div);
    }, 3000)

}

//instanciar UI
const ui = new UI();
document.addEventListener("DOMContentLoaded", () => {
    ui.llenarOpciones();
})

evenListener();

function evenListener() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro)
}

function cotizarSeguro(e) {
    e.preventDefault();
    //leer la marca seleccionado
    const marca = document.querySelector('#marca').value;
    //leer el año seleccionado
    const year = document.querySelector('#year').value;
    //leer el tipo seleccionado
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    if (marca === "" || year === "" || tipo === "") {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }
    ui.mostrarMensaje('Cotizando......', 'exito');
    //pculta cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if (resultados != null) {
        resultados.remove();
    }


    //Instanciar el seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();
    //mandar valores de seguro y total
    ui.mostrarResultado(seguro, total);

    //cada año que la diferencia es mayor , el costo se reduce en 3%
    const diferencia = new Date().getFullYear() - this.year;
}