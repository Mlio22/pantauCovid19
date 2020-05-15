class ListBar extends HTMLElement {
    constructor() {
        super();

        this._case = "Loading Data...";
        this._death = "Loading Data...";
        this._recovered = "Loading Data...";

        this._type = "int";
        this._theme = "light";
    }

    connectedCallback() {
        this.render();
    }

    formatNumber(number = 0) {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    set data(chartData) {
        this._type = chartData.type;

        if (this._type == "int") {
            this._case = this.formatNumber(chartData.case);
            this._death = this.formatNumber(chartData.death);
            this._recovered = this.formatNumber(chartData.recovered);
            console.log("mya");

        } else {
            console.log('myk');

            this._case = this.formatNumber(chartData.positifLokal);
            this._death = this.formatNumber(chartData.meninggalLokal);
            this._recovered = this.formatNumber(chartData.sembuhLokal);
        }
        console.log(chartData);

        if (this._case == -1) {
            this._case = "NULL";
            this._death = "NULL";
            this._recovered = "NULL";
        }

        this.render();
    }

    set theme(color) {
        this._theme = color;
        console.log(color);

        const divs = this.querySelectorAll("div");
        divs.forEach(div => {
            div.className = this._theme;
        });
        this.render();

    }

    render() {
        this.innerHTML = "";
        const divElement1 = document.createElement("div");
        const divElement2 = document.createElement("div");
        const divElement3 = document.createElement("div");

        divElement1.className = `${this._theme}`;
        divElement2.className = `${this._theme}`;
        divElement3.className = `${this._theme}`;

        divElement1.innerHTML = `<p class='text kasus'>Total Kasus</p><p class="data kasus">${this._case}</p>`;
        divElement2.innerHTML = `<p class='text sembuh'>Sembuh</p><p class="data sembuh">${this._recovered}</p>`;
        divElement3.innerHTML = `<p class='text meninggal'>Meninggal</p><p class="data meninggal">${this._death}</p>`;

        // if (this._type == "int") {
        //     divElement1.innerHTML += `<p class="oldData">${this._oldDeath}</p><p class="newData">+ ${this._newDeath}</p>`;
        //     divElement2.innerHTML += `<p class="oldData">${this._oldCase}</p><p class="newData">+ ${this._newCase}</p>`;
        //     divElement3.innerHTML += `<p class="oldData">${this._oldRecovered}</p><p class="newData">+ ${this._newRecovered}</p>`;
        // } else {
        //     divElement1.innerHTML += `<p class="summary">${this._meninggalLokal}</p>`;
        //     divElement2.innerHTML += `<p class="summary">${this._positifLokal}</p>`;
        //     divElement3.innerHTML += `<p class="summary">${this._sembuhLokal}</p>`;
        // }

        this.appendChild(divElement1);
        this.appendChild(divElement2);
        this.appendChild(divElement3);
    }
}

customElements.define("list-bar", ListBar);