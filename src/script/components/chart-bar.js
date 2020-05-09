import "../../../node_modules/chart.js/dist/Chart.min.js";

const baseUrlInt = "https://api.covid19api.com/summary";
const baseUrlDom = "https://api.kawalcorona.com/indonesia/provinsi/";
const fetchTimeout = 10000;

class ChartBar extends HTMLElement {
    constructor() {
        super();
        this._country = "Global";
        this._slug = "";
        this._province = "Global";

        this._intStatus = false;
        this._domStatus = false;

        this._intTimeout = false;
        this._domTimeout = false;

        this._newCase = 20;
        this._newDeath = 10;
        this._newRecovered = 3;

        this._oldCase = 50;
        this._oldDeath = 70;
        this._oldRecovered = 10;

        this._positifLokal = 0;
        this._sembuhLokal = 0;
        this._meninggalLokal = 0;

        this.config = {
            type: "doughnut",
            data: {
                labels: ["Kasus Baru", "Sembuh (baru)", "Meninggal (Baru)"],
                datasets: [{
                    data: [this._newCase, this._newRecovered, this._newDeath, this._positifLokal, this._sembuhLokal, this._MeninggalLokal],
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
        console.log(this._country, this._province);

        if (this._domStatus || this._intStatus) {
            if (this._country == "Indonesia" && this._domStatus) {
                console.log("masuk sini");
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

                this.config.data.labels = ["Positif", "Sembuh", "Meninggal"];
                this.config.data.datasets[0].backgroundColor = ["#D4251C", "#41E1F2", "#4d4747"];
                this.config.data.datasets[0].data = [this._positifLokal, this._sembuhLokal, this._meninggalLokal];

            } else if (this._country != "Indonesia" && this._intStatus) {
                console.log("kok masuk sini");

                console.log(this._intData);

                if (this._intTimeout) {
                    console.log("Data International RTO");
                    return 0;
                }
                if (this._country == "Global") {
                    let data = this._intData.Global;

                    this._oldCase = data.TotalConfirmed - data.NewConfirmed;
                    this._newCase = data.NewConfirmed;

                    this._oldDeath = data.TotalDeaths - data.NewDeaths;
                    this._newDeath = data.NewDeaths;

                    this._oldRecovered = data.TotalRecovered - data.NewRecovered;
                    this._newRecovered = data.NewRecovered;
                }

                this._intData.Countries.forEach(data => {

                    if (data.Country == this._country) {
                        console.log(data);

                        this._oldCase = data.TotalConfirmed - data.NewConfirmed;
                        this._newCase = data.NewConfirmed;

                        this._oldDeath = data.TotalDeaths - data.NewDeaths;
                        this._newDeath = data.NewDeaths;

                        this._oldRecovered = data.TotalRecovered - data.NewRecovered;
                        this._newRecovered = data.NewRecovered;
                    }
                });

                document.querySelector("list-bar").data = {
                    "type": "int",
                    "newCase": this._newCase,
                    "oldCase": this._oldCase,
                    "newDeath": this._newDeath,
                    "oldDeath": this._oldDeath,
                    "newRecovered": this._newRecovered,
                    "oldRecovered": this._oldRecovered
                }

                this.config.data.labels = ["Kasus Baru", "Kasus Sebelumnya", "Sembuh (baru)", "Sembuh (lama)", "Meninggal (Baru)", "Meninggal (Lama)"];
                this.config.data.datasets[0].backgroundColor = ["#D4251C", "#AF130B", "#41E1F2", "#4636a8", "#4d4747", "#383535"];
                this.config.data.datasets[0].data = [this._newCase, this._oldCase, this._newRecovered, this._oldRecovered, this._newDeath, this._oldDeath];

            } else {
                document.querySelector("search-bar").setAvailableDefault();
                return 0;
            }
            this.updateChart();
            document.querySelector("search-bar").ready = true;
        } else {
            // error total
            console.log("total error");
        }
    }

    fetchIntData() {
        return new Promise(resolve => {
            const to1 = setTimeout(() => {
                this._intTimeout = true;
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
                    clearTimeout(to1);
                    resolve("");
                });
        });

    }

    fetchDomData() {
        return new Promise(resolve => {
            const to2 = setTimeout(() => {
                this._domTimeout = true;
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
                .catch(_ => {
                    clearTimeout(to2);
                    resolve("");
                });

        });

    }

    refreshData() {
        this.promiseAllFetchData = [this.fetchIntData(), this.fetchDomData()];
        Promise.all(this.promiseAllFetchData)
            .then(_ => {

                document.querySelector("search-bar").dataAvailablity = {
                    "isDomAvailable": this._domStatus,
                    "isIntAvailable": this._intStatus
                };

                console.log("status : ", this._domStatus, this._intStatus);

                this.searchData();
            });
    }

    connectedCallback() {
        this.innerHTML = "<canvas id='chart'></canvas>";
        this.chartElement = document.getElementById("chart");
        this.doughnutChart = new Chart(this.chartElement, this.config);

        // this.refreshData();
    }



    updateChart() {
        this.doughnutChart.update();
    }
}

customElements.define("chart-bar", ChartBar);