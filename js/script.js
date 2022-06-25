const wrap = document.querySelector('div.wrap');
const items = document.querySelectorAll('.dropdown-item');
const choiLai = document.querySelector('#choi-lai');
const diLai = document.querySelector('#di-lai');
const clockDisplay = document.getElementById("MyClockDisplay");
let spin = [90, 135, 180, 225, 270, 315];
let deg = 45;
let length = 20;
let iconX = '<i class="fa-solid fa-x"></i>';
let iconO = '<i class="fa-solid fa-o"></i>';
let current = true;
let banCo = createBanCo(length);
let diLui = [];
const changeTime = 30000;
let currentTime = changeTime;
let isWin = false;
let inter;
let isStart = true;

function interTime() {
    if (!isWin) {
        if (currentTime == 0) {
            currentTime = changeTime;
            current = !current;

        }

        const font = current ? "X-font" : "O-font";
        const fontRemove = !current ? "X-font" : "O-font"
        clockDisplay.classList.remove(fontRemove);
        clockDisplay.classList.add(font);
        let time = ((currentTime * 1) / 1000) + "s";
        clockDisplay.innerText = time;
        clockDisplay.textContent = time;
        currentTime = currentTime * 1 - 1000;
    } else {
        const whoWin = !current ? "X Win" : "O Win";
        const font = !current ? "X-font" : "O-font";
        const fontRemove = current ? "X-font" : "O-font"
        clockDisplay.classList.remove(fontRemove);
        clockDisplay.classList.add(font);
        clockDisplay.innerText = whoWin;
        clockDisplay.textContent = whoWin;
        clearInterval(inter);
        isWin = false;
    }

}

diLai.addEventListener('click', (e) => {
    if (diLui.length <= 0) return;
    banCo[diLui[0]][diLui[1]] = null;
    const cur = document.querySelector(`[location-x="${diLui[0]}"][location-y="${diLui[1]}"]`);
    const _class = current ? "O" : "X";
    cur.classList.add(_class);
    current = !current;
    cur.innerHTML = null;
    diLui = [];
    currentTime = changeTime;
});

function createBanCo(length) {
    let banCo = [];

    for (let i = 0; i < length; i++) {
        banCo.push(new Array(length));
    }

    return banCo;
}

choiLai.addEventListener('click', () => {
    const contentBtn = choiLai.innerHTML;
    switch (contentBtn) {
        case 'Start':
            banCo = createBanCo(length * 1);
            createWrapper(banCo);
            clearInterval(inter);
            currentTime = changeTime;
            inter = setInterval(interTime, 1000);
            choiLai.innerHTML = 'Stop';
            break;
        case 'Stop':
            clearInterval(inter);
            wrap.innerHTML = wrap.innerHTML;
            choiLai.innerHTML = 'Start';
            break;
    }
    diLui = [];
    current = true;
    currentTime = changeTime;
});

items.forEach((item) => {
    item.addEventListener('click', (e) => {
        const currentElement = e.currentTarget;

        length = currentElement.getAttribute('length');
        banCo = createBanCo(length * 1);

        createWrapper(banCo)
    });
})

