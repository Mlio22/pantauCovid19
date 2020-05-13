class SettingsBar extends HTMLElement {
    constructor() {
        super();
        this._isOnline = true;
        this._localData = "Offline";
        this._globalData = "Online";
    }

    connectedCallback() {
        this.render();
        console.log('aowk');

    }

    render() {
        const menu = document.createElement("div");
        menu.className = "menu";

        menu.innerHTML = `<div class="settingsHeader"><i class="fas fa-arrow-right"></i><p>Pengaturan</p></div>`


        const statusDiv = document.createElement("div");
        statusDiv.innerHTML = `<div><p class="left">Status</p></div><div><p class="right success">Online</p></div>`

        const languageDiv = document.createElement("div");
        languageDiv.className = "langContainer";

        languageDiv.innerHTML = `<div><p class="left excepction">Bahasa</p></div>
        <div class="exception">
        <div class="toggleLang">
        <p>ID</p>
        <label class="switch langSettings" for="checkbox">
        <input class="others" type="checkbox" id="langToggle"/>
        <div class="slider round"></div>
        </label>
        <p>EN</p>
        </div></div>
        `;

        const localDataDiv = document.createElement("div");
        localDataDiv.innerHTML = `<div><p class="left">Data Lokal</p></div><div><p class="right failed">Offline</p></div>`

        const globalDataDiv = document.createElement("div");
        globalDataDiv.innerHTML = `<div><p class="left">Data Global</p></div><div><p class="right loading">Loading</p></div>`

        const refreshDiv = document.createElement("div");
        refreshDiv.className = "refreshContainer";
        refreshDiv.innerHTML = `<div class="refresh exception"><p>Refresh Data</p></div>`

        const repoDiv = document.createElement("div");
        repoDiv.className = "repoContainer";
        repoDiv.innerHTML = `<div class="repo exception"><i class="fab fa-github"></i><a href="https://google.com"><p>Github Repo</p></a></div>`

        menu.appendChild(languageDiv);
        menu.appendChild(statusDiv);
        menu.appendChild(localDataDiv);
        menu.appendChild(globalDataDiv);
        menu.appendChild(refreshDiv);
        menu.appendChild(repoDiv);

        this.appendChild(menu);

        const toggleLangDiv = this.querySelector(".langSettings");
        const toggleLangButton = this.querySelector("#langToggle");


        toggleLangDiv.addEventListener("click", _ => {
            toggleLangButton.checked = !toggleLangButton.checked;
            console.log("lol");
        });

        const rightArrow = this.querySelector("i.fa-arrow-right");

        this.addEventListener("click", e => {
            console.log(e);

            if (e.target == this || e.target == rightArrow) {
                document.querySelector("header-bar").toggleSettings();
            }
        })
    }
}

customElements.define("settings-bar", SettingsBar);