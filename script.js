const kitty = document.getElementById("kitty");
const fresa = document.getElementById("fresa");
const casita = document.getElementById("casita");
const scoreElement = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOverScreen");

let puntos = 0;
let vivo = true;
const meta = 100;

function saltar() {
    if (vivo && !kitty.classList.contains("jump")) {
        kitty.classList.add("jump");
        setTimeout(() => kitty.classList.remove("jump"), 600);
    }
}

document.addEventListener("mousedown", saltar);
document.addEventListener("touchstart", saltar);

// Esperamos a que cargue todo antes de mover la fresa
window.onload = () => {
    setTimeout(() => {
        fresa.classList.add("fresa-move");
        
        let loop = setInterval(() => {
            if (!vivo) {
                clearInterval(loop);
                return;
            }

            puntos++;
            let puntosActuales = Math.floor(puntos / 5);
            scoreElement.innerText = "Puntos: " + puntosActuales;

            let kittyBottom = parseInt(window.getComputedStyle(kitty).getPropertyValue("bottom"));
            let fresaLeft = parseInt(window.getComputedStyle(fresa).getPropertyValue("left"));

            // Si la fresa está chocando con Kitty
            if (fresaLeft > 40 && fresaLeft < 90 && kittyBottom < 40) {
                morir();
            }

            if (puntosActuales >= meta) {
                ganar();
            }
        }, 50);
    }, 1000);
};

function morir() {
    vivo = false;
    fresa.style.animation = "none";
    fresa.style.display = "none";
    gameOverScreen.style.display = "flex";
}

function ganar() {
    vivo = false;
    fresa.style.display = "none";
    casita.style.right = "40px";
    setTimeout(() => {
        kitty.style.transition = "left 2s linear";
        kitty.style.left = "440px";
        setTimeout(() => {
            kitty.style.display = "none";
            alert("¡Llegaste a casa con Sammy! ❤️");
        }, 2000);
    }, 2100);
}

function reiniciarJuego() {
    location.reload();
}
