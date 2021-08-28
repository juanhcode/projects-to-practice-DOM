//variables
const btnEnviar = document.querySelector('#enviar');
const btnPara = document.querySelector('#email');
const btnReset = document.querySelector('#resetBtn')
const btnAsunto = document.querySelector('#asunto');
const btnMensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('#enviar-mail');
const expRegEmail = /\S+@\S+\.\S+/;
evenListener();

function evenListener() {
    document.addEventListener("DOMContentLoaded", iniciarApp);
}

//Funciones
function iniciarApp() {
    //Cuando la app arranca
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
    //campos del formulario
    btnPara.addEventListener('blur', validarFormulario);
    btnAsunto.addEventListener('blur', validarFormulario);
    btnMensaje.addEventListener('blur', validarFormulario);
    btnReset.addEventListener('click', resetearFormulario);

    //Enviar email
    formulario.addEventListener('submit', enviarEmail);
}

function validarFormulario(e) {
    if (e.target.value.length > 0) {
        //Elimina el campo errores
        const error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrandoError('Todos los campos son obligatorios');
    }


    //Validar correo
    if (e.target.type === 'email') {
        if (expRegEmail.test(e.target.value)) {
            const error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrandoError('El email no es valido');
        }
    }

    if (expRegEmail.test(btnPara.value) && btnAsunto.value !== '' && btnMensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }

}



function mostrandoError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-color-100', 'text-red-500', 'p-3', 'mt-5', 'error');
    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    }
}

function enviarEmail(e) {
    e.preventDefault();
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    setTimeout(() => {
        spinner.style.display = 'none';
        //mensaje que se envio correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = ' El mensaje se envio correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')
        formulario.insertBefore(parrafo, spinner);
        setTimeout(() => {
            parrafo.remove();
            resetearFormulario();
        }, 2000)
    }, 3000);
}

//Resetea el formulario
function resetearFormulario() {
    formulario.reset();
    iniciarApp();
}