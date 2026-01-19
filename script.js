const kitty = document.getElementById("kitty");
const fresa = document.getElementById("fresa");
const casita = document.getElementById("casita");
const scoreElement = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOverScreen");

let puntos = 0;
let vivo = true;
let meta = 100; // Al llegar a 100 aparece la casa

fresa.classList.add("fresa-move");

function saltar() {
    if (vivo && !kitty.classList.contains("jump")) {
        kitty.classList.add("jump");
        setTimeout(() => kitty.classList.remove("jump"), 600);
    }
}

document.addEventListener("mousedown", saltar);
document.addEventListener("touchstart", saltar);

let loop = setInterval(() => {
    if (!vivo) return;

    puntos++;
    scoreElement.innerText = "Puntos: " + Math.floor(puntos / 5);

    let kittyBottom = parseInt(window.getComputedStyle(kitty).getPropertyValue("bottom"));
    let fresaLeft = parseInt(window.getComputedStyle(fresa).getPropertyValue("left"));

    // Choque (ajustado para las 3 fresas)
    if (fresaLeft > 50 && fresaLeft < 130 && kittyBottom <= 35) {
        vivo = false;
        fresa.style.animation = "none";
        gameOverScreen.style.display = "flex";
    }

    // Ganar
    if (Math.floor(puntos / 5) >= meta) {
        ganar();
    }
}, 50);

function ganar() {
    vivo = false;
    clearInterval(loop);
    fresa.style.display = "none";
    casita.style.right = "40px";
    
    setTimeout(() => {
        kitty.style.transition = "left 2s linear";
        kitty.style.left = "440px"; // Camina a la puerta
        setTimeout(() => {
            kitty.style.display = "none";
            alert("¡Llegaste a casa con Sammy! ❤️");
        }, 2000);
    }, 2100);
}

function reiniciarJuego() {
    location.reload();
}
