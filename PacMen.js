var pos = 0;
const pacArray = [
    ['PacMan1.png', 'PacMan2.png'],
    ['PacMan3.png', 'PacMan4.png']
];
var direction = 0;
const pacMen = []; // This array holds all the pacmen
let gameInterval = null;  
let gamePaused = false;

function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale
    };
}

let velocity = setToRandom(1);

function makePac() {
     let velocity = setToRandom(10); 
     let position = setToRandom(200);
     let game = document.getElementById('game');
     let newimg = document.createElement('img');
     newimg.style.position = 'absolute';
     newimg.src = 'PacMan1.png';
     newimg.width = 100;
     newimg.style.left = position.x + 'px';
     newimg.style.top = position.y + 'px';
     game.appendChild(newimg);

    return {
        position,
        velocity,
        newimg,
        imageIndex: 0,
        direction,

    };
        
}

function update() {
    if (!gamePaused) { 
        pacMen.forEach((item) => {
            checkCollisions(item);
            item.position.x += item.velocity.x;
            item.position.y += item.velocity.y;

            item.newimg.style.left = item.position.x + 'px';
            item.newimg.style.top = item.position.y + 'px';
        });
    }
}

function checkCollisions(item) {
    let hasCollided = false;

    if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth || item.position.x + item.velocity.x < 0) {
        item.velocity.x = -item.velocity.x; 
        hasCollided = true;
        item.direction = item.velocity.x > 0 ? 0 : 1;
    }
    
    if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight || item.position.y + item.velocity.y < 0) {
        item.velocity.y = -item.velocity.y; 
        hasCollided = true;
    }
    
    if (hasCollided) {
        item.direction = item.velocity.x > 0 ? 0 : 1;
        item.imageIndex = (item.imageIndex + 1) % pacArray[item.direction].length;
        item.newimg.src = pacArray[item.direction][item.imageIndex];
    }
}

    function makeOne() {
        pacMen.push(makePac());
    }
    
    function startGame() {
        if (!gameInterval) {  
            gamePaused = false;  
            gameInterval = setInterval(update, 30);  
        }
    }
    
    function pauseGame() {
        gamePaused = !gamePaused;  
    }
    
    function resetGame() {
        clearInterval(gameInterval);  
        gameInterval = null;  
        gamePaused = false; 
        pacMen.forEach(pac => pac.newimg.remove());  
        pacMen.length = 0;  
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('addPacMan').addEventListener('click', makeOne);
        document.getElementById('startGame').addEventListener('click', startGame);
        document.getElementById('pauseGame').addEventListener('click', pauseGame); 
        document.getElementById('resetGame').addEventListener('click', resetGame); 
    });



