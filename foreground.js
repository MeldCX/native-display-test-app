chrome.power.requestKeepAwake(chrome.power.Level.DISPLAY);

const reloadButton = document.getElementById("reload");
reloadButton.onclick = () => window.location.reload();

const printInfoButton = document.getElementById("printInfo");
printInfoButton.addEventListener("click", () => {
    chrome.system.display.getInfo({}, (displays) => {
        displays.forEach((display) => {
            Object.entries(display).forEach(([key, value]) => {
                console.log(key, JSON.stringify(value));
            });
        });
    });
});

updateInfo();
chrome.system.display.onDisplayChanged.addListener(() => updateInfo());

function updateInfo() {
    chrome.system.display.getInfo({}, (displays) => {
        const newInfo = document.createElement('span');

        // Create info-section for each display
        displays.forEach(display => {
            const div = document.createElement("div");
            div.id = `display-${display.id}`;
            div.classList.add("display-info");

            // Create title
            const title = document.createElement("p");
            title.textContent = `Display ${display.id}`;
            title.classList.add("title");
            div.appendChild(title);

            // Create 'modes' sub-title
            const modesTitle = document.createElement("p");
            modesTitle.textContent = "Modes";
            modesTitle.classList.add("sub-title");

            // Create table
            const table = document.createElement("table");

            // Populate headers
            const headers = document.createElement("tr");
            const fields = ["index", ...Object.keys(display.modes[0]), "Action"];
            fields.forEach((field) => {
                const header = document.createElement("th");
                header.textContent = field;
                headers.appendChild(header);
            });
            table.appendChild(headers);

            // Populate rows
            display.modes.forEach((mode, index) => {
                const tr = document.createElement("tr");

                // Add index TD
                let td = document.createElement("td");
                td.textContent = index;
                tr.appendChild(td);

                Object.values(mode).forEach((value) => {
                    td = document.createElement("td");
                    td.textContent = value;
                    tr.appendChild(td);
                });

                // Add action
                td = document.createElement("td");
                const button = document.createElement("button");
                button.textContent = "Apply";
                button.onclick = () => setDisplayMode(display.id, mode);
                td.appendChild(button);
                tr.appendChild(td);

                table.appendChild(tr);
            });

            div.appendChild(modesTitle);
            div.appendChild(table);

            newInfo.appendChild(div);
        });

        // Replace current info with new info
        const info = document.getElementById("info");
        info.innerHTML = '';
        info.appendChild(newInfo);
    });
}

function setDisplayMode(id, mode) {
    return new Promise((resolve, reject) => {
        chrome.system.display.setDisplayProperties(
            id,
            { displayMode: mode },
            () => {
                if (chrome.runtime.lastError) {
                    console.error(
                        `Failed to set mode on display ${id} - ${chrome.runtime.lastError.message}`
                    );
                    reject();
                } else {
                    resolve();
                    console.log(`Successfully applied mode to display ${id}`);
                }
            }
        );
    });
}
