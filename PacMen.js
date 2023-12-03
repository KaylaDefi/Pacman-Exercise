var pos = 0;
const pacArray = [
    ['PacMan1.png', 'PacMan2.png'],
    ['PacMan3.png', 'PacMan4.png']
];
var direction = 0;
const pacMen = []; // This array holds all the pacmen

function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale
    };
}

let velocity = setToRandom(1);

function makePac() {
     // returns an object with random values scaled {x: 33, y: 21}
     let velocity = setToRandom(10); // {x:?, y:?}
     let position = setToRandom(200);
     // Add image to div id = game
     let game = document.getElementById('game');
     let newimg = document.createElement('img');
     newimg.style.position = 'absolute';
     newimg.src = 'PacMan1.png';
     newimg.width = 100;
     newimg.style.left = position.x;
     newimg.style.top = position.y;
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
    pacMen.forEach((item) => {
        checkCollisions(item);
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;

        item.newimg.style.left = item.position.x + 'px';
        item.newimg.style.top = item.position.y + 'px';

    console.log(`PacMan position: x=${item.position.x}, y=${item.position.y}`);
    });
    setTimeout(update, 9999);
}

    function checkCollisions(item) {
        let hasCollided = false;
    
        // Check for horizontal collision
        if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth || item.position.x + item.velocity.x < 0) {
            item.velocity.x = -item.velocity.x; // Reverse the horizontal velocity
            hasCollided = true;
            // Change the direction based on the new velocity
            item.direction = item.velocity.x > 0 ? 0 : 1; // Assuming 0 is right, 1 is left
        }
    
        // Check for vertical collision
        if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight || item.position.y + item.velocity.y < 0) {
            item.velocity.y = -item.velocity.y; // Reverse the vertical velocity
            hasCollided = true;
        }
    
        if (hasCollided) {
            // Assuming that direction 0 is for rightward images and 1 is for leftward images
            item.direction = item.velocity.x > 0 ? 0 : 1;
    
            // Update the imageIndex and the image source
            item.imageIndex = (item.imageIndex + 1) % pacArray[item.direction].length;
            item.newimg.src = pacArray[item.direction][item.imageIndex];
        }
    }
    
    

function makeOne() {
    pacMen.push(makePac()); // add a new PacMan
    }

 document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('addPacMan').addEventListener('click', makeOne);
    document.getElementById('startGame').addEventListener('click', startGame);
    });
    
function startGame() {
    setInterval(update, 30);
    }



