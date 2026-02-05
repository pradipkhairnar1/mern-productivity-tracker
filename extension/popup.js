chrome.storage.local.get(["timeData"], (result) => {

    const dataDiv = document.getElementById("data");
    const data = result.timeData || {};

    for (let site in data) {

        const time = (data[site] / 1000).toFixed(2);

        const p = document.createElement("p");
        p.textContent = `${site} : ${time} seconds`;

        dataDiv.appendChild(p);
    }
});
