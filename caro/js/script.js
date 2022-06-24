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
        const e1 = e[j];
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

            currentElement.classList.add(banCo[x][y]);
            currentElement.innerHTML = banCo[x][y];
        });
        document.querySelector("body").appendChild(child);
    }
}