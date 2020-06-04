// LOGICA DO JOGO EM JAVASCRITP

// Variaveis globais
var altura = 0
var largura = 0
var vidas = 1
var pontos = 0
var tempo = 30

var criaMoscaTempo = 2000
var nivel = window.location.search
nivel = nivel.replace('?', '')

if (nivel === 'facil') {
    var criaMoscaTempo = 2000
} else if (nivel === 'normal') {
    var criaMoscaTempo = 1400
} else if (nivel === 'dificil') {
    var criaMoscaTempo = 1000
} else if (nivel === 'impossivel') {
    var criaMoscaTempo = 750
}

function ajustaTamanhoPalcoJogo() { //Função que deixa o jogo responsivo
    altura = window.innerHeight
    largura = window.innerWidth
    console.log(altura, largura)
}

ajustaTamanhoPalcoJogo() //Chamada da função 

var cronometro = setInterval(function() {
    tempo -= 1
    if (tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criaMosca)
        window.location.href = 'vitoria.html'
    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }
}, 1000)

function posicaoRandomica() {

    // remover o mosca anterior (caso exista)
    if (document.getElementById('mosca')) {
        document.getElementById('mosca').remove()

        if (vidas > 3) {
            window.location.href = 'gameOver.html'
        } else {
            document.getElementById('v' + vidas).src = "imgs/coracao_vazio.png"
            vidas++
        }
    }

    // Variaveis do nosso personagem Mosca
    var posicaoX = Math.floor(Math.random() * largura) - 90 //Math.floor(Arredonda para baixo)
    var posicaoY = Math.floor(Math.random() * altura) - 90

    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoX, posicaoY)

    // criar o elelmento html
    var mosca = document.createElement('img') //Criação de personagem mosca
    mosca.src = 'imgs/mosca.png'
    mosca.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosca.style.left = posicaoX + 'px'
    mosca.style.top = posicaoY + 'px'
    mosca.style.position = 'absolute'
    mosca.id = 'mosca'
    mosca.onclick = function() {
        this.remove()
        pontos++
        document.getElementById('pontuacao').innerHTML = pontos
        console.log(pontos)

    }
    document.body.appendChild(mosca)

}
// Função que ira definir o tamanho da mosca
function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3)
    switch (classe) {
        case 0:
            return 'mosca1'
        case 1:
            return 'mosca2'
        case 2:
            return 'mosca3'
    }
}

// Função de estetica corrigindo a direção do olhar da mosca
function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2)
    switch (classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}