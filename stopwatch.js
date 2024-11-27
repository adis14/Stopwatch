let timer;
let isRunning = false;
let startTime = 0, updatedTime = 0, difference = 0;
let minutes = 0, seconds = 0, milliseconds = 0;

function startStopwatch() {
    const startButton = document.getElementById('start');
    const buttonText = startButton.querySelector('span');

    if (!isRunning) {
        isRunning = true;
        startTime = new Date().getTime() - difference;

        timer = setInterval(function() {
            updatedTime = new Date().getTime();
            difference = updatedTime - startTime;

            minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            seconds = Math.floor((difference % (1000 * 60)) / 1000);
            milliseconds = Math.floor((difference % 1000) / 10);

            document.getElementById('display').textContent =
                (minutes < 10 ? "0" + minutes : minutes) + ":" +
                (seconds < 10 ? "0" + seconds : seconds) + ":" +
                (milliseconds < 10 ? "0" + milliseconds : milliseconds);
        }, 10); // Update every 10ms to reduce jitter

        buttonText.classList.add('hidden');
        setTimeout(() => {
            buttonText.textContent = "Pause";
            buttonText.classList.remove('hidden');
        }, 20); // Shorter duration for smoother transition
    } else {
        isRunning = false;
        clearInterval(timer);

        buttonText.classList.add('hidden');
        setTimeout(() => {
            buttonText.textContent = "Continue";
            buttonText.classList.remove('hidden');
        }, 20); // Shorter duration for smoother transition
    }
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    startTime = 0;
    difference = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    document.getElementById('display').textContent = "00:00:00";
    
    const buttonText = document.getElementById('start').querySelector('span');
    buttonText.classList.add('hidden');
    setTimeout(() => {
        buttonText.textContent = "Start";
        buttonText.classList.remove('hidden');
    }, 20); // Shorter duration for smoother transition
}

document.getElementById('start').addEventListener('click', startStopwatch);
document.getElementById('reset').addEventListener('click', resetStopwatch);
