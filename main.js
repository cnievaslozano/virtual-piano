var octavaActual = 1;

var teclasPresionadas = new Set();

document.addEventListener('DOMContentLoaded', function () {


    // TECLAS 
    const teclasBlancasContainer = document.getElementsByClassName('naturals-container')[0];
    const teclasNegrasContainer = document.getElementsByClassName('accidentals-container')[0];
    const teclasBlancas = teclasBlancasContainer.getElementsByTagName('button');
    const teclasNegras = teclasNegrasContainer.getElementsByTagName('button');

    // TECLADO MAP
    const teclasANotas = {
        'a': 'C', // blancas
        's': 'D',
        'd': 'E',
        'f': 'F',
        'j': 'G',
        'k': 'A',
        'l': 'B',
        'w': 'Db', // negras
        'e': 'Eb',
        'i': 'Gb',
        'o': 'Ab',
        'p': 'Bb',
    };

    // LISTENER CLICK X NOTA - Teclas Blancas   
    for (let i = 0; i < teclasBlancas.length; i++) {
        const nota = teclasBlancas[i];
        nota.addEventListener('click', function () {
            var idNota = nota.id;
            reproducirNota(idNota, undefined, octavaActual);
        });
    }

    // LISTENER CLICK X NOTA - Teclas Negras
    for (let i = 0; i < teclasNegras.length; i++) {
        const nota = teclasNegras[i];
        nota.addEventListener('click', function () {
            var idNota = nota.id;
            reproducirNota(idNota, undefined, octavaActual);
        });
    }

    // TECLADO - Teclas Todas
    document.addEventListener('keydown', function (event) {
        // Obtener la tecla presionada
        const tecla = event.key.toLowerCase();

        // Verificar si la tecla presionada corresponde a una nota
        if (teclasANotas.hasOwnProperty(tecla) && !teclasPresionadas.has(tecla)) {
            teclasPresionadas.add(tecla);

            const idNota = teclasANotas[tecla];
            // pillamos el elemento
            let teclaButton = document.getElementById(idNota);

            // reproducimos nota
            reproducirNota(idNota, teclaButton, octavaActual);

        }
    });

    // Listener para liberar la tecla
    document.addEventListener('keyup', function (event) {
        const tecla = event.key.toLowerCase();
        if (teclasANotas.hasOwnProperty(tecla)) {
            teclasPresionadas.delete(tecla);
        }
    });


});

function cambiarOctava(nuevaOctava) {
    octavaActual = nuevaOctava;
    console.log("Octava cambiada a:", octavaActual);
}

// Función para reproducir el audio 
function reproducirNota(idNota, elemento, octava) {


    if (elemento) {
        elemento.classList.add('button-active');
    }

    var audio = new Audio('notas/' + idNota + octava + '.mp3');
    audio.play();

    audio.addEventListener('ended', function () {
        if (elemento) {
            elemento.classList.remove('button-active');
        }
    });
    audio.onerror = function () {
        console.error('Error al reproducir el audio de la nota' + idNota + octava);
    };
}