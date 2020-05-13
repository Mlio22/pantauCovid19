class HeaderBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this._status = true;
        this._theme = "light";
        this._isSettingsOn = false;
        this.render();
    }

    set connectivity(status) {
        this._status = status;
        this.render();
    }

    toggleSettings() {
        this.querySelector(".settingsContainer").classList.toggle("settingsOn");
        this.classList.toggle("settingsOn");

        document.querySelector("settings-bar").classList.toggle("showed");
        document.querySelector("settings-bar .menu").classList.toggle("showed");

        this._isSettingsOn = !this._isSettingsOn;

        if (this._isSettingsOn) {
            document.body.style.overflowY = "hidden";
            document.body.style.touchAction = "none";
        } else {
            document.body.style.overflowY = "auto";
            document.body.style.touchAction = "auto";

        }
    }

    render() {
        this.innerHTML = "";
        this.setOthersTheme();

        // tergantung saat ukuran media
        this.className = "";

        const headerContainer = document.createElement("div");
        headerContainer.className = `${this._theme}`;

        const themeToggleContainer = document.createElement("div");
        themeToggleContainer.className = `toggleThemeContainer`;

        themeToggleContainer.innerHTML = `<label class="switch header" for="checkbox">
        <input class="toggleTheme" type="checkbox" id="themeToggle" />
        <div class="slider round"></div>
        </label>`;

        const headerTextContainer = document.createElement("div");
        headerTextContainer.className = `headerTextContainer ${this._theme}`;

        headerTextContainer.innerHTML = `<p class="first">Pantau</p><p class="last">COVID-19</p>`;

        const settingsContainer = document.createElement("div");
        settingsContainer.className = `settingsContainer ${this._theme}`;

        settingsContainer.innerHTML = `<i class="fas fa-times"></i><i class="fas fa-cog"></i>`;

        headerContainer.appendChild(themeToggleContainer);
        headerContainer.appendChild(headerTextContainer);
        headerContainer.appendChild(settingsContainer);

        this.appendChild(headerContainer);

        const toggleThemeDiv = this.querySelector(".switch.header");
        const toggleThemeButton = this.querySelector("input#themeToggle");

        toggleThemeDiv.addEventListener("click", _ => {
            toggleThemeButton.checked = !toggleThemeButton.checked;
            headerTextContainer.classList.remove(this._theme);
            settingsContainer.classList.remove(this._theme);


            if (toggleThemeButton.checked == true) {
                this._theme = 'dark';
            } else {
                this._theme = 'light';
            }

            headerContainer.className = `${this._theme}`;
            headerTextContainer.classList.add(this._theme);
            settingsContainer.classList.add(this._theme);
            this.setOthersTheme();

        })

        this.querySelector(".settingsContainer").addEventListener("click", _ => {
            this.toggleSettings();
        });


    }

    setOthersTheme() {
        document.body.className = this._theme;
        document.querySelector(".container").className = `container ${this._theme}`;
        document.querySelector("chart-bar").theme = this._theme;
        document.querySelector("search-bar").theme = this._theme;
        document.querySelector("list-bar").theme = this._theme;
    }
}

customElements.define("header-bar", HeaderBar);