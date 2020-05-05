class HeaderBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this._status = true;
        this.render();
    }

    set connectivity(status) {
        this._status = status;
        this.render();
    }

    render() {
        this.innerHTML = "";
        this.innerHTML += `<h1>PANTAU COVID-19</h1>`;

        const p = document.createElement("p");

        p.innerHTML = this._status ? "Online" : "Offline";
        p.className = this._status ? "online" : "offline";

        this.appendChild(p);
    }
}

customElements.define("header-bar", HeaderBar);