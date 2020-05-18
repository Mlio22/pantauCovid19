class SettingsBar extends HTMLElement {
    constructor() {
        super();
        this._isOnline = "Online";
        this._localData = "Offline";
        this._globalData = "Loading..";

        this._theme = 'light';
        this._isShowed = '';

        this.className = this._theme;
        this._lang = true;

        this._onlineStyle = "success";
        this._localStyle = "failed";
        this._globalStyle = "loading";
    }

    set show(bool) {
        console.log('aowkawok');

        this._isShowed = bool ? "showed" : "";
    }

    connectedCallback() {
        this.render();


        const rightArrow = this.querySelector("i.fa-arrow-right");

        this.addEventListener("click", e => {
            if (e.target == this || e.target.className == rightArrow.className) {
                document.querySelector("header-bar").toggleSettings();
            }
        })
    }

    set theme(color) {
        this._theme = color;
        this.render();
    }

    set status(statusObject) {

        if ("onlineStatus" in statusObject) {
            const onlineStatus = this.querySelector(".onlineStatus");
            onlineStatus.classList.remove(this._onlineStyle);


            this._isOnline = statusObject.onlineStatus ? "Online" : "Offline";
            this._onlineStyle = statusObject.onlineStatus ? "success" : "failed";

            onlineStatus.innerHTML = this._isOnline;
            onlineStatus.classList.add(this._onlineStyle);

        }
        if ("statusGlobal" in statusObject) {
            const globalStatus = this.querySelector(".globalStatus");
            globalStatus.classList.remove(this._globalStyle);

            this._globalData = statusObject.statusGlobal;
            switch (statusObject.statusGlobal) {
                case "Online":
                    this._globalStyle = "success";
                    break;
                case "Offline":
                    this._globalStyle = "failed";
                    break;
                case "Loading..":
                    this._globalStyle = "loading";
                    break;
            }

            globalStatus.innerHTML = this._globalData;
            globalStatus.classList.add(this._globalStyle);
        }
        if ("statusLocal" in statusObject) {
            const localStatus = this.querySelector(".localStatus");
            localStatus.classList.remove(this._localStyle);
            localStatus.innerHTML = statusObject.statusLocal;
            this._localData = statusObject.statusLocal;

            switch (statusObject.statusLocal) {
                case "Online":
                    this._localStyle = "success";
                    break;
                case "Offline":
                    this._localStyle = "failed";

                    break;
                case "Loading..":
                    this._localStyle = "loading";
                    break;
            };

            localStatus.classList.add(this._localStyle);
        }
    }

    setLang() {
        this.querySelector(".settingsHeader p").innerHTML = this._lang ? "Pengaturan" : "Settings";
        this.querySelector(".langContainer .left").innerHTML = this._lang ? "Bahasa" : "Language";

        document.querySelector("header-bar").lang = this._lang;
        document.querySelector("search-bar").lang = this._lang;
        document.querySelector("list-bar").lang = this._lang;
    }

    render() {
        this.innerHTML = "";
        this.menu = document.createElement("div");
        this.menu.className = `menu ${this._theme} ${this._isShowed}`;

        this.menu.innerHTML = `<div class="settingsHeader"><i class="fas fa-arrow-right"></i><p>Pengaturan</p></div>`


        const statusDiv = document.createElement("div");
        console.log(this._isOnline);

        statusDiv.innerHTML = `<div><p class="left">Status</p></div><div><p class="right onlineStatus ${this._onlineStyle} ${this._theme}">${this._isOnline}</p></div>`

        const languageDiv = document.createElement("div");
        languageDiv.className = "langContainer";

        languageDiv.innerHTML = `<div><p class="left excepction">${this._lang ? "Bahasa" : "Language"}</p></div>
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
        localDataDiv.innerHTML = `<div><p class="left">Data Lokal</p></div><div><p class="right localStatus ${this._localStyle} ${this._theme}">${this._localData}</p></div>`

        const globalDataDiv = document.createElement("div");
        globalDataDiv.innerHTML = `<div><p class="left">Data Global</p></div><div><p class="right globalStatus ${this._globalStyle} ${this._theme}">${this._globalData}</p></div>`

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

        toggleLangButton.checked = !this._lang;

        toggleLangDiv.addEventListener("click", e => {
            toggleLangButton.checked = !toggleLangButton.checked;
            this._lang = !this._lang;

            this.setLang();
        });

        const refreshButton = this.querySelector(".refresh");
        refreshButton.addEventListener("click", _ => {
            document.querySelector("chart-bar").refreshData();
        });
    }
}

customElements.define("settings-bar", SettingsBar);