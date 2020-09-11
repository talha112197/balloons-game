let colors = ['red', 'green', 'blue', 'yellow', 'violet'];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let body = document.body;
let scores = document.querySelectorAll('.balloon-count');
let num = 0;
let total = 100;
let currentBalloon = 0;
let gameOver = false;
let success = document.querySelector('#congratulations-modal');
let failure = document.querySelector('#failure-modal');
let end = document.querySelector('#end-modal');
let startBtn = document.querySelector('#restart-button');
let endGame = document.querySelector('#end-button');
let startWindow = document.querySelector('.start-game-window');
let startGameBtn = document.querySelector('.start-game-button');
let music = document.querySelector('.bg-music');

function createBalloon() {
    let div = document.createElement('div');
	let rand = Math.floor(Math.random()*colors.length);
	div.className = 'balloon balloon-'+colors[rand];

	rand = Math.floor(Math.random() * (windowWidth - 100));
	div.style.left = rand + 'px';
	div.dataset.number = currentBalloon;
	currentBalloon++;

	body.appendChild(div);
	animateBalloon(div);
} 

function animateBalloon(elem) {
    let pos = 0;
    let random = Math.floor(Math.random() * 6-3)
    let interval = setInterval(frame, 12 - Math.floor(num / 10) + random);

    function frame() {
        if(pos >= (windowHeight + 200) && document.querySelector('[data-number="'+elem.dataset.number+'"]')) {
            clearInterval(interval);
            gameOver = true;
        } else {
            pos++;
            elem.style.top = windowHeight - pos + 'px';
        }
    }
}

function deleteBalloon(elem) {
    
        elem.remove();
        num++;
        updateScore();
        playSound();
}

function updateScore() {
      for(let i=0; i<scores.length; i++) {
          scores[i].textContent = num;
      }
}

function startGame() {
        restartGame();
        let timeout = 0;
        let loop = setInterval(function(){
            timeout = Math.floor(Math.random() * 600 - 100);
            if(!gameOver && num!== total) {
                createBalloon();
            } else if(num!==total) {
             clearInterval(loop);
             failure.style.display = 'block';
             body.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            } else {
                clearInterval(loop);
                success.style.display = 'block';
                body.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            }
        }, 800 + timeout);
}

function restartGame() {
    let restart = document.querySelectorAll('.balloon');
    for(let i=0; i<restart.length; i++) {
        restart[i].remove();
    }
    gameOver = false;
    num=0;
    updateScore();
}

function playSound() {
    let sound = document.createElement('audio');
    sound.src = '../assets/sounds/pop.mp3';
    sound.play();
}

document.addEventListener('click', function(event){
       if(event.target.classList.contains('balloon')) {
           deleteBalloon(event.target);
       }
});


startBtn.addEventListener('click', function(){
     startGame();
     success.style.display = 'none';
     failure.style.display = 'none';
     body.style.backgroundColor = 'white';
});

endGame.addEventListener('click', function(){    
    success.style.display = 'none';
    failure.style.display = 'none';
    end.style.display = 'block';
});

startGameBtn.addEventListener('click', function(){
    startGame();
    startWindow.style.display = 'none';
    music.play();
})

