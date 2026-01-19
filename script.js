const kitty = document.getElementById("kitty");
const fresa = document.getElementById("fresa");
const casita = document.getElementById("casita");
const scoreElement = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOverScreen");

let puntos = 0;
let vivo = true;
let meta = 100; // Al llegar a 100 puntos aparece la casa

// Iniciar movimiento de la fresa
fresa.classList.add("fresa-move");

function saltar() {
    if (vivo && !kitty.classList.contains("jump")) {
        kitty.classList.add("jump");
        // La animación dura 0.6s, luego quitamos la clase para poder saltar de nuevo
        setTimeout(() => kitty.classList.remove("jump"), 600);
    }
}

// Detectar clic o toque en pantalla para saltar
document.addEventListener("mousedown", saltar);
document.addEventListener("touchstart", saltar);

let loop = setInterval(() => {
    if (!vivo) return;

    puntos++;
    // Mostramos los puntos divididos para que no suban tan rápido
    let puntosActuales = Math.floor(puntos / 5);
    scoreElement.innerText = "Puntos: " + puntosActuales;

    // Obtener posiciones actuales para detectar el choque
    let kittyBottom = parseInt(window.getComputedStyle(kitty).getPropertyValue("bottom"));
    let fresaLeft = parseInt(window.getComputedStyle(fresa).getPropertyValue("left"));

    // LÓGICA DE CHOQUE (Colisión)
    // Si la fresa está pasando por donde está Kitty (entre 40 y 120px)
    // Y Kitty está tocando el suelo o saltando bajito (menos de 45px de altura)
    if (fresaLeft > 40 && fresaLeft < 120 && kittyBottom <= 45) {
        morir();
    }

    // LÓGICA DE GANAR
    if (puntosActuales >= meta) {
        ganar();
    }
}, 50);

function morir() {
    vivo = false;
    fresa.style.animation = "none"; // Detiene la fresa
    fresa.style.display = "none";   // Desaparece la fresa
    gameOverScreen.style.display = "flex"; // Muestra el letrero de perder
}

function ganar() {
    vivo = false;
    clearInterval(loop); // Detiene el contador
    fresa.style.display = "none"; // Quita las fresas
    
    // Hace aparecer la casita desde la derecha
    casita.style.right = "40px";
    
    // Kitty camina hacia la casita después de 2 segundos
    setTimeout(() => {
        kitty.style.transition = "left 2s linear";
        kitty.style.left = "440px"; 
        
        setTimeout(() => {
            kitty.style.display = "none"; // Kitty "entra" a la casa
            alert("¡Llegaste a casa con Sammy! ❤️🏠");
        }, 2000);
    }, 2100);
}

function reiniciarJuego() {
    location.reload(); // Recarga la página para jugar otra vez
}
