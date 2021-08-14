//Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let cursosCarrito = [];


cargarEvenListeners();

function cargarEvenListeners() {
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click',eliminarCurso);

    //vaciar el carrito
    vaciarCarrito.addEventListener('click',() =>{
        cursosCarrito = [];
        limpiarHTML();
    });
}

//Funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const seleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(seleccionado);
    }

}

function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')){
        const cursoId  = e.target.getAttribute('data-id');
        //Elimina del arreglo por el data-id
        cursosCarrito = cursosCarrito.filter( curso => curso.id !== cursoId);
        console.log(cursosCarrito);
        carritoHTML(); //iterar sobre el carrito y mostrar su html
    }
    
}




//Lee el contenido del HTML al que le dimos Click y extrae la informacion del curso

function leerDatosCurso(curso) {

    //Se crea el objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //si existe un elemento en el carrito
    const existe = cursosCarrito.some(curso => curso.id === infoCurso.id );
    if (existe) {
        //Actualizamos la cantidad
        const cursos = cursosCarrito.map(curso =>{
            if(curso.id=== infoCurso.id){
                curso.cantidad++;
                return curso; //Retorna el objeto actualizado de su id
            }else{
                return curso; //retorna los objetos que no son duplicados
            }
            cursosCarrito.push(cursos);
        });
    }else{
        //agregamos el curso al carrito
        cursosCarrito.push(infoCurso)
    }
    console.log(existe);


    //Agrega elementos al carrito
    
    console.log(cursosCarrito)

    carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML() {

    //Limpiar el html
    limpiarHTML();
    
    //Recorre el carrito y genera el html
    cursosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}">
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td>
                <a href="#" class="borrar-curso"  data-id=${curso.id}>X</a>
            </td>

        `;
        //Agrega el html a el tbody
        contenedorCarrito.appendChild(row);

    });

}

//Elimina los cursos del tbody
function limpiarHTML() {
    //Forma lenta
    //contenedorCarrito.innerHTML=''
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

