let saldo = 1000;
let apuesta = 10;
const tablero = document.getElementById("tablero");
const saldoActual = document.getElementById("saldo-actual");
const apuestaInput = document.getElementById("apuesta");
const apostarButton = document.getElementById("apostar");

// Modal DOM
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const modalMessage = document.getElementById("modal-message");
const modalButton = document.getElementById("modal-button");
const modalRetirarButton = document.getElementById("modal-retirar");

// Generar el tablero de minas
function generarTablero() {
    tablero.innerHTML = '';
    let minas = [];
    
    // Colocamos 5 minas aleatorias en el tablero
    while (minas.length < 5) {
        let minaPos = Math.floor(Math.random() * 25);
        if (!minas.includes(minaPos)) {
            minas.push(minaPos);
        }
    }

    // Crear las casillas del tablero
    for (let i = 0; i < 25; i++) {
        const casilla = document.createElement('div');
        casilla.addEventListener('click', () => destaparCasilla(i, minas));
        tablero.appendChild(casilla);
    }
}

// Función para destapar una casilla
function destaparCasilla(indice, minas) {
    const casilla = tablero.children[indice];
    
    if (minas.includes(indice)) {
        casilla.classList.add("mina");
        mostrarModal("¡Perdiste!", "¡Encontraste una mina! Has perdido tu apuesta de $" + apuesta);
        saldo -= apuesta;
        saldoActual.textContent = saldo;
        modalRetirarButton.style.display = "none"; // Ocultamos el botón de retirarse si pierdes

        // Mostrar todas las minas después de perder
        minas.forEach((minaIndice) => {
            tablero.children[minaIndice].classList.add("mina"); // Mostrar minas
        });

        // Reseteamos el tablero después de un breve retraso (2 segundos)
        setTimeout(() => {
            resetearTablero(); // Reseteamos el tablero y el estado del juego
        }, 2000); // Espera 2 segundos para que el jugador vea el resultado
    } else {
        casilla.classList.add("safe");
        mostrarModal("¡Ganaste!", "¡No encontraste ninguna mina! Has ganado $" + apuesta);
        saldo += apuesta;
        saldoActual.textContent = saldo;
        modalRetirarButton.style.display = "block"; // Mostramos el botón de retirarse si ganas
    }
}

// Función para manejar la apuesta
apuestaInput.addEventListener('input', () => {
    apuesta = parseInt(apuestaInput.value);
    if (apuesta > saldo) {
        apuestaInput.value = saldo;
        apuesta = saldo;
    }
});

// Función de apostar
apostarButton.addEventListener('click', () => {
    if (apuesta > saldo) {
        mostrarModal("Saldo insuficiente", "No tienes suficiente saldo para apostar esa cantidad.");
        return;
    }
    generarTablero();
});

// Mostrar el modal con el mensaje adecuado
function mostrarModal(titulo, mensaje) {
    modal.style.display = "flex";
    modalMessage.textContent = mensaje;
    modalContent.querySelector("h2").textContent = titulo;
}

// Cerrar el modal al hacer clic en el botón
modalButton.addEventListener('click', () => {
    modal.style.display = "none";
});

// Función para retirarse
modalRetirarButton.addEventListener('click', () => {
    // Resetear el tablero y la apuesta
    saldoActual.textContent = saldo;
    resetearTablero(); // Reinicia el tablero
    modal.style.display = "none"; // Cierra el modal
    modalRetirarButton.style.display = "none"; // Oculta el botón de retirarse
});

// Función para resetear el tablero
function resetearTablero() {
    tablero.innerHTML = ''; // Limpia las casillas del tablero
    // Regeneramos el tablero para una nueva ronda
    setTimeout(() => {
        generarTablero(); // Vuelve a generar el tablero después de 1 segundo
    }, 1000);
}

// Inicializamos el juego
generarTablero();
