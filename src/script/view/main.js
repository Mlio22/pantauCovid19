import "../components/settings-bar.js";
import "../components/search-bar.js";
import "../components/list-bar.js";
import "../components/chart-bar.js";
import "../components/header-bar.js";

const connTimeout = 1000;

const pingUrl = "https://res.cloudinary.com/dv2l54jwg/raw/upload/v1588321529/hi_fb6klp.js";
var int2 = 0;

function checkConnectivity() {
    const controller = new AbortController();
    const { signal } = controller;

    const to3 = setTimeout(() => {
        console.log('to');

        document.querySelector("settings-bar").status = {
            "onlineStatus": false
        };
        controller.abort();
        return 0;
    }, connTimeout);

    fetch(pingUrl, {
            signal,
            cache: "no-store"
        }).then(response => {
            document.querySelector("settings-bar").status = {
                "onlineStatus": response.status ? true : false
            };

            clearTimeout(to3);
            return 0;
        })
        .catch(err => {
            if (err.name != "AbortError") {
                controller.abort();

                document.querySelector("settings-bar").status = {
                    "onlineStatus": false,
                };
                clearTimeout(to3);
                return 0;
            }
        });
    int2++;
}

var int1 = setInterval(checkConnectivity, 2000);

document.querySelector(".headerTextContainer").addEventListener("click", function() {
    var elem = document.documentElement;

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
})

// debug tools

// window.addEventListener("resize", _ => {
//     console.log("size changed");


// });