//variables
//const tweetArea = document.querySelector('#tweet');
//const agregar = document.querySelector('.button');
const formulario = document.querySelector('#formulario');
const listaTweet = document.querySelector('#lista-tweets');
let tweets = [];


//eventos
evenListeners();
function evenListeners() {
    formulario.addEventListener('submit', agregarTweet)

    //Cuando el documento esta listo
    document.addEventListener("DOMContentLoaded",()=>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    })
}

//Funciones
function agregarTweet(e) {
    e.preventDefault();

    //TextArea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;
    if (tweet === '') {
        mostrarError('No puede ir vacio');
        return;
    }
    //Añadir al arreglo de twwets
    const twwetObj = {
        id: Date.now(),
        tweet
    }
    tweets = [...tweets, twwetObj];
    console.log(tweets);

    //crear HTML
    crearHTML();

    //Reinicar formulario
    formulario.reset();

}
//muestra un listado de los twwets
function crearHTML() {
    limpiarHTML();
    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            //Agregar un boton
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            //Añadir la funcion de eleminar
            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            }
            
            const li = document.createElement('li');
            li.innerText = tweet.tweet;
            //Asignar boton
            li.appendChild(btnEliminar);
            listaTweet.appendChild(li);
        });
    }
    sincronizarStorage();
}

function borrarTweet(id){
    tweets = tweets.filter((tweet)=> tweet.id !== id);
    crearHTML();
}

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function limpiarHTML(){
    while (listaTweet.firstChild){
        listaTweet.removeChild(listaTweet.firstChild);
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('error');

    //meter el mensjae en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove('error');
    }, 3000)

}