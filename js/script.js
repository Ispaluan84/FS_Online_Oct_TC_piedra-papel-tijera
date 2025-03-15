const opciones = ["piedra", "papel", "tijera"];
const botones = document.querySelectorAll(".boton-jugada")
const resultadoDiv = document.getElementById("resultados")
const contadorUsuario = document.getElementById("contador-usuario")
const contadorOrdenador = document.getElementById("contador-ordenador")

let puntosUsuario = 0;
let puntosOrdenador = 0;


function jugar(eleccionUsuario) {
    const eleccionOrdenador = jugadaOrdenador();
    const resultado = obtenerResultado(eleccionUsuario, eleccionOrdenador);
    mostrarResultado(eleccionUsuario, eleccionOrdenador, resultado);
    actualizarResultado();
}

function mostrarResultado(usuario, ordenador, resultado) {
    resultadoDiv.innerHTML = `
    <P>Elegiste: <strong>${usuario}</strong></p>
    <p>Ordenador eligió: <strong>${ordenador}</strong></p>
    <p>Resultado: <strong>${resultado}</strong></p>`;
}

function actualizarResultado() {
    contadorUsuario.textContent = `Tús puntos: ${puntosUsuario}`;
    contadorOrdenador.textContent = `Puntos de la máquina ${puntosOrdenador}`;
}

function jugadaOrdenador() {
    return opciones[Math.floor(Math.random() * 3)]
}

function obtenerResultado(usuario, ordenador) {
    if (usuario === ordenador) {
        return "Empate";
    } else if (
        (usuario === "piedra" && ordenador === "tijera") ||
        (usuario === "tijera" && ordenador === "papel") ||
        (usuario === "papel" && ordenador === "piedra")
    ) {
        puntosUsuario ++;
        return "Usuario Gana";
    } else {
        puntosOrdenador ++;
        return "Ordenador Gana";
    }

}

botones.forEach(boton => { 
    boton.addEventListener("click", function() {
        const eleccionUsuario = boton.dataset.jugada;
        jugar(eleccionUsuario);
    });
});