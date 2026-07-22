const simbolos = ["🕱", "☠", "❄", "☼", "☜", "☟", "☞", "☝", "✍", "💣", "☯", "⚡", "⚙", "⚰", "⚱", "⚓", "⚔", "⚙"];

let wingdingsAtivos = true;
let fotoBugada = false; 
let intervaloMutacao = null;

const imgNormalPreload = new Image();
imgNormalPreload.src = "https://preview.redd.it/weird-route-spoilers-can-anyone-show-me-unblurred-noelle-v0-qrhmhhlnwb9h1.png?width=300&format=png&auto=webp&s=83adc0b4ae20f54be3258cb3b438075fad2d6b46";

const imgBugadaPreload = new Image();
imgBugadaPreload.src = "https://translate.google.com/website?sl=en&tl=pt&hl=pt&client=srp&u=https://static.wikia.nocookie.net/deltarune/images/2/2d/Noelle_Holiday_face.png/revision/latest?cb%3D20210919105818";

function gerenciarWingdings() {
    const blocosCensurados = document.querySelectorAll('.wingdings-mutante');
    const blocoSecreto = document.querySelector('.bloco-secreto');
    
    blocosCensurados.forEach(bloco => {
        if (wingdingsAtivos) {
            bloco.style.display = "inline-block";
            bloco.style.cursor = "pointer";
            
            const tamanho = parseInt(bloco.getAttribute('data-tamanho')) || 5;
            let textoAleatorio = "";
            
            for (let i = 0; i < tamanho; i++) {
                const indiceAleatorio = Math.floor(Math.random() * simbolos.length);
                textoAleatorio += simbolos[indiceAleatorio];
            }
            bloco.textContent = textoAleatorio;

            bloco.onclick = function() {
                const urlAtual = window.location.href;
                const novaUrl = urlAtual.substring(0, urlAtual.lastIndexOf('/')) + '/secreto.html';
                window.location.href = novaUrl;
            };

        } else {
            bloco.textContent = ""; 
            bloco.style.background = "transparent";
            bloco.style.padding = "0";
            bloco.style.border = "none";
            bloco.style.margin = "0";
            bloco.style.display = "inline";
            bloco.onclick = null;
        }
    });

    if (blocoSecreto) {
        blocoSecreto.style.display = wingdingsAtivos ? "block" : "none";
    }
}

function gerenciarElementosVisuais() {
    const fotoNoelle = document.getElementById('foto-noelle');

    if (fotoNoelle) {
        if (fotoBugada) {
            fotoNoelle.src = imgBugadaPreload.src;
            fotoNoelle.classList.add('tremendo'); 
        } else {
            fotoNoelle.src = imgNormalPreload.src;
            fotoNoelle.classList.remove('tremendo'); 
        }
    }
}

function alternarCicloWingdings() {
    wingdingsAtivos = !wingdingsAtivos;
    
    if (wingdingsAtivos) {
        gerenciarWingdings();
        intervaloMutacao = setInterval(gerenciarWingdings, 800);
    } else {
        clearInterval(intervaloMutacao);
        gerenciarWingdings();
    }
}

function alternarCicloFoto() {
    fotoBugada = !fotoBugada;
    gerenciarElementosVisuais();
}

function inicializarAudioEstranho() {
    const audio = document.createElement('audio');
    audio.id = "musica-background";
    audio.loop = true;
    
    const source = document.createElement('source');
    source.src = "https://soundhelix.com"; 
    source.type = "audio/mpeg";
    
    audio.appendChild(source);
    document.body.appendChild(audio);

    const tentarTocar = () => {
        audio.play().then(() => {
            document.removeEventListener('click', tentarTocar);
        }).catch(erro => {
            console.log("Áudio aguardando interação do usuário:", erro);
        });
    };

    document.addEventListener('click', tentarTocar);
}

gerenciarWingdings();
gerenciarElementosVisuais();
inicializarAudioEstranho();

intervaloMutacao = setInterval(gerenciarWingdings, 800);
setInterval(alternarCicloWingdings, 5000);
setInterval(alternarCicloFoto, 5000);
