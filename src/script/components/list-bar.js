class ListBar extends HTMLElement {
    constructor() {
        super();

        this._oldCase = 0;
        this._oldDeath = 0;
        this._oldRecovered = 0;

        this._positifLokal = 0;
        this._sembuhLokal = 0;
        this._meninggalLokal = 0;

        this._type = "dom";
        this._theme = "light";
    }

    connectedCallback() {
        this.render();
    }

    set data(chartData) {
        console.log("hello");
        this._type = chartData.type;

        if (this._type == "int") {
            this._newCase = chartData.newCase;
            this._newDeath = chartData.newDeath;
            this._newRecovered = chartData.newRecovered;

            this._oldCase = chartData.oldCase;
            this._oldDeath = chartData.oldDeath;
            this._oldRecovered = chartData.oldRecovered;
        } else {
            this._positifLokal = chartData.positifLokal;
            this._sembuhLokal = chartData.sembuhLokal;
            this._meninggalLokal = chartData.meninggalLokal;
        }

        console.log(chartData);

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

        divElement1.innerHTML = `<p class='text kasus'>Total Kasus</p><p class="data kasus">10.000</p>`;
        divElement2.innerHTML = `<p class='text sembuh'>Sembuh</p><p class="data sembuh">200.000</p>`;
        divElement3.innerHTML = `<p class='text meninggal'>Meninggal</p><p class="data meninggal">10</p>`;

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