const baseUrlInt = "https://api.covid19api.com/summary";
const baseUrlDom = "https://cors-anywhere.herokuapp.com/https://api.kawalcorona.com/indonesia/provinsi/";
const fetchTimeout = 100000;

class ChartBar extends HTMLElement {
    constructor() {
        super();
        this._country = "Indonesia";
        this._slug = "indonesia";
        this._province = "Global";

        this._intStatus = false;
        this._domStatus = false;

        this._intTimeout = false;
        this._domTimeout = false;

        this._case = -1;
        this._death = -1;
        this._recovered = -1;

        this._positifLokal = 0;
        this._sembuhLokal = 0;
        this._meninggalLokal = 0;

        this.config = {
            type: "doughnut",
            data: {
                labels: ["Kasus", "Sembuh", "Meninggal"],
                datasets: [{
                    data: [this._case, this._recovered, this._death, this._positifLokal, this._sembuhLokal, this._MeninggalLokal],
                    backgroundColor: ["#EE575E", "#627DBC", "#7A7A7A", "#4636a8", "#4d4747", "#383535"],
                }]
            },
            options: {
                legend: {
                    display: false,
                    position: 'bottom',
                },
                maintainAspecRatio: true,
                aspectRatio: 1,
                cutoutPercentage: 60,
            }
        }
    }

    set urlLocation(locationObject) {
        this._country = locationObject.country;
        this._province = locationObject.province;
        this._slug = locationObject.slug;
        this.searchData();
    }

    setLocalZero() {
        this._positifLokal = 0;
        this._sembuhLokal = 0;
        this._meninggalLokal = 0;
    }

    searchData() {
        document.querySelector("search-bar").ready = false;

        if (this._domStatus || this._intStatus) {
            if (this._country == "Indonesia" && this._domStatus) {
                this.setLocalZero();

                //? Suggestion : mengganti forEach dengan yang lain agar efisien

                this._domData.forEach(data => {
                    if (this._province != "Global") {
                        if (this._province == data.attributes.Provinsi) {
                            this._positifLokal += data.attributes.Kasus_Posi;
                            this._sembuhLokal += data.attributes.Kasus_Semb;
                            this._meninggalLokal += data.attributes.Kasus_Meni;
                        }
                    } else {
                        this._positifLokal += data.attributes.Kasus_Posi;
                        this._sembuhLokal += data.attributes.Kasus_Semb;
                        this._meninggalLokal += data.attributes.Kasus_Meni;
                    }
                });

                document.querySelector("list-bar").data = {
                    "type": "dom",
                    "positifLokal": this._positifLokal,
                    "sembuhLokal": this._sembuhLokal,
                    "meninggalLokal": this._meninggalLokal
                }

                this.config.data.datasets[0].data = [this._positifLokal, this._sembuhLokal, this._meninggalLokal];

            } else if (this._country != "Indonesia" && this._intStatus) {
                this._case = -1;
                this._death = -1;
                this._recovered = -1;

                if (this._intTimeout) {
                    return 0;
                }

                if (this._country == "Global") {
                    let data = this._intData.Global;

                    this._case = data.TotalConfirmed;
                    this._death = data.TotalDeaths;
                    this._recovered = data.TotalRecovered;
                }

                this._intData.Countries.forEach(data => {

                    if (data.Country == this._country) {
                        this._case = data.TotalConfirmed;
                        this._death = data.TotalDeaths;
                        this._recovered = data.TotalRecovered;
                    }
                });

                document.querySelector("list-bar").data = {
                    "type": "int",
                    "case": this._case,
                    "death": this._death,
                    "recovered": this._recovered,
                }

                if (this._case == 0 && this._death == 0 && this._recovered == 0) {
                    this._case = -1;
                    this._death = -1;
                    this._recovered = -1;
                }

                this.config.data.datasets[0].data = [this._case, this._recovered, this._death];

            } else {
                document.querySelector("search-bar").setAvailableDefault();
                return 0;
            }
            this.updateChart();
            document.querySelector("search-bar").ready = true;
        } else {
            //! error total
        }
    }

    fetchIntData() {
        document.querySelector("settings-bar").status = {
            "statusGlobal": "Loading.."
        }
        return new Promise(resolve => {
            const to1 = setTimeout(() => {
                this._intTimeout = true;
                this._intStatus = this._intStatus || false;
                resolve("");

            }, fetchTimeout);

            fetch(baseUrlInt)
                .then(response => {
                    return new Promise((resolve, reject) => {
                        if (response.status == 200) {
                            resolve(response.json());
                        } else {
                            reject("");
                        }
                    })
                })
                .then(responseJson => {
                    clearTimeout(to1);
                    this._intStatus = true;
                    this._intData = responseJson;
                })
                .then(_ => resolve(""))
                .catch(_ => {
                    this._intStatus = this._intStatus || false;
                    clearTimeout(to1);
                    resolve("");
                });
        });

    }

    // https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
    //! untuk solving masalah mengenai cors error pada fetchDomData()

    fetchDomData() {
        document.querySelector("settings-bar").status = {
            "statusLocal": "Loading.."
        }
        return new Promise(resolve => {
            const to2 = setTimeout(() => {
                this._domTimeout = true;

                this._domStatus = this._domStatus || false;
                resolve("");
            }, fetchTimeout);

            fetch(baseUrlDom)
                .then(response => {
                    return new Promise((resolve, reject) => {

                        if (response.status == 200) {
                            resolve(response.json());
                        } else {
                            reject("");
                        }
                    })
                })
                .then(responseJson => {
                    clearTimeout(to2);

                    this._domStatus = true;
                    this._domData = responseJson;
                })
                .then(_ => resolve(""))
                .catch(response => {
                    this._domStatus = this._domStatus || false;
                    clearTimeout(to2);
                    resolve("");
                })
        });
    }
    refreshData() {
        console.log("data refreshed");

        this.promiseAllFetchData = [this.fetchIntData(), this.fetchDomData()];
        Promise.all(this.promiseAllFetchData)
            .then(_ => {
                document.querySelector("search-bar").dataAvailablity = {
                    "isDomAvailable": this._domStatus,
                    "isIntAvailable": this._intStatus
                };

                document.querySelector("settings-bar").status = {
                    "statusGlobal": this._intStatus ? "Online" : "Offline",
                    "statusLocal": this._domStatus ? "Online" : "Offline"
                }

                this.searchData();
            });
    }

    connectedCallback() {
        this.innerHTML = "<canvas id='chart'></canvas>";
        this.chartElement = document.getElementById("chart");
        this.doughnutChart = new Chart(this.chartElement, this.config);

        this.refreshData();
    }

    updateChart() {
        this.doughnutChart.update();
    }
}

customElements.define("chart-bar", ChartBar);