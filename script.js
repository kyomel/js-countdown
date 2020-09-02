function updateTimer(deadline) {
    var time = deadline - new Date();
    return {
        'hari': Math.floor(time / (1000 * 60 * 60 * 24)),
        'jam': Math.floor((time / (1000 * 60 * 60)) % 24),
        'menit': Math.floor((time / 1000 / 60) % 60),
        'detik': Math.floor((time / 1000) % 60),
        'total': time
    };
}

function animateClock(span) {
    span.className = "turn";
    setTimeout(function () {
        span.className = "";
    }, 700);
}

function startTimer(id, deadline) {
    var timerInterval = setInterval(function () {
        var clock = document.getElementById(id);
        var timer = updateTimer(deadline);

        clock.innerHTML = '<span>' + timer.hari + '</span>'
            + '<span>' + timer.jam + '</span>'
            + '<span>' + timer.menit + '</span>'
            + '<span>' + timer.detik + '</span>';

        // animations
        var spans = clock.getElementsByTagName("span");
        animateClock(spans[3]);
        if (timer.detik == 59) animateClock(spans[2]);
        if (timer.menit == 59 && timer.detik == 59) animateClock(spans[1]);
        if (timer.jam == 23 && timer.menit == 59 && timer.detik == 59) animateClock(spans[0]);

        // check end of timer
        if (timer.total < 1) {
            clearInterval(timerInterval);
            clock.innerHTML = '<span>0</span><span>0</span><span>0</span><span>0</span>';
        }

    }, 1000);
}

window.onload = function () {
    var deadline = new Date("October 1, 2020 18:00:00");
    startTimer("clock", deadline);
}