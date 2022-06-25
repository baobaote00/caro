const wrap = document.querySelector('div.wrap');
const items = document.querySelectorAll('.dropdown-item');
const choiLai = document.querySelector('#choi-lai');
const diLai = document.querySelector('#di-lai');

let length = 20;
let iconX = '<i class="fa-solid fa-1"></i>';
let iconO = '<i class="fa-solid fa-0"></i>';
let current = true;
let currentRotate = 0;
let banCo = createBanCo(length);
let diLui = [];

createWrapper(current, currentRotate, banCo)

diLai.addEventListener('click', (e) => {
    if (diLui.length <= 0) return;
    banCo[diLui[0]][diLui[1]] = null;
    document.querySelector(`[location-x="${diLui[0]}"][location-y="${diLui[1]}"]`).innerHTML = null;
});

function createBanCo(length) {
    let banCo = [];

    for (let i = 0; i < length; i++) {
        banCo.push(new Array(length));
    }

    return banCo;
}

choiLai.addEventListener('click', () => {
    createWrapper(current, currentRotate, banCo);
});

items.forEach((item) => {
    item.addEventListener('click', (e) => {
        const currentElement = e.currentTarget;

        length = currentElement.getAttribute('length');
        banCo = createBanCo(length * 1);

        createWrapper(current, currentRotate, banCo)
    });
})

function createWrapper(current, currentRotate, banCoNew) {
    const heightWindow = window.innerHeight;
    wrap.style.height = (heightWindow * 0.95) + 'px';
    wrap.style.width = (heightWindow * 0.95) + 'px';
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
                current = !current;

                diLui = [x, y];

                currentElement.classList.toggle("flip");

                wrap.style.transform = 'rotate(' + currentRotate + 'deg)';
                currentRotate += 90;

                currentElement.classList.add(banCoNew[x][y]);
                currentElement.classList.remove(banCoNew[x][y] == "X" ? "X-hover" : "O-hover");
                currentElement.innerHTML = banCoNew[x][y] == "X" ? iconX : iconO;

                if (checkWin(banCoNew, x, y)) {
                    $('#exampleModal').modal('toggle')
                    $('#exampleModal').find('#exampleModalLabel').html(`${banCoNew[x][y] == "X" ? iconX : iconO} Win`);
                    wrap.innerHTML = wrap.innerHTML;
                }
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