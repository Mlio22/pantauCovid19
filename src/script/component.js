class HeaderBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = "";
        this.innerHTML += `<h1>PANTAU COVID-19</h1>`;
    }
}

customElements.define("header-bar", HeaderBar);

class ChartBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {

    }
}