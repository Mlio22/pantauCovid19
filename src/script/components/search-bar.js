class SearchBar extends HTMLElement {
    constructor() {
        super();
        this._country = "Global";
        this._countrySlug = "global";
        this._province = "";

        this._anyDataAvailable = false;
        this._status = false;

        this._firstTime = true;
    }

    connectedCallback() {
        this.renderLocation();
    }

    set location(locationObject) {
        this._country = locationObject.country;
        this._province = locationObject.province;
        this._countrySlug = locationObject.slug;
        this.renderLocation();
    }

    set ready(status) {
        this._status = status;
        this.renderLocation();
    }

    set dataAvailablity(availablity) {
        this._isIntAvailable = availablity.isIntAvailable;
        this._isDomAvailable = availablity.isDomAvailable;
        this._anyDataAvailable = this._isDomAvailable || this._isIntAvailable;
        console.log(this._isIntAvailable, this._isDomAvailable);
        this.renderLocation();
    }

    setAvailableDefault() {
        if (this._anyDataAvailable) {
            if (this._isIntAvailable) {
                // ada data int

                this._country = "Global";
                this._countrySlug = "global";
                this._province = "";


            } else if (this._isDomAvailable) {
                // ada data dom

                this._country = "Indonesia";
                this._countrySlug = "indonesia";
                this._province = "Global";
            }

            document.querySelector("chart-bar").urlLocation = {
                "country": this._country,
                "province": this._province,
                "slug": this._countrySlug
            };
        }
        this.renderLocation();
    }

    renderLocation() {
        this.innerHTML = `<div id="searchElement">${this.message}</div>`;
        const p = this.querySelector("#searchElement");


        if (this._firstTime) {
            this.message = "Loading All Data. Please Wait...";
            this._firstTime = false;
        } else if (this._anyDataAvailable) {
            this.message = "";


            if (this._province == "") {
                this.message += this._country;
            } else {
                this.message += `${this._province}, ${this._country}`
            }

            if (!this._status) {
                this.message = `Loading Data ${this.message}...`;
            }

            p.addEventListener("mouseover", () => {
                if (this.childNodes.length < 2) {
                    if (typeof(to) != undefined) {
                        clearTimeout(to);
                    }
                    var to = setTimeout(() => {
                        p.innerText = "Silahkan tekan untuk mencari...";
                    }, 100);
                }

            });

            p.addEventListener("mouseout", () => {
                if (this.childNodes.length < 2) {
                    if (typeof(to) != undefined) {
                        clearTimeout(to);
                    }
                    var to = setTimeout(() => {
                        p.innerText = this.message;
                    }, 100);
                }
            });

            p.addEventListener("click", () => {
                // console.log({
                //     "header-bar": window.getComputedStyle(document.querySelector("header-bar")).height,
                //     "chart-bar": window.getComputedStyle(document.querySelector("canvas")).height,
                //     "search-bar": window.getComputedStyle(this).height
                // });

                if (this._status) {
                    const modalPopupelement = document.createElement("modal-popup");
                    modalPopupelement.selectedCountry = {
                        "country": this._country,
                        "province": this._province,
                        "slug": this._countrySlug
                    }

                    modalPopupelement.availableCountry = {
                        "int": this._isIntAvailable,
                        "dom": this._isDomAvailable
                    }

                    this.appendChild(modalPopupelement);
                }
            });
        } else {
            this.message = "Data Tidak Ada!";
        }
        p.innerHTML = this.message;

    }
}

customElements.define("search-bar", SearchBar);