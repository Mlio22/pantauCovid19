class HeaderBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this._status = true;
        this._theme = "light";
        this.render();
    }

    set connectivity(status) {
        this._status = status;
        this.render();
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

        themeToggleContainer.innerHTML = `<label class="switch" for="checkbox">
        <input type="checkbox" id="checkbox" />
        <div class="slider round"></div>
        </label>`;

        const headerTextContainer = document.createElement("div");
        headerTextContainer.className = `headerTextContainer ${this._theme}`;

        headerTextContainer.innerHTML = `<p class="first">Pantau</p><p class="last">COVID-19</p>`;

        const settingsContainer = document.createElement("div");
        settingsContainer.className = `settingsContainer ${this._theme}`;

        settingsContainer.innerHTML = `<i class="fas fa-cog"></i>`;

        headerContainer.appendChild(themeToggleContainer);
        headerContainer.appendChild(headerTextContainer);
        headerContainer.appendChild(settingsContainer);

        this.appendChild(headerContainer);

        const toggleThemeButton = this.querySelector("input[type='checkbox']");

        toggleThemeButton.addEventListener('change', _ => {

            if (toggleThemeButton.checked == true) {
                this._theme = 'dark';
            } else {
                this._theme = 'light';
            }

            headerContainer.className = `${this._theme}`;
            headerTextContainer.className = `headerTextContainer ${this._theme}`;
            settingsContainer.className = `settingsContainer ${this._theme}`;
            this.setOthersTheme();
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