function createWrapper(banCoNew) {
    const heightWindow = window.innerHeight;
    wrap.style.height = (heightWindow * 0.68) + 'px';
    wrap.style.width = (heightWindow * 0.68) + 'px';
    wrap.innerHTML = '';

    for (let i = 0; i < banCoNew.length; i++) {
        const e = banCoNew[i];
        for (let j = 0; j < e.length; j++) {
            const child = document.createElement("div");

            child.classList.add("box");
            child.setAttribute("location-x", `${i}`);
            child.setAttribute("location-y", `${j}`);

            child.style.width = `calc(${100 / length}% - 2px)`;
            child.style.height = `calc(${100 / length}% - 2px)`;

            child.addEventListener('click', e => {
                const currentElement = e.currentTarget;
                if (currentElement.innerHTML) return;

                const x = currentElement.getAttribute("location-x");
                const y = currentElement.getAttribute("location-y");
                banCoNew[x][y] = current ? "X" : "O";
                const fontRemove = !current ? "O-font" : "X-font"
                const font = current ? "O-font" : "X-font"
                clockDisplay.classList.remove(fontRemove);
                clockDisplay.classList.add(font);
                diLui = [x, y];

                currentElement.classList.toggle("flip");
                let rotateDeg = spin[Math.floor(Math.random() * (spin.length - 1) + 1)];
                var carIndex = spin.indexOf(rotateDeg);
                wrap.style.transform = 'rotate(' + rotateDeg + 'deg)';
                spin.splice(carIndex, 1);
                spin.push(deg);
                deg = rotateDeg;
                currentTime = changeTime;

                currentElement.classList.add(banCoNew[x][y]);
                currentElement.classList.remove(banCoNew[x][y] == "X" ? "X-hover" : "O-hover");
                currentElement.innerHTML = banCoNew[x][y] == "X" ? iconX : iconO;

                if (checkWin(banCoNew, x, y)) {
                    $('#exampleModal').modal('toggle')
                    $('#exampleModal').find('#exampleModalLabel').html(`${banCoNew[x][y] == "X" ? iconX : iconO} Win`);
                    wrap.innerHTML = wrap.innerHTML;
                    choiLai.innerHTML = 'Start';
                }
                isWin = checkWin(banCoNew, x, y);
                current = !current;

            });

            const hover = e => {
                const currentElement = e.currentTarget;
                if (currentElement.innerHTML) return;

                currentElement.classList.toggle(current ? "X-hover" : "O-hover");
            }

            child.addEventListener('mouseover', hover);

            child.addEventListener("mouseout", hover)

            wrap.appendChild(child);
        }
    }
}

function checkWin(banCo, x, y) {
    return checkRow(banCo) ||
        checkCol(banCo) ||
        checkCrossDown(x, y) ||
        checkCrossUp(x, y);
}

function checkRow(banCo) {
    for (let i = 0; i < banCo.length; i++) {
        let count = 1;
        for (let j = 0; j < banCo[i].length - 1; j++) {
            if (!banCo[i][j]) continue;

            let check = banCo[i][j] == banCo[i][j + 1];
            count = check ? count + 1 : 0;

            if (count == 5) return true;
        }
    }
}

function checkCol(banCo) {
    for (let i = 0; i < banCo.length; i++) {
        let count = 1;
        for (let j = 0; j < banCo[0].length - 1; j++) {
            if (!banCo[j][i]) continue;

            let check = banCo[j][i] == banCo[j + 1][i];
            count = check ? count + 1 : 0;

            if (count == 5) return true;
        }
    }
}

function checkCrossDown(locationX, locationY) {
    const current = banCo[locationX][locationY];

    let count = 0;
    for (let i = -4; i <= 4; i++) {
        if ((locationX * 1 + i) >= 0 && (locationY * 1 + i) >= 0 && (locationX * 1 + i) < banCo.length && (locationY * 1 + i) < banCo.length) {
            if (banCo[locationX * 1 + i][locationY * 1 + i] == current) {
                count++;
                if (count == 5) break;
            } else {
                count = 0;
            }
        }
    }

    return count == 5;
}

function checkCrossUp(locationX, locationY) {
    const current = banCo[locationX][locationY];

    let count = 0;
    for (let i = -4; i <= 4; i++) {
        if ((locationX * 1 + i) >= 0 && (locationY * 1 - i) >= 0 && (locationX * 1 + i) < banCo.length && (locationY * 1 - i) < banCo.length) {
            if (banCo[locationX * 1 + i][locationY * 1 - i] == current) {
                count++;
                if (count == 5) break;
            } else {
                count = 0;
            }
        }
    }

    return count == 5;
}

var animateButton = function (e) {

    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');

    e.target.classList.add('animate');
    setTimeout(function () {
        e.target.classList.remove('animate');
    }, 700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
}

document.querySelector('.dropleft').addEventListener('mouseover',(e)=>{
    $('.dropdown-toggle').dropdown('toggle')
})

document.querySelector('.dropleft').addEventListener('mouseout',(e)=>{
    $('.dropdown-toggle').dropdown('toggle')
})