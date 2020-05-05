class ListBar extends HTMLElement {
    constructor() {
        super();

        this._newCase = 0;
        this._newDeath = 0;
        this._newRecovered = 0;

        this._oldCase = 0;
        this._oldDeath = 0;
        this._oldRecovered = 0;

        this._positifLokal = 0;
        this._sembuhLokal = 0;
        this._meninggalLokal = 0;

        this._type = "int";
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

    render() {
        this.innerHTML = "";
        const divElement1 = document.createElement("div");
        const divElement2 = document.createElement("div");
        const divElement3 = document.createElement("div");

        divElement1.className = "list1";
        divElement2.className = "list2";
        divElement3.className = "list3";

        divElement1.innerHTML = "<p class='text'>Meninggal</p>";
        divElement2.innerHTML = "<p class='text'>Kasus</p>";
        divElement3.innerHTML = "<p class='text'>Sembuh</p>";

        if (this._type == "int") {
            divElement1.innerHTML += `<p class="oldData">${this._oldDeath}</p><p class="newData">+ ${this._newDeath}</p>`;
            divElement2.innerHTML += `<p class="oldData">${this._oldCase}</p><p class="newData">+ ${this._newCase}</p>`;
            divElement3.innerHTML += `<p class="oldData">${this._oldRecovered}</p><p class="newData">+ ${this._newRecovered}</p>`;
        } else {
            divElement1.innerHTML += `<p class="summary">${this._meninggalLokal}</p>`;
            divElement2.innerHTML += `<p class="summary">${this._positifLokal}</p>`;
            divElement3.innerHTML += `<p class="summary">${this._sembuhLokal}</p>`;
        }

        this.appendChild(divElement1);
        this.appendChild(divElement2);
        this.appendChild(divElement3);
    }
}

customElements.define("list-bar", ListBar);