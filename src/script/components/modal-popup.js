import countries from "../data/global-countries.js";
import indonesiaProvinces from "../data/indonesia-provinces.js";
import "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.js";
import "../../../node_modules/select2/dist/js/select2.min.js";

class ModalPopup extends HTMLElement {
    constructor() {
        super();

        this._selectedCountry = "Indonesia";
        this._selectedProvince = "DKI Jakarta";
        this._selectedCountrySlug = "indonesia";

        this._intStatus = true;
        this._domStatus = true;

        this.countryAddition = `<option value="global">Global</option>`;
        this.indonesiaProvinceAddition = `<option value="Global">Global</option>`;

        countries.forEach(country => {
            this.countryAddition += `<option value="${country.slug}">${country.name}</option>`;
        });

        indonesiaProvinces.forEach(provinceGroup => {
            this.indonesiaProvinceAddition += `<optgroup label=${provinceGroup.name}>`;
            provinceGroup.content.forEach(province => {
                this.indonesiaProvinceAddition += `<option value="${province}">${province}</option>`;
            });
            this.indonesiaProvinceAddition += `</optgroup>`;
        });
        this.indonesiaProvinceAddition += `<optgroup><option></option><option></option></optgroup>`;

    }

    connectedCallback() {
        this.render();
        this.toggle();
    }

    set selectedCountry(selectedObject) {
        this._selectedCountry = selectedObject.country;
        this._selectedProvince = selectedObject.province;
        this._selectedCountrySlug = selectedObject.slug;

        console.log(selectedObject);
        this.render();
        this.toggle();
    }

    set availableCountry(availableObject) {
        this._intStatus = availableObject.int;
        this._domStatus = availableObject.dom;
        this.render();
        this.toggle();
    }

    render() {
        document.body.style.overflow = "hidden";
        this._innerHTML = `<div class="modal">
        <div class="modal-content">
            <button class="close-button">×</button>`;

        if (this._intStatus || this._domStatus) {
            this._innerHTML += `<div id="select-country-div">
                <p>Silahkan pilih negara</p>
                <select id="select-country">`;

            if (this._intStatus) {
                if (!this._domStatus) {
                    console.log('dom status tidak ada jadi dihapus');
                    this.countryAddition = this.countryAddition.replace('<option value="indonesia">Indonesia</option>', '');
                } else {
                    const indonesiaProvinces = this.indonesiaProvinceAddition;
                }
                console.log(this.countryAddition);

                this._innerHTML += this.countryAddition;

            } else if (this._domStatus) {
                this._innerHTML += `<option value="indonesia">Indonesia</option>`;
            }

            this._innerHTML += `
                </select>
            </div>
            `;

            if (this._selectedCountry == "Indonesia") {
                this._innerHTML += `<div id="select-province-div">
                <select id="select-province">${this.indonesiaProvinceAddition}</select>
            </div>`;
            }

            this._innerHTML += `<div id="confirm-div">
                <button class="confirm-button">Cari Data!</button>
            </div>`;
        } else {
            this._innerHTML += `<p>Data Tidak Ada, Silahkan Refresh</p>`
        }

        this._innerHTML += `</div></div>`;

        this.innerHTML = this._innerHTML;

        this.querySelector(".close-button").addEventListener("click", () => {
            this.toggle();
            setTimeout(() => {
                document.body.style.overflow = "auto";

                this.remove();
            }, 250);
        });

        if (this._intStatus || this._domStatus) {

            this.isTouchDevice = 'ontouchstart' in document.documentElement;
            this.m = 0;
            this.m = this.isTouchDevice === true ? -1 : 0;

            $("#select-country").select2({
                "width": "50%",
                "minimumResultsForSearch": this.m
            });

            $("#select-country").val(this._selectedCountrySlug);
            $("#select-country").trigger("change");

            console.log("berubah", this._selectedCountrySlug);

            if (this._domStatus && this._selectedCountry == "Indonesia") {
                $("#select-province").select2({
                    "width": "75%",
                    "minimumResultsForSearch": this.m
                });

                $("#select-province").val(this._selectedProvince);
                $("#select-province").trigger("change");

                $("#select-province").on("select2:select", (e) => {
                    const dataProvince = e.params.data;
                    this._selectedProvince = dataProvince.text;
                });
            }

            $("#select-country").on("select2:select", (e) => {
                console.log(e);

                const dataCountry = e.params.data;

                this._selectedCountry = dataCountry.text;
                this._selectedCountrySlug = dataCountry.id;

                if (this._domStatus && dataCountry.text == "Indonesia") {
                    const selectProvinceDivElement = document.createElement("div");
                    selectProvinceDivElement.id = "select-province-div";

                    selectProvinceDivElement.innerHTML = `<p>Silahkan Pilih provinsi</p>`;
                    const selectProvinceElement = document.createElement("select");
                    selectProvinceElement.id = "select-province";

                    selectProvinceElement.innerHTML = `${this.indonesiaProvinceAddition}`;

                    selectProvinceDivElement.appendChild(selectProvinceElement);

                    document.querySelector(".modal-content").insertBefore(selectProvinceDivElement, document.querySelector("#confirm-div"));

                    $("#select-province").select2({
                        "width": "40%",
                        "minimumResultsForSearch": this.m
                    });

                    $("#select-province").on("select2:select", (e) => {
                        const dataProvince = e.params.data;
                        this._selectedProvince = dataProvince.text;
                        console.log(this._selectedCountry, this._selectedProvince, this._selectedCountrySlug);
                    });

                } else {
                    this._selectedProvince = "";
                    if (document.querySelector("div#select-province-div") != null) {
                        document.querySelector("div#select-province-div").remove();
                    }
                }
            });

            this.querySelector(".confirm-button").addEventListener("click", () => {
                this.toggle();

                this.parentElement.location = {
                    "country": this._selectedCountry,
                    "province": this._selectedProvince,
                    "slug": this._selectedCountrySlug
                }

                document.querySelector("chart-bar").urlLocation = {
                    "trigger": "modal",

                    "country": this._selectedCountry,
                    "province": this._selectedProvince,
                    "slug": this._selectedCountrySlug
                }

                setTimeout(() => {
                    document.body.style.overflow = "auto";

                    this.remove();
                }, 250);
            });
        }
    }

    toggle() {

        this.modal = this.querySelector(".modal");
        this.modal.classList.toggle("show-modal");
    }
}

customElements.define("modal-popup", ModalPopup);