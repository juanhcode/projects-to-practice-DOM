const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');

cargarEvenListeners();
function cargarEvenListeners(){
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click',agregarCurso)

}
