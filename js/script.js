let banCo = [];
let length = 20;

for (let i = 0; i < length; i++) {
    banCo.push(new Array(length));    
}

const heightWindow = window.innerHeight;
const wrap = document.querySelector('div.wrap');

wrap.style.height = (heightWindow * 0.95) + 'px';
wrap.style.width = (heightWindow * 0.95) + 'px';

let current = true;
for (let i = 0; i < banCo.length; i++) {
    const e = banCo[i];
    for (let j = 0; j < e.length; j++) {
        let e1 = e[j];
        const child = document.createElement("div");
        child.classList.add("box");
        child.setAttribute("location-x", `${i}`);
        child.setAttribute("location-y", `${j}`);

        child.style.width = `calc(${100/length}% - 2px)`;
        child.style.height = `calc(${100/length}% - 2px)`;

        child.addEventListener('click', e => {
            const currentElement = e.currentTarget;
            if (currentElement.innerHTML) return;

            const x = currentElement.getAttribute("location-x");
            const y = currentElement.getAttribute("location-y");
            banCo[x][y] = current ? "X" : "O";
            current = !current;

            e1 = banCo[x][y];

            currentElement.classList.add(banCo[x][y]);
            currentElement.innerHTML = banCo[x][y];

            if (checkWin(banCo, x, y)) {
                alert(checkWin(banCo, x, y));
            }
        });
        wrap.appendChild(child);
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
                console.log(count);
                if (count == 5) {
                    break;
                }
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
                console.log(count);
                if (count == 5) {
                    break;
                }
            } else {
                count = 0;
            }
        }
    }

    return count == 5;
}