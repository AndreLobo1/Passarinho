// Configurações do jogo
var config = {
    type: Phaser.AUTO, // Tipo de renderização automática
    width: 800, // Largura da tela
    height: 600, // Altura da tela

    scene: { // Definição da cena do jogo
        preload: preload, // Função de pré-carregamento
        create: create, // Função de criação
        update: update // Função de atualização
    }
};

var game = new Phaser.Game(config); // Criação da instância do jogo

var passarinhos = []; // Array para armazenar os sprites dos passarinhos

function preload() {
    // Pré-carregamento dos recursos
    this.load.image('background', 'assets/bg_space.png'); // Carrega a imagem do fundo
    this.load.spritesheet('bird', 'assets/bird-purple.png', { frameWidth: 75, frameHeight: 75 }); // Carrega a spritesheet do passarinho
}

function create() {
    // Função de criação dos elementos do jogo
    this.add.image(400, 300, 'background').setScale(1.2); // Adiciona a imagem de fundo

    // Criação da animação do passarinho
    this.anims.create({
        key: 'fly', // Nome da animação
        frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 7 }), // Quadros da animação
        frameRate: 10, // Taxa de quadros por segundo
        repeat: -1 // Repetição infinita
    });

    // Adiciona múltiplos passarinhos usando um loop for
    for (var i = 0; i < 5; i++) {
        var passarinho = this.add.sprite(100 + i * 100, 300, 'bird').setScale(1.3); // Adiciona o sprite do passarinho
        passarinho.anims.play('fly', true); // Inicia a animação do passarinho
        passarinhos.push(passarinho); // Adiciona o passarinho ao array
    }
}

// Função de atualização do jogo
function update() {
    // Lógica de movimento do passarinho
    for (var i = 0; i < passarinhos.length; i++) {
        var passarinho = passarinhos[i];

        // Lógica de movimento horizontal do passarinho
        if (passarinho.x === 100 + i * 100) {
            passarinho.setFlip(false, false); // Inverte a orientação do passarinho
            passarinho.idaX = true; // Define que o passarinho está indo para a direita
        }

        if (passarinho.x < 700 && passarinho.idaX === true) {
            passarinho.x += 5; // Move o passarinho para a direita
        }

        if (passarinho.x === 700) {
            passarinho.setFlip(true, false); // Inverte a orientação do passarinho
            passarinho.idaX = false; // Define que o passarinho está indo para a esquerda
        }

        if (passarinho.x > 100 + i * 100 && passarinho.idaX == false) {
            passarinho.x -= 5; // Move o passarinho para a esquerda
        }

        // Lógica de movimento vertical do passarinho
        if (passarinho.y === 300) {
            passarinho.idaY = true; // Define que o passarinho está subindo
        }

        if (passarinho.y > 200 && passarinho.idaY === true) {
            passarinho.y -= 2; // Move o passarinho para cima
        }

        if (passarinho.y === 200) {
            passarinho.idaY = false; // Define que o passarinho está descendo
        }

        if (passarinho.y < 300 && passarinho.idaY === false) {
            passarinho.y += 2; // Move o passarinho para baixo
        }
    }
}
