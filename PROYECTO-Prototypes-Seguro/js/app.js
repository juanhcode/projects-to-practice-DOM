//Constructores
function Seguro(marca,year,tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
function UI(){}

//Lena las opciones de los años
UI.prototype.llenarOpciones = () => {
    const yearMaximo = new Date().getFullYear();
    const yearMinimo = yearMaximo-20;
    const year = document.querySelector('#year');
    for (let i = yearMaximo; i > yearMinimo; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;

        year.appendChild(option);
    }
}
//instanciar UI
const ui = new UI();

document.addEventListener("DOMContentLoaded",()=>{
    ui.llenarOpciones();
})

evenListener();
function evenListener(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit',cotizarSeguro)
}

function cotizarSeguro(e){
    e.preventDefault();
    //leer la marca seleccionado
    const marca = document.querySelector('#marca').value;
    
    //leer el año seleccionado
    const year = document.querySelector('#year').value;

    //leer el tipo seleccionado
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca === "" || year === "" || tipo === ""){
        console.log("Error en la cotizacion")
    }else{
        console.log("Comprobado")
    }

}