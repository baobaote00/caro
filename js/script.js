const banCo = new Array(
    new Array(10),
    new Array(10),
    new Array(10),
    new Array(10),
    new Array(10),
    new Array(10),
    new Array(10),
    new Array(10),
    new Array(10),
    new Array(10),
);

let current = true;

for (let i = 0; i < banCo.length; i++) {
    const e = banCo[i];
    for (let j = 0; j < e.length; j++) {
        let e1 = e[j];
        const child = document.createElement("div");
        child.classList.add("box");
        child.setAttribute("location-x", `${i}`)
        child.setAttribute("location-y", `${j}`)
        child.addEventListener('click', e => {
            const currentElement = e.currentTarget;
            if (currentElement.innerHTML) return;

            const x = currentElement.getAttribute("location-x");
            const y = currentElement.getAttribute("location-y");
            banCo[x][y] = current ? "X" : "Y";
            current = !current;

            e1 = banCo[x][y];

            currentElement.classList.add(banCo[x][y]);
            currentElement.innerHTML = banCo[x][y];

            // console.log(checkRow(banCo));
            console.log(checkCross(x, y));
        });
        document.querySelector("body").appendChild(child);
    }
}

function checkWin(banCo) {

}

function checkRow(banCo) {
    for (let i = 0; i < banCo.length; i++) {
        let count = 1;
        for (let j = 0; j < banCo[i].length - 1; j++) {
            if (!banCo[i][j]) continue;

            let check = banCo[i][j] == banCo[i][j + 1];
            count = check ? count + 1 : 0;

            if (count == 5) return count;
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

            if (count == 5) return count;
        }
    }
}
function checkCross(locationX, locationY) {
    const current = banCo[locationX][locationY];

    let point = [locationX, locationY];

    for (let i = 0; i < 10; i++) {
        if ((locationX - i) < 0 || (locationX - i) > 10 || (locationY - i) < 0 || (locationY - i) > 10) {
            break;
        }
        if (banCo[locationX - i][locationY - i] != current) {
            point = [locationX - i + 1, locationY - i + 1]
            break;
        }
    }

    for (let i = 0; i < 5; i++) {
        if ((point[0] + i) < 0 || (point[0] + i) >= 10 || (point[1] + i) < 0 || (point[1] + i) >= 10) {
            return false
        }
        if (banCo[(point[0]+i)*1][(point[1]+i)*1] != current) {
            return false
        }
    }

    return true;
}