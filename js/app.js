//Variables
let tablero = document.getElementById('tablero')
let iconos;
let selecciones = [];
let cantidadTarjetas = 24;



//Elementos del array



//Eventos
generarTablero(); 

//Funciones
function generarTablero() {
    cargarIconos();
    let tarjetas = [];
    for (let i = 0; i < cantidadTarjetas; i++) {
        tarjetas.push(`
            <div class="area-tarjeta" onclick="seleccionaTarjeta(${i})">
                <div class="tarjeta" id="tarjeta${i}">
                    <div class="cara revelado" id="trasera${i}">
                        ${iconos[0]}
                    </div>
                    <div class="cara incognita">
                        <i class="fa-solid fa-question"></i>
                    </div>
                </div>
            </div>
        `)
        if (i%2===1) {
            iconos.splice(0,1)
        }
    }
    tarjetas.sort(() => Math.random() - 0.5)
    tablero.innerHTML = tarjetas.join(' ')
    
}

function cargarIconos() {
    iconos = [
        '<span class="ec ec-100"></span>',
        '<span class="ec ec-smiling-imp"></span>',
        '<span class="ec ec-sleeping"></span>',
        '<span class="ec ec-ghost"></span>',
        '<span class="ec ec-robot"></span>',
        '<span class="ec ec-eyes"></span>',
        '<span class="ec ec-tongue"></span>',
        '<span class="ec ec-speak-no-evil"></span>',
        '<span class="ec ec-money-mouth-face"></span>',
        '<span class="ec ec-hatching-chick"></span>',
        '<span class="ec ec-fire"></span>',
        '<span class="ec ec-wave"></span>',
    ]    
}



function seleccionaTarjeta(i) {
    let tarjeta = document.getElementById("tarjeta"+i);
    if (tarjeta.style.transform != "rotateY(180deg)") {
        tarjeta.style.transform = "rotateY(180deg)";
        selecciones.push(i);
    }
    if (selecciones.length == 2) {
        deseleccionar(selecciones);
        selecciones = [];
    }
}

function deseleccionar (selecciones) {
    setTimeout(() => {
        
        let trasera1 = document.getElementById('trasera' + selecciones[0]);
        let trasera2 = document.getElementById('trasera' + selecciones[1]);

        if (trasera1.innerHTML != trasera2.innerHTML) {
            let tarjeta1 = document.getElementById('tarjeta' + selecciones[0]);
            let tarjeta2 = document.getElementById('tarjeta' + selecciones[1]);
            tarjeta1.style.transform = 'rotateY(0deg)';
            tarjeta2.style.transform = 'rotateY(0deg)';
        }else{
            trasera1.style.background = 'plum';
            trasera2.style.background = 'plum';
        }
        if (verificarFin()) {
            Swal.fire({
                title: `El juego Ha Finalizado`,
                text: `Felicidades`,
                icon: `success`
            })
        }
    }, 1000);
}

function verificarFin() {
    for (let i = 0; i < cantidadTarjetas; i++) {
        let trasera = document.getElementById("trasera"+i);
        if (trasera.style.background != 'plum') {
            return false
        }
    }
    return true
}