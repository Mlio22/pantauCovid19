class SettingsBar extends HTMLElement {
    constructor() {
        super();
        this._isOnline = "Online";
        this._localData = "Offline";
        this._globalData = "Loading..";
        this._theme = 'dark';
        this.className = this._theme;
    }

    connectedCallback() {
        this.render();
        console.log('aowk');
    }

    set theme(color) {
        console.log('aowkaowk');
        this.classList.remove(this._theme);
        this.classList.add(color);
        this.querySelector("div.menu").classList.remove(this._theme);
        this.querySelector("div.menu").classList.add(color);
        this.querySelectorAll(".menu p").forEach(p => {
            p.classList.remove(this._theme);
            p.classList.add(color);
        });
        this.querySelectorAll(".menu i").forEach(i => {
            i.classList.remove(this._theme);
            i.classList.add(color);
        });
        this.querySelector(".toggleLang").classList.remove(this._theme);
        this.querySelector(".toggleLang").classList.add(color);
        this.querySelector(".refresh").classList.remove(this._theme);
        this.querySelector(".refresh").classList.add(color);


        this._theme = color;

    }

    render() {
        this.menu = document.createElement("div");
        this.menu.className = `menu ${this._theme}`;

        this.menu.innerHTML = `<div class="settingsHeader"><i class="fas fa-arrow-right"></i><p>Pengaturan</p></div>`


        const statusDiv = document.createElement("div");
        statusDiv.innerHTML = `<div><p class="left">Status</p></div><div><p class="right success ${this._theme}">${this._isOnline}</p></div>`

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
        localDataDiv.innerHTML = `<div><p class="left">Data Lokal</p></div><div><p class="right failed ${this._theme}">${this._localData}</p></div>`

        const globalDataDiv = document.createElement("div");
        globalDataDiv.innerHTML = `<div><p class="left">Data Global</p></div><div><p class="right loading ${this._theme}">${this._globalData}</p></div>`

        const refreshDiv = document.createElement("div");
        refreshDiv.className = "refreshContainer";
        refreshDiv.innerHTML = `<div class="refresh exception"><p>Refresh Data</p></div>`

        const repoDiv = document.createElement("div");
        repoDiv.className = "repoContainer";
        repoDiv.innerHTML = `<div class="repo exception"><i class="fab fa-github"></i><a href="https://google.com"><p>Github Repo</p></a></div>`

        this.menu.appendChild(languageDiv);
        this.menu.appendChild(statusDiv);
        this.menu.appendChild(localDataDiv);
        this.menu.appendChild(globalDataDiv);
        this.menu.appendChild(refreshDiv);
        this.menu.appendChild(repoDiv);

        this.appendChild(this.menu);

